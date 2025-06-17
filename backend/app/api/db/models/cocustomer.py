from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.api.db.session import Base

class Cocustomer(Base) : 
    __tablename__ = 'cocustomer'

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255))
    phone_number = Column(String(255))
    contribution = Column(Float)