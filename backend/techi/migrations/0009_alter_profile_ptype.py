# Generated by Django 4.2.1 on 2023-05-19 03:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('techi', '0008_alter_profile_tickets'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='pType',
            field=models.CharField(default='Customer', max_length=30),
        ),
    ]
