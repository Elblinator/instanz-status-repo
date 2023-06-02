import unittest
import json
import time

from project.server.models import User, BlacklistToken
from project.tests.base import BaseTestCase
from project.server.config import database, blacklist

def register_user(self, name, password):
    return self.client.post(
        '/auth/register',
        data=json.dumps(dict(
            name=name,
            password=password
        )),
        content_type='application/json',
    )

def login_user(self, name, password):
    return self.client.post(
        '/auth/login',
        data=json.dumps(dict(
            name=name,
            password=password
        )),
        content_type='application/json',
    )

def logout_user(self, resp_login) :
    return self.client.post(
            '/auth/logout',
            headers=dict(
                Authorization='Bearer ' + json.loads(
                    resp_login.data.decode()
                )['auth_token']
            )
        )

def status_user(self, resp_login):
    return self.client.get(
            '/auth/status',
            headers=dict(
                Authorization='Bearer ' + json.loads(
                    resp_login.data.decode()
                )['auth_token']
            )
        )

class TestAuthBlueprint(BaseTestCase):
    def test_registration(self):
        """ Test for user registration """
        with self.client:
            response = register_user(self,'joe@gmail.com','123456')
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully registered.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 201)

    def test_registered_with_already_registered_user(self):
        """ Test registration with already registered name"""
        with self.client:
            response = register_user(self,'demo','demo')
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(
                data['message'] == 'User already exists. Please Log in.')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 202)
    
    def test_registered_user_login(self):
        """ Test for login of registered-user login """
        with self.client:
            # user registration
            resp_register = register_user(self,'name','name')
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(data_register['message'] == 'Successfully registered.')
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertEqual(resp_register.status_code, 201)
            # registered user login
            response = login_user(self, 'name', 'name')
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged in.')
            self.assertTrue(data['auth_token'])
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 200)

    def test_non_registered_user_login(self):
        """ Test for login of non-registered user """
        with self.client:
            response = login_user(self, 'no', 'no')
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(data['message'] == 'User does not exist.')
            self.assertTrue(response.content_type == 'application/json')
            self.assertEqual(response.status_code, 404)
    
    def test_user_status(self):
        """ Test for user status """
        with self.client:
            user = User (
                name='bubu',
                password= '123456'
            )
            resp_login = login_user(self,'bubu', '123456')
            auth_token = user.encode_auth_token(user.id)
            response = status_user(self, resp_login)
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['data'] is not None)
            self.assertTrue(data['data']['name'] == user.name)
            self.assertEqual(response.status_code, 200)

    def test_valid_logout(self):
        """ Test for logout before token expires """
        with self.client:
            # user registration
            resp_register = register_user(self, 'lulu', 'lulu')
            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully registered.')
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertEqual(resp_register.status_code, 201)
            # user login
            resp_login = login_user(self, 'lulu', 'lulu')
            data_login = json.loads(resp_login.data.decode())
            self.assertTrue(data_login['status'] == 'success')
            self.assertTrue(data_login['message'] == 'Successfully logged in.')
            self.assertTrue(data_login['auth_token'])
            self.assertTrue(resp_login.content_type == 'application/json')
            self.assertEqual(resp_login.status_code, 200)
            # valid token logout
            response = logout_user(self, resp_login)
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'success')
            self.assertTrue(data['message'] == 'Successfully logged out.')
            self.assertEqual(response.status_code, 200)
    
    def test_invalid_logout(self):
        """ Testing logout after the token expires """
        with self.client:
            # user registration
            resp_register = register_user(self, 'lili', '123456')

            data_register = json.loads(resp_register.data.decode())
            self.assertTrue(data_register['status'] == 'success')
            self.assertTrue(
                data_register['message'] == 'Successfully registered.')
            self.assertTrue(data_register['auth_token'])
            self.assertTrue(resp_register.content_type == 'application/json')
            self.assertEqual(resp_register.status_code, 201)
            # user login
            resp_login = login_user(self, 'lili', '123456')
            data_login = json.loads(resp_login.data.decode())
            self.assertTrue(data_login['status'] == 'success')
            self.assertTrue(data_login['message'] == 'Successfully logged in.')
            self.assertTrue(data_login['auth_token'])
            self.assertTrue(resp_login.content_type == 'application/json')
            self.assertEqual(resp_login.status_code, 200)
            # invalid token logout
            time.sleep(6)
            response = logout_user(self, resp_login)
            data = json.loads(response.data.decode())
            self.assertTrue(data['status'] == 'fail')
            self.assertTrue(
                data['message'] == 'Signature expired. Please log in again.')
            self.assertEqual(response.status_code, 401)

    # def test_valid_blacklisted_token_logout(self):
    #     """ Test for logout after a valid token gets blacklisted """
    #     with self.client:
    #         # user registration
    #         user = User(
    #             name='mimi',
    #             password='mimi'
    #         )
    #         auth_token = user.encode_auth_token(user.id)

    #         resp_register = register_user(self, 'mimi', 'mimi')
    #         data_register = json.loads(resp_register.data.decode())
    #         self.assertTrue(data_register['status'] == 'success')
    #         self.assertTrue(
    #             data_register['message'] == 'Successfully registered.')
    #         self.assertTrue(data_register['auth_token'])
    #         self.assertTrue(resp_register.content_type == 'application/json')
    #         self.assertEqual(resp_register.status_code, 201)
    #         # user login
    #         resp_login = login_user(self, 'mimi', 'mimi')
    #         data_login = json.loads(resp_login.data.decode())
    #         self.assertTrue(data_login['status'] == 'success')
    #         self.assertTrue(data_login['message'] == 'Successfully logged in.')
    #         self.assertTrue(data_login['auth_token'])
    #         self.assertTrue(resp_login.content_type == 'application/json')
    #         self.assertEqual(resp_login.status_code, 200)
    #         # blacklist a valid token
    #         blacklist_token = BlacklistToken(
    #             token=json.loads(resp_login.data.decode())['auth_token'])

    #         BlacklistToken.add_to_blacklist(auth_token, blacklist_token)
    #         # blacklisted valid token logout
    #         response = logout_user(self, resp_login)
    #         data = json.loads(response.data.decode())
    #         self.assertTrue(data['status'] == 'fail')
    #         self.assertTrue(data['message'] == 'Token blacklisted. Please log in again.')
    #         self.assertEqual(response.status_code, 401)
    
    # def test_valid_blacklisted_token_user(self):
    #     """ Test for user status with a blacklisted valid token """
    #     with self.client:
    #         user = User(
    #             name='meme',
    #             password='meme'
    #         )
    #         resp_register = register_user(self, 'meme', 'meme')
    #         auth_token = user.encode_auth_token(user.id)
    #         # blacklist a valid token
    #         blacklist_token = BlacklistToken(
    #             token=json.loads(resp_register.data.decode())['auth_token'])
    #         BlacklistToken.add_to_blacklist(auth_token, blacklist_token)
    #         response = status_user(self, resp_register)
    #         data = json.loads(response.data.decode())
    #         self.assertTrue(data['status'] == 'fail')
    #         self.assertTrue(data['message'] == 'Token blacklisted. Please log in again.')
    #         self.assertEqual(response.status_code, 401)

if __name__ == '__main__':
    unittest.main()