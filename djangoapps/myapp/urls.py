from django.conf.urls import url

urlpatterns = [
    url(r'^post-comment/$', 'myapp.views.post_comment'),
    url(r'^load-comments/$', 'myapp.views.load_comments'),
    url(r'^$', 'myapp.views.index')]
