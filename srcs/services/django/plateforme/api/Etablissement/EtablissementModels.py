from django.contrib.gis.db import models
from django.conf import settings



class Establishment(models.Model):
    CATEGORY_CHOICES = [
        ("restaurant", "Restaurant"),
        ("bar", "Bar"),
        ("hotel", "Hotel"),
        ("shop", "Shop"),
        ("other", "Other"),
    ]

    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="establishments"
    )

    name = models.CharField(max_length=255, null=False)
    description = models.TextField(blank=True, null=True)

    address = models.CharField(max_length=255, null=False)

    location = models.PointField(null=True, geography=True, spatial_index=True) 

    category = models.CharField(
        max_length=50,
        choices=CATEGORY_CHOICES,
        default="other"
    )

    phone = models.CharField(max_length=30, blank=True, null=True)
    website = models.URLField(blank=True, null=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name