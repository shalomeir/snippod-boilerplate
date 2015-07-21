from celery import Celery
from celery.contrib.batches import Batches
app = Celery('tasks')
app.config_from_object('celeryconfig')
@app.task
def add(x,y):
    return x+y

# Flush after 100 messages, or 10 seconds.
@app.task(base=Batches, flush_every=100, flush_interval=10)
def count_click(requests):
    from collections import Counter
    count = Counter(request.kwargs['url'] for request in requests)
    for url, count in count.items():
        print('>>> Clicks: {0} -> {1}'.format(url, count))