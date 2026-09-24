# MilleniumTech Digital Platform Upgrade
## Product, UX, Customer Intake and Team Workflow Specification
**Version:** 1.0 — September 2026

### 1. Purpose

This upgrade evolves the existing MilleniumTech website from a traditional technology-services site into a **digital solutions company platform** without replacing the existing application foundation.

The core idea is:

> Customer describes a problem → MilleniumTech structures the requirement → team reviews it → proposal is prepared → project is approved → team builds → customer follows progress → support continues.

The website remains a marketing and lead-generation layer first. Automation and SaaS products are introduced gradually instead of being forced into the existing application all at once.

---

## 2. Non-negotiable preservation rules

The implementation must preserve:

- Existing Vue 3 + Vite architecture.
- Existing `src` structure and reusable components.
- Existing working routes: `/`, `/services`, `/about`, `/portfolio`, `/contact`.
- Existing backend/API integration.
- Existing theme system and brand palette.
- Existing responsive behavior.
- Existing chatbot integration.
- Existing working content unless a change is required for the new product direction.
- Existing deployment assumptions.

New functionality should be additive. Existing URLs must continue resolving.

### Existing routes

| Route | Status |
|---|---|
| `/` | Preserve |
| `/services` | Preserve |
| `/about` | Preserve |
| `/portfolio` | Preserve |
| `/contact` | Preserve |

### New routes introduced

| Route | Purpose |
|---|---|
| `/solutions` | Industry-specific solutions |
| `/products` | Reusable product/platform direction |
| `/request-project` | Structured project intake |

---

## 3. New business model

MilleniumTech should operate across three layers.

### Layer A — Services

Immediate revenue:

- Website development
- Web applications
- Graphic design
- IT support
- Computer repair
- Online services
- Laptop/device services
- Maintenance

### Layer B — Solutions

Higher-value projects for defined customer groups:

- Businesses
- Schools
- Churches
- Organizations/NGOs
- Professionals

### Layer C — Products

Long-term recurring revenue:

- Millennium School
- Millennium Church
- Millennium Business

Products should begin as product concepts/landing pages and only become full SaaS platforms after repeated customer demand is validated.

---

# 4. Customer journey

```text
Visitor
  ↓
Website
  ↓
Solutions / Services / Products
  ↓
Request a Project
  ↓
Structured Project Brief
  ↓
Lead / Project Request
  ↓
Team Review
  ↓
Discovery Questions
  ↓
Proposal + Scope + Estimate
  ↓
Customer Approval
  ↓
Design
  ↓
Development
  ↓
Testing
  ↓
Deployment
  ↓
Maintenance / Support
```

The customer should never be told that an automatic build has started simply because they submitted a form.

---

# 5. Project intake

The `/request-project` page captures:

- Name
- Phone / WhatsApp
- Email
- Organization/business
- Project type
- Budget range
- Problem/goal description

The form should eventually submit to a backend endpoint such as:

`POST /api/projects/requests/`

The current frontend implementation stores the request locally so the UI flow can be demonstrated safely without inventing an API endpoint.

### Recommended future request record

```json
{
  "id": "REQ-000001",
  "customer": {
    "name": "Customer Name",
    "phone": "+255...",
    "email": "customer@example.com",
    "organization": "ABC School"
  },
  "project_type": "school_system",
  "budget_range": "2m-5m",
  "description": "Customer requirement...",
  "status": "new",
  "created_at": "...",
  "assigned_to": null
}
```

---

# 6. Team workflow

The future internal dashboard should have:

### Requests

- New
- Reviewing
- Needs information
- Qualified
- Declined
- Converted to project

### Projects

- Planning
- Design
- Development
- Testing
- Deployment
- Completed
- Maintenance

### Quotes

- Draft
- Sent
- Accepted
- Rejected
- Expired

### Change requests

Customers should be able to request changes without confusing them with the original project scope.

---

# 7. AI-assisted workflow

MilleBot can assist with intake, but AI should not automatically commit MilleniumTech to a project.

AI can:

- Understand the customer's message.
- Extract possible requirements.
- Identify missing information.
- Generate discovery questions.
- Classify project type.
- Summarize a long request for the team.
- Suggest a preliminary feature list.
- Help create an internal project brief.

The team must control:

- Final scope.
- Price.
- Timeline.
- Technical feasibility.
- Contract/proposal.
- Project acceptance.
- Production deployment.

### Example

Customer:

> I run a secondary school with 800 students and need attendance, fees and results.

AI-assisted summary:

```text
Project type: School Management System

Possible modules:
- Student records
- Attendance
- Fees
- Examination/results
- Parent communication

Questions:
1. How many teachers?
2. Do parents need accounts?
3. Which payment methods are required?
4. Does the school already have a website?
5. Should the system work on mobile?
```

The team then reviews the summary before contacting the customer.

---

# 8. Future customer portal

A future `/client-portal` should show:

```text
My Projects

ABC School System
Status: Development
Progress: 45%

Milestones
✓ Requirements
✓ UI Design
● Development
○ Testing
○ Deployment

Messages
Documents
Invoices
Change Requests
Support
```

This should be implemented after the intake workflow has real customers.

---

# 9. Future team portal

Recommended future routes:

```text
/team
/team/requests
/team/requests/:id
/team/projects
/team/projects/:id
/team/quotes
/team/tasks
/team/customers
/team/support
```

