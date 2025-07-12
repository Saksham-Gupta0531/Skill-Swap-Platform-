from rest_framework import serializers
from .models import SkillProfile, SkillReview

class SkillProfileSerializer(serializers.ModelSerializer):
    average_rating = serializers.SerializerMethodField()

    class Meta:
        model = SkillProfile
        fields = '__all__'
        read_only_fields = ['user', 'name', 'total_rating', 'rating_count']

    def get_average_rating(self, obj):
        return obj.average_rating()

class SkillReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = SkillReview
        fields = ['id', 'profile', 'reviewer', 'rating', 'feedback', 'created_at']
        read_only_fields = ['reviewer']
