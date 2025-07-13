from pydantic import BaseModel
from typing import Dict, Literal

class XGBForecast(BaseModel):
    accuracy: float
    status: str

class ProphetSeasonality(BaseModel):
    trend_summary: str
    demand_increase: str
    status: str

class TrendSpike(BaseModel):
    items: int
    status: str

class DashboardMetrics(BaseModel):
    total_skus: int
    reorder_required: int
    capacity_utilization: float
    revenue_impact: float
    xgb_forecast: XGBForecast
    prophet_seasonality: ProphetSeasonality
    trend_spike: TrendSpike
