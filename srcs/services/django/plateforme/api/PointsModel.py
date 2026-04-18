from django.contrib.gis.db import models
from django.conf import settings


class Point(models.Model):
    class PointCategory(models.TextChoices):
        RESTAURANT = "restaurant", "Restaurant"
        HOTEL = "hotel", "Hôtel"
    class PointType(models.TextChoices):
        PLACE = "place", "Lieu"
        EVENT = "event", "Événement"
    address = models.CharField(null= False, max_length=255)

    type = models.CharField(null= False, max_length=20, choices=PointType.choices)
    category = models.CharField(null = True, max_length=20, choices=PointCategory.choices)

    location = models.PointField(null=True, geography=True, spatial_index=True) 

    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="points"
    )

    class Meta:
        indexes = [
            models.Index(fields=["type"]),
        ]
    def __str__(self):
        return f"{self.name} ({self.type})"