from django.contrib import admin
from django.utils.safestring import mark_safe
from django.contrib.auth.models import Group

from .models import Task


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('author', 'name', 'pub_date')
    search_fields = ('name', 'author__username')
    list_filter = ('author__username',)
    readonly_fields = ('pub_date', 'update_date', 'get_image')
    fields = ('author', 'name', 'user', 'text', 'image',
              'get_image', 'pub_date', 'update_date')

    @admin.display(description='Миниатюра заставки')
    def get_image(self, obj):
        return mark_safe(f'<img src={obj.image.url} width="80" height="60">')


admin.site.unregister(Group)
