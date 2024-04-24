# api/predict.py
from http.server import BaseHTTPRequestHandler
from urllib.parse import parse_qs
from .shared import ElasticNet, LassoRegression, LinearModel, RidgeRegression
import numpy as np
import pandas as pd
import json

# Load data
df = pd.read_csv('data/1st_subd.csv')
X = df[['AreaSQM', 'Floors', 'Bedrooms', 'Bathrooms', 'Carport', 'Yard']]
y = df[['Price_Php_M']]

# Load model
elastic = ElasticNet()
ridge = RidgeRegression()
lasso = LassoRegression()
linear = LinearModel()

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        elastic_prediction = np.array(elastic.predict(X.values).tolist())
        ridge_prediction = np.array(ridge.predict(X.values).tolist())
        lasso_prediction = np.array(lasso.predict(X.values).tolist())
        linear_prediction = np.array(linear.predict(X.values).tolist())

        models = [
            {
                'name': 'Elastic',
                'prediction': elastic_prediction.flatten().tolist(),
            },
            {
                'name': 'Ridge',
                'prediction': ridge_prediction.flatten().tolist()
            },
            {
                'name': 'Lasso',
                'prediction': lasso_prediction.flatten().tolist()
            },
            {
                'name': 'Linear',
                'prediction': linear_prediction.flatten().tolist()
            }
        ]

        features = [
            {
                'name': 'AreaSQM',
                'values': X['AreaSQM'].values.tolist()
            },
            {
                'name': 'Floors',
                'values': X['Floors'].values.tolist()
            },
            {
                'name': 'Bedrooms',
                'values': X['Bedrooms'].values.tolist()
            },
            {
                'name': 'Bathrooms',
                'values': X['Bathrooms'].values.tolist()
            },
            {
                'name': 'Carport',
                'values': X['Carport'].values.tolist()
            },
            {
                'name': 'Yard',
                'values': X['Yard'].values.tolist()
            },
        ]

        response = {
            'models': models,
            'actualPrices': np.array(y.values).flatten().tolist(),
            'features': features
        }

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
