# Generated by Django 5.0.3 on 2024-04-19 21:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('amigo', '0006_alter_cliente_dinero'),
    ]

    operations = [
        migrations.AddField(
            model_name='cliente',
            name='codigoVerificaion',
            field=models.CharField(blank=True, max_length=5, null=True),
        ),
    ]
