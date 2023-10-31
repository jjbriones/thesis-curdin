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
    prediction = {
        "Elastic": elastic.predict([X.iloc[0]]).tolist()[0],
        "Ridge": ridge.predict([X.iloc[0]]).tolist()[0][0],
        "Lasso": lasso.predict([X.iloc[0]]).tolist()[0],
        "Plain Linear": linear.predict([X.iloc[0]]).tolist()[0][0]
    }

    response = {
        "prediction": prediction,
        "actualPrice": y.iloc[0].values.tolist()[0]
    }

    return jsonify(response)

if __name__ == "__main__":
    app.run(debug=True, port=8080)
