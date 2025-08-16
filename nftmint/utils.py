# mintari/utils.py

from PIL import Image, ImageEnhance
import os
from django.conf import settings

def generate_ghibli_style(image_path):
    # Open original image
    img = Image.open(image_path)

    # Simple mock transformation: apply color enhancement and blur
    enhancer = ImageEnhance.Color(img)
    stylized = enhancer.enhance(1.8)

    # Save transformed image
    base = os.path.basename(image_path)
    output_path = os.path.join(settings.MEDIA_ROOT, 'uploads/stylized', f"ghibli_{base}")
    stylized.save(output_path)

    return f"/media/uploads/stylized/ghibli_{base}"


def upload_to_ipfs(file_path):
    """
    Uploads the Ghibli-style image to IPFS using Walrus API.
    """
    WALRUS_API_KEY = os.getenv("WALRUS_API_KEY")
    if not WALRUS_API_KEY:
        raise EnvironmentError("Missing WALRUS_API_KEY in environment")

    url = "https://api.walrus.ai/api/v0/upload"
    headers = {
        "Authorization": f"Bearer {WALRUS_API_KEY}",
    }

    with open(file_path, 'rb') as f:
        files = {'file': (os.path.basename(file_path), f)}
        response = requests.post(url, headers=headers, files=files)

    if response.status_code == 200:
        data = response.json()
        return data.get("url")  # Example: ipfs://... or https://gateway...
    else:
        raise Exception(f"Walrus IPFS upload failed: {response.status_code} → {response.text}")
