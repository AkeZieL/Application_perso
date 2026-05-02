from django.contrib.gis.db import models
from django.conf import settings


class Event(models.Model):
    created_by = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="events"
    )

    title = models.CharField(null= False, max_length=255)
    description = models.TextField()

    location = models.PointField(null=True, geography=True, spatial_index=True) 
    etablissement = models.ForeignKey(
        "api.Establishment",
        on_delete=models.CASCADE,
        related_name="events",
        null=True,
        blank=True,
    )

    type = models.CharField(max_length=20, default="event")
    start_date = models.DateTimeField(blank=True, null=True)
    end_date = models.DateTimeField(blank=True, null=True)

    start_time = models.TimeField(null=True, blank=True)
    end_time = models.TimeField(null=True, blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    is_active = models.BooleanField(default=True)
    def __str__(self):
        return self.title