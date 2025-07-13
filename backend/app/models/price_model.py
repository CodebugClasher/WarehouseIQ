import pickle
import os

MODEL_PATH = os.path.join(os.path.dirname(__file__), '../../model_weights/should_lower_price_model.pkl')

with open(MODEL_PATH, 'rb') as f:
    should_lower_price_model = pickle.load(f) 