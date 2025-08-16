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
