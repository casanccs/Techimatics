from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse, HttpResponse
from rest_framework.parsers import JSONParser
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import *
from .serializers import *
from datetime import datetime
from rest_framework.decorators import api_view
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework import permissions, status


# Create your views here.

@api_view(['GET'])
def CheckStatus(request):
    if request.method == "GET":
        return JsonResponse({'loggedIn': request.user.is_authenticated})
 

class GroupList(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [SessionAuthentication,]

    def get(self,request):
        groups = Group.objects.all()
        serializer = GroupSerializer(groups, many=True)
        if request.user.is_authenticated:
            profile = Profile.objects.get(user=request.user)
            if profile.pType == "Customer":
                reqs = Request.objects.filter(profile=profile)
                serialiazer2 = RequestSerializer(reqs, many=True)
                return Response({'groups': serializer.data, 'requests': serialiazer2.data}, status=status.HTTP_200_OK)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
#@api_view(['GET','POST']) #This causes an error
@csrf_exempt
def CreateGroup(request):
    if request.method == "POST":
        data = JSONParser().parse(request)

        #Note! We need to add "owner" and verify "startTime" and "endTime", something like:
        profile = Profile.objects.get(user=request.user)
        data['owner'] = profile
        data['startTime'] = datetime.strptime(data['startTime'], '%H:%M:%S').time()
        data['endTime'] = datetime.strptime(data['endTime'], '%H:%M:%S').time()
        print(data)
        
        group = Group.objects.create(owner=data['owner'], startTime=data['startTime'], endTime=data['endTime'],
                                     level=data['level'], day=data['day'])
        serializer = GroupSerializer(group, many=False)
        return HttpResponse(status=201)
    
class GroupDetail(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        group = Group.objects.get(id=id)
        serializer = GroupSerializer(group, many=False)
        return JsonResponse(serializer.data, safe=False)
    
    def delete(self, request, id):
        group = Group.objects.get(id=id)
        group.delete()
        return HttpResponse(status=201)

    
class ProfileRegister(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        clean_data = request.data
        serializer = ProfileRegistrationSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            profile = serializer.create(clean_data)
            if profile:
                serializer.data['user'] = profile.user.username
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class ProfileLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)

    def post(self, request):
        data = request.data
        #validate the username and password
        serializer = ProfileLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)

            return Response(serializer.data, status=status.HTTP_200_OK)
        
class ProfileLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = [SessionAuthentication,]
    def post(self,request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class ProfileView(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        serializer = ProfileSerializer(profile)
        print({'profile': serializer.data})
        return Response({'profile': serializer.data}, status=status.HTTP_200_OK)

#Need to ensure only "Customers" can use this view
class GroupRequest(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        profile = Profile.objects.get(user=request.user)
        if (profile.pType != "Customer"):
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        group = Group.objects.get(id=id)
        req = Request(profile=profile, group=group)
        req.save()
        return Response(status=status.HTTP_201_CREATED)