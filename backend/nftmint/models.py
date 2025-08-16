from django.db import models

# Create your models here.
from django.db import models

class NFTImage(models.Model):
    original_image = models.ImageField(upload_to='uploads/originals/')
    transformed_image = models.ImageField(upload_to='uploads/stylized/', blank=True, null=True)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"NFTImage {self.id}"
