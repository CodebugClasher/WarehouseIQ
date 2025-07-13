from pydantic import BaseModel
from typing import List
# ---------- Response Schemas ----------
class InventoryItem(BaseModel):
    sku: str
    product_name: str
    brand: str
    category: str
    location: str
    current_stock: int
    forecasted_demand: int
    required_stock: int
    price_action: str
    status: str

class InventoryMetrics(BaseModel):
    total_skus: int
    reorder_required: int
    critical_items: int
    low_items: int
    sufficient_items: int
    

class ReorderItem(BaseModel):
    sku: str
    product_name: str
    current_stock: int
    required_stock: int

class ReorderReport(BaseModel):
    total_reorder_items: int
    items: List[ReorderItem]

