from django.db import models
from django.db import transaction
from django.utils import timezone


class ProjectRequest(models.Model):
    """
    A customer-submitted request to Millenium Tech's innovation / product
    studio pipeline. Covers everything from "build me a website" to
    "I have a workflow problem and don't know what technology fixes it".

    Public (anonymous) users may only CREATE these. Reading, listing and
    updating is restricted to authenticated staff/team accounts — see
    projects/permissions.py and projects/views.py.
    """

    class Status(models.TextChoices):
        NEW = "NEW", "New"
        REVIEWING = "REVIEWING", "Reviewing"
        DISCOVERY = "DISCOVERY", "Discovery"
        PROPOSAL = "PROPOSAL", "Proposal"
        APPROVED = "APPROVED", "Approved"
        BUILDING = "BUILDING", "Building"
        TESTING = "TESTING", "Testing"
        LAUNCHED = "LAUNCHED", "Launched"
        SUPPORT = "SUPPORT", "Support"
        REJECTED = "REJECTED", "Rejected"
        ARCHIVED = "ARCHIVED", "Archived"

    class Priority(models.TextChoices):
        LOW = "LOW", "Low"
        NORMAL = "NORMAL", "Normal"
        HIGH = "HIGH", "High"
        URGENT = "URGENT", "Urgent"

    class ProjectType(models.TextChoices):
        BUSINESS_WEBSITE = "BUSINESS_WEBSITE", "Business website"
        WEB_APPLICATION = "WEB_APPLICATION", "Web application"
        SCHOOL_SYSTEM = "SCHOOL_SYSTEM", "School system"
        CHURCH_SYSTEM = "CHURCH_SYSTEM", "Church system"
        ECOMMERCE = "ECOMMERCE", "E-commerce"
        BRANDING_DESIGN = "BRANDING_DESIGN", "Branding / design"
        IT_SUPPORT = "IT_SUPPORT", "IT support"
        PRODUCT_IDEA = "PRODUCT_IDEA", "Product / idea I need help shaping"
        OTHER = "OTHER", "Other custom solution"

    # -- Identity -----------------------------------------------------
    reference_number = models.CharField(
        max_length=20, unique=True, editable=False, db_index=True
    )

    # -- Contact --------------------------------------------------------
    name = models.CharField(max_length=150)
    phone = models.CharField(max_length=30)
    email = models.EmailField(blank=True)
    organization = models.CharField(max_length=150, blank=True)

    # -- The request itself ---------------------------------------------
    project_type = models.CharField(
        max_length=32, choices=ProjectType.choices, default=ProjectType.OTHER
    )
    problem_description = models.TextField(
        help_text="What problem are you trying to solve?"
    )
    desired_solution = models.TextField(
        blank=True, help_text="What would you like the solution to do?"
    )
    target_users = models.CharField(
        max_length=255, blank=True, help_text="Who will use it?"
    )
    current_approach = models.TextField(
        blank=True, help_text="How is this handled today, if at all?"
    )
    budget_range = models.CharField(max_length=60, blank=True)
    timeline = models.CharField(max_length=60, blank=True)
    additional_information = models.TextField(blank=True)

    # A request can reference one of the forward-looking product
    # directions shown on /products (e.g. "millennium-school"), so the
    # team knows the customer arrived from that page.
    related_product = models.CharField(max_length=80, blank=True)

    # -- Pipeline state (team-managed, never public) ---------------------
    status = models.CharField(
        max_length=16, choices=Status.choices, default=Status.NEW
    )
    priority = models.CharField(
        max_length=8, choices=Priority.choices, default=Priority.NORMAL
    )
    assigned_to = models.ForeignKey(
        "auth.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="assigned_project_requests",
    )
    internal_notes = models.TextField(blank=True)

    # Set automatically from the request when a logged-in customer submits
    # this (see projects/views.py). Left null for guest submissions — a
    # login has never been required to send a request, only to look up
    # your past ones afterwards.
    submitted_by = models.ForeignKey(
        "auth.User",
        null=True,
        blank=True,
        on_delete=models.SET_NULL,
        related_name="project_requests",
    )

    # -- Timestamps -------------------------------------------------------
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.reference_number} — {self.name}"

    def save(self, *args, **kwargs):
        if not self.reference_number:
            self.reference_number = self._generate_reference_number()
        super().save(*args, **kwargs)

    @classmethod
    def _generate_reference_number(cls):
        """
        Human-readable, unique reference like MT-2026-0001.
        Sequence resets each calendar year. Wrapped in a transaction with
        select_for_update so two simultaneous submissions in the same
        year can't collide.
        """
        year = timezone.now().year
        prefix = f"MT-{year}-"
        with transaction.atomic():
            last = (
                cls.objects.select_for_update()
                .filter(reference_number__startswith=prefix)
                .order_by("-reference_number")
                .first()
            )
            next_seq = 1
            if last:
                try:
                    next_seq = int(last.reference_number.split("-")[-1]) + 1
                except (ValueError, IndexError):
                    next_seq = cls.objects.filter(
                        reference_number__startswith=prefix
                    ).count() + 1
            return f"{prefix}{next_seq:04d}"
