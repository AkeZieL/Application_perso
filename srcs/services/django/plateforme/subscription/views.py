from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import SubscriptionPlan, UserSubscription

@api_view(["POST"])
def UpgradeSubscriptionPlan(request):

    if not request.user.is_authenticated:
        return Response({"message": "Authentification requise"}, status=401)

    subscription = UserSubscription.objects.filter(user=request.user).first()

    if not subscription:
        return Response({"message": "Abonnement non trouvé"}, status=404)

    current_plan = subscription.plan.plan

    # Logique d'upgrade (Facile pour test)
    if current_plan == "free":
        new_plan = "pro"
    elif current_plan == "pro":
        new_plan = "enterprise"
    else:
        return Response({
            "message": "Vous êtes déjà au plan maximum (Enterprise)"
        })

    # Récupération du nouveau plan
    try:
        new_plan = SubscriptionPlan.objects.get(plan=new_plan)
    except SubscriptionPlan.DoesNotExist:
        return Response({"message": "Plan cible introuvable"}, status=404)

    # Mise à jour
    old_plan = current_plan
    subscription.plan = new_plan
    subscription.is_active = True
    subscription.save()

    return Response({
        "success": True,
        "old_plan": old_plan,
        "new_plan": new_plan.plan,
    })

@api_view(["GET"])
def CheckSubscriptionView(request):
    subscription = UserSubscription.objects.filter(user=request.user).first()

    if not subscription:
        return Response({"message": "Abonnement non trouvé"}, status=404)

    allowed = subscription.has_feature("create_place")

    return Response({
        "allowed": allowed,
        "plan": subscription.plan.plan,
    })