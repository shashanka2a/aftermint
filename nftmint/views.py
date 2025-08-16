# nftmint/views.py

from django.shortcuts import render

def mint_view(request):
    return render(request, 'nftmint.html')
