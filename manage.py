#!/usr/bin/env python
import os
import sys

if __name__ == "__main__":
    try:
        param1 = os.environ['PARAM1']
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "snippod_boilerplate.settings.prod")
    except KeyError :
        os.environ.setdefault("DJANGO_SETTINGS_MODULE", "snippod_boilerplate.settings.dev")

    from django.core.management import execute_from_command_line

    execute_from_command_line(sys.argv)
