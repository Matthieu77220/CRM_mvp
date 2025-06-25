from sqlalchemy import Column, Integer, String, ForeignKey, Boolean, Float, Date
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.api.db.session import Base

class Case(Base) : 
    __tablename__= 'case'

    id=Column(Integer, primary_key=True, index=True, autoincrement=True)
    type_project = Column(String(255))
    amount_require = Column(Float)
    statut = Column(String(255))
    customer_id = Column(Integer, ForeignKey('customer.id'), nullable=False)
    date_taken_in_charge = Column(Date, default=func.current_date())
    is_urgent = Column(Boolean, default=False)

    customer = relationship("Customer", back_populates='cases')
