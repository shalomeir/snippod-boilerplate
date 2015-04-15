from django.contrib.auth import update_session_auth_hash

from rest_framework import serializers

from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'date_joined', 'updated_at',
                  'first_name', 'last_name', 'password',
                  'confirm_password',)
        read_only_fields = ('date_joined', 'updated_at',)


    def update(self, instance, validated_data):
        instance.email = validated_data.get('email', instance.email)
        instance.username = validated_data.get('username', instance.username)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        # instance.tagline = validated_data.get('tagline', instance.tagline)

        instance.save()

        if self.checkPassword(validated_data):
            instance.set_password(validated_data.get('password'))
            instance.save()
            update_session_auth_hash(self.context.get('request'), instance)

        return instance


    def checkPassword(self, validated_data):
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            return True
        return False
