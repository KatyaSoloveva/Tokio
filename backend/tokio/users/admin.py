from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin

from .models import Follow

User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email')
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email',
                       'password1', 'password2'),
        }),
    )


admin.site.register(Follow)
