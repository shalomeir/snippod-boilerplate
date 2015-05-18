from django.conf.urls import include, patterns, url

from .views import IndexView, WebMasterView

urlpatterns = patterns(
    '',
    url(r'^$', IndexView.as_view(), name='index'),

    #for google webmaster
    url(r'google4c82de08f55a8973.html', WebMasterView.as_view(), name='googleWebMaster'),
)