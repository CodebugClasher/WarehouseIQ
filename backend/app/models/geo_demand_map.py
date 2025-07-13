# models/geo_demand.py

from typing import List, Dict
import pandas as pd
import requests
import os

from models.xgb_model import predict_demand_matrix
from core.utils import load_inventory_data

GOOGLE_GEOCODE_URL = "https://maps.googleapis.com/maps/api/geocode/json"

# 🔐 API key should be loaded from env
GOOGLE_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")


def resolve_lat_lng(region_name: str) -> Dict:
    """
    Get latitude and longitude using Google Geocoding API.
    """
    params = {
        "address": region_name,
        "key": GOOGLE_API_KEY
    }
    response = requests.get(GOOGLE_GEOCODE_URL, params=params)
    data = response.json()

    if data["status"] == "OK":
        loc = data["results"][0]["geometry"]["location"]
        return {"lat": loc["lat"], "lng": loc["lng"]}
    else:
        return {"lat": None, "lng": None}


def get_geo_demand_spikes() -> List[Dict]:
    """
    Detect demand spikes and return enriched geospatial response for map overlays.
    Output:
    [
        {
            "region": "California",
            "lat": 36.77,
            "lng": -119.41,
            "spike_percent": 24.5,
            "demand_level": "High",
            "reason": "Detected via ML",
            "duration": "2 days",
            "products": ["SKU123", "SKU456"]
        },
        ...
    ]
    """
    df = load_inventory_data()
    forecast = predict_demand_matrix(df)
    df["forecasted_demand"] = df["sku"].map(forecast)

    region_group = df.groupby("location").agg({
        "forecasted_demand": "sum",
        "required_stock": "sum"
    }).reset_index()

    results = []

    for _, row in region_group.iterrows():
        location = row["location"]
        total_forecast = row["forecasted_demand"]
        total_required = row["required_stock"]
        spike_pct = round(100 * (total_forecast - total_required) / max(total_required, 1), 2)

        # Only return if spike is significant
        if spike_pct < 10:
            continue

        level = (
            "High" if spike_pct > 30 else
            "Moderate" if spike_pct > 20 else
            "Mild"
        )

        # Get top 5 products driving spike
        top_products = df[df["location"] == location].nlargest(5, "forecasted_demand")["sku"].tolist()

        # Get lat/lng using Google Maps
        coords = resolve_lat_lng(location)

        results.append({
            "region": location,
            "lat": coords["lat"],
            "lng": coords["lng"],
            "spike_percent": spike_pct,
            "demand_level": level,
            "reason": "Detected via ML pattern",
            "duration": "2 days",
            "products": top_products
        })

    return results
