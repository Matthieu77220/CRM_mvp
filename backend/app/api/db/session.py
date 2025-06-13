from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Configuration de la base de données XAMPP
DATABASE_URL = "mysql+pymysql://root:@localhost:3306/db_crm_stage"  

# Création du moteur de base de données
engine = create_engine(DATABASE_URL, echo=True)

# Création de la session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base pour les modèles SQLAlchemy
Base = declarative_base()

# Fonction pour obtenir une session de base de données
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()