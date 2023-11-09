import numpy as np
import pandas as pd
from flask import Flask, jsonify, request
from flask_cors import CORS

from models.ElasticNetRegression import ElasticNet
from models.LassoRegression import LassoRegression
from models.LinearRegression import LinearModel
from models.RidgeRegression import RidgeRegression

app = Flask(__name__)
CORS(app)

# Load data
df = pd.read_csv('data/1st_subd.csv')
X = df[['AreaSQM', 'Floors', 'Bedrooms', 'Bathrooms', 'Carport', 'Yard']]
y = df[['Price_Php_M']]

# Load model
elastic = ElasticNet()
ridge = RidgeRegression()
lasso = LassoRegression()
linear = LinearModel()


@app.route('/api/predict', methods=['GET'])
def predict():
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

    return jsonify(response)

@app.route('/api/estimate', methods=['POST'])
def estimatePrice():
    predicted_price = 0
    model = request.json.get("model")
    features = request.json.get("features")
    
    f_pd = pd.DataFrame([features])

    if model == 'Elastic':
        predicted_price = elastic.predict(f_pd)
    elif model == 'Ridge':
        predicted_price = ridge.predict(f_pd)
    elif model == 'Lasso':
        predicted_price = lasso.predict(f_pd)
    elif model == 'Linear':
        predicted_price = linear.predict(f_pd)

    predicted_price = round(float(predicted_price[0]), 2)

    return jsonify({'estimated': predicted_price})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
