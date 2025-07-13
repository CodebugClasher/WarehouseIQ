from fastapi import APIRouter, Query
from fastapi.responses import StreamingResponse
from io import StringIO
from typing import List, Optional
from pydantic import BaseModel
from models.xgb_model import predict_demand_matrix_with_price
from core.utils import load_inventory_data
from schemas.inventory import InventoryItem, InventoryMetrics, ReorderItem, ReorderReport
import pandas as pd



router = APIRouter()

# ---------- Inventory Matrix Route ----------
@router.get("/inventory-matrix", response_model=List[InventoryItem])
def get_inventory_matrix(
    brand: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    location: Optional[str] = Query(None)
):
    # Load base data
    df = load_inventory_data()

    # Load forecasted demand and pricing suggestions
    forecast_df = predict_demand_matrix_with_price()  # Should include sku, forecasted_demand, price_action
    df = df.merge(forecast_df[['sku', 'forecasted_demand', 'price_action']], on='sku', how='left')

    # Clean and fill missing data
    df['forecasted_demand'] = df['forecasted_demand'].fillna(0).astype(int)
    df['price_action'] = df['price_action'].fillna("Hold Price")

    # Apply optional filters
    if brand:
        df = df[df['brand'] == brand]
    if category:
        df = df[df['category'] == category]
    if location:
        df = df[df['location'] == location]

    # Calculate required stock and stock ratio
    df['required_stock'] = df[['forecasted_demand', 'required_stock']].max(axis=1)
    df['stock_ratio'] = df['current_stock'] / df['required_stock'].replace(0, 1)

    # Status buckets
    df['status'] = pd.cut(
        df['stock_ratio'],
        bins=[-float('inf'), 0.4, 1.0, float('inf')],
        labels=["Critical", "Low", "Sufficient"]
    )

    # Return formatted response
    return [
        InventoryItem(
            sku=row['sku'],
            product_name=row['product_name'],
            brand=row['brand'],
            category=row['category'],
            location=row['location'],
            current_stock=row['current_stock'],
            forecasted_demand=row['forecasted_demand'],
            required_stock=row['required_stock'],
            price_action=row['price_action'],
            status=row['status']
        )
        for _, row in df.iterrows()
    ]
@router.get("/inventory-matrix/metrics", response_model=InventoryMetrics)
def get_inventory_metrics():
    df = load_inventory_data()
    forecast_df = predict_demand_matrix_with_price()  # Uses enhanced model with pricing
    df = df.merge(forecast_df[['sku', 'forecasted_demand']], on='sku', how='left')
    df['forecasted_demand'] = df['forecasted_demand'].fillna(0).astype(int)

    df['required_stock'] = df[['forecasted_demand', 'required_stock']].max(axis=1)
    df['stock_ratio'] = df['current_stock'] / df['required_stock'].replace(0, 1)

    df['status'] = pd.cut(
        df['stock_ratio'],
        bins=[-float('inf'), 0.4, 1.0, float('inf')],
        labels=['Critical', 'Low', 'Sufficient']
    )

    return InventoryMetrics(
        total_skus=df['sku'].nunique(),
        reorder_required=(df['status'].isin(['Critical', 'Low'])).sum(),
        critical_items=(df['status'] == 'Critical').sum(),
        low_items=(df['status'] == 'Low').sum(),
        sufficient_items=(df['status'] == 'Sufficient').sum()
    )
@router.get("/inventory-matrix/reorder-report", response_model=ReorderReport)
def generate_reorder_report():
    df = load_inventory_data()
    forecast_df = predict_demand_matrix_with_price()
    df = df.merge(forecast_df[['sku', 'forecasted_demand']], on='sku', how='left')
    df['forecasted_demand'] = df['forecasted_demand'].fillna(0).astype(int)

    df['required_stock'] = df[['forecasted_demand', 'required_stock']].max(axis=1)

    reorder_df = df[df['current_stock'] < df['required_stock']]

    items = [
        ReorderItem(
            sku=row['sku'],
            product_name=row['product_name'],
            current_stock=row['current_stock'],
            required_stock=row['required_stock']
        )
        for _, row in reorder_df.iterrows()
    ]

    return ReorderReport(
        total_reorder_items=len(items),
        items=items
    )


# ---------- Endpoint: Download Inventory CSV ----------
@router.get("/inventory-matrix/download")
def download_inventory_csv(
    brand: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    location: Optional[str] = Query(None)
):
    df = load_inventory_data()
    forecast_df = predict_demand_matrix_with_price()

    df = df.merge(forecast_df[['sku', 'forecasted_demand', 'price_action']], on='sku', how='left')
    df['forecasted_demand'] = df['forecasted_demand'].fillna(0).astype(int)
    df['required_stock'] = df[['forecasted_demand', 'required_stock']].max(axis=1)
    df['stock_ratio'] = df['current_stock'] / df['required_stock'].replace(0, 1)

    df['status'] = pd.cut(
        df['stock_ratio'],
        bins=[-float('inf'), 0.4, 1.0, float('inf')],
        labels=['Critical', 'Low', 'Sufficient']
    )

    # Optional filtering
    if brand:
        df = df[df['brand'] == brand]
    if category:
        df = df[df['category'] == category]
    if location:
        df = df[df['location'] == location]

    # Reorder columns to match UI
    export_cols = [
        "sku", "product_name", "brand", "category", "location",
        "current_stock", "forecasted_demand", "required_stock",
        "status", "price_action"
    ]
    csv_stream = StringIO()
    df[export_cols].to_csv(csv_stream, index=False)
    csv_stream.seek(0)

    return StreamingResponse(
        csv_stream,
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=inventory_matrix.csv"}
    )

# Note: The above code assumes that the `load_inventory_data` function and the `predict_demand_matrix` function are defined in the respective modules.
