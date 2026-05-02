from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D

from rest_framework import serializers
from ..Auth.AuthSerializer import CustomUserSerializer
from ..Etablissement.EtablissementModels import Establishment
from .EventModel import Event

class EventSerializer(serializers.ModelSerializer):
    created_by = CustomUserSerializer(read_only=True)

    latitude = serializers.FloatField(write_only=True)
    longitude = serializers.FloatField(write_only=True)

    etablissement = serializers.PrimaryKeyRelatedField(
        queryset=Establishment.objects.all(),
        required=False,
        allow_null=True
    )

    class Meta:
        model = Event
        fields = [
            "id",
            "title",
            "description",
            "location",
            "etablissement",
            "start_date",
            "end_date",
            "start_time",
            "end_time",
            "created_at",
            "updated_at",
            "created_by",
            "latitude",
            "longitude",
            "type",
        ]
        read_only_fields = ["id", "created_at", "updated_at", "created_by"]
    def validate(self, data):
        lat = data.get("latitude")
        long = data.get("longitude")
        
        if lat is None and long is None:
             raise serializers.ValidationError(
                "Erreur lors de la récupération de la position"
            )
        location = GeoPoint(long, lat, srid=4326)

        if Event.objects.filter(location=location, type=type).exists():
            raise serializers.ValidationError(
                "Ce lieu ou évènement existe déjà."
            )

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

        return Event.objects.create(**validated_data)