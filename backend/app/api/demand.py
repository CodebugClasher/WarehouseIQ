from fastapi import APIRouter, Query
from typing import List, Optional
from pydantic import BaseModel
from models.trend_model import detect_demand_spikes

router = APIRouter()

# ---------- Endpoint: Region Spike Details ----------
@router.post("/demand-map/region-details", response_model=RegionSpikeDetails)
def get_region_spike_info(region_request: RegionRequest):
    region = region_request.region
    event_info = get_event_metadata(region)
    forecast_data = get_region_spike_forecast(region)

    return RegionSpikeDetails(
        demand_level=forecast_data["demand_level"],
        spike_percentage=forecast_data["spike_percentage"],
        reason=event_info["reason"],
        duration=event_info["duration"],
        top_products=forecast_data["top_products"]
    )

# ---------- Endpoint: All Spikes Summary ----------
@router.get("/demand-map/spikes", response_model=AllSpikes)
def get_all_spike_regions():
    """
    Returns a summary of all demand spikes by region.
    Used for placing colored markers on the Google Earth/Map UI.
    """
    spike_data = detect_demand_spikes()

    region_cards = []
    for entry in spike_data:
        region_cards.append(RegionSpikeInfo(
            region=entry['region'],
            demand_level=entry['demand_level'],
            spike_percentage=entry['spike_percent'],
            reason=entry['reason'],
            duration=entry['duration'],
            affected_products=entry['products']
        ))

    return AllSpikes(regions=region_cards)

# ---------- Endpoint: Inventory Matrix Table ----------
@router.get("/inventory-matrix", response_model=List[InventoryItem])
def get_inventory_matrix(
    brand: Optional[str] = Query(None),
    category: Optional[str] = Query(None),
    location: Optional[str] = Query(None)
):
    df = load_inventory_data()
    forecast_dict = predict_demand_matrix()

    if brand:
        df = df[df['brand'] == brand]
    if category:
        df = df[df['category'] == category]
    if location:
        df = df[df['location'] == location]

    items = []
    for _, row in df.iterrows():
        sku = row['sku']
        forecasted = forecast_dict.get(sku, 0)
        required = max(forecasted, row['required_stock'])
        stock_ratio = row['current_stock'] / required if required > 0 else 0

        if stock_ratio < 0.4:
            status = "Critical"
        elif stock_ratio < 1.0:
            status = "Low"
        else:
            status = "Sufficient"

        price_action = "Lower Price" if forecasted < row['current_stock'] else "Hold Price"

        items.append(InventoryItem(
            sku=sku,
            product_name=row['product_name'],
            brand=row['brand'],
            category=row['category'],
            location=row['location'],
            current_stock=row['current_stock'],
            forecasted_demand=forecasted,
            required_stock=required,
            price_action=price_action,
            status=status
        ))

    return items

# ---------- Endpoint: Summary Metrics ----------
@router.get("/inventory-matrix/metrics", response_model=InventoryMetrics)
def get_inventory_metrics():
    df = load_inventory_data()
    forecast_dict = predict_demand_matrix()

    total_skus = df['sku'].nunique()
    critical = 0
    low = 0
    sufficient = 0
    reorder = 0

    for _, row in df.iterrows():
        sku = row['sku']
        forecasted = forecast_dict.get(sku, 0)
        required = max(forecasted, row['required_stock'])
        stock_ratio = row['current_stock'] / required if required > 0 else 0

        if stock_ratio < 0.4:
            critical += 1
            reorder += 1
        elif stock_ratio < 1.0:
            low += 1
            reorder += 1
        else:
            sufficient += 1

    return InventoryMetrics(
        total_skus=total_skus,
        reorder_required=reorder,
        critical_items=critical,
        low_items=low,
        sufficient_items=sufficient
    )

# ---------- Endpoint: Reorder Report ----------
@router.get("/inventory-matrix/reorder-report", response_model=ReorderReport)
def generate_reorder_report():
    df = load_inventory_data()
    forecast_dict = predict_demand_matrix()

    report = []
    for _, row in df.iterrows():
        sku = row['sku']
        forecasted = forecast_dict.get(sku, 0)
        required = max(forecasted, row['required_stock'])

        if row['current_stock'] < required:
            report.append(ReorderItem(
                sku=sku,
                product_name=row['product_name'],
                current_stock=row['current_stock'],
                required_stock=required
            ))

    return ReorderReport(
        total_reorder_items=len(report),
        items=report
    )

@router.get("/demand-map/summary-cards", response_model=List[RegionCard])
def get_all_region_summaries():
    regions = ["California", "Texas", "New York", "Florida"]
    cards = []

    for region in regions:
        event_info = get_event_metadata(region)
        forecast_data = get_region_spike_forecast(region)

        cards.append(RegionCard(
            region=region,
            spike_percentage=forecast_data["spike_percentage"],
            reason=event_info["reason"],
            duration=event_info["duration"],
            demand_level=forecast_data["demand_level"]
        ))

    return cards
from models.geo_demand import get_geo_demand_spikes

@router.get("/demand-map/geo-overlay")
def get_geo_demand_overlay():
    return get_geo_demand_spikes()

