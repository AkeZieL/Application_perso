# subscriptions/signal.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.conf import settings

from .models import UserSubscription, SubscriptionPlan


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_user_subscription(sender, instance, created, **kwargs):
    if not created:
        return
    try:
        free_plan = SubscriptionPlan.objects.get(plan="free")
    except SubscriptionPlan.DoesNotExist:
        # fallback safe (évite crash startup)
        return

    UserSubscription.objects.get_or_create(
        user=instance,
        defaults={
            "plan": free_plan,
            "is_active": True,
        }
    )
    print("USER SUBSCRIPTION GET OR CREATE")