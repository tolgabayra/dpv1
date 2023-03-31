from model import Package
from model import db

class PackageRepository:
    def create_repository(self, data: dict) -> Package:
        if data:
            package = Package(**data)
            db.session.add(package)
            db.session.commit()
            return package
        else:
            return False
        