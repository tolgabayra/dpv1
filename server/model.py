from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import check_password_hash

db = SQLAlchemy()


class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    first_name = db.Column(db.String(50))
    last_name = db.Column(db.String(50))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return{
            "id": self.id,
            "username": self.username,
            "email": self.email,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    def check_password(self, password):
        return check_password_hash(self.password, password)



client_package = db.Table('client_package',
    db.Column('client_id', db.Integer, db.ForeignKey('clients.id', ondelete='CASCADE'), primary_key=True),
    db.Column('package_id', db.Integer, db.ForeignKey('packages.id', ondelete='CASCADE'), primary_key=True),
    db.Column('created_at', db.DateTime, default=datetime.utcnow),
    db.Column('updated_at', db.DateTime, onupdate=datetime.utcnow)
)



class Client(db.Model):
    __tablename__ = 'clients'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id', ondelete='CASCADE'), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    gender = db.Column(db.String(10))
    age = db.Column(db.Integer)
    height = db.Column(db.Float)
    weight = db.Column(db.Float)
    target_weight = db.Column(db.Float)
    chronic_illnesses = db.Column(db.Text)
    package_id = db.Column(db.Integer, db.ForeignKey('packages.id'), nullable=True)
    package = db.relationship('Package', backref='clients_packages')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "gender": self.gender,
            "age": self.age,
            "height": self.height,
            "weight": self.weight,
            "target_weight": self.target_weight,
            "chronic_illnesses": self.chronic_illnesses,
            "package_id": self.package_id,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }


# Randevular
class Appointment(db.Model):
    __tablename__ = 'appointments'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id'), nullable=False)
    appointment_datetime = db.Column(db.DateTime, nullable=False)
    appointment_type = db.Column(db.String(50), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    user = db.relationship('User', backref='appointments')
    client = db.relationship('Client', backref='appointments')

    




class Package(db.Model):
    __tablename__ = 'packages'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    session_count = db.Column(db.Integer, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    desc = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)
    clients = db.relationship('Client', secondary=client_package, backref='packages')

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "price": self.price,
            "session_count": self.session_count,
            "duration": self.duration,
            "desc": self.desc,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }



class DietPlan(db.Model):
    __tablename__ = 'diet_plans'

    id = db.Column(db.Integer, primary_key=True)
    start_date = db.Column(db.Date, nullable=False)
    end_date = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "start_date": self.start_date,
            "end_date": self.end_date,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }

    def __repr__(self):
        return f"Diet Plan {self.id} for User {self.user_id}"



class AnalysisResult(db.Model):
    __tablename__ = 'analysis_results'

    id = db.Column(db.Integer, primary_key=True)
    client_id = db.Column(db.Integer, db.ForeignKey('clients.id', ondelete='CASCADE'), nullable=False)
    analysis_type = db.Column(db.String(50), nullable=False)
    result = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "client_id": self.client_id,
            "analysis_type": self.analysis_type,
            "result": self.result,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
    



# ondelete='CASCADE' ifadesi, bir modelde yer alan bir kayıt silindiğinde, bu kaydın ilgili alanını referans alan diğer tüm kayıtların da otomatik olarak silinmesi anlamına gelir. Bu, birincil anahtar / yabancı anahtar ilişkileriyle ilgili olarak veritabanı bütünlüğünü korumak için kullanılır. Örneğin, bir kullanıcı hesabı silindiğinde, bu kullanıcıya ait tüm randevu kayıtlarının da silinmesini isteyebilirsiniz. Bu nedenle, ondelete='CASCADE' ifadesi kullanarak bu işlemi otomatikleştirebilirsiniz.
