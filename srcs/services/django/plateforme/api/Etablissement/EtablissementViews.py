from rest_framework import viewsets, permissions
from rest_framework.response import Response

from .EtablissementModels import Establishment
from .EtablissementSerializer import EstablishmentSerializer
from ..Event.EventModel import Event
from rest_framework.decorators import action

from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance


class EstablishmentViewSet(viewsets.ModelViewSet):
    serializer_class = EstablishmentSerializer

    def get_queryset(self):
        # chaque utilisateur ne voit QUE ses établissements
        return Establishment.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        establishment = serializer.save(owner=self.request.user)

    @action(detail=False, methods=["get"])
    def nearby(self, request):
        lat = float(request.query_params.get("latitude"))
        lng = float(request.query_params.get("longitude"))
        radius = float(request.query_params.get("radius", 5))  # km

        if lat is None or lng is None:
            return Response(
                {"error": "latitude et longitude requis"},
                status=400
            )
        try:
            lat = float(lat)
            lng = float(lng)
            radius = float(radius)
        except ValueError:
            return Response(
                {"error": "valeurs invalides"},
                status=400
            )

        user_location = GeoPoint(lng, lat, srid=4326)

        types = request.query_params.getlist("type")
        categories = request.query_params.getlist("categories")

        queryset = (
            Establishment.objects
            .filter(location__distance_lte=(user_location, D(km=radius)))
            .annotate(distance=Distance("location", user_location))
            .order_by("distance")
        )

        if categories:
            queryset = queryset.filter(category__in=categories)
        
        serializer = EstablishmentSerializer(queryset, many=True, context={"request": request})
        return Response(serializer.data)