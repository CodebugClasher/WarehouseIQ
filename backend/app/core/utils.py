import pandas as pd

def load_inventory_data():
    # TODO: Load real inventory data
    data = {
        'sku': ['SKU1', 'SKU2', 'SKU3'],
        'current_stock': [100, 50, 200],
        'required_stock': [120, 60, 180],
        'max_capacity': [200, 200, 200],
        'price': [10.0, 20.0, 15.0]
    }
    return pd.DataFrame(data)

def load_forecast_data():
    # TODO: Load real forecast data
    data = {
        'sku': ['SKU1', 'SKU2', 'SKU3'],
        'forecast_7d': [110, 55, 190],
        'forecast_30d': [130, 65, 210]
    }
    return pd.DataFrame(data) 