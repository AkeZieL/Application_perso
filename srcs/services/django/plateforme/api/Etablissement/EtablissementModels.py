from django.contrib.gis.db import models
from django.conf import settings



class Establishment(models.Model):
    CATEGORY_CHOICES = [
        ("Restaurant", "Restaurant"),
        ("Bar", "Bar"),
        ("Hotel", "Hotel"),
        ("Shop", "Shop"),
        ("Other", "Other"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="establishments"
    )

    name = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)

    type = models.CharField(max_length=20, default="place")
    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="other"
    )

    location = models.PointField(null=True, geography=True, spatial_index=True) 
    phone = models.CharField(max_length=30, blank=True, null=True)
    website = models.URLField(blank=True, null=True)


    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name