from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('checkStatus/', CheckStatus),
    path('groups/', GroupList.as_view()),
    path('group/', CreateGroup),
    path('group/<str:id>/charge', ChargeGroup.as_view()),
    path('group/<str:id>', GroupDetail.as_view()),
    path('register/', ProfileRegister.as_view(), name="register"),
    path('login/', ProfileLogin.as_view()),
    path('logout/', ProfileLogout.as_view()),
    path('profile/', ProfileView.as_view()),
    path('request/<str:id>', GroupRequest.as_view()),
    path('requestStatus/<str:name>/<str:gid>', RequestStatus.as_view()),
    path('deleteAttendee/<str:name>/<str:gid>', DeleteAttendee.as_view()),
    path('makeMessage/', CreateMessage.as_view()),
    path('messages/<str:gid>', GetMessages.as_view()),
    path('deleteMessages/', DeleteMessages.as_view()),
    path('charge/', Charge.as_view()),
    path('chargeHook/', ChargeHook),
]
