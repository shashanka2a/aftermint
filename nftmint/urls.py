# nftmint/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.mint_view, name='mint'),
]
