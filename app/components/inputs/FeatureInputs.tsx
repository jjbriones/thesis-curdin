'use client';
import { ChangeEvent, MouseEvent, useState } from 'react';
import { Card } from 'flowbite-react';
import { Feature } from '@/app/types';

function Forms({
  features,
  setFeatures,
  setEstimatedPrice,
  setEstimatedPriceRange,
}) {
  const [selectedModel, setSelectedModel] = useState('Ridge');

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    if (value === '' || RegExp(/^\d+(\.\d{0,2})?$/).exec(value)) {
      setFeatures({
        ...features,
        [event.target.name]: value,
      });
    } else {
      event.stopPropagation();
    }
  };

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ model: selectedModel, features: features }),
    };

    fetch('http://127.0.0.1:8080/api/estimate', requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setEstimatedPrice(data.estimated);
        setEstimatedPriceRange(() => {
          const range = 0.045;
          const min = (data.estimated - data.estimated * range).toFixed(2);
          const max = (data.estimated + data.estimated * range).toFixed(2);

          return [min, max];
        });
      });
  };

  return (
    <form>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.keys(features).map((feature, index) => (
          <div key={index}>
            <label
              htmlFor={feature}
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              {feature}
            </label>
            <input
              type="number"
              id={feature}
              name={feature}
              min={0}
              required
              onChange={handleChange}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            />
          </div>
        ))}
        <div>
          <label
            htmlFor="model"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Select Model
          </label>
          <select
            id="model"
            name="model"
            required
            onChange={(event) => setSelectedModel(event.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          >
            <option value="Ridge">Ridge</option>
            <option value="Lasso">Lasso</option>
            <option value="Elastic">ElasticNet</option>
            <option value="Linear">Linear</option>
          </select>
        </div>
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          onClick={handleSubmit}
          className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
        >
          Estimate
        </button>
      </div>
    </form>
  );
}

const FeatureInputs = () => {
  const [features, setFeatures] = useState<Feature>({
    AreaSQM: 0,
    Floors: 0,
    Bedrooms: 0,
    Bathrooms: 0,
    Yard: 0,
    Carport: 0,
  });
  const [estimatedPrice, setEstimatedPrice] = useState(0.0);
  const [estimatedPriceRange, setEstimatedPriceRange] = useState([0.0, 0.0]);

  return (
    <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6 mx-auto">
      <div className="flex flex-col mb-4">
        <div className="flex justify-center mb-5">
          <div>
            <h5 className="text-center leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
              Price Estimator
            </h5>
            <p className="text-center font-normal text-gray-500 dark:text-gray-400">
              Input your values to calculate the estimated price in millions
            </p>
          </div>
        </div>
        <div className="flex flex-row flex-wrap justify-center">
          <div className="p-4">
            <Forms
              features={features}
              setFeatures={setFeatures}
              setEstimatedPrice={setEstimatedPrice}
              setEstimatedPriceRange={setEstimatedPriceRange}
            />
          </div>
          <div className="p-4">
            <Card>
              <div className="flex flex-col gap-5">
                <div>
                  <h5 className="leading-none text-2xl font-bold text-gray-900 dark:text-white pb-2">
                    by Category
                  </h5>
                  <p className="font-normal text-gray-500 dark:text-gray-400">
                    {estimatedPrice <= 0
                      ? 'Please input values'
                      : 'Here are the predicted prices based on the finish of the house'}
                  </p>
                </div>
                <div>
                  {' '}
                  <div className="flex flex-col">
                    <div>
                      <div className="leading-none text-lg text-gray-900 dark:text-white pb-2 mt-4">
                        Luxury
                        <p className="font-normal text-gray-500 dark:text-gray-400 mt-2">
                          {estimatedPrice < 0
                            ? '0.00'
                            : (estimatedPrice * 0.955).toFixed(2) +
                              ' million - ' +
                              (estimatedPrice * 1.045).toFixed(2) +
                              ' million'}
                        </p>
                      </div>
                      <div className="leading-none text-lg text-gray-900 dark:text-white pb-2 mt-4">
                        Elegant
                        <p className="font-normal text-gray-500 dark:text-gray-400 mt-2">
                          {estimatedPrice < 0
                            ? '0.00'
                            : (estimatedPrice * 0.8 * 0.955).toFixed(2) +
                              ' million - ' +
                              (estimatedPrice * 0.8 * 1.045).toFixed(2) +
                              ' million'}
                        </p>
                      </div>
                      <div className="leading-none text-lg text-gray-900 dark:text-white pb-2 mt-4">
                        Standard
                        <p className="font-normal text-gray-500 dark:text-gray-400 mt-2">
                          {estimatedPrice < 0
                            ? '0.00'
                            : (estimatedPrice * 0.7 * 0.955).toFixed(2) +
                              ' million - ' +
                              (estimatedPrice * 0.7 * 1.045).toFixed(2) +
                              ' million'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureInputs;
