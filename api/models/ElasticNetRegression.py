import os

from joblib import dump, load
from sklearn.linear_model import ElasticNetCV


class ElasticNet:
    def __init__(self):
        if os.path.exists('models/saved/elastic_net.joblib'):
            self.__model = load('models/saved/elastic_net.joblib')
        else:
            self.__model = ElasticNetCV(alphas=[0.1, 1.0, 10.0])

    def predict(self, X):
        return self.__model.predict(X)

    def retrain(self, X, y):
        self.__model.fit(X, y)
        dump(self.__model, 'models/saved/elastic_net.joblib')

        self.__model = load('models/saved/elastic_net.joblib')

    def score(self, X, y):
        return self.__model.score(X, y)
