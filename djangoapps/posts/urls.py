from django.conf.urls import include, patterns, url

from django.conf import settings


from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView
from postsold.views import AccountPostsViewSet, PostViewSet
from snippod_boilerplate.views import IndexView

router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)
router.register(r'postsold', PostViewSet)

accounts_router = routers.NestedSimpleRouter(
    router, r'accounts', lookup='account'
)
accounts_router.register(r'postsold', AccountPostsViewSet)

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),
)