import os

from joblib import dump, load
from sklearn.linear_model import LassoCV


class LassoRegression:
    def __init__(self):
        if os.path.exists('models/saved/lasso.joblib'):
            self.__model = load('models/saved/lasso.joblib')
        else:
            self.__model = LassoCV(alphas=[0.1, 1.0, 10.0], cv=5)

    def predict(self, X):
        return self.__model.predict(X)

    def retrain(self, X, y):
        self.__model.fit(X, y)
        dump(self.__model, 'models/saved/lasso.joblib')

        self.__model = load('models/saved/lasso.joblib')

    def score(self, X, y):
        return self.__model.score(X, y)
