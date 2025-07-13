from fastapi import FastAPI
from .api import pricing, demand

app = FastAPI()

app.include_router(pricing.router)
app.include_router(demand.router)

@app.get("/")
def read_root():
    return {"message": "WarehouseIQ ML backend is running!"} 