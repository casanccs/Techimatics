from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Group)
admin.site.register(Profile)
admin.site.register(Request)
admin.site.register(Attendee)
admin.site.register(Message)