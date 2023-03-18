from flask import Blueprint, jsonify, request
from service.appointment_service import AppointmentService

appointment_controller = Blueprint("appointment_contoller", __name__)


@appointment_controller.route("/", methods=["POST"])
def create_appointment():
    data = request.get_json()
    appointment = AppointmentService.create(data)
    return jsonify({"Message: ": "Appointment Created Successfully"}), 201

@appointment_controller.route("/<int:user_id>", methods=["GET"])
def list_appointment(user_id):
    appointments = AppointmentService.list(user_id)
    return jsonify({"Appointments": appointments}), 200

@appointment_controller.route("/<int:id>", methods=["GET"])
def show_appointment(id):
    appointment = AppointmentService.show(id)
    if appointment:
        return jsonify(appointment), 200
    else:
        return jsonify({"Appointment not found"}), 404

@appointment_controller.route("/<int:id>", methods=["DELETE"])
def delete_appointment(id):
    result = AppointmentService.delete(id)
    if result:
        return jsonify("Appointment has been deleted."), 200
    else:
        return jsonify("Appointment is not found"), 404
    
@appointment_controller.route("/<int:id>", methods=["PUT"])
def update_appontment(id):
    result = AppointmentService.update(request.get_json(), id)
    if result:
        return jsonify("Appointment has been deleted"), 200
    else:
        return jsonify("Appointment not found"), 404