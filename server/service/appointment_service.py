from model import Appointment
from model import db


class AppointmentService:

    @staticmethod
    def create(data):
        appointment = Appointment(
            user_id=data["user_id"],
            client_id=data["client_id"],
            appointment_datetime=data["appointment_datetime"],
            appointment_type=data["appointment_type"],
        )
        db.session.add(data)
        db.session.commit()
        db.session.refresh()
        return appointment
    
    @staticmethod
    def update(data, id):
        appointment = Appointment.query.get(id)
        if appointment:
            for key, value in data.items():
                if hasattr(appointment, key):
                    setattr(appointment, key, value)
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
        appointment = Appointment.query.get(id)
        if appointment:
            return {
                "id":appointment.id,
                "user_id": appointment.user_id,
                "client_id": appointment.client_id,
                "appointment_datetime": appointment.appointment_datetime,
                "appointment_type": appointment.appointment_type
            }
        else:
            return False
        
    @staticmethod
    def delete(id):
        appointment = Appointment.query.get(id)
        if appointment:
            db.session.delete(appointment)
            db.session.commit()
            return True
        else:
            return False
        

    @staticmethod
    def list(user_id):
        appointments = Appointment.query.filter_by(user_id).all()
        appointment_list = []
        for appointment in appointments:
            appointment_list.append({
                "id": appointment.id,
                "user_id": appointment.user_id,
                "client_id": appointment.client_id,
                "appointment_datetime": appointment.appointment_datetime,
                "appointment_type": appointment.appointment_type
            })
        return appointment_list