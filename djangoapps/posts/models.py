from django.db import models
from django.db.models import Count
from authentication.models import Account


class PostQuerySet(models.QuerySet):
    def upvotes(self):
        return self.annotate(Count('postupvote'))\
            .order_by('-postupvote__count','-created_at')

    def newest(self):
        return self.order_by('-created_at')

    def comments(self):
        return self.annotate(Count('comment'))\
            .order_by('-comment__count','-created_at')


class Post(models.Model):
    author = models.ForeignKey(Account)
    title = models.CharField(max_length=110)
    link = models.URLField()

    created_at = models.DateTimeField(db_index=True, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    sorted_objects = PostQuerySet.as_manager()

    def __str__(self):
        return '{0}'.format(self.title)

    def _get_comment_count(self):
        return self.comment_set.count()
    comment_count = property(_get_comment_count)

    def _get_upvote_count(self):
        return self.postupvote_set.count()
    upvote_count = property(_get_upvote_count)

    class Meta:
        ordering = ['-created_at']


class CommentQuerySet(models.QuerySet):
    def upvotes(self):
        return self.annotate(Count('commentupvote'))\
            .order_by('-commentupvote__count','-created_at')

    def newest(self):
        return self.order_by('-created_at')


class Comment(models.Model):
    post = models.ForeignKey(Post)
    author = models.ForeignKey(Account)
    content = models.CharField(max_length=110)
    created_at = models.DateTimeField(db_index=True, auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = models.Manager()
    sorted_objects = CommentQuerySet.as_manager()

    def __str__(self):
        return '{0}'.format(self.content)

    def _get_upvote_count(self):
        return self.commentupvote_set.count()
    upvote_count = property(_get_upvote_count)

    class Meta:
        ordering = ['-created_at']


class PostUpvote(models.Model):
    post = models.ForeignKey(Post)
    voter = models.ForeignKey(Account)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('post', 'voter')


class CommentUpvote(models.Model):
    comment = models.ForeignKey(Comment)
    voter = models.ForeignKey(Account)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('comment', 'voter')


