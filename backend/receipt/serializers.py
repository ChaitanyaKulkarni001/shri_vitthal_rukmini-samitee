from rest_framework import serializers
from .models import UserInfo

class UserInfoSerializer(serializers.ModelSerializer):
    # Optionally, include the admin's username in the response.
    filled_by_username = serializers.CharField(source='filled_by.username', read_only=True)
    
    class Meta:
        model = UserInfo
        fields = [
            'id',
            'account_head',
            'account_number',
            'receipt_number',
            'name',
            'address1',
            'address2',
            'taluka',
            'district',
            'pin_code',
            'state',
            'mobile',
            'gross_weight',
            'net_weight',
            'goods',
            'gotra',
            'image1',
            'image2',
            'filled_by',
            'filled_by_username',
            'created_at',
            'updated_at',
            'receipt_type',
        ]
        read_only_fields = ['created_at', 'updated_at', 'filled_by_username']
