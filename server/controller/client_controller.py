from flask import Blueprint, jsonify, request
from service.client_service import ClientService

client_controller = Blueprint("client_controller", __name__)


@client_controller.route("/", methods=["POST"])
def create_client():
    data = request.get_json()
    client = ClientService.create(data)
    return jsonify({"Message: ": "Client Created Successfully."}), 201


@client_controller.route("/<int:user_id>", methods=["GET"])
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
