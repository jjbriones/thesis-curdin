from flask import Flask, jsonify
from flask_cors import CORS
from sklearn.model_selection import train_test_split
import pandas as pd

from models.LinearRegression import LinearModel
from models.ElasticNet import ElasticNet

app = Flask(__name__)
CORS(app)

# Load data
df = pd.read_csv('data/1st_subd.csv')
X = df[['AreaSQM', 'Floors', 'Bedrooms', 'Bathrooms', 'Yard', 'Carport']]
y = df[['Price_Php_M']]

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Load model
elastic = ElasticNet()
linear = LinearModel()

@app.route('/api/home', methods=['GET'])
def return_home():
    return jsonify({"message": "Hello World!"})

@app.route('/api/predict', methods=['GET'])
def predict():
    prediction = linear.predict(X_test, y_test)

    return jsonify({"prediction": prediction.tolist()})

@app.route('/api/score', methods=['GET'])
def score():
    score_prediction = linear.score(X_test, y_test)

    return jsonify({"score": score_prediction})

if __name__ == "__main__":
    app.run(debug=True, port=8080)
