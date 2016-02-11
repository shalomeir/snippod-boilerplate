import json

from django.contrib.auth import authenticate, login, logout
from django.contrib.auth import update_session_auth_hash

from rest_framework import permissions, status, views, viewsets
from rest_framework.decorators import detail_route, list_route
from rest_framework.response import Response

from authentication.models import Account
from authentication.serializers import AccountSerializer
from authentication.permissions import IsAccountOwner

from authentication.utils import *

from authentication.i18n import RESPONSE_MESSAGES

class AccountViewSet(viewsets.ModelViewSet):
    queryset = Account.objects.all()
    serializer_class = AccountSerializer

    def get_permissions(self):
        if self.request.method in permissions.SAFE_METHODS:
            return (permissions.AllowAny(),)

        if self.request.method == 'POST':
            return (permissions.AllowAny(),)

        return (permissions.IsAuthenticated(),IsAccountOwner(),)


    @list_route()
    def recent_users(self, request):
        recent_users = Account.objects.all().order_by('-last_login')
        page = self.paginate_queryset(recent_users)

        if page is not None:
            serializer = self.get_serializer(page, context={'request': request}, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(recent_users, context={'request': request}, many=True)
        return Response(serializer.data)


    def create(self, request):
        request.data['language'] = get_language(request)
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            if serializer.checkPassword(serializer.validated_data):
                Account.objects.create_user(**serializer.validated_data)
                account = authenticate(email=serializer.validated_data['email'],
                                       password=serializer.validated_data['password'])
                login(request, account)
                serialized = self.serializer_class(account, context={'request': request})
                return Response({
                    'account': serialized.data
                }, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'Bad request',
            'message': RESPONSE_MESSAGES['register_failed'][request.data['language']],
            # below errors value messages should be translated.
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


    @list_route(methods=['post'])
    def register(self, request):
        return self.create(request)

    def destroy(self, request, pk=None):
        account = self.get_object()
        account.email = str(account.id)+'_nonactive'+'@snippod.com'
        account.description = ''
        account.is_active = False
        account.is_authenticated = False
        account.save()

        logout(request)

        # return self.delete(request)
        return Response({'status':'deleted clean'})

    @detail_route(methods=['patch'])
    def set_password(self, request, pk=None):
        account = self.get_object()
        serializer = self.serializer_class(account, data=request.data, partial=True)
        if serializer.is_valid(raise_exception=True):
            serializer.update(account, serializer.validated_data)
            update_session_auth_hash(request, account)
            return Response({'status': 'password set'})
        else:
            return Response(serializer.errors,
                            status=status.HTTP_400_BAD_REQUEST)



class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):

        email = request.data.get('email', None)
        password = request.data.get('password', None)

        account = authenticate(email=email, password=password)
        language = get_language(request)

        if account is not None:
            if account.is_active:
                login(request, account)
                serialized = AccountSerializer(account, context={'request': request})
                return Response({
                    'account': serialized.data
                })
            else:
                return Response({
                    'status': 'Unauthorized',
                    'message': RESPONSE_MESSAGES['disauthorized'][language]
                }, status=status.HTTP_401_UNAUTHORIZED)
        else:
            if request.user.is_active:
                serialized = AccountSerializer(request.user, context={'request': request})
                return Response({
                    'account': serialized.data
                })
            return Response({
                'status': 'Unauthorized',
                'message': RESPONSE_MESSAGES['authentication_failed'][language]
            }, status=status.HTTP_401_UNAUTHORIZED)


class LoadAuthView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request, format=None):

        if request.user.is_active:
            serialized = AccountSerializer(request.user, context={'request': request})
            return Response({
                'account': serialized.data
            })
        return Response({
            'status': 'Unauthorized',
            'message': 'Automation PreLoad Authentication by cookie is failed.'
        }, status=status.HTTP_204_NO_CONTENT)


class LogoutView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request, format=None):
        logout(request)

        return Response({}, status=status.HTTP_204_NO_CONTENT)
