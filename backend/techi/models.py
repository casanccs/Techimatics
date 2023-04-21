from django.db import models
# Create your models here.


class Profile(models.Model):
    user = models.OneToOneField('auth.User', on_delete=models.CASCADE)
    pType = models.CharField(max_length=30) #Will be either "Customer" or "Staff"
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
        return f'{self.owner.user.username}: {self.day}'

class Attendee(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    dateJoined = models.DateField(auto_now_add=True)

