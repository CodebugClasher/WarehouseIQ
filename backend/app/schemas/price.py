from pydantic import BaseModel

class PriceInput(BaseModel):
    walmart_price: float
    amazon_price: float
    # Add other features as needed

class PriceOutput(BaseModel):
    should_lower_price: int
