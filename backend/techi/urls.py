from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('checkStatus/', CheckStatus),
    path('groups/', GroupList),
    path('group/', CreateGroup),
    path('group/<str:id>', GroupDetail),
]
