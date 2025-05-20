from pydantic import BaseModel, EmailStr, Field, field_validator
import re
from typing import Optional 

# Schema pour l'enregistrement d'un user
class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    login: str
    password: str = Field(..., min_length=12)

    @field_validator('password')
    def password_level(cls, value):
        if (
            len(value) < 12 or
            not re.search(r'[A-Z]', value) or
            not re.search(r'[0-9]', value) or
            not re.search(r'[!@#$%^&*(),.?\":{}|<>]', value)
        ):
            raise ValueError(
                'Le mot de passe doit contenir au minimum 12 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial.'
            )
        return value

    class Config:
        from_attributes = True

# Lecture d'un user
class UserRead(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: str
    phone_number: str
    login: str

    class Config:
        from_attributes = True

# Connexion d'un user
class UserLogin(BaseModel):
    login: str
    hashed_password: str

    class Config:
        from_attributes = True

# Update d'un user
class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    phone_number: Optional[str] = None
    login: Optional[str] = None
    password: Optional[str] = Field(None, min_length=12)

    @field_validator('password')
    def password_level(cls, value):
        if value and (
            len(value) < 12 or
            not re.search(r'[A-Z]', value) or
            not re.search(r'[0-9]', value) or
            not re.search(r'[!@#$%^&*(),.?\":{}|<>]', value)
        ):
            raise ValueError(
                'Le mot de passe doit contenir au moins 12 caractères, 1 majuscule, 1 chiffre, 1 caractère spécial.'
            )
        return value

    class Config:
        from_attributes = True