These should be protected by authentication and role-based permissions.

---

# 10. Future backend architecture

Do not rewrite the current backend.

Add isolated modules around the existing system.

Suggested domain model:

```text
User
  │
  └── Organization
        │
        ├── Customer
        ├── ProjectRequest
        ├── Project
        ├── Quote
        ├── Task
        ├── Milestone
        ├── ChangeRequest
        ├── SupportTicket
        └── Subscription
```

Products can then attach to an organization:

```text
Organization
   ↓
Product
   ↓
Subscription
   ↓
Features
```

Example:

```text
ABC Secondary School
    ↓
Millennium School
    ↓
Professional Plan
    ↓
Admissions
Students
Attendance
Exams
Parent Communication
```

---

# 11. Product strategy

Do not build all products immediately.

### Stage 1
Sell services and custom systems.

### Stage 2
Observe repeated customer problems.

### Stage 3
Choose the problem customers repeatedly request.

### Stage 4
Build one reusable platform.

### Stage 5
Charge monthly or annually.

### Stage 6
Expand modules only after usage validates demand.

This reduces development risk and prevents building software nobody needs.

---

# 12. UX/UI direction

The visual system should preserve the current MilleniumTech identity:

- Navy/dark foundation.
- Cyan accent.
- Gold secondary accent.
- Poppins typography.
- Existing light/dark mode.
- Rounded cards.
- Controlled glass effects.
- Strong whitespace.
- Responsive grids.

### Images

Use real project/industry photography already included in the project assets:

- `assets/services/website-development.jpg`
- `assets/services/online-services.jpg`
- `assets/services/graphics-design.jpg`
- `assets/process/consultation.jpg`
- `assets/process/execution.jpg`
- `assets/process/planning.jpg`
- `assets/process/delivery.jpg`

Images should support meaning rather than decorate every card.

### Icons

No emoji should be used as UI icons.

Use:

- Inline SVG icons already used by the project.
- Consistent stroke width.
- Consistent icon box sizing.
- Accessible labels where required.

---

# 13. Responsive requirements

Every new page must work at:

- Mobile: approximately 320–767px
- Tablet: approximately 768–1023px
- Desktop: 1024px+

Rules:

- No horizontal overflow.
- Cards collapse cleanly.
- Forms become one column on small screens.
- Buttons remain touch-friendly.
- Images keep useful crop positions.
- Navigation remains usable through the existing mobile menu.
- Dark and light themes must both be readable.

---

# 14. Current implementation in this upgrade

The supplied project has been upgraded with:

### New pages

`src/views/SolutionsView.vue`

Provides industry solution cards for:

- Businesses
- Schools
- Churches
- Organizations

`src/views/ProductsView.vue`

Introduces:

- Millennium School
- Millennium Church
- Millennium Business

`src/views/ProjectRequestView.vue`

Provides a structured project brief and a customer journey explanation.

### Navigation

Added:

- Solutions
- Products

Changed the main CTA to:

> Start a project

while preserving existing navigation routes.

### Home page

Added a strategic platform section that explains the path:

> Request → requirements → team → project → support

### Chatbot

Removed emoji-based UI text and kept the existing chat architecture intact.

### Contact page

Replaced emoji success/error indicators with SVG-based UI icons.

---

# 15. Next implementation phase

The next development phase should connect the frontend intake to a real backend.

Recommended endpoint:

```text
POST /api/projects/requests/
```

Then build:

```text
GET /api/projects/requests/
GET /api/projects/requests/:id/
PATCH /api/projects/requests/:id/
```

with authenticated team access.

After that:

```text
Projects
Quotes
Tasks
Milestones
Change Requests
Support Tickets
Subscriptions
```

should be added incrementally.

---

# 16. Important rule for future modifications

Before modifying an existing file:

1. Read the complete file.
2. Understand its existing dependencies.
3. Preserve existing routes and API calls.
4. Make the smallest safe change.
5. Re-check theme behavior.
6. Re-check mobile behavior.
7. Check for console/runtime errors.
8. Build the application before delivery.
9. Never replace working architecture merely to make a feature easier.
10. Prefer additive components and views.

---

# 17. End-state vision

The long-term MilleniumTech platform should become:

```text
                  MILLENIUMTECH
                       │
        ┌──────────────┼──────────────┐
        │              │              │
     SERVICES       SOLUTIONS       PRODUCTS
        │              │              │
   Web / IT       Business         School
   Design         Schools          Church
   Support        Churches         Business
                  Organizations
        │              │              │
        └──────────────┼──────────────┘
                       ↓
                PROJECT REQUEST
                       ↓
                 AI-ASSISTED
                   INTAKE
                       ↓
                   TEAM REVIEW
                       ↓
                  PROPOSAL
                       ↓
                  DEVELOPMENT
                       ↓
                  DEPLOYMENT
                       ↓
                SUPPORT / SaaS
```

The website is therefore not just a brochure. It becomes the **front door to MilleniumTech's service and product operation**, while the existing application remains intact.

---

## Delivery principle

The current upgrade is intentionally frontend-first and non-destructive. Backend automation, authentication, team dashboards and subscriptions should be introduced only when the corresponding API/data models are ready.

This keeps the current website deployable while giving MilleniumTech a clear path from custom projects to recurring digital products.
