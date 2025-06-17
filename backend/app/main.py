import sys
import os
sys.path.append(os.path.abspath(os.path.dirname(__file__)))

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.V1.routes import auth
from app.api.V1.routes import clients
from app.api.db.session import Base, engine



app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials= True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Création des tables
Base.metadata.create_all(bind=engine)

# Inclusion du routeur utilisateur
app.include_router(auth.router)

#inclusion des routes clients
app.include_router(clients.router)