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
from django.conf import settings
from django.contrib.sessions.models import Session
import stripe
import decimal


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
        profile = Profile.objects.get(user=request.user)
        group = Group.objects.get(id=id)
        serializer = GroupSerializer(group, many=False)
        requests = Request.objects.filter(group=group)
        serializer2 = RequestSerializer2(requests, many=True)
        attendees = Attendee.objects.filter(group=group)
        serializer3 = AttendeeSerializer(attendees, many=True)
        if profile.pType == "Staff":
            return Response({'group': serializer.data, 'requests': serializer2.data, 'attendees': serializer3.data})
        return JsonResponse({'group': serializer.data, 'attendees': serializer3.data}, safe=False)
    
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
        req = Request.objects.filter(profile=profile, group=group)
        if req: #Delete request
            req.delete()
            return Response(status=status.HTTP_200_OK)
        else: #Create request
            req = Request(profile=profile, group=group)
            req.save()
            return Response(status=status.HTTP_201_CREATED)
        
class RequestStatus(APIView): #Staff only in group
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, name, gid): 
        #name is the name of the person who are trying to accept/reject
        #gid is the group we are getting
        profile = Profile.objects.get(user__username=name)
        group = Group.objects.get(id=gid)
        req = Request.objects.filter(profile=profile).get(group=group)
        clean_data = request.data
        req.status = clean_data['status']
        req.save()
        if req.status == "Accepted":
            attendee = Attendee(profile=profile, group=group)
            attendee.save()
            group.num += 1
            group.save()

        return Response(status=status.HTTP_201_CREATED)

class DeleteAttendee(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, name, gid):
        profile = Profile.objects.get(user__username=name)
        group = Group.objects.get(id=gid)
        attendee = Attendee.objects.get(profile=profile, group=group)
        req = Request.objects.filter(profile=profile).get(group=group)
        req.status = "Rejected"
        req.save()
        group.num -= 1
        group.save()
        attendee.delete()
        return Response(status=status.HTTP_200_OK)
    
class CreateMessage(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        clean_data = request.data
        profile = Profile.objects.get(user__username=clean_data['username'])
        group = Group.objects.get(id=clean_data['gid'])
        message = Message(profile=profile, group=group, msg=clean_data['msg'])
        message.save()
        return Response(status=status.HTTP_201_CREATED)
    
class GetMessages(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, gid):
        messages = Message.objects.filter(group__id=gid).order_by('-timeCreated')
        serializer = MessageSerializer(messages, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class DeleteMessages(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        data = request.data
        group = Group.objects.get(id=data['gid'])
        messages = Message.objects.filter(group=group)
        messages.delete()
        return Response(status=status.HTTP_200_OK)
    
class ChargeGroup(APIView):
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, id):
        group = Group.objects.get(id=id)
        attendees = Attendee.objects.filter(group=group)
        for attendee in attendees:
            if attendees.count() == 5:
                attendee.profile.tickets -= 15
            if attendees.count() == 4:
                attendee.profile.tickets -= 18
            else:
                attendee.profile.tickets -= 20
            attendee.profile.save()
            print(attendee.profile.user.username, attendee.profile.tickets)
        return Response(status=status.HTTP_200_OK)


class Charge(APIView):
    stripe.api_key = settings.STRIPE_SECRET_KEY
    authentication_classes = [SessionAuthentication,]
    permission_classes = [permissions.IsAuthenticated]

    def post(self,request):
        profile = Profile.objects.get(user=request.user)
        clean_data = request.data
        session = stripe.checkout.Session.create(
            line_items=[{
                'price_data': {
                    'currency': 'usd',
                    'product_data': {
                        'name': f'${clean_data["amount"]} credit',
                    },
                    'unit_amount_decimal': int(clean_data["amount"])*100,
                },
                'quantity': 1,
            }],
            mode = 'payment',
            success_url="http://localhost:3000/account",
        )
        global user #This is funny and super jank. I need this so I can use user in ChargeHook
        user = request.user #ChargeHook's request doesn't have a user connected to it
        return Response({'url': session.url}, status=status.HTTP_200_OK)
    


@csrf_exempt
def ChargeHook(request):
    endpoint_secret = 'whsec_295b233c67cd037516740e5f29be6341689ae1507ba3c10219e70d83e16d42f6'
    payload = request.body
    sig_header = request.META['HTTP_STRIPE_SIGNATURE']
    event = None

    try: 
        event = stripe.Webhook.construct_event(
            payload, sig_header, endpoint_secret
        )
    except ValueError as e:
        return HttpResponse(status=400)

    except stripe.error.SignatureVerificationError as e:
        # Invalid signature
        return HttpResponse(status=400)
    
    if event['type'] == 'checkout.session.completed':
        # Retrieve the session. If you require line items in the response, you may include them by expanding line_items.
        session = stripe.checkout.Session.retrieve(
        event['data']['object']['id'],
        expand=['line_items'],
        )

        line_items = session.line_items
        # Fulfill the purchase...Issue here is that Stripe is making the request, so request.user is nobody
        profile = Profile.objects.get(user=user)
        print(session.amount_total) #NOTE: amount.total is an integer, where 15.00 is represented as 1500
        profile.tickets += session.amount_total*decimal.Decimal(0.01)

        profile.save()

    return HttpResponse(status=200)