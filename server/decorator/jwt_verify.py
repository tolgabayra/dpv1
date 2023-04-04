from flask import request, jsonify
from functools import wraps
from util.helper import Helper
import jwt
import os


def jwt_required(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        try:
            auth_header = request.cookies.get('access_token')
            if auth_header:
                decoded_token = Helper.decode_token(auth_header)
                print(decoded_token)
                kwargs['user_id'] = decoded_token
                return func(*args, **kwargs)
            else:
                return jsonify({"message": "Missing access token"}), 401
        except jwt.exceptions.InvalidSignatureError:
            return jsonify({"message": "Invalid access token"}), 401
        except jwt.exceptions.DecodeError:
            return jsonify({"message": "Invalid access token"}), 401

    return wrapper
