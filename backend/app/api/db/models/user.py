from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.api.db.session import Base

class User(Base) :
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255), unique=True, nullable=False)
    phone_number = Column(String(255), index=True)
    login = Column(String(255), unique=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    is_admin = Column(Boolean, default=True)
    is_active = Column(Boolean, default=True)
    reset_requested = Column(Boolean, default=False)