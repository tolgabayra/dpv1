from flask import Blueprint, jsonify, request
from service.client_service import ClientService
from decorator.jwt_verify import jwt_required

client_controller = Blueprint("client_controller", __name__)


@client_controller.route("/", methods=["POST"])
@jwt_required
def create_client(user_id):
    data = request.get_json()
    client = ClientService.create(data, user_id)
    if client:
         return jsonify({"Message: ": "Client Created Successfully."}), 201
    else:
        return jsonify({"Message: ": "Sorry, client can not created. Check your informations"}), 500

   
@client_controller.route("by_user/<int:user_id>", methods=["GET"])
def list_client(user_id):
    clients = ClientService.list(user_id)
    return jsonify({"Clients": clients}), 200


@client_controller.route("/<int:id>", methods=["GET"])
def show_client(id):
    client = ClientService.show(id)
    if client:
        return jsonify(client), 200
    else:
        return jsonify({"Client not found."}), 404


@client_controller.route("/<int:id>", methods=["DELETE"])
def delete_client(id):
    result = ClientService.delete(id)
    if result:
        return jsonify("Client has been deleted."), 200
    else:
        return jsonify("Client is not found"), 404


@client_controller.route("/<int:id>", methods=["PUT"])
def update_client(id):
    result = ClientService.update(request.get_json(), id)
    if result:
        return jsonify("Client has been updated"), 200
    else:
        return jsonify("Client not found"), 404
