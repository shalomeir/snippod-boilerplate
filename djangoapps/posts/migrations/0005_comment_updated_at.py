# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0004_auto_20150424_0733'),
    ]

    operations = [
        migrations.AddField(
            model_name='comment',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2015, 4, 24, 9, 40, 0, 733664, tzinfo=utc), auto_now=True),
            preserve_default=False,
        ),
    ]
