# get langauge code and english preference by request HTTP-ACCEPT-LANGUAGE
def get_language(request):
    language = 'en'

    if "HTTP_ACCEPT_LANGUAGE" in request.META:
        accept_languages = request.META['HTTP_ACCEPT_LANGUAGE'].split(',')
        language = accept_languages[0].lower().replace('-','_').split('_')[0]
    return language
