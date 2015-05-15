# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='account',
            name='is_authenticated',
            field=models.BooleanField(default=True, verbose_name='authenticated', help_text='Designates whether this user be authenticated.'),
            preserve_default=True,
        ),
    ]
