import numpy as np
import pandas as pd
from flask import Flask, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split

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

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

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
            'prediction': elastic_prediction.flatten().tolist()
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

    response = {
        "models": models,
        "actualPrices": np.array(y.values).flatten().tolist()
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
