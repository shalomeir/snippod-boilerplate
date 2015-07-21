#!/usr/bin/env python

# from temps.excute_celery_task import *
# imp.reload(sys.modules['temps.excute_celery_task'])

import os
import sys
import imp
import importlib

os.chdir("/Users/shalomeir/IdeaProjects/Snippod/snippod-boilerplate/temps/")
sys.path.insert(0, os.getcwd())

# BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(__file__)))
# APPS_ROOT = os.path.join(BASE_DIR, 'djangoapps')
# sys.path.insert(0, APPS_ROOT)
#
# TEMPS = os.path.join(BASE_DIR, 'temps')
# sys.path.insert(0, TEMPS)

# from authentication.models import *
# from authentication.serializers import *
# from posts.models import *
# from posts.serializers import *


# test1_loader = importlib.find_loader('temps.test1')
# if test1_loader is not None:
#     imp.reload(sys.modules['temps.test1'])
#
# from temps.test1 import *


from tasks import add, count_click


