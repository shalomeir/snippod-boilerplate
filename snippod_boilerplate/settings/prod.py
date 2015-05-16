"""
Django settings for snippod boilerplate project.

This is a base starter for snippod.

For more information on this file, see
https://github.com/shalomeir/snippod-boilerplate

"""
from snippod_boilerplate.settings.common import *

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/dev/howto/deployment/checklist/

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

TEMPLATE_DEBUG = False

ALLOWED_HOSTS = ['*']

# SECURITY WARNING: keep the secret key used in production secret!
import os
SECRET_KEY = os.environ['SECRET_KEY']


# Application definition

INSTALLED_APPS += (
    'storages',
)

# MIDDLEWARE_CLASSES += (
#     '',
# )

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

            ],
        },
    },
]

# Database
# https://docs.djangoproject.com/en/1.7/ref/settings/#databases


DATABASES = {
    'default': {
        'ENGINE':'django.db.backends.postgresql_psycopg2',
        'NAME': os.environ['RDS_DB_NAME'],
        'USER': os.environ['RDS_USERNAME'],
        'PASSWORD': os.environ['RDS_PASSWORD'],
        'HOST': os.environ['RDS_HOSTNAME'],
        'PORT': os.environ['RDS_PORT'],
    }
}

DATABASE_OPTIONS = {'charset': 'utf8'}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.7/howto/static-files/

STATICFILES_DIRS = (
    # os.path.join(BASE_DIR, 'snippod_webapp/.tmp'), # grunt serve
    os.path.join(BASE_DIR, 'snippod_webapp/dist/client'), #grunt
    # os.path.join(BASE_DIR, 'static'),
)
#
# COMPRESS_ENABLED = os.environ.get('COMPRESS_ENABLED', False)

# see http://condopilot.com/blog/web/how-setup-gzip-compressor-and-aws-s3-django/
AWS_HEADERS = {  # see http://developer.yahoo.com/performance/rules.html#expires
                 'Expires': 'Thu, 31 Dec 2099 20:00:00 GMT',
                 'Cache-Control': 'max-age=94608000',
}

AWS_IS_GZIPPED = True

GZIP_CONTENT_TYPES = (
    'text/css',
    'application/javascript',
    'application/x-javascript',
    'text/javascript'
)

AWS_STORAGE_BUCKET_NAME = 'snippodboilerplatebucket'
AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_QUERYSTRING_AUTH = False

# The OrdinaryCallingFormat is required for dotted bucket names.
# AWS_S3_CALLING_FORMAT = 'boto.s3.connection.OrdinaryCallingFormat'

AWS_S3_SECURE_URLS = False
AWS_S3_URL_PROTOCOL = 'http:'

# This setting is used on our custom storage to make
# all Static files be stored in /static of our Bucket.
STATICFILES_LOCATION = 'staticfiles'

# CachedS3BotoStorage is our own custom storage.
# STATICFILES_STORAGE = 'snippod_boilerplate.settings.custom_storages.CachedS3BotoStorage'
STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

STATIC_URL = 'http://%s.s3.amazonaws.com/%s/' % (AWS_STORAGE_BUCKET_NAME, STATICFILES_LOCATION)

# This setting is used on our custom storage to make
# all Media files be stored in /media of our Bucket.
MEDIAFILES_LOCATION = 'mediafiles'
MEDIA_URL = "http://%s.s3.amazonaws.com/%s/" % (AWS_STORAGE_BUCKET_NAME, MEDIAFILES_LOCATION)
# This is our custom Media Storage class.
# DEFAULT_FILE_STORAGE = 'snippod_boilerplate.settings.custom_storages.MediaStorage'
DEFAULT_FILE_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

# Enable Compression on all Javascript and CSS used in template.
# The CachedS3BotoStorage both keep local files saved and uploads
# to S3. This is used to make the Compressor module be able to see
# what files have been changed or updated on the temp files on same server
COMPRESS_ENABLED = True
COMPRESS_CSS_FILTERS = ['compressor.filters.css_default.CssAbsoluteFilter', 'compressor.filters.cssmin.CSSMinFilter']
# This will ALWAYS be same as our STATICFILES_STORAGE setting.
COMPRESS_STORAGE = 'snippod_boilerplate.settings.custom_storages.CachedS3BotoStorage'
# This will point to the same folder as all our static files. Since the compressed
# versions will be uploaded there as well.
COMPRESS_URL = "http://%s.s3.amazonaws.com/%s/" % (AWS_STORAGE_BUCKET_NAME, STATICFILES_LOCATION)


#MEDIA FILE (user uploaded files)

# TEMPLATE_DIRS = (
#     os.path.join(BASE_DIR, 'djangoapps/templates'),
# )
