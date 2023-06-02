# project/tests/test_user_model.py

import unittest

from project.server.models import User
from project.tests.base import BaseTestCase
from project.server.config import database



class TestUserModel(BaseTestCase):

    def test_encode_auth_token(self):
        user = User(
            name='test',
            password='test'
        )
        database[user.name]:user.password
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))

    def test_decode_auth_token(self):
        user = User(
            name='test',
            password='test'
        )
        database[user.name]:user.password
        auth_token = user.encode_auth_token(user.id)
        self.assertTrue(isinstance(auth_token, bytes))
        self.assertTrue(User.decode_auth_token(auth_token))


if __name__ == '__main__':
    unittest.main()