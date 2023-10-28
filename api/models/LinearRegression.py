from sklearn.linear_model import LinearRegression
from joblib import dump, load
import os


class LinearModel:
    def __init__(self):
        if os.path.exists('models/saved/linear_regression.joblib'):
            self.__model = load('models/saved/linear_regression.joblib')
        else:
            self.__model = LinearRegression()

    def predict(self, X, y):
        self._retrain(X, y)

        return self.__model.predict([[150, 2, 4, 2, 2, 0]])

    def _retrain(self, X, y):
        self.__model.fit(X, y)
        dump(self.__model, 'models/saved/linear_regression.joblib')

        self.__model = load('models/saved/linear_regression.joblib')

    def score(self, X, y):
        return self.__model.score(X, y)
