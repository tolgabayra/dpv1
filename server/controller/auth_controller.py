from flask import Blueprint, jsonify, request
from service.auth_service import AuthService
from util.helper import Helper
from util.logger import logger
import jwt


auth_controller = Blueprint("auth_controller", __name__)

@auth_controller.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data["email"]
    password = data["password"]

    data = AuthService.login(email, password)
    if data is None:
        return jsonify({"message": "Invalid email or password"}), 401

    response = jsonify({"access_token": data["access_token"], "user_id": data["user_id"]})
    response.set_cookie('access_token', data["access_token"], httponly=True)
    logger.info('This is an info message')
    return response, 200


@auth_controller.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data["username"]
    email = data["email"]
    password = data["password"]

    if not all([username, email, password]):
        return jsonify({'message': 'Missing required parameters'}), 400

    user = AuthService.register(username, email, password)
    return jsonify({'message': 'User registered successfully', 'user': user.to_dict()}), 201


@auth_controller.route("/logout", methods=["POST"])
def logout():
    response = jsonify({"message": "User logged out successfully"})
    response.delete_cookie('access_token')
    response.delete_cookie("refresh_token")
    return response, 200



@auth_controller.route("/verify_token", methods=["POST"])
def verify_token():
    access_token = request.cookies.get('access_token')
    if access_token is None:
        return jsonify({"error": "Missing access token"}), 401
    try:
        print("---------------------1------------------------")
        decoded_token = jwt.decode(access_token, "secret_key", algorithms="HS256")
        print("---------------------2------------------------")
        print(decoded_token)
        return jsonify({"user_id": decoded_token.get("some")}), 200
    except jwt.exceptions.ExpiredSignatureError:
        return jsonify({"error": "Token has expired"}), 401
    except jwt.exceptions.InvalidSignatureError:
        return jsonify({"error": "Token signature is invalid"}), 401
    except jwt.exceptions.DecodeError:
        return jsonify({"error": "Token decoding failed"}), 401
