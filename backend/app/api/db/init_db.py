import os
import sys


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.api.db.session import engine, Base
from app.api.db.models.user import User
from app.api.db.models.customer import Customer
from app.api.db.models.case import Case
from app.api.db.models.prescriber import Prescriber
from app.api.db.models.cocustomer import Cocustomer

def init_db():
    print("Création des tables...")
    Base.metadata.create_all(bind=engine)
    print("Tables créées avec succès.")

if __name__ == "__main__":
    init_db()
# This script initializes the database by creating all tables defined in the SQLAlchemy models.