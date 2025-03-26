from django.db import models
from django.conf import settings

class UserInfo(models.Model):
    GOLD = 'gold'
    SILVER = 'silver'
    
    RECEIPT_TYPES = [
        (GOLD, 'Gold'),
        (SILVER, 'Silver'),
    ]
    account_head   = models.CharField(max_length=100)
    account_number = models.CharField(max_length=50)
    receipt_number = models.CharField(max_length=50)
    name           = models.CharField(max_length=200)
    address1       = models.CharField(max_length=255)
    address2       = models.CharField(max_length=255, blank=True, null=True)
    taluka         = models.CharField(max_length=100)
    district       = models.CharField(max_length=100)
    pin_code       = models.CharField(max_length=10)
    state          = models.CharField(max_length=100)
    mobile         = models.CharField(max_length=15)
    gross_weight   = models.DecimalField(max_digits=10, decimal_places=2)
    net_weight     = models.DecimalField(max_digits=10, decimal_places=2)
    goods          = models.CharField(max_length=100)
    gotra          = models.CharField(max_length=100)
    image1         = models.ImageField(upload_to='user_images/')
    image2         = models.ImageField(upload_to='user_images/')
    created_at     = models.DateTimeField(auto_now_add=True)
    updated_at     = models.DateTimeField(auto_now=True)
    receipt_type   = models.CharField(max_length=10, choices=RECEIPT_TYPES, default=GOLD)
    filled_by      = models.ForeignKey(
                        settings.AUTH_USER_MODEL,
                        on_delete=models.SET_NULL,
                        null=True,
                        blank=True,
                        related_name='user_infos'
                     )
    def __str__(self):
        return f"{self.name} - {self.account_number}"
