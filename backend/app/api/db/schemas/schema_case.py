from pydantic import BaseModel, Field
from datetime import date
from typing import Optional

class CaseBase(BaseModel):
    type_project: str = Field(..., description="Type du projet")
    amount_require: float = Field(..., gt=0, description="Montant demandé")
    statut: str = Field(..., description="Statut du dossier")
    customer_id: int = Field(..., gt=0, description="ID du client")
    date_taken_in_charge: date = Field(..., description="Date de prise en charge (format: YYYY/MM/DD)")
    is_urgent: Optional[bool] = Field(default=False, description="Dossier urgent")

class CaseCreate(CaseBase):
    pass

class CaseRead(CaseBase):
    id: int

    class Config:
        from_attributes = True