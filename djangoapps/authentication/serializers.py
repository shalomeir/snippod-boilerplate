from django.core.validators import validate_email

from rest_framework import serializers, validators

from authentication.models import Account


class AccountSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(write_only=True,
            validators=[validators.UniqueValidator(queryset=Account.objects.all())])
    password = serializers.CharField(write_only=True, required=False)
    confirm_password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = Account
        fields = ('id', 'email', 'username', 'date_joined', 'updated_at',
                  'first_name', 'last_name', 'full_name', 'password',
                  'confirm_password',)
        read_only_fields = ('date_joined', 'updated_at', 'full_name')


    def validate(self, attrs):
        if 'password' in attrs:
            if attrs['password'] != attrs['confirm_password']:
                raise serializers.ValidationError("Password is not matched with a confirm password")
        return attrs

    def to_representation(self, obj):
        returnObj = super(AccountSerializer,self).to_representation(obj)

        # if isinstance(self.context['request'].user, Account):
        if self.context['request'].user.id == obj.id:
            newObj = {
                'email': obj.email
            }
            returnObj.update(newObj)
        return returnObj


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

        return instance


    def checkPassword(self, validated_data):
        password = validated_data.get('password', None)
        confirm_password = validated_data.get('confirm_password', None)

        if password and confirm_password and password == confirm_password:
            return True
        return False



class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = ('id', 'username',)
        read_only_fields = ('id', 'username',)
