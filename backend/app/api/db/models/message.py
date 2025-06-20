from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.api.db.session import Base

class Message(Base) :
    __tablename__= 'message'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    sender_name = Column(String(255), nullable=False)
    sender_email = Column(String(255), nullable=False)
    recipient_id = Column(Integer, ForeignKey('user.id'), nullable=False)
    content = Column(Text, nullable=False)
    sent_at = Column(DateTime(timezone=True), server_default=func.now())
    read = Column(Boolean, default=False)
   
    recipient = relationship("User", back_populates="messages_received")