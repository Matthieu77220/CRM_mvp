from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db.session import Base

class Customer(Base) :
    __tablename__= 'customer'

    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String(255))
    last_name = Column(String(255))
    email = Column(String(255)) 
    phone_number = Column(String(255))
    adress = Column(String(255))
    contribution = Column(Float)

    cocustomer_id = Column(Integer,ForeignKey('cocustomer.id'))

    cocustomer = relationship('Cocustomer', back_populates='customers')

