from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage

from django.shortcuts import render, redirect
from django.conf import settings
from .models import NFTImage
from .utils import generate_ghibli_style

def landing(request):
    return render(request, 'nftmint/landing.html')

def create(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']

        # Save original image
        nft_image = NFTImage.objects.create(original_image=uploaded_image)

        # Generate Ghibli-style image (mocked)
        transformed_path = generate_ghibli_style(nft_image.original_image.path)

        # Update path for transformed image relative to MEDIA root
        relative_path = transformed_path.replace(settings.MEDIA_ROOT + '/', '')
        nft_image.transformed_image.name = relative_path
        nft_image.save()

        return render(request, 'nftmint/preview.html', {
            'image_url': nft_image.transformed_image.url,
            'nft_id': nft_image.id
        })

    return render(request, 'nftmint/create.html')

def mint(request):
    return render(request, 'nftmint/mint.html')
