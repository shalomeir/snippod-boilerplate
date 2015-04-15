from django.conf.urls import include, patterns, url
from rest_framework_nested import routers

from authentication.views import AccountViewSet, LoginView, LogoutView


router = routers.SimpleRouter()
router.register(r'accounts', AccountViewSet)


urlpatterns = patterns(
    '',
    url(r'^', include(router.urls)),
    url(r'auth/login/', LoginView.as_view(), name='login'),
    url(r'auth/logout/', LogoutView.as_view(), name='logout')
)