from django.conf.urls import include, patterns, url
from django.contrib import admin
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
    url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include(accounts_router.urls)),
    url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    url(r'^', include('myapp.urls')),

    url(r'^admin/', include(admin.site.urls)),
    url(r'^.*$', IndexView.as_view(), name='index'),
)

if settings.DEBUG:
    urlpatterns += patterns('django.contrib.staticfiles.views',
                            url(r'^static/(?P<path>.*)$', 'serve'),
                            )