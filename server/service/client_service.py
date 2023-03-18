from model import Client
from model import db


class ClientService:

    @staticmethod
    def create(data):
        client = Client(
            user_id=data["user_id"],
            first_name=data["first_name"],
            last_name=data["last_name"],
            gender=data["gender"],
            age=data["age"],
            height=data["height"],
            weight=data["weight"],
            target_weight=data["weight"],
            chronic_illnesses=data["chronic_illnesses"],
            package_id=data.get("package_id") # defeault değer none zorunlu değil

        )
        db.session.add(client)
        db.session.commit()
        db.session.refresh(client)
        return client

    @staticmethod
    def update(data, id):
        client = Client.query.get(id)
        if client:
            for key, value in data.items():
                if hasattr(client, key):
                    setattr(client, key, value)
            try:
                db.session.commit()
                return True
            except:
                db.session.rollback()
                return False
        else:
            return False

    @staticmethod
    def show(id):
        client = Client.query.get(id)
        if client:
            return {
                "id": client.id,
                "user_id": client.user_id,
                "first_name": client.first_name,
                "last_name": client.last_name,
                "gender": client.gender,
                "age": client.age,
                "height": client.height,
                "weight": client.weight,
                "target_weight": client.target_weight,
                "chronic_illnesses": client.chronic_illnesses,
                "created_at": client.created_at,
                "updated_at": client.updated_at

            }
        else:
            return False

    @staticmethod
    def delete(id):
        client = Client.query.get(id)
        if client:
            db.session.delete(client)
            db.session.commit()
            return True
        else:
            return False

    @staticmethod
    def list(user_id):
        clients = Client.query.filter_by(user_id=user_id).all()
        client_list = []
        for client in clients:
            client_list.append({
                "id": client.id,
                "user_id": client.user_id,
                "first_name": client.first_name,
                "last_name": client.last_name,
                "gender": client.gender,
                "age": client.age,
                "height": client.height,
                "weight": client.weight,
                "target_weight": client.target_weight,
                "chronic_illnesses": client.chronic_illnesses,
                "created_at": client.created_at,
                "updated_at": client.updated_at
            })

        return client_list