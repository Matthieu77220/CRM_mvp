from pydantic import BaseModel, EmailStr
from typing import Optional

class CustomerCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number : str
    city: str
    project: str
    apport: float

class CustomerRead(BaseModel):
    id: int
    class Config:
        from_attributes = True