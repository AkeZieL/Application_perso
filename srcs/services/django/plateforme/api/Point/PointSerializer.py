from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D

from rest_framework import serializers
from ..Auth.AuthModels import CustomUser
from ..Auth.AuthSerializer import CustomUserSerializer

from .PointsModel import Point

class PointSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)
    latitude = serializers.FloatField(write_only=True)
    longitude = serializers.FloatField(write_only=True)
    class Meta:
        model = Point
        fields = [
            "id",
            "address",
            "type",
            "location",
            "start_date",
            "end_date",
            "created_at",
            "updated_at",
            "created_by",

            "latitude",
            "longitude",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by"]
    def validate(self, data):
        lat = data.get("latitude")
        long = data.get("longitude")
        _type = data.get("type")

        location = GeoPoint(long, lat, srid=4326)

        if Point.objects.filter(location=location, type=_type).exists():
            raise serializers.ValidationError(
                "Ce lieu ou évènement existe déjà."
            )
        if (_type == "event"):
            start = data.get("start_date")
            end = data.get("end_date")
            if start and end and start > end:
                raise serializers.ValidationError(
                    "La date de début doit être avant la date de fin."
                )
        return data
    def create(self, validated_data):
        request = self.context["request"]
        
        lat = validated_data.pop("latitude")
        lng = validated_data.pop("longitude")

        validated_data["location"] = GeoPoint(lng, lat, srid=4326)
        validated_data["created_by"] = request.user

        return Point.objects.create(**validated_data)