from django.shortcuts import render, HttpResponse, get_object_or_404
from .models import Review
from .serializers import ReviewSerializer
from django.http import JsonResponse
from rest_framework.parsers import JSONParser

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from rest_framework import generics, mixins, viewsets
from rest_framework.permissions  import IsAuthenticated 
from rest_framework.authentication import TokenAuthentication

# Create your views here.
def Home(request):
    return HttpResponse("This is Home Page")

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = [IsAuthenticated]

'''
class CourseReviewList(generics.GenericAPIView, mixins.ListModelMixin
                       , mixins.CreateModelMixin):
    #list -> for view, create -> for post
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
        # reviews = Review.objects.all()
        # serializer = ReviewSerializer(reviews, many=True)
        # for x in range(0, 2):
        #     print("\n\n*\n" + serializer.data[x]["code"] + "\n\n*\n")
    def get(self, request):
        return self.list(request)
    
    def post(self, request):
        return self.create(request)

class CourseReviewDetails(generics.GenericAPIView, mixins.DestroyModelMixin,
                          mixins.RetrieveModelMixin, mixins.UpdateModelMixin):
    
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer
    lookup_field = 'id'
    def get(self, request, id):
        return self.retrieve(request, id = id)
    
    def put(self, request, id):
        return self.update(request, id = id)
    
    def delete(self, request, id):
        return self.destroy(request, id = id)
 

when we were using function-based
    try:
        review = Review.objects.get(code__iexact = cccode)
    except Review.DoesNotExist:
        return Response(status=407)
    
    if request.method == 'GET':
        serializer = ReviewSerializer(review)
        return Response(serializer.data)
    
    elif request.method == 'PUT':
        serializer = ReviewSerializer(review, data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        else: return Response(serializer.data, status = status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        review.delete()
        # deletemsg = "the blog is deleted"
        return Response(status=status.HTTP_204_NO_CONTENT)
'''