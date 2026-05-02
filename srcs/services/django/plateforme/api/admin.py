from django.contrib import admin
from .models import CustomUser
from .Event.EventModel import Event
from .Etablissement.EtablissementModels import Establishment

admin.site.register(CustomUser)
admin.site.register(Event)
admin.site.register(Establishment)