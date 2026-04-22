from rest_framework import serializers
from .EtablissementModels import Establishment

from django.contrib.gis.geos import Point as GeoPoint

from ..Auth.AuthSerializer import CustomUserSerializer
from ..Auth.AuthModels import CustomUser


class EstablishmentSerializer(serializers.ModelSerializer):
    owner = CustomUserSerializer(read_only=True)
    latitude = serializers.FloatField(write_only=True)
    longitude = serializers.FloatField(write_only=True)

    class Meta:
        model = Establishment
        fields = [
            "id",
            "owner",
            "name",
            "description",
            "address",
            "category",
            "phone",
            "website",
            "created_at",
            "updated_at",
            
            "latitude",
            "longitude",
        ]
        read_only_fields = ["id", "owner", "created_at", "updated_at"]
        
    def validate(self, data):
        lat = data.get("latitude")
        long = data.get("longitude")
        category = data.get("category")

        location = GeoPoint(long, lat, srid=4326)

        if Establishment.objects.filter(location=location, category=category).exists():
            raise serializers.ValidationError(
                "Ce lieu ou évènement existe déjà."
            )
        return data
    def create(self, validated_data):
        request = self.context["request"]
        
        lat = validated_data.pop("latitude")
        lng = validated_data.pop("longitude")

        validated_data["location"] = GeoPoint(lng, lat, srid=4326)
        validated_data["owner"] = request.user

        return Establishment.objects.create(**validated_data)