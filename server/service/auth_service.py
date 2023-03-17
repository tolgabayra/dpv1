from model import User
from util.helper import Helper
from typing import Optional, Dict, Any
from werkzeug.security import generate_password_hash
from model import db


class AuthService:

    @staticmethod
    def login(email: str, password: str) -> dict[str, Any] | None:
        user = User.query.filter_by(email=email).first()
        if user is None or not user.check_password(password):
            return None

        access_token = Helper.generate_access_token(user.id)
        user_id = user.id
        return {"access_token": access_token, "user_id": user_id}

    @staticmethod
    def register(username, email, password):
        hashed_password = generate_password_hash(password)
        user = User(username=username, email=email, password=hashed_password)
        db.session.add(user)
        db.session.commit()
        return user

    @staticmethod
    def get_me(user_id) -> Optional[Dict[str, Any]]:
        user = User.query.filter_by(id=user_id).first()
        if user is None:
            return None

        return {"username": user.username, "email": user.email}
