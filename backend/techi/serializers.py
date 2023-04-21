from rest_framework import serializers
from .models import *
class GroupSerializer(serializers.ModelSerializer):
    owner = serializers.StringRelatedField(many=False)

    class Meta:
        model = Group
        fields = '__all__'