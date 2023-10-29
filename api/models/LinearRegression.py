import os

from joblib import dump, load
from sklearn.linear_model import LinearRegression


class LinearModel:
    def __init__(self):
        if os.path.exists('models/saved/linear_regression.joblib'):
            self.__model = load('models/saved/linear_regression.joblib')
        else:
            self.__model = LinearRegression(n_jobs=-1)

    def predict(self, X):
        return self.__model.predict(X)

    def retrain(self, X, y):
        self.__model.fit(X, y)
        dump(self.__model, 'models/saved/linear_regression.joblib')

        self.__model = load('models/saved/linear_regression.joblib')

    def score(self, X, y):
        return self.__model.score(X, y)
