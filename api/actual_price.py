# api/actual_price.py
from http.server import BaseHTTPRequestHandler
import numpy as np
import pandas as pd
import json

# Load data
df = pd.read_csv('data/1st_subd.csv')
y = df[['Price_Php_M']]

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        response = {'actual': np.array(y.values).flatten().tolist()}
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        self.wfile.write(json.dumps(response).encode())
