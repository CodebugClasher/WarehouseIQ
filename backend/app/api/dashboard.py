from fastapi import APIRouter
from schemas.dashboard import DashboardMetrics
from models.xgb_model import predict_demand
from models.prophet_model import average_forecasted_demand
from models.trend_model import forecast_trend_spike
from core.utils import load_inventory_data, load_forecast_data
from fastapi.responses import StreamingResponse
from io import StringIO

router = APIRouter()

@router.get("/dashboard/metrics", response_model=DashboardMetrics)
def get_dashboard_metrics():
    """
    Returns key warehouse metrics:
    - Total SKUs
    - Capacity Utilization
    - Reorder Required Count
    - Revenue Impact Estimate
    - ML Model Outputs: XGBoost, Prophet, Spike Detection
    """

    # Load inventory and forecast data
    inventory_df = load_inventory_data()  # SKU, stock, reorder, pricing
    forecast_df = load_forecast_data()    # Demand forecasts (7-day/30-day)

    # Top Metrics
    total_skus = inventory_df['sku'].nunique()
    reorder_required = inventory_df[inventory_df['current_stock'] < inventory_df['required_stock']].shape[0]
    capacity_utilization = round((inventory_df['current_stock'].sum() / inventory_df['max_capacity'].sum()) * 100, 2)
    revenue_impact = round(((inventory_df['price'] * inventory_df['required_stock']).sum()) / 1_000_000, 2)  # in $M

    # ML Models Output
    xgb_accuracy = predict_demand(return_accuracy=True)  # returns accuracy %
    prophet_trend = average_forecasted_demand()          # e.g. +23% for Q4
    spike_result = forecast_trend_spike()                # list of 15 items

    return {
        "total_skus": total_skus,
        "capacity_utilization": capacity_utilization,
        "reorder_required": reorder_required,
        "revenue_impact": revenue_impact,
        "xgb_forecast": {
            "accuracy": xgb_accuracy,
            "status": "Optimal" if xgb_accuracy > 90 else "Warning"
        },
        "prophet_seasonality": {
            "trend_summary": "Q4 holiday season trend detected",
            "demand_increase": "+{}% demand".format(prophet_trend),
            "status": "Alert" if prophet_trend > 20 else "Stable"
        },
        "trend_spike": {
            "items": len(spike_result),
            "status": "Action" if len(spike_result) > 0 else "None"
        }
    }

@router.get("/dashboard/reorder-report")
def generate_reorder_report():
    """
    Button click: Generate CSV for reorder-required SKUs.
    Rule: required_stock > current_stock
    """
    inventory_df = load_inventory_data()
    reorder_df = inventory_df[inventory_df['required_stock'] > inventory_df['current_stock']]

    csv_buffer = StringIO()
    reorder_df.to_csv(csv_buffer, index=False)
    csv_buffer.seek(0)

    return StreamingResponse(
        csv_buffer,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=reorder_report.csv"}
    )
