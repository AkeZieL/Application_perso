from django.db import migrations

def create_default_plans(apps, schema_editor):
    SubscriptionPlan = apps.get_model("subscription", "SubscriptionPlan")

    SubscriptionPlan.objects.get_or_create(
        name="Free",
        plan="free",
        defaults={"features": [], "is_active": True}
    )

    SubscriptionPlan.objects.get_or_create(
        name="Pro",
        plan="pro",
        defaults={"features": ["create_place"], "is_active": True}
    )

    SubscriptionPlan.objects.get_or_create(
        name="Enterprise",
        plan="enterprise",
        defaults={
            "features": ["create_place", "create_event"],
            "is_active": True
        }
    )

class Migration(migrations.Migration):

    dependencies = [
        ("subscription", "0001_initial"),
    ]

    operations = [
        migrations.RunPython(create_default_plans),
    ]