from sqlalchemy.orm import Session
from app.api.db.models.user import User
from app.api.db.schemas.schemas import UserCreate, UserUpdate
from app.utils.security import hash_password

def create_user(db: Session, user: UserCreate):
    try:
        hashed_pw = hash_password(user.password)
        db_user = User(
            first_name=user.first_name,
            last_name=user.last_name,
            email=user.email,
            phone_number=user.phone_number,
            login=user.login,
            hashed_password=hashed_pw,
        )
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
        return db_user
    except Exception as e:
        db.rollback()
        print(f"Erreur lors de la création de l'utilisateur : {str(e)}")
        raise
    

def get_user_by_login(db: Session, login: str):
    return db.query(User).filter(User.login == login).first()

def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()

def update_user(db: Session, db_user: User, updates: UserUpdate):
    for field, value in updates.model_dump(exclude_unset=True).items():
        setattr(db_user, field, value)
    db.commit()
    db.refresh(db_user)
    return db_user

def delete_user(db: Session, db_user: User):
    db.delete(db_user)
    db.commit()
