from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class CaseBase(BaseModel):
    type_project: str
    amount_require: float
    statut: str
    customer_id: int
    date_taken_in_charge: Optional[datetime] = None
    is_urgent: Optional[bool] = None

class CaseCreate(CaseBase):
    pass

class CaseRead(CaseBase):
    id: int

    class Config:
        from_attributes = True