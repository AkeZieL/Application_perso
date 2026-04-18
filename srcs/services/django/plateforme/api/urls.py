from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .AuthentificationViews import CustomUserViewSet, RegisterView, LoginView, LogoutView, RefreshTokenView
from .PointsView import PointViewSet


router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'point', PointViewSet, basename='point')

urlpatterns = [
    path('', include(router.urls)),

   # path("test/", TestView, name="login"),

    path("auth/login/", LoginView, name="login"),
    path("auth/register/", RegisterView, name="register"),
    path("auth/logout/", LogoutView, name="logout"),
    path("auth/token/refresh/", RefreshTokenView, name="refresh_token"),
]