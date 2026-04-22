from django.db import models

# Create your models here.
# subscriptions/models.py
from django.db import models
from django.utils import timezone
from django.conf import settings

class SubscriptionPlan(models.Model):
    PLAN_CHOICES = (
        ("free", "Free"),
        ("pro", "Pro"),
        ("enterprise", "Enterprise"),
    )

    name = models.CharField(max_length=50, unique=True)
    plan = models.SlugField(max_length=20, unique=True, choices=PLAN_CHOICES)
    features = models.JSONField(default=list, blank=True) # ex: ["feature1", "feature2", "unlimited_exports"]
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        ordering = ['name']

class UserSubscription(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="subscription")
    plan = models.ForeignKey(SubscriptionPlan, on_delete=models.PROTECT, related_name="subscriptions")
    is_active = models.BooleanField(default=True)
    started_at = models.DateTimeField(auto_now_add=True)
    ends_at = models.DateTimeField(null=True, blank=True)
    canceled_at = models.DateTimeField(null=True, blank=True)

    def __str__(self):
        return f"{self.user.email} - {self.plan.name}"

    @property
    def is_currently_active(self):
        if not self.is_active:
            return False
        if self.ends_at and self.ends_at < timezone.now():
            return False
        return True

    def has_feature(self, feature_name: str) -> bool:
        return feature_name in self.plan.features