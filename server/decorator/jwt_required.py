from flask import request, jsonify
from functools import wraps
import jwt
import os


def jwt_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            auth_header = request.cookies.get('access_token')
            if auth_header:
                decoded_token = jwt.decode(auth_header, os.getenv("JWT_SECRET_KEY"), algorithms=["HS256"])
                return func(*args, **kwargs)
            else:
                return jsonify({"message": "Missing access token"}), 401
        except jwt.exceptions.InvalidSignatureError:
            return jsonify({"message": "Invalid access token"}), 401
        except jwt.exceptions.DecodeError:
            return jsonify({"message": "Invalid access token"}), 401

    return wrapper
