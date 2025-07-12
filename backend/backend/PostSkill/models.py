from django.db import models
from django.conf import settings

class SkillProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='skill_profile')
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    profile_photo = models.URLField()  # Cloudinary image URL
    skills_offered = models.JSONField()
    skills_wanted = models.JSONField()
    availability = models.CharField(max_length=255)
    profile_status = models.CharField(max_length=10, choices=[('public', 'Public'), ('private', 'Private')], default='public')
    total_rating = models.DecimalField(default=0.0, max_digits=3, decimal_places=2)
    rating_count = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    def average_rating(self):
        return round(self.total_rating / self.rating_count, 2) if self.rating_count > 0 else None

    def __str__(self):
        return f"{self.name}'s Skill Profile"

class SkillReview(models.Model):
    profile = models.ForeignKey(SkillProfile, on_delete=models.CASCADE, related_name='reviews')
    reviewer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    feedback = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ['profile', 'reviewer']  # one review per user per profile

    def __str__(self):
        return f"{self.reviewer.email} review for {self.profile.name}"
