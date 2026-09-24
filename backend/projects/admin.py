from django.contrib import admin
from django.utils.html import format_html

from .models import ProjectRequest

STATUS_COLORS = {
    ProjectRequest.Status.NEW: "#22d3ee",
    ProjectRequest.Status.REVIEWING: "#22d3ee",
    ProjectRequest.Status.DISCOVERY: "#818cf8",
    ProjectRequest.Status.PROPOSAL: "#818cf8",
    ProjectRequest.Status.APPROVED: "#34d399",
    ProjectRequest.Status.BUILDING: "#fbbf24",
    ProjectRequest.Status.TESTING: "#fbbf24",
    ProjectRequest.Status.LAUNCHED: "#34d399",
    ProjectRequest.Status.SUPPORT: "#34d399",
    ProjectRequest.Status.REJECTED: "#f87171",
    ProjectRequest.Status.ARCHIVED: "#9ca3af",
}


@admin.register(ProjectRequest)
class ProjectRequestAdmin(admin.ModelAdmin):
    """
    The smallest maintainable internal interface for the team pipeline:
    Django's built-in admin, configured so the team can triage requests
    (status/priority/assignment/notes) without a separate dashboard app.
    Customer-submitted fields are read-only here too, so the original
    request is never accidentally edited.
    """

    list_display = (
        "reference_number",
        "name",
        "organization",
        "project_type",
        "status_badge",
        "priority",
        "assigned_to",
        "created_at",
    )
    list_editable = ("priority",)
    list_filter = ("status", "priority", "project_type", "created_at")
    search_fields = ("reference_number", "name", "organization", "phone", "email")
    date_hierarchy = "created_at"
    ordering = ("-created_at",)
    autocomplete_fields = ("assigned_to",)

    readonly_fields = (
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
    )

    fieldsets = (
        ("Reference", {"fields": ("reference_number", "created_at", "updated_at")}),
        (
            "Customer",
            {"fields": ("name", "phone", "email", "organization")},
        ),
        (
            "Request",
            {
                "fields": (
                    "project_type",
                    "related_product",
                    "problem_description",
                    "desired_solution",
                    "target_users",
                    "current_approach",
                    "budget_range",
                    "timeline",
                    "additional_information",
                )
            },
        ),
        (
            "Team pipeline (internal only — never shown to the customer)",
            {"fields": ("status", "priority", "assigned_to", "internal_notes")},
        ),
    )

    @admin.display(description="Status")
    def status_badge(self, obj):
        color = STATUS_COLORS.get(obj.status, "#9ca3af")
        return format_html(
            '<span style="display:inline-block;padding:2px 10px;border-radius:999px;'
            'font-size:11px;font-weight:700;letter-spacing:.03em;color:#06082e;'
            'background:{}">{}</span>',
            color,
            obj.get_status_display(),
        )

    def has_add_permission(self, request):
        # Requests come in through the public API only — the team
        # reviews and updates them, but doesn't fabricate new ones here.
        return False
