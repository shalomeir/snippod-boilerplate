from django.conf.urls import include, patterns, url
from django.contrib import admin

# from rest_framework.routers import DefaultRouter

# from snippod_boilerplate.views import api_root

# from rest_framework_nested import routers
#
# from authentication.views import AccountViewSet, LoginView, LogoutView
# from postsold.views import AccountPostsViewSet, PostViewSet
# from snippod_boilerplate.views import IndexView
#
# router = routers.SimpleRouter()
# router.register(r'accounts', AccountViewSet)
# router.register(r'postsold', PostViewSet)
#
# accounts_router = routers.NestedSimpleRouter(
#     router, r'accounts', lookup='authentication'
# )
# accounts_router.register(r'postsold', AccountPostsViewSet)

# router = DefaultRouter()

urlpatterns = patterns(
    '',
    url(r'', include('main.urls')),
    # url(r'^api/v1/', api_root),
    # url(r'^api/v1/', include(router.urls)),
    url(r'^api/v1/', include('authentication.urls')),
    url(r'^api/v1/', include('posts.urls')),


    # url(r'^api/v1/', include(router.urls)),
    # url(r'^api/v1/', include(accounts_router.urls)),
    # url(r'^api/v1/auth/login/$', LoginView.as_view(), name='login'),
    # url(r'^api/v1/auth/logout/$', LogoutView.as_view(), name='logout'),

    # url(r'^', include('myapp.urls')),

    url(r'^admin/', include(admin.site.urls)),
    # url(r'^.*$', IndexView.as_view(), name='index'),
)

urlpatterns += [
    url(r'^api-auth/', include('rest_framework.urls',
                               namespace='rest_framework'))
]

# Redirect to webapp URL
# TODO Server-side rendering
urlpatterns += [
    url(r'^.*$', include('main.urls')),
]
