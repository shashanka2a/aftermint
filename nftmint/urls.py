# nftmint/urls.py

from django.urls import path
from . import views

urlpatterns = [
    path('', views.landing, name='nftmint_landing'),
    path('create/', views.create, name='nftmint_create'),
    path('mint/', views.mint, name='nftmint_mint'),
]
