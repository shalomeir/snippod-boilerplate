import os

from django.core.management.base import BaseCommand
from authentication.models import Account

class Command(BaseCommand):

    def handle(self, *args, **options):
        if not Account.objects.filter(email="admin@admin.com").exists():
            Account.objects.create_superuser("admin@admin.com", "admin", "admin")

