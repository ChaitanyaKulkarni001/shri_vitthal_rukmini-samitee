from rest_framework import viewsets
from .models import UserInfo
from .serializers import UserInfoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('-created_at')
    serializer_class = UserInfoSerializer
    # Only allow authenticated create, read is open

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        # Only set filled_by if user is authenticated.
        if self.request.user.is_authenticated:
            serializer.save(filled_by=self.request.user)
        else:
            serializer.save()  # or raise an error if filled_by is required




class LoginView(APIView):
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "Login successful"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid credentials"}, status=status.HTTP_400_BAD_REQUEST)
