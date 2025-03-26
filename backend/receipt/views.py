from rest_framework import viewsets
from .models import UserInfo
from .serializers import UserInfoSerializer

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('-created_at')
    serializer_class = UserInfoSerializer

    # Optionally override perform_create to associate the logged-in admin with the record.
    def perform_create(self, serializer):
        serializer.save(filled_by=self.request.user)
