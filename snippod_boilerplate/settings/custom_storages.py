from django.conf import settings
from boto.s3.connection import S3Connection
from storages.backends.s3boto import S3BotoStorage
from django.core.files.storage import get_storage_class

# By default the S3Connection is using s3.amazonaws.com
# as host, which only allow for S3 hosted in US. To allow
# EU hosts we need to change the DefaultHost with our own custom
# Connection Class.
class EUConnection(S3Connection):
    DefaultHost = "s3-eu-west-1.amazonaws.com"

class TokyoConnection(S3Connection):
    DefaultHost = "s3-ap-northeast-1.amazonaws.com"

# We need a custom Storage Class for our Media files because we
# want to have seperate locations for Static and Media files.
class MediaStorage(S3BotoStorage):
    connection_class = TokyoConnection
    location = settings.MEDIAFILES_LOCATION

# S3 storage backend that saves the files locally, too.
class CachedS3BotoStorage(S3BotoStorage):
    connection_class = TokyoConnection
    location = settings.STATICFILES_LOCATION

    def __init__(self, *args, **kwargs):
        super(CachedS3BotoStorage, self).__init__(*args, **kwargs)
        self.local_storage = get_storage_class(
            "compressor.storage.CompressorFileStorage")()

    def save(self, name, content):
        non_gzipped_file_content = content.file
        name = super(CachedS3BotoStorage, self).save(name, content)
        content.file = non_gzipped_file_content
        self.local_storage._save(name, content)
        return name