from django.contrib import admin
from .models import CustomUser
from .Point.PointsModel import Point
from .Etablissement.EtablissementModels import Establishment

admin.site.register(CustomUser)
admin.site.register(Point)
admin.site.register(Establishment)