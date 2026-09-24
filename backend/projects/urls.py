from rest_framework.routers import DefaultRouter

from .views import ProjectRequestViewSet

router = DefaultRouter()
router.register("project-requests", ProjectRequestViewSet, basename="project-request")

urlpatterns = router.urls
