from fastapi import FastAPI
from api.V1.routes import auth
from api.db.session import Base, engine


app = FastAPI()

# Création des tables
Base.metadata.create_all(bind=engine)

# Inclusion du routeur utilisateur
app.include_router(auth.router)
