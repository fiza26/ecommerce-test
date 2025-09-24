from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routers import products, orders
from .database import Base, engine

Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost:5173",  
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(products.router)
app.include_router(orders.router)

@app.get("/")
def read_root():
    return {"message": "FastAPI backend is running!"}
