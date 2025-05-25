from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.admin import UserAdmin
from django.utils.safestring import mark_safe

from .models import FriendShipRequest


User = get_user_model()


@admin.register(User)
class UserAdmin(UserAdmin):
    list_display = ('username', 'first_name', 'last_name', 'email')
    filter_horizontal = ('friends',) + UserAdmin.filter_horizontal
    fieldsets = UserAdmin.fieldsets + (
        (None, {
            'fields': ('friends', 'birthday', 'avatar', 'get_avatar'),
        }),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email',
                       'password1', 'password2', 'avatar', 'birthday'),
        }),
    )
    readonly_fields = ('get_avatar',)

    @admin.display(description='Миниатюра аватара')
    def get_avatar(self, obj):
        return mark_safe(f'<img src={obj.avatar.url} width="80" height="60">')


@admin.register(FriendShipRequest)
class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'status')
