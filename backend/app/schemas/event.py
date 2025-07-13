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

class RegionRequest(BaseModel):
    region: str = "California"

class RegionSpikeDetails(BaseModel):
    demand_level: str
    spike_percentage: float
    reason: str
    duration: str
    top_products: List[str]

class EventEstimateRequest(BaseModel):
    region: str = "Bangalore"
    score: float = 5.0
    event_type: str = "Festival"

class EventEstimateResponse(BaseModel):
    demand_multiplier: float
    duration: str
    explanation: str

class UpcomingEvent(BaseModel):
    event_name: str
    event_type: str
    region: str
    date: str
    score: float
    expected_impact: str
    categories: List[str]
