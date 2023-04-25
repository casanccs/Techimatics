from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('checkStatus/', CheckStatus),
    path('groups/', GroupList.as_view()),
    path('group/', CreateGroup),
    path('group/<str:id>', GroupDetail.as_view()),
    path('register/', ProfileRegister.as_view()),
    path('login/', ProfileLogin.as_view()),
    path('logout/', ProfileLogout.as_view()),
    path('profile/', ProfileView.as_view()),
    path('request/<str:id>', GroupRequest.as_view()),
]
