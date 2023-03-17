from flask import Flask
from flask_cors import CORS
from controller.auth_controller import auth_controller
from model import db

app = Flask(__name__, static_folder="uploads")
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://root:root@localhost/postgres'
app.config['UPLOAD_FOLDER'] = 'uploads'

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app)
app.register_blueprint(auth_controller, url_prefix="/api/v1/auth")
if __name__ == '__main__':
    app.run(port=5000)
