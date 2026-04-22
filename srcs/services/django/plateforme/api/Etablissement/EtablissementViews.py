from rest_framework import viewsets, permissions
from .EtablissementModels import Establishment
from .EtablissementSerializer import EstablishmentSerializer


class EstablishmentViewSet(viewsets.ModelViewSet):
    serializer_class = EstablishmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        # chaque utilisateur ne voit QUE ses établissements
        return Establishment.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        # on force le owner côté backend (sécurité)
        serializer.save(owner=self.request.user)