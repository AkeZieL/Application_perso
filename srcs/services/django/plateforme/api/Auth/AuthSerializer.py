from django.contrib.auth.models import User
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from django.core.validators import validate_email

from rest_framework import serializers

import re

#REGISTER
User = get_user_model()

class CustomUserSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'date_joined', 'password1', 'password2']
        read_only_fields = ['id', 'date_joined']

    def validate(self, data):

        # Check username
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

        # Check Email
        email = data.get("email")
        isExisting = User.objects.filter(email=email)
        if isExisting:
            raise serializers.ValidationError({
                "email": "Email is already taken"
            })
        print(email)
        validate_email(email)

        # Check password
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
        )
        return user
        