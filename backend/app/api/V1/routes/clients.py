from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.db.session import get_db
from app.api.db.models.customer import Customer
from app.api.db.schemas.schemas_customer import CustomerCreate, CustomerRead


router = APIRouter(prefix="/clients", tags=["clients"])

@router.post("/", response_model=CustomerRead)
def create_client(client: CustomerCreate, db: Session = Depends(get_db)):
    db_client = Customer(**client.model_dump())
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@router.get('/', response_model=list[CustomerRead])
def get_clients(db: Session = Depends(get_db)):
    return db.query(Customer).all()