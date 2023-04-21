from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class GroupSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(many=False)

    class Meta:
        model = Group
        fields = '__all__'

class ProfileRegistrationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False)
    class Meta:
        model = Profile
        fields = ['pType', 'user']
    def create(self, clean_data):
        user = User.objects.create_user(username=clean_data['user'], password=clean_data['password'])
        user.save()
        user_obj = Profile.objects.create(user=user, pType=clean_data['pType'])
        user_obj.save()
        return user_obj
    
class ProfileLoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=100)
    password = serializers.CharField(max_length=500)
    def check_user(self, clean_data):
        user = authenticate(username=clean_data['username'], password=clean_data['password'])
        if not user:
            raise ValidationError('user not found')
        return user
    
class ProfileSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(many=False) #Make sure this returns user.username, which by default it does

    class Meta:
        model = Profile
        fields = '__all__'