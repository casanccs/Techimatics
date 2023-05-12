from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    pType = models.CharField(max_length=30) #Will be either "Customer" or "Staff"
    tickets = models.DecimalField(default=0, decimal_places=2, max_digits=100)
    #pPic
    def __str__(self):
        return self.user.username


class Group(models.Model):
    owner = models.ForeignKey(Profile, on_delete=models.CASCADE)
    day = models.CharField(max_length=30) #Will be a day of the week e.g.: "Wednesday", "Saturday"
    startTime = models.TimeField()
    endTime = models.TimeField()
    level = models.CharField(max_length=50) #Will be something like (Python: Level 1)
    num = models.IntegerField(default=0)

    def __str__(self):
        return f'{self.id}'

class Attendee(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    dateJoined = models.DateField(auto_now_add=True)

class Request(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    status = models.CharField(max_length=50, default="Pending")

class Message(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    msg = models.CharField(max_length=300, default="")
    timeCreated = models.DateTimeField(auto_now_add=True)