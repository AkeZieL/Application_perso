from django.urls import path, include

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView
)

from .Auth.AuthViews import CustomUserViewSet, RegisterView, LoginView, LogoutView, RefreshTokenView
from .Event.EventView import EventViewSet
from .Etablissement.EtablissementViews import EstablishmentViewSet

router = DefaultRouter()
router.register(r'users', CustomUserViewSet, basename='user')
router.register(r'event', EventViewSet, basename='event')
router.register(r'etablissement', EstablishmentViewSet, basename='etablissement')


urlpatterns = [
    path('', include(router.urls)),

   # path("test/", TestView, name="login"),
    path("auth/login/", LoginView, name="login"),
    path("auth/register/", RegisterView, name="register"),
    path("auth/logout/", LogoutView, name="logout"),
    path("auth/token/refresh/", RefreshTokenView, name="refresh_token"),
]