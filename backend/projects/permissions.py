from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsStaffOrCreateOnly(BasePermission):
    """
    Anonymous / public users may only CREATE a project request (POST).
    Listing, retrieving, updating and deleting requires an authenticated
    staff (team/admin) account.

    This keeps customer submissions open (no login required to ask for
    help) while making sure nobody but the Millenium Tech team can read
    other customers' requests, internal notes, or team assignment info.
    """

    def has_permission(self, request, view):
        if request.method == "POST":
            return True
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)

    def has_object_permission(self, request, view, obj):
        return bool(request.user and request.user.is_authenticated and request.user.is_staff)
