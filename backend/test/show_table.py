import os
import sys
from sqlalchemy import text 


sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.api.db.session import engine

def show_tables():
    with engine.connect() as connection:
        result = connection.execute(text("SHOW TABLES;")) 
        print("Tables dans la base de données :")
        for row in result:
            print(row[0])

if __name__ == "__main__":
    show_tables()

