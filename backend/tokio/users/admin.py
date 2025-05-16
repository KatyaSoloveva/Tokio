from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin


User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email')
    filter_horizontal = ('friends',) + UserAdmin.filter_horizontal
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            "fields": ('friends',),
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email',
                       'password1', 'password2'),
        }),
    )
