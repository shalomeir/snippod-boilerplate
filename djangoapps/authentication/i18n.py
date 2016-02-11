from django.utils.translation import ugettext_lazy as _
from model_utils import Choices

RESPONSE_MESSAGES = {
    'disauthorized': {
        'en':'This authentication has been disabled.',
        'ko':'이 인증은 불가능(disabled) 합니다.'
    },
    'authentication_failed': {
        'en':'ID/password combination invalid.',
        'ko':'ID/password 조합이 잘못되었어요.'
    },
    'register_failed': {
        'en':'Account could not be created with received data.',
        'ko':'요청한 데이터로 계정 생성이 불가능해요.'
    },
}
