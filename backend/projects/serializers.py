from rest_framework import serializers

from .models import ProjectRequest


class ProjectRequestCreateSerializer(serializers.ModelSerializer):
    """
    What a public/anonymous customer may send and receive.

    Deliberately excludes status, priority, assigned_to and
    internal_notes from being *written* by the client (they're not
    listed as input fields at all — status/priority keep their model
    defaults, assigned_to/internal_notes stay empty). reference_number
    and status ARE echoed back in the response so the frontend can show
    "Your request has been received" with a tracking number, without
    exposing anything about other customers or the internal pipeline.
    """

    class Meta:
        model = ProjectRequest
        fields = [
            "id",
            "reference_number",
            "name",
            "phone",
            "email",
            "organization",
            "project_type",
            "problem_description",
            "desired_solution",
            "target_users",
            "current_approach",
            "budget_range",
            "timeline",
            "additional_information",
            "related_product",
            "status",
            "created_at",
        ]
        read_only_fields = ["id", "reference_number", "status", "created_at"]

    def validate_name(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("Please tell us your name.")
        return value

    def validate_phone(self, value):
        value = value.strip()
        if len(value) < 7:
            raise serializers.ValidationError(
                "Please provide a valid phone or WhatsApp number so the team can reach you."
            )
        return value

    def validate_problem_description(self, value):
        value = value.strip()
        if len(value) < 10:
            raise serializers.ValidationError(
                "Please describe the problem or idea in a bit more detail."
            )
        return value


class MyProjectRequestSerializer(serializers.ModelSerializer):
    """
    What a logged-in customer sees about their own past requests
    (GET /api/project-requests/mine/). Same idea as the create
    serializer — no internal_notes, no assigned_to.
    """

    class Meta:
        model = ProjectRequest
        fields = [
            "id",
            "reference_number",
            "project_type",
            "problem_description",
            "status",
            "priority",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields


class ProjectRequestListSerializer(serializers.ModelSerializer):
    """Team-facing list view. No internal_notes here — keep the list light."""

    assigned_to_name = serializers.CharField(
        source="assigned_to.get_username", read_only=True, default=None
    )

    class Meta:
        model = ProjectRequest
        fields = [
            "id",
            "reference_number",
            "name",
            "organization",
            "project_type",
            "status",
            "priority",
            "assigned_to",
            "assigned_to_name",
            "created_at",
            "updated_at",
        ]
        read_only_fields = fields


class ProjectRequestDetailSerializer(serializers.ModelSerializer):
    """
    Full record for authenticated staff — includes internal_notes and
    assignment. This is only ever reachable through IsStaffOrCreateOnly.
    """

    assigned_to_name = serializers.CharField(
        source="assigned_to.get_username", read_only=True, default=None
    )

    class Meta:
        model = ProjectRequest
        fields = [
            "id",
            "reference_number",
            "name",
            "phone",
            "email",
            "organization",
            "project_type",
            "problem_description",
            "desired_solution",
            "target_users",
            "current_approach",
            "budget_range",
            "timeline",
            "additional_information",
            "related_product",
            "status",
            "priority",
            "assigned_to",
            "assigned_to_name",
            "internal_notes",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "reference_number",
            "name",
            "phone",
            "email",
            "organization",
            "project_type",
            "problem_description",
            "desired_solution",
            "target_users",
            "current_approach",
            "budget_range",
            "timeline",
            "additional_information",
            "related_product",
            "created_at",
            "updated_at",
        ]
        # status, priority, assigned_to and internal_notes stay writable
        # for staff PATCH requests — everything the customer submitted
        # is read-only even for staff, to preserve the original record.
