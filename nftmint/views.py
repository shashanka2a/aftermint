from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage

from .models import NFTImage
from .utils import generate_ghibli_style, upload_to_ipfs
from django.conf import settings
from django.shortcuts import render

def landing(request):
    return render(request, 'nftmint/landing.html')

def create(request):
    if request.method == 'POST' and request.FILES.get('image'):
        uploaded_image = request.FILES['image']
        nft_image = NFTImage.objects.create(original_image=uploaded_image)

        # Generate Ghibli-style (mocked)
        transformed_path = generate_ghibli_style(nft_image.original_image.path)

        # Save transformed image to model
        relative_path = transformed_path.replace(settings.MEDIA_ROOT + '/', '')
        nft_image.transformed_image.name = relative_path
        nft_image.save()

        # Upload to IPFS
        try:
            ipfs_uri = upload_to_ipfs(transformed_path)
        except Exception as e:
            ipfs_uri = "Upload failed"
            print(f"IPFS error: {e}")

        return render(request, 'nftmint/preview.html', {
            'image_url': nft_image.transformed_image.url,
            'ipfs_uri': ipfs_uri,
            'nft_id': nft_image.id
        })

    return render(request, 'nftmint/create.html')

