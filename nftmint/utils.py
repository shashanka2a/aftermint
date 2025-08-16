# nftmint/utils.py

from PIL import Image, ImageEnhance
import os
from django.conf import settings

import replicate
import requests
from uuid import uuid4

def generate_ghibli_style(image_path):
    # Upload image to public temporary host (we'll use file.io for simplicity)
    with open(image_path, 'rb') as f:
        response = requests.post("https://file.io", files={"file": f})
    image_url = response.json()['link']

    # Call Replicate model
    replicate_client = replicate.Client(api_token=settings.REPLICATE_API_TOKEN)

    output_url = replicate_client.run(
        "fofr/ghibli-diffusion:be046ffc734c29c7f1e032b6d206a0ff3e62aaf832bb84521c27414696a0bbaa",
        input={"image": image_url}
    )

    # Download result and save locally
    result_img = requests.get(output_url)
    filename = f"ghibli_{uuid4().hex}.png"
    output_path = os.path.join('uploads/stylized', filename)
    full_output_path = os.path.join(settings.MEDIA_ROOT, output_path)

    with open(full_output_path, 'wb') as f:
        f.write(result_img.content)

    return f"/media/{output_path}"



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
