from django.conf.urls import include, patterns, url
from rest_framework_nested import routers

from posts.views import PostViewSet, UserPostViewSet, CommentViewSet, \
                        PostCommentViewSet, UserCommentViewSet


router = routers.SimpleRouter()
router.register(r'posts', PostViewSet, base_name='post')
router.register(r'user/(?P<userid>[0-9]+)/posts', UserPostViewSet,
                                                base_name='user-post-list')
router.register(r'user/(?P<userid>[0-9]+)/comments', UserCommentViewSet,
                                                base_name='user-comment-list')
router.register(r'post/(?P<postid>[0-9]+)/comments', PostCommentViewSet,
                                                base_name='post-comment-list')
router.register(r'comments', CommentViewSet, base_name='comment')


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)