from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.generic.base import TemplateView
from django.utils.decorators import method_decorator


class IndexView(TemplateView):
    template_name = 'index.html'

    @method_decorator(ensure_csrf_cookie)
    def dispatch(self, *args, **kwargs):
        return super(IndexView, self).dispatch(*args, **kwargs)

class WebMasterView(TemplateView):
    template_name = 'google4c82de08f55a8973.html'
    #
    # def dispatch(self, *args, **kwargs):
    #     return super(WebMasterView, self).dispatch(*args, **kwargs)
