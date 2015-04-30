from rest_framework import serializers
from rest_framework.serializers import HyperlinkedRelatedField

from authentication.serializers import UserSerializer
from authentication.models import Account
from posts.models import Post, Comment, PostUpvote, CommentUpvote


class PostSerializer(serializers.ModelSerializer):
    author = UserSerializer(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = Post
        fields = ('id', 'author', 'title', 'link', 'created_at', 'updated_at',
                  'comment_count', 'upvote_count')
        read_only_fields = ('id', 'created_at', 'updated_at',
                            'comment_count', 'upvote_count')

    def to_representation(self, obj):
        returnObj = super(PostSerializer,self).to_representation(obj)
        is_upvoted_me = False
        is_author_me = False
        if isinstance(self.context['request'].user, Account):
            is_upvoted_me = obj.postupvote_set.filter(
                                voter=self.context['request'].user).exists()
            is_author_me = obj.author == self.context['request'].user

        newObj = {
            'is_author_me': is_author_me,
            'is_upvoted_me': is_upvoted_me
        }
        returnObj.update(newObj)
        return returnObj


class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = Comment
        fields = ('id', 'post', 'author', 'content', 'created_at', 'updated_at',
                  'upvote_count')
        read_only_fields = ('id', 'created_at', 'updated_at', 'upvote_count')

    def to_representation(self, obj):
        returnObj = super(CommentSerializer,self).to_representation(obj)
        is_upvoted_me = False
        is_author_me = False
        if isinstance(self.context['request'].user, Account):
            is_upvoted_me = obj.commentupvote_set.filter(
                voter=self.context['request'].user).exists()
            is_author_me = obj.author == self.context['request'].user

        newObj = {
            'is_author_me': is_author_me,
            'is_upvoted_me': is_upvoted_me
        }
        returnObj.update(newObj)
        return returnObj


class PostUpvoteSerializer(serializers.ModelSerializer):
    voter = UserSerializer(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = PostUpvote
        fields = ('id', 'post', 'voter', 'created_at')
        read_only_fields = ('id', 'created_at')


class CommentUpvoteSerializer(serializers.ModelSerializer):
    voter = UserSerializer(default=serializers.CurrentUserDefault(), read_only=True)

    class Meta:
        model = CommentUpvote
        fields = ('id', 'comment', 'voter', 'created_at')
        read_only_fields = ('id', 'created_at')

