from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.api.db.session import get_db
from app.api.db.models.case import Case
from app.api.db.schemas.schema_case import CaseRead
from typing import List

router = APIRouter(prefix="/cases", tags=["cases"])

@router.get('/', response_model=List[CaseRead])
def get_cases(db: Session = Depends(get_db)):
    return db.query(Case).all()