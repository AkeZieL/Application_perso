from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets

from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance

from .PointsModel import Point
from .serializer import PointSerializer
from math import radians, sin, cos, asin, sqrt

class PointViewSet(viewsets.ModelViewSet):
    queryset = Point.objects.all()
    serializer_class = PointSerializer

    @action(detail=False, methods=["get"])
    def nearby(self, request):
        lat = float(request.query_params.get("latitude"))
        lng = float(request.query_params.get("longitude"))
        radius = float(request.query_params.get("radius", 5))  # km

        if not lat or not lng:
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

        points = (
            Point.objects
            .filter(
                location__distance_lte=(user_location, D(km=radius))
            )
            .annotate(
                distance=Distance("location", user_location)
            )
            .order_by("distance")
        )

        serializer = self.get_serializer(points, many=True)
        return Response(serializer.data)