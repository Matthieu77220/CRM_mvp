from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.db.session import get_db
from app.api.db.models.message import Message
from app.api.db.models.user import User
from app.api.db.schemas.schemas_message import MessageCreate, MessageRead
from app.api.V1.routes.auth import get_current_user
from typing import List

router = APIRouter(
    prefix="/messages",
    tags=["messages"]
)

@router.post("/", response_model=MessageRead)
def send_message(message: MessageCreate, db: Session = Depends(get_db)):
    db_message = Message(**message.dict())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message

@router.get("/received", response_model=List[MessageRead])
def get_received_messages(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    return db.query(Message).filter(Message.recipient_id == current_user.id).order_by(Message.sent_at.desc())

@router.delete("/{message_id}")
def delete_message(
    message_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    message = db.query(Message).filter(
        Message.id == message_id,
        Message.recipient_id == current_user.id
    ).first()
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(message)
    db.commit()
    return {"detail": "Message deleted"}