

import datetime
import random
import string
import jwt

from project.server import app, bcrypt
from project.server.config import database, blacklist, databa_id


    
class User():
    """ User Model for storing user related details """
    __tablename__ = "users"

    id = random.randint(0,1000)
    name = ''.join(random.choices(string.ascii_uppercase + string.digits, k=255))
    password = ''.join(random.choices(string.ascii_uppercase + string.digits, k=255))
    registered_on = datetime.datetime.now()
    

    def __init__(self, name, password):
        self.name = name
        self.password = bcrypt.generate_password_hash(
            password, app.config.get('BCRYPT_LOG_ROUNDS')
        ).decode()
        self.registered_on = datetime.datetime.now()
        if self.name not in database.keys():
            self.id = random.randint(0,1000)
            while (self.id in databa_id.keys()):
                self.id = random.randint(0,1000)

    def encode_auth_token(self, user_id):
        """
        Generates the Auth Token
        :return: string
        """
        try:
            payload = {
                'exp': datetime.datetime.utcnow(),
                'iat': datetime.datetime.utcnow(),
                'sub': user_id
            }
            return jwt.encode(
                payload,
                app.config.get('SECRET_KEY'),
                algorithm='HS256'
            )
        except Exception as e:
            return e

    @staticmethod
    def decode_auth_token(auth_token):
        """
        Validates the auth token
        :param auth_token:
        :return: integer|string
        """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            is_blacklisted_token = BlacklistToken.check_blacklist(auth_token)
            if is_blacklisted_token:
                return 'Token blacklisted. Please log in again.'
            else:
                return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def get_Regs (auth_token):
        """ returns the current User Data """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            return payload['exp']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

    def get_ID (auth_token):
        """ returns the current User Data """
        try:
            payload = jwt.decode(auth_token, app.config.get('SECRET_KEY'))
            # print(databa_id)
            # print(payload['sub'])
            return payload['sub']
        except jwt.ExpiredSignatureError:
            return 'Signature expired. Please log in again.'
        except jwt.InvalidTokenError:
            return 'Invalid token. Please log in again.'

class BlacklistToken():
    """
    Token Model for storing JWT tokens
    """
    id = random.randint(1000,2000)
    token = ''.join(random.choices(string.ascii_uppercase + string.digits, k=500))
    blacklisted_on = datetime.datetime.now()

    def __init__(self, token):
        self.token = token
        self.blacklisted_on = datetime.datetime.now()

    def __repr__(self):
        return ''.format(self.token)
    
    @staticmethod
    def check_blacklist(auth_token):
        # check whether auth token has been blacklisted
        if auth_token in blacklist.keys():
            return True  
        else:
            return False
            
    @staticmethod
    def add_to_blacklist(auth_token, blacklist_token):
        # add whether auth token has been blacklisted
        blacklist.update({auth_token:blacklist_token})

