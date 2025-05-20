from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def hellow_world():
    return {"message": "Hello World !"}
