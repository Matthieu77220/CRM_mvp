from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.api.db.session import get_db
from app.api.db.models.case import Case
from app.api.db.schemas.schema_case import CaseRead, CaseCreate
from typing import List

router = APIRouter(prefix="/cases", tags=["cases"])

@router.get('/', response_model=List[CaseRead])
def get_cases(db: Session = Depends(get_db)):
    return db.query(Case).all()

@router.post('/', response_model = CaseRead)
def create_case(case: CaseCreate, db: Session = Depends(get_db)):
    try:
        db_case = Case(**case.model_dump())
        db.add(db_case)
        db.commit()
        db.refresh(db_case)
        return db_case
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=400, detail=str(e))
    
@router.delete('/{case_id}', status_code=204)
def delete_case(case_id: int, db: Session = Depends(get_db)):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        raise HTTPException(status_code=404, detail="Case not found")
    db.delete(db_case)
    db.commit()
    return  

@router.put('/{case_id}', response_model=CaseRead)
def update_case(case_id: int, case: CaseCreate, db: Session = Depends(get_db)):
    db_case = db.query(Case).filter(Case.id == case_id).first()
    if not db_case:
        raise HTTPException(status_code=404, detail="Case not found")
    for key, value in case.model_dump().items():
        setattr(db_case, key, value)
    db.commit()
    db.refresh(db_case)
    return db_case