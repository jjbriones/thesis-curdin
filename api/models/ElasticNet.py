from sklearn.linear_model import ElasticNetCV
from joblib import dump, load
import os

class ElasticNet:
    def __init__(self):
        if os.path.exists('models/saved/elastic_net.joblib'):
            self.__model = load('models/saved/elastic_net.joblib')
        else:
            self.__model = ElasticNetCV(alphas=[0.1, 1.0, 10.0])

    def predict(self, X, y):
        self._retrain(X, y)

        return self.__model.predict([[150, 2, 4, 2, 2, 0]])

    def _retrain(self, X, y):
        self.__model.fit(X, y)
        dump(self.__model, 'models/saved/elastic_net.joblib')

        self.__model = load('models/saved/elastic_net.joblib')

    def score(self, X, y):
        return self.__model.score(X, y)
