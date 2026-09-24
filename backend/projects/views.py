from rest_framework import filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import ProjectRequest
from .notifications import notify_customer_acknowledgement, notify_team_new_request
from .permissions import IsStaffOrCreateOnly
from .serializers import (
    MyProjectRequestSerializer,
    ProjectRequestCreateSerializer,
    ProjectRequestDetailSerializer,
    ProjectRequestListSerializer,
)


class ProjectRequestViewSet(viewsets.ModelViewSet):
    """
    POST   /api/project-requests/            -> anyone can create
    GET    /api/project-requests/            -> staff only, list
                                                 (?status=, ?priority=, ?project_type= to filter)
    GET    /api/project-requests/{id}/       -> staff only, detail (incl. internal notes)
    PATCH  /api/project-requests/{id}/       -> staff only, update status/priority/notes/assignment
    DELETE /api/project-requests/{id}/       -> staff only
    """

    queryset = ProjectRequest.objects.select_related("assigned_to").all()
    permission_classes = [IsStaffOrCreateOnly]
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["reference_number", "name", "organization", "phone", "email"]
    ordering_fields = ["created_at", "updated_at", "priority", "status"]

    def get_queryset(self):
        qs = super().get_queryset()
        params = self.request.query_params
        for field in ("status", "priority", "project_type"):
            value = params.get(field)
            if value:
                qs = qs.filter(**{field: value})
        return qs

    def get_serializer_class(self):
        if self.action == "create":
            return ProjectRequestCreateSerializer
        if self.action == "list":
            return ProjectRequestListSerializer
        return ProjectRequestDetailSerializer

    def perform_create(self, serializer):
        # Logged-in customers get their submission linked to their
        # account automatically (so it shows up under "My requests");
        # guests are never asked to log in and submitted_by stays null.
        submitted_by = (
            self.request.user if self.request.user.is_authenticated else None
        )
        instance = serializer.save(submitted_by=submitted_by)
        notify_team_new_request(instance)
        notify_customer_acknowledgement(instance)

    def create(self, request, *args, **kwargs):
        # Re-serialize the response with the create serializer so a
        # public caller only ever sees the fields it's allowed to see
        # (never internal_notes/assigned_to), regardless of get_serializer_class.
        serializer = ProjectRequestCreateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=201)

    @action(detail=False, methods=["get"], permission_classes=[IsAuthenticated])
    def mine(self, request):
        """GET /api/project-requests/mine/ — the logged-in customer's own requests."""
        qs = (
            ProjectRequest.objects.filter(submitted_by=request.user)
            .order_by("-created_at")
        )
        return Response(MyProjectRequestSerializer(qs, many=True).data)
