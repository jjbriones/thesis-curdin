# api/estimate.py
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
    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        data = json.loads(post_data)

        model = data.get("model")
        features = data.get("features")

        if isinstance(features, list):
            f_pd = pd.DataFrame(features)
        else:
            f_pd = pd.DataFrame([features])

        if model == 'Elastic':
            predicted_price = elastic.predict(f_pd)
        elif model == 'Ridge':
            predicted_price = ridge.predict(f_pd)
        elif model == 'Lasso':
            predicted_price = lasso.predict(f_pd)
        elif model == 'Linear':
            predicted_price = linear.predict(f_pd)

        if (predicted_price.shape != (1, 1) and len(predicted_price.shape) > 1) or predicted_price.shape[0] > 1:
            estimated = []
            p = predicted_price.flatten().tolist()

            for i in range(len(p)):
                rounded = round(p[i], 2)
                estimated.append(rounded)

            response = {'estimated': estimated}
        else:
            response = {'estimated': round(float(predicted_price[0]), 2)}

        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
