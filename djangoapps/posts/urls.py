from django.conf.urls import include, patterns, url
from rest_framework_nested import routers

from posts.views import PostViewSet, UserPostsViewSet, CommentViewSet


router = routers.SimpleRouter()
router.register(r'posts', PostViewSet, base_name='post')
router.register(r'user/(?P<userid>[0-9]+)/posts', UserPostsViewSet,
                                                base_name='user-post-list')
router.register(r'comments', CommentViewSet, base_name='comment')


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)