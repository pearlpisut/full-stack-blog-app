from django.contrib import admin
from django.urls import path, include
# from .views import CourseReviewList, CourseReviewDetails, Home
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, Home


router = DefaultRouter()
router.register('course-reviews', CourseViewSet, basename='course-reviews')


urlpatterns = [
    path('api/', include(router.urls)),
    path('', Home)
    # path('course-reviews', CourseReviewList.as_view()),
    # path('course-reviews/<int:id>', CourseReviewDetails.as_view()),
    # path('', Home)
]
