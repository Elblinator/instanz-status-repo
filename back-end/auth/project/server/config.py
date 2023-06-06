
import os


database = {
        "demo": ["demo", 0],
        "Alice": ["myhashedpassword", 1],
        "Bernd": ["myotherpassword", 2],
        "admin": ["admin", 4]
    }
    
databa_id = {
    0: ["demo", "demo"],
    1: ["Alice", "myhashedpassword"],
    2: ["Bernd", "myotherpassword"],
    4: ["admin", "admin"]
}

blacklist = { }

class BaseConfig:
    """Base configuration."""
    SECRET_KEY = os.getenv('SECRET_KEY', 'my_precious')
    DEBUG = False
    BCRYPT_LOG_ROUNDS = 13

class DevelopmentConfig(BaseConfig):
    """Development configuration."""
    DEBUG = True
    BCRYPT_LOG_ROUNDS = 4

class TestingConfig(BaseConfig):
    """Testing configuration."""
    DEBUG = True
    TESTING = True
    BCRYPT_LOG_ROUNDS = 4
    PRESERVE_CONTEXT_ON_EXCEPTION = False


class ProductionConfig(BaseConfig):
    """Production configuration."""
    SECRET_KEY = 'my_precious'
    DEBUG = False
