# api/shared.py
import pandas as pd
from models.ElasticNetRegression import ElasticNet
from models.LassoRegression import LassoRegression
from models.LinearRegression import LinearModel
from models.RidgeRegression import RidgeRegression

# Load data
df = pd.read_csv('data/1st_subd.csv')
X = df[['AreaSQM', 'Floors', 'Bedrooms', 'Bathrooms', 'Carport', 'Yard']]
y = df[['Price_Php_M']]

# Load model
elastic = ElasticNet()
ridge = RidgeRegression()
lasso = LassoRegression()
linear = LinearModel()
