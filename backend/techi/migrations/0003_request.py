# Generated by Django 4.1.5 on 2023-04-24 23:38

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('techi', '0002_group_num'),
    ]

    operations = [
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='techi.group')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='techi.profile')),
            ],
        ),
    ]
