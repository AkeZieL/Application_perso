from django.urls import path, include

from rest_framework.routers import DefaultRouter

from .views import CheckSubscriptionView, UpgradeSubscriptionPlan

router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),

   # path("test/", TestView, name="login"),

    path("check-subscription/", CheckSubscriptionView, name="check-subscription"),
    path("upgrade-subscription/", UpgradeSubscriptionPlan, name="upgrade-subscription"),
]