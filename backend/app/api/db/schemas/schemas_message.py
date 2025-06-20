from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional

class MessageBase(BaseModel):
    sender_name: str
    sender_email: EmailStr
    content: str

class MessageCreate(MessageBase):
    recipient_id: int

class MessageRead(MessageBase):
    id: int
    recipient_id: int
    sent_at: datetime
    read: bool

    class Config:
        from_attributes = True