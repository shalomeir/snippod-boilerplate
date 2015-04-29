# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('posts', '0005_comment_updated_at'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='commentupvote',
            unique_together=set([('comment', 'voter')]),
        ),
        migrations.AlterUniqueTogether(
            name='postupvote',
            unique_together=set([('post', 'voter')]),
        ),
    ]
