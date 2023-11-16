'use client';
import { ChangeEvent, useState, MouseEvent } from 'react';
import { Card } from 'flowbite-react';

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
        }
        else {
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
                    const range = 0.02;
                    const min = (data.estimated - data.estimated * range).toFixed(2);
                    const max = (data.estimated + data.estimated * range).toFixed(2);

                    return [min, max];
                });
            });
    };

    return (
        <form>
            <div className="grid grid-cols-1 gap-6">
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="AreaSQM"
                    >
                        AreaSQM
                    </label>
                    <input
                        id="AreaSQM"
                        type="text"
                        required
                        name="AreaSQM"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="Floors"
                    >
                        Floors
                    </label>
                    <input
                        id="Floors"
                        type="text"
                        required
                        name="Floors"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="Bedrooms"
                    >
                        Bedrooms
                    </label>
                    <input
                        id="Bedrooms"
                        type="text"
                        required
                        name="Bedrooms"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="Bathrooms"
                    >
                        Bathrooms
                    </label>
                    <input
                        id="Bathrooms"
                        type="text"
                        required
                        name="Bathrooms"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="Yard"
                    >
                        Carport
                    </label>
                    <input
                        id="Yard"
                        type="text"
                        required
                        name="Yard"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
                <div>
                    <label
                        className="text-gray-700 dark:text-gray-200"
                        htmlFor="Carport"
                    >
                        Yard
                    </label>
                    <input
                        id="Carport"
                        type="text"
                        required
                        name="Carport"
                        onChange={handleChange}
                        className="w-full px-4 py-2 mt-2 text-base text-gray-700 placeholder-gray-400 bg-gray-100 border border-transparent rounded-lg focus:border-gray-500 focus:bg-white focus:outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-300 dark:placeholder-gray-600 dark:focus:ring-0"
                    />
                </div>
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
                <div className="flex justify-end">
                    <button
                        type="submit"
                        onClick={handleSubmit}
                        className="px-4 py-2 text-sm font-medium tracking-wide text-white capitalize bg-blue-600 rounded-full hover:bg-blue-500 focus:outline-none focus:bg-blue-500"
                    >
                        Estimate
                    </button>
                </div>
            </div>
        </form>
    );
}

function FeatureInputs() {
    const [features, setFeatures] = useState({
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
        <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <div className="flex justify-between mb-5">
                <div>
                    <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                        Price Estimator
                    </h5>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                        Input your values to calculate the estimated price in millions
                    </p>
                </div>
            </div>
            <div className="flex flex-row flex-wrap justify-between mx-2 mb-4">
                <div>
                    <Forms
                        features={features}
                        setFeatures={setFeatures}
                        setEstimatedPrice={setEstimatedPrice}
                        setEstimatedPriceRange={setEstimatedPriceRange}
                    />
                </div>
                <div>
                    <Card>
                        <div className="flex justify-between mb-5">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    Estimated Price
                                </h5>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    {estimatedPrice < 0
                                        ? 'Please input values'
                                        : estimatedPrice + ' million'}
                                </p>
                            </div>
                        </div>
                    </Card>
                    <Card className={'mt-4'}>
                        <div className="flex justify-between mb-5">
                            <div>
                                <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                                    Estimated Price Range (+-2%)
                                </h5>
                                <p className="text-base font-normal text-gray-500 dark:text-gray-400">
                                    {estimatedPriceRange[0] < 0
                                        ? 'Please input values'
                                        : estimatedPriceRange[0] + ' - ' + estimatedPriceRange[1] + ' million'
                                    }
                                </p>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}

export default FeatureInputs;
