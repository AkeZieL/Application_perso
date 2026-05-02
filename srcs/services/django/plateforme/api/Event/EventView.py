from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from .EventModel import Event
from .EventSerializer import EventSerializer

class EventViewSet(viewsets.ModelViewSet):
    queryset = Event.objects.all()
    serializer_class = EventSerializer
    
    def get_queryset(self):
        return Event.objects.filter(created_by=self.request.user)
        
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    @action(detail=False, methods=["get"])
    def nearby(self, request):
        lat = request.query_params.get("latitude")
        lng = request.query_params.get("longitude")
        radius = request.query_params.get("radius", 5)

        if not lat or not lng:
            return Response(
                {"error": "latitude et longitude requis"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            lat = float(lat)
            lng = float(lng)
            radius = float(radius)
        except ValueError:
            return Response(
                {"error": "valeurs invalides"},
                status=status.HTTP_400_BAD_REQUEST
            )

        user_location = GeoPoint(lng, lat, srid=4326)

        queryset = (
            Event.objects
            .filter(location__distance_lte=(user_location, D(km=radius)))
            .annotate(distance=Distance("location", user_location))
            .order_by("distance")
        )

        serializer = EventSerializer(
            queryset,
            many=True,
            context={"request": request}
        )

        return Response(serializer.data)