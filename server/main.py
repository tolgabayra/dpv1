from flask import Flask
from flask_cors import CORS
from controller.auth_controller import auth_controller
from controller.client_controller import client_controller
from controller.appointment_controller import appointment_controller
from model import db

from config import Config


app = Flask(__name__, static_folder="uploads")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost/postgres'
app.config.from_object(Config)
app.config['UPLOAD_FOLDER'] = 'uploads'

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app, supports_credentials=True)
app.register_blueprint(auth_controller, url_prefix="/api/v1/auth")
app.register_blueprint(client_controller, url_prefix="/api/v1/clients")
app.register_blueprint(appointment_controller, url_prefix="/api/v1/appointments")

if __name__ == '__main__':
    app.run(port=5000)
