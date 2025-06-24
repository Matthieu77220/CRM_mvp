from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.api.db.session import Base

class User(Base) :
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(255), nullable=False)
    last_name = Column(String(255), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(255), index=True, nullable=False)
    login = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
   
    customers = relationship("Customer", back_populates="user")
    messages_received = relationship("Message", back_populates="recipient")