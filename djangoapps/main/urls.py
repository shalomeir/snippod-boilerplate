from django.conf.urls import include, patterns, url

from .views import IndexView

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),
)