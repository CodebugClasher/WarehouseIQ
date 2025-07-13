# models/xgb_model.py

import pandas as pd
import joblib
import os

MODEL_PATH = os.path.join("models", "xgb_demand_model.pkl")
feature_cols = ["price", "rating", "discount", "brand_index", "category_index"]

# -- Load model only once
xgb_model = None

def load_model_once():
    global xgb_model
    if xgb_model is None:
        xgb_model = joblib.load(MODEL_PATH)
    return xgb_model

# --- Use Case 1: Dictionary Output for Visualizations ---
def predict_demand_matrix(inventory_df: pd.DataFrame) -> dict:
    model = load_model_once()
    features_df = inventory_df[feature_cols].fillna(0)
    predictions = model.predict(features_df)
    return dict(zip(inventory_df["sku"], predictions))

# --- Use Case 2: Full Enriched DataFrame Output for Reorder/CSV ---
def predict_demand_matrix_with_price() -> pd.DataFrame:
    from core.utils import load_inventory_data  # to avoid circular import at top-level

    inventory_df = load_inventory_data()
    model = load_model_once()
    features_df = inventory_df[feature_cols].fillna(0)

    inventory_df["forecasted_demand"] = model.predict(features_df)

    # Business logic: Required stock is max of current logic and predicted
    inventory_df["required_stock"] = inventory_df[["forecasted_demand", "required_stock"]].max(axis=1)

    # Pricing decision logic
    inventory_df["price_action"] = inventory_df.apply(
        lambda row: "Lower Price" if row["forecasted_demand"] < row["current_stock"] else "Hold Price",
        axis=1
    )

    return inventory_df[["sku", "forecasted_demand", "required_stock", "price_action"]]


