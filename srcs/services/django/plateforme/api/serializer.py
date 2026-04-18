from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email

from django.contrib.gis.geos import Point as GeoPoint
from django.contrib.gis.measure import D

from rest_framework import serializers
from .models import Point

import re

#REGISTER
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'role', 'date_joined', 'password1', 'password2']
        read_only_fields = ['id', 'date_joined']

    def validate(self, data):
        #-------------------
        # Check username
        #-------------------
        username = data.get("username")

        if len(username) < 3:
            raise serializers.ValidationError({
                "username": "Username must be at least 3 characters"
            })
        if len(username) > 20:
            raise serializers.ValidationError({
                "username": "Username must be under 20 characters"
            })
        if not re.match(r"^[a-zA-Z0-9_]+$", username):
            raise serializers.ValidationError({
                "username": "Only letters, numbers and underscores allowed"
            })

        #-------------------
        # Check Email
        #-------------------
        email = data.get("email")
        isExisting = User.objects.filter(email=email)
        if isExisting:
            raise serializers.ValidationError({
                "email": "Email is already taken"
            })
        print(email)
        validate_email(email)

        #-------------------
        # Check password
        #-------------------
        password1 = data.get("password1")
        password2 = data.get("password2")

        if password1 != password2:
            raise serializers.ValidationError({
            "password2": "Passwords do not match"
            })
        validate_password(password1)

        return data

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password1'],
            role=validated_data.get('role')
        )
        return user
        
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