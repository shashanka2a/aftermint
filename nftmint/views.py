from django.shortcuts import render, redirect
from django.core.files.storage import FileSystemStorage

def landing(request):
    return render(request, 'nftmint/landing.html')

def create(request):
    if request.method == 'POST' and request.FILES.get('image'):
        image = request.FILES['image']
        fs = FileSystemStorage()
        filename = fs.save(image.name, image)
        uploaded_file_url = fs.url(filename)
        return render(request, 'nftmint/preview.html', {'image_url': uploaded_file_url})
    return render(request, 'nftmint/create.html')

def mint(request):
    return render(request, 'nftmint/mint.html')
