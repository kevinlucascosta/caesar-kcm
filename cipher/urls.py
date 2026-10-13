from django.urls import path
from . import views

urlpatterns = [
    path("", views.home, name="home"),
    path("criptografar/", views.encrypt, name="encrypt"),
    path("descriptografar/", views.decrypt, name="decrypt"),
    path("desenvolvedores/", views.developers, name="developers"),
    path("api/cifra-cesar/", views.caesar_api, name="caesar_api"),
]
