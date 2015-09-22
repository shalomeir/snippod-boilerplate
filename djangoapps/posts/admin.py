from __future__ import unicode_literals
from django.contrib import admin
from django.utils.translation import ugettext, ugettext_lazy as _

from posts.models import Post, Comment, PostUpvote, CommentUpvote


# Register your models here.
class PostAdmin(admin.ModelAdmin):

    # The fields to be used in displaying the Post model.
    list_display = ('title', 'link', 'author', 'created_at', 'updated_at')
    search_fields = ('link', 'title')

    # fieldsets = (
    #     (None, {'fields': ('title', 'link')}),
    #     (_('Writer'), {'fields': ('author')}),
    # )
    ordering = ('-created_at',)


# Now register the new Admin...
admin.site.register(Post, PostAdmin)
admin.site.register(Comment)
admin.site.register(PostUpvote)
admin.site.register(CommentUpvote)
