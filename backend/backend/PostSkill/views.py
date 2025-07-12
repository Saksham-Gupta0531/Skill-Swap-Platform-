from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView
from django.shortcuts import get_object_or_404
import cloudinary.uploader

from .models import SkillProfile, SkillReview
from .serializers import SkillProfileSerializer, SkillReviewSerializer

class PostSkillProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        data = request.data.copy()
        data['user'] = user.id
        data['name'] = user.full_name

        # Upload to Cloudinary
        if 'profile_photo' in request.FILES:
            uploaded = cloudinary.uploader.upload(request.FILES['profile_photo'])
            data['profile_photo'] = uploaded['secure_url']
        else:
            return Response({"error": "Profile photo is required."}, status=400)

        serializer = SkillProfileSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

class SubmitReviewView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        serializer = SkillReviewSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.validated_data['profile']
            if profile.user == user:
                return Response({"error": "You cannot review your own profile."}, status=403)

            review = serializer.save(reviewer=user)
            profile.total_rating += review.rating
            profile.rating_count += 1
            profile.save(update_fields=['total_rating', 'rating_count'])

            return Response(SkillReviewSerializer(review).data, status=201)

        return Response(serializer.errors, status=400)

class SkillReviewListView(ListAPIView):
    serializer_class = SkillReviewSerializer

    def get_queryset(self):
        profile_id = self.kwargs['profile_id']
        return SkillReview.objects.filter(profile_id=profile_id)
