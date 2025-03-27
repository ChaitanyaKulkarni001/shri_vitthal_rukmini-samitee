from rest_framework import viewsets
from .models import UserInfo
from .serializers import UserInfoSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token


from rest_framework.permissions import IsAuthenticated

class UserInfoViewSet(viewsets.ModelViewSet):
    queryset = UserInfo.objects.all().order_by('-created_at')
    serializer_class = UserInfoSerializer
    permission_classes = [IsAuthenticated]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context.update({"request": self.request})
        return context

    def perform_create(self, serializer):
        serializer.save(filled_by=self.request.user)
        
    def perform_update(self, serializer):
        # Record the current user as the one who updated the receipt.
        serializer.save(updated_by=self.request.user)


from django.contrib.auth.models import User

class LoginView(APIView):
    def post(self, request):
        
        print("The request data is ", request.data)
        email = request.data.get("email")
        password = request.data.get("password")

        # Check if a user with this email exists
        try:
            user = User.objects.get(email=email)
            print(user)
        except User.DoesNotExist:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate using the username (Django default auth requires username)
        user = authenticate(username=user.username, password=password)

        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({"token": token.key, "message": "Login successful"}, status=status.HTTP_200_OK)

        return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
    
    
