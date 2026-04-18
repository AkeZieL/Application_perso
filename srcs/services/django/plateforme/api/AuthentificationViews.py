from django.shortcuts import render
from django.contrib.auth import get_user_model
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth import password_validation
from django.contrib.auth import authenticate

from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated

from .serializer import CustomUserSerializer
import re

from django.views.decorators.csrf import csrf_exempt

from rest_framework_simplejwt.serializers import TokenRefreshSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import status
from rest_framework_simplejwt.exceptions import TokenError

User = get_user_model()

@api_view(["POST"])
@permission_classes([AllowAny])
def LoginView(request):
    email = request.data.get("email")
    password = request.data.get("password")

    if not email or not password:
        return Response(
            {"error": "Email and password required"},
            status=status.HTTP_400_BAD_REQUEST
        )
    user = authenticate(request, username=email, password=password)

    if user is None:
        return Response({"error": "Invalid credentials"},
            status=status.HTTP_401_UNAUTHORIZED)

    if not user.is_active:
        return Response({"error": "User account is disabled"},
            status=status.HTTP_403_FORBIDDEN)

    refresh = RefreshToken.for_user(user)
    access_token = str(refresh.access_token)
    refresh_token = str(refresh)

    response = Response({"message": "Login successful", 
        "user": {
            "email": user.email,
            "username": user.username
        }
    })

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False, # POUR PROD       TRUE
        samesite="Lax", # POUR PROD       samesite="None",
        max_age=60 * 5,
    )

    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False, # POUR PROD       TRUE
        samesite="Lax", # POUR PROD         samesite="None",
        max_age=60 * 60 * 24 * 7
    )

    return response

@api_view(["POST"])
@permission_classes([AllowAny])
def RegisterView(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        return Response(
            {
                "message": "User created",
                "user": {
                    "id": user.id,
                    "email": user.email,
                    "username": user.username,
                    "role": user.role
                }
            },
            status=status.HTTP_201_CREATED
        )

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(["POST"])
@permission_classes([AllowAny])
def LogoutView(request):
    try:
        refresh_token = request.COOKIES.get("refresh_token")
        if not refresh_token:
            return Response({"detail": "No refresh token"}, status=401)

        if refresh_token:
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
            except TokenError:
                return Response({"detail": "Error while blacklist"}, status=401)

        response = Response({"message": "Logged out"})

        response.delete_cookie("access_token")
        response.delete_cookie("refresh_token")

        return response
    except Exception as e:
        print("LOGOUT ERROR:", str(e))
        return Response({"error": str(e)}, status=400)

@api_view(["POST"])
@permission_classes([AllowAny])
def RefreshTokenView(request):
    refresh_token = request.COOKIES.get("refresh_token")
    if not refresh_token:
        return Response({"detail": "No refresh token"}, status=401)
    #print("COOKIES:", request.COOKIES.get("refresh_token"))
    serializer = TokenRefreshSerializer(data={
        "refresh": refresh_token
    })

    try:
        serializer.is_valid(raise_exception=True)
    except Exception as e:
        return Response({"detail": str(e)}, status=401)

    access_token = serializer.validated_data["access"]
    new_refresh_token = serializer.validated_data["refresh"]

    response = Response({"message": "Token refreshed"})

    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=None, # Pour passage en PROD: True
        samesite="Lax", # Pour passe en PROD: None
        max_age=60 * 5,
    )

    response.set_cookie(
        key="refresh_token",
        value=new_refresh_token,
        httponly=True,
        secure=None, # Pour passage en PROD: True
        samesite="Lax", # Pour passe en PROD: None
        max_age=60 * 60 * 24 * 7,
    )

    return response

@api_view(["GET"])
def TestView(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    });
    

class CustomUserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
