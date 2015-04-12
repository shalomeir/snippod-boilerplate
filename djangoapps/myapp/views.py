import json
import requests

from django.conf import settings
from django.http import HttpResponse
from django.shortcuts import render
from django.utils.safestring import mark_safe

from .models import Comment


def json_response(something=None):
    return HttpResponse(
        json.dumps(something),
        content_type='application/json; charset=UTF-8')


def render_to_react_string(component_name, ctx=None):
    if ctx is None:
        ctx = {}

    try:
        response = requests.get(settings.NODE_SERVER,
                            params={'component_name': component_name, 'data': json.dumps(ctx)})

        if response.status_code == requests.codes.ok:
            return mark_safe(response.text)
        else:
            return ''
    except Exception as exc:
        print exc
        return ''


def get_comments():
    return list(Comment.objects.values('id', 'name', 'text'))


def load_comments(request):
    return json_response({"comments": get_comments()})


def post_comment(request):
    Comment.objects.create(name=request.POST['name'], text=request.POST['text'])
    return json_response({"success": True})


def index(request):
    react_ctx_comment = {'id': 1, 'name': 'Ustun', 'text': 'A sample comment'};
    rendered_comment = render_to_react_string('Comment', react_ctx_comment)

    react_ctx_comments_fixed = {'comments': [{'id': 1, 'name': 'Ustun', 'text': 'A sample comment'},
                                             {'id': 2, 'name': 'John', 'text': 'Another comment'},
                                             {'id': 3, 'name': 'Mary', 'text': 'Yet another comment'},
                                             {'id': 4, 'name': 'Mary', 'text': 'Yet another comment'},
                                             {'id': 5, 'name': 'Mary', 'text': 'Yet another comment'},
                                             {'id': 6, 'name': 'Mary', 'text': 'Yet another comment'},
                                             {'id': 7, 'name': 'Mary', 'text': 'Yet another comment'}]};
    rendered_comments_fixed = render_to_react_string('Comments', react_ctx_comments_fixed)
    rendered_comments_fixed_with_griddle = render_to_react_string('Griddle', {'showFilter': True,
                                                                              'results': react_ctx_comments_fixed['comments']})


    react_ctx_comments = {'comments': get_comments()}
    rendered_comments = render_to_react_string('Comments', react_ctx_comments)

    rendered_hello_world = render_to_react_string('HelloWorld')

    ctx = {'rendered_comment': rendered_comment,
           'react_ctx_comment': react_ctx_comment,
           'rendered_comments_fixed': rendered_comments_fixed,
           'rendered_comments_fixed_with_griddle': rendered_comments_fixed_with_griddle,
           'react_ctx_comments_fixed': react_ctx_comments_fixed,
           'rendered_comments': rendered_comments,
           'react_ctx_comments': react_ctx_comments,
           'rendered_hello_world': rendered_hello_world}

    return render(request, 'index.html', ctx)
