# WarehouseIQ

## Backend ML Architecture (Planned Integration)

A new backend will be added under `ml-app/backend/` to serve ML models (XGBoost, Prophet, etc.) via FastAPI. This will not interfere with the existing frontend structure. The backend will include:
```
ml-app/
├── backend/
│   ├── app/
│   │   ├── main.py
│   │   ├── api/
│   │   │   ├── demand.py
│   │   │   ├── pricing.py
│   │   │   ├── social.py
│   │   │   ├── weather.py
│   │   │   ├── events.py
│   │   ├── models/
│   │   │   ├── xgb_model.py
│   │   │   ├── prophet_model.py
│   │   │   ├── trend_model.py
│   │   ├── core/
│   │   │   ├── module.py
│   │   │   ├── config.py
│   │   ├── schemas/
│   │   │   ├── demand.py
│   │   │   ├── price.py
│   │   │   ├── trend.py
│   │   │   ├── weather.py
│   │   │   ├── event.py
│   │   ├── utils/
│   │   │   ├── match_titles.py
│   │   │   ├── helpers.py
├── model_weights/
│   ├── xgb_stock_predictor.pkl
│   ├── prophet_demand_model.pkl
│   ├── xgb_trend_predictor.pkl
├── requirements.txt
└── run.py
```
## Project Structure

```
WarehouseIQ/
├── frontend/           # React + TypeScript + Vite frontend
│   ├── src/
│   ├── package.json
│   ├── node_modules/
│   ├── .vite/
│   └── .bolt/
├── backend/            # Python FastAPI backend
│   ├── app/
│   ├── model_weights/
│   └── requirements.txt
├── venv/              # Python virtual environment
├── README.md
└── .gitignore
```

This backend will be cleanly separated from the frontend and will expose REST endpoints for ML-powered features.
