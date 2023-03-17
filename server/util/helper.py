import jwt
import hashlib
import os


class Helper:

    @staticmethod
    def generate_access_token(payload):
        return jwt.encode(
            {"some": payload, "exp": os.getenv("JWT_ACCESS_TOKEN_EXPIRES")},
            "secret_key", algorithm="HS256")

    @staticmethod
    def generate_refresh_token(payload):
        return jwt.encode({"some": payload}, "secret_key", algorithm="HS256")

    @staticmethod
    def generate_hash_password(password):
        return hashlib.sha256(password.encode()).hexdigest()

    @staticmethod
    def decode_token(access_token):
        try:
            decode_token = jwt.decode(access_token, "secret_key", algorithms="HS256")
            return decode_token.get("id")
        except:
            return None
