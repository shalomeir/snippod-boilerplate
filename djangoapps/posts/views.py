from rest_framework import permissions, viewsets
from rest_framework.response import Response
from rest_framework import status

from posts.models import Post, Comment, PostUpvote, CommentUpvote
from posts.permissions import IsAuthor, IsOwner
from posts.serializers import PostSerializer, CommentSerializer, \
                                PostUpvoteSerializer, CommentUpvoteSerializer
from rest_framework.decorators import detail_route
from django.core.exceptions import ObjectDoesNotExist

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        sorting = self.request.query_params.get('sorting', None)
        if sorting == 'upvotes':
            return Post.sorted_objects.upvotes()
        elif sorting == 'newest':
            return Post.sorted_objects.newest()
        elif sorting == 'comments' :
            return Post.sorted_objects.comments()
        else:
            return Post.sorted_objects.upvotes()

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthor(),)

    @detail_route(methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        serializer = PostUpvoteSerializer(data={'post':pk},
                                          context={'request': request})
        if serializer.is_valid():
            serializer.save()
            post = Post.objects.get(pk=pk)
            return Response(PostSerializer(post, context={'request': request}).data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)

    @detail_route(methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def cancel_upvote(self, request, pk=None):
        try:
            post = Post.objects.get(pk=pk)
            instance = PostUpvote.objects.get(post=post, voter=self.request.user)
            self.perform_destroy(instance)
            return Response(PostSerializer(post, context={'request': request}).data)
        except ObjectDoesNotExist:
            return Response({
                'status': 'Not Fount',
                'message': 'This upvote is not exist.'
            }, status=status.HTTP_404_NOT_FOUND)


class UserPostViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = PostSerializer

    def get_queryset(self):
        user_id = self.kwargs['userid']
        sorting = self.request.query_params.get('sorting', None)
        if sorting == 'upvotes':
            return Post.sorted_objects.upvotes().filter(author=user_id)
        elif sorting == 'newest':
            return Post.sorted_objects.newest().filter(author=user_id)
        elif sorting == 'comments' :
            return Post.sorted_objects.comments().filter(author=user_id)
        else:
            return Post.sorted_objects.upvotes().filter(author=user_id)


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        sorting = self.request.query_params.get('sorting', None)
        if sorting == 'upvotes':
            return Comment.sorted_objects.upvotes()
        elif sorting == 'newest':
            return Comment.sorted_objects.newest()
        else:
            return Comment.sorted_objects.upvotes()

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)
        return (permissions.IsAuthenticated(), IsAuthor(),)

    def perform_create(self, serializer):
        instance = serializer.save(author=self.request.user)
        return super(CommentViewSet, self).perform_create(serializer)

    @detail_route(methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def upvote(self, request, pk=None):
        serializer = CommentUpvoteSerializer(data={'comment':pk},
                                          context={'request': request})
        if serializer.is_valid():
            serializer.save()
            comment = Comment.objects.get(pk=pk)
            return Response(CommentSerializer(comment, context={'request': request}).data)
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)


    @detail_route(methods=['post'], permission_classes=[permissions.IsAuthenticated])
    def cancel_upvote(self, request, pk=None):
        try:
            comment = Comment.objects.get(pk=pk)
            instance = CommentUpvote.objects.get(comment=comment, voter=self.request.user)
            self.perform_destroy(instance)
            return Response(CommentSerializer(comment, context={'request': request}).data)
        except ObjectDoesNotExist:
            return Response({
                'status': 'Not Fount',
                'message': 'This upvote is not exist.'
            }, status=status.HTTP_404_NOT_FOUND)


class PostCommentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        post_id = self.kwargs['postid']
        sorting = self.request.query_params.get('sorting', None)
        if sorting == 'upvotes':
            return Comment.sorted_objects.upvotes().filter(post=post_id)
        elif sorting == 'newest':
            return Comment.sorted_objects.newest().filter(post=post_id)
        else:
            return Comment.sorted_objects.upvotes().filter(post=post_id)


class UserCommentViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = CommentSerializer

    def get_queryset(self):
        user_id = self.kwargs['userid']
        sorting = self.request.query_params.get('sorting', None)
        if sorting == 'upvotes':
            return Comment.sorted_objects.upvotes().filter(author=user_id)
        elif sorting == 'newest':
            return Comment.sorted_objects.newest().filter(author=user_id)
        else:
            return Comment.sorted_objects.upvotes().filter(author=user_id)


# class PostUpvoteViewSet(viewsets.ModelViewSet):
#     queryset = PostUpvote.objects.all()
#     serializer_class = PostUpvoteSerializer
#
#     def get_permissions(self):
#         if self.request.method in permissions.SAFE_METHODS:
#             return (permissions.AllowAny(),)
#         return (permissions.IsAuthenticated(), IsOwner(),)
#
#     def perform_create(self, serializer):
#         instance = serializer.save(voter=self.request.user)
#         return super(PostUpvoteViewSet, self).perform_create(serializer)
#
#
# class CommentUpvoteViewSet(viewsets.ModelViewSet):
#     queryset = PostUpvote.objects.all()
#     serializer_class = CommentUpvoteSerializer
#
#     def get_permissions(self):
#         if self.request.method in permissions.SAFE_METHODS:
#             return (permissions.AllowAny(),)
#         return (permissions.IsAuthenticated(), IsOwner(),)
#
#     def perform_create(self, serializer):
#         instance = serializer.save(voter=self.request.user)
#         return super(PostUpvoteViewSet, self).perform_create(serializer)