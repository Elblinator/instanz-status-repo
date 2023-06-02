# project/server/tests/base.py


from flask_testing import TestCase

from project.server import app


class BaseTestCase(TestCase):
    """ Base Tests """

    def create_app(self):
        app.config.from_object('project.server.config.TestingConfig')
        return app

