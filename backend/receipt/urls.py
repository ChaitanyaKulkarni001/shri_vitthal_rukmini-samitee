from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserInfoViewSet

router = DefaultRouter()
router.register(r'users', UserInfoViewSet, basename='userinfo')

urlpatterns = [
    path('api/', include(router.urls)),
]
