from .models import SubscriptionPlan, UserSubscription

class SubscriptionPlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubscriptionPlan
        fields = [
            "id",
            "name",
            "plan",
            "features",
            "is_active",
        ]
        read_only_fields = ["id", "started_at"]

class UserSubscriptionSerializer(serializers.ModelSerializer):
    plan = SubscriptionPlanSerializer(read_only=True)
    plan_id = serializers.PrimaryKeyRelatedField(
        queryset=SubscriptionPlan.objects.all(), source='plan', write_only=True
    )

    class Meta:
        model = UserSubscription
        fields = ['id', 'plan', 'plan_id', 'is_active', 'started_at', 'ends_at', 'is_currently_active']
        read_only_fields = ['is_active', 'started_at', 'ends_at']