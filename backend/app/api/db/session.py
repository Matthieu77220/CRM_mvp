from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#url de connexion
SQLALCHEMY_DATABASE_URL = "mysql+mysqlconnector://root:Md28042005md*@localhost:3306/db_crm_stage"

#création du moteur de la bdd
engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'charset' : 'utf8mb4'})

#création de la session pour réguler les transactions
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

#classe de la base 
Base = declarative_base()

#fonction pour avoir les sessions de la bdd

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()