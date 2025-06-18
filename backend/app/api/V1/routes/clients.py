from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.db.session import get_db
from app.api.db.models.customer import Customer
from app.api.db.schemas.schemas_customer import CustomerCreate, CustomerRead
from app.api.V1.routes.auth import get_current_user
from app.api.db.models.user import User


router = APIRouter(prefix="/clients", tags=["clients"])

@router.post('/', response_model=CustomerRead)
def create_client(
        client: CustomerCreate,
        db: Session = Depends(get_db),
        current_user: User = Depends(get_current_user)
):
    db_client= Customer(**client.model_dump(), user_id=current_user.id)
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

@router.get('/', response_model=list[CustomerRead])
def get_clients(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Customer).filter(Customer.user_id == current_user.id).all()

@router.delete("/{client_id}", status_code=204)
def delete_client(
    client_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user) 
):
    client = db.query(Customer).filter(
        Customer.id == client_id,
        Customer.user_id == current_user.id
    ).first()
    if not client:
        return {"error" : "Client not found"}
    db.delete(client)
    db.commit()
    return None