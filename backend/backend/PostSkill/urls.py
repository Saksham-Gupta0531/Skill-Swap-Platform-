from django.urls import path
from .views import PostSkillProfileView, SubmitReviewView, SkillReviewListView

urlpatterns = [
    path('post-skill/', PostSkillProfileView.as_view(), name='post-skill'),
    path('submit-review/', SubmitReviewView.as_view(), name='submit-review'),
    path('profile/<int:profile_id>/reviews/', SkillReviewListView.as_view(), name='skill-reviews'),
]
