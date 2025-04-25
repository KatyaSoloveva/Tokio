import csv

from django.core.management.base import BaseCommand
from django.conf import settings

from tasks.models import Category


class Command(BaseCommand):
    def handle(self, *args, **options):
        file_path = settings.BASE_DIR/'data/categories.csv'
        print(file_path)
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                reader = csv.reader(f)
                categories = [
                    Category(name=name, slug=slug) for name, slug in reader
                ]
                Category.objects.bulk_create(categories, ignore_conflicts=True)
            self.stdout.write(
                self.style.SUCCESS('Категории успешно добавлены')
            )
        except FileNotFoundError:
            self.stdout.write(
                self.style.ERROR('Ошибка при добавлени категорий')
            )
