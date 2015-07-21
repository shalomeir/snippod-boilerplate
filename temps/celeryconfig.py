BROKER_URL = 'amqp://'
CELERY_RESULT_BACKEND = 'amqp://'
# CELERY_TASK_SERIALIZER = 'json',
# CELERY_ACCEPT_CONTENT = ['json'],
# CELERY_RESULT_SERIALIZER = 'json',
CELERY_TIMEZONE='Asia/Tokyo',
CELERY_ENABLE_UTC=True

#이와 같이 파일로 설정값을 변경할 경우, 해당 파일에 오류가 있는 여부도 아래와 같이 확인할 수 있다.
# python -m celeryconfig
