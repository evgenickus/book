from fastapi import FastAPI
from . import database
from .routers import users, articles, auth
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = ["http://localhost:3000"]

app.add_middleware(
  CORSMiddleware,
  allow_origins=origins,
  allow_credentials=True,
  allow_methods=["*"],
  allow_headers=["*"],
)

def get_db():
  db = database.SessionLocal()
  try:
    yield db
  finally:
    db.close

app.include_router(auth.router, prefix="/token", tags=["authentincate"])
app.include_router(users.router, prefix="/users", tags=["users"])
app.include_router(articles.router, prefix="/articles", tags=["articles"])


