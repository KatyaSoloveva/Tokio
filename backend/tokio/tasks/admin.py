from django.contrib import admin
from django.utils.safestring import mark_safe
from django.utils.html import format_html
from django.contrib.auth.models import Group

from .models import Category, CollaborationRequest, Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('author', 'name', 'get_categories', 'status')
    search_fields = ('name', 'author__username')
    list_filter = ('author__username',)
    readonly_fields = ('pub_date', 'update_date', 'get_image', 'get_text')
    fields = ('author', 'name', 'collaborators', 'categories', 'get_text',
              'text', 'status', 'image', 'get_image', 'pub_date',
              'update_date')
    filter_horizontal = ('collaborators', 'categories')

    @admin.display(description='Миниатюра заставки')
    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="80" height="60">')

    @admin.display(description="Текст заметки")
    def get_text(self, obj):
        return format_html(obj.text)

    @admin.display(description='Категории')
    def get_categories(self, obj):
        if obj.categories.exists():
            return ', '.join([val.name for val in obj.categories.all()][:5])
        else:
            return "Категория отсутствует"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'author', 'is_system')
    search_fields = ('name', 'author')


@admin.register(CollaborationRequest)
class CollaborationRequestAdmin(admin.ModelAdmin):
    list_display = ('task', 'sender', 'receiver', 'status')


admin.site.unregister(Group)
