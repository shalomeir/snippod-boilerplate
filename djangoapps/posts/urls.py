from django.conf.urls import include, patterns, url
from rest_framework_nested import routers

from posts.views import PostViewSet


router = routers.SimpleRouter()
router.register(r'posts', PostViewSet)


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
)