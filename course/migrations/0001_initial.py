# Generated by Django 3.2.2 on 2021-05-18 17:32

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('description', models.TextField(max_length=255)),
                ('price', models.IntegerField()),
                ('duration', models.IntegerField()),
                ('video_id', models.CharField(max_length=30)),
                ('created', models.DateTimeField(auto_now_add=True)),
                ('categories', models.ManyToManyField(to='course.Category')),
            ],
        ),
    ]
