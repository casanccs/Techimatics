# Generated by Django 4.1.7 on 2023-04-25 23:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('techi', '0003_request'),
    ]

    operations = [
        migrations.AddField(
            model_name='request',
            name='status',
            field=models.CharField(default='Pending', max_length=50),
        ),
    ]
