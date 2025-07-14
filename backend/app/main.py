from fastapi import FastAPI
from .api import pricing, demand

app = FastAPI()

app.include_router(pricing.router)
app.include_router(demand.router)

@app.get("/")
def read_root():
    return {"message": "WarehouseIQ ML backend is running!"} 
origins = [
    "http://localhost:5173",  # Replace with your React app's URL during development
    # Add your production frontend URL here when deploying
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)