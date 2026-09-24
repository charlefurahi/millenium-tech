"""
Notification abstraction for project requests.

The current project has no email/SMS provider configured (no SMTP
credentials, no SendGrid/Twilio keys in .env), so we don't hard-code one
here — that would silently fail or, worse, throw on every submission.

Instead this module defines the two notification "events" the intake
flow needs and a default backend that just logs them. When the team
adds real credentials later (e.g. SMTP settings, a WhatsApp Business
API key), swap `_default_backend` for a real implementation — the
call sites in views.py don't need to change.
"""

import logging

logger = logging.getLogger("projects.notifications")


def notify_team_new_request(project_request):
    """Called right after a new ProjectRequest is created."""
    logger.info(
        "New project request %s from %s (%s) — %s",
        project_request.reference_number,
        project_request.name,
        project_request.phone,
        project_request.get_project_type_display(),
    )
    # Future: send an email/Slack/WhatsApp ping to the team here.


def notify_customer_acknowledgement(project_request):
    """Called right after a new ProjectRequest is created."""
    if project_request.email:
        logger.info(
            "Acknowledgement queued for %s <%s> — reference %s",
            project_request.name,
            project_request.email,
            project_request.reference_number,
        )
    # Future: send a confirmation email to project_request.email here,
    # once an email backend (e.g. SMTP or a transactional email API)
    # is configured in settings and .env.
