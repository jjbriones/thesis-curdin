'use client';
import {useEffect, useState} from 'react';
import LineScatterChart from "@/app/components/charts/LineScatterChart";
import {Button, Dropdown} from "flowbite-react";
import {HiChevronDown} from "react-icons/hi";

interface Feature {
    name: string;
    values: number;
}

interface Model {
    name: string;
    values: {
        x: number,
        y: number,
        features?: Feature[]
    }[];
}

export default function Page() {
    const [isFetched, setIsFetched] = useState(false);
    const [models, setModels] = useState<Model[]>([]);
    const [selectedModels, setSelectedModels] = useState<string[]>([]);
    const [series, setSeries] = useState<ApexAxisChartSeries>([]);

    useEffect(() => {
        if (!isFetched) {
            fetch('http://127.0.0.1:8080/api/predict')
                .then((response) => response.json())
                .then((data) => {
                    setIsFetched(true);

                    const models = data.models.map((model: any, index: number) => {
                        const x: number[] = Object.values(model.prediction).map((value: any) => {
                            return Number(value.toFixed(2));
                        });

                        const y: number[] = Object.values(data.actualPrices).map((value: any) => {
                            return Number(value.toFixed(2));
                        });

                        return {
                            name: model.name,
                            values: x.map((value, index) => {
                                return {
                                    x: value, y: y[index],
                                    features: Object.values(data.features).map((f: Feature) => {
                                        return {
                                            name: f.name,
                                            values: f.values[index]
                                        };
                                    })
                                };
                            })
                        };
                    });

                    setModels(models);
                    setSeries(models.map((m: Model) => {
                        return {
                            name: m.name,
                            type: 'scatter',
                            data: m.values,
                        };
                    }));
                    setSelectedModels(models.map((m: Model) => m.name));
                });
        }
    }, [isFetched]);

    useEffect(() => {
        setSeries(models.filter((model) => selectedModels.includes(model.name)).map((m: Model) => {
            return {
                name: m.name,
                type: 'scatter',
                data: m.values
            };
        }));
    }, [selectedModels]);

    const handleSeriesFilter = (event: any) => {
        if (event.target.checked) {
            setSelectedModels([...selectedModels, event.target.value])
        } else {
            setSelectedModels(selectedModels.filter((model) => model !== event.target.value));
        }
    }

    return (
        <>
            <div className="w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between mb-5">
                    <div>
                        <h5 className="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">
                            Estimated House Pricing
                        </h5>
                        <p className="text-base font-normal text-gray-500 dark:text-gray-400">Sales this week</p>
                    </div>
                    <div className="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">
                        23%
                        <svg className="w-3 h-3 ml-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 14">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13V1m0 0L1 5m4-4 4 4"/>
                        </svg>
                    </div>
                </div>
                <div>
                    <LineScatterChart title={'Prediction vs Actual'} series={series}/>
                </div>
                <div className="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between mt-5">
                    <div className="flex justify-between items-center pt-5">
                        <Dropdown label={''} dismissOnClick={false} renderTrigger={() =>
                            <Button color={'gray'}>Selected model <HiChevronDown className={'ml-2'}/> </Button>
                        }>
                            {models.map((model: any, key: number) => (
                                <Dropdown.Item key={key}>
                                    <div className="flex items-center mb-4">
                                        <input id={model.name} type="checkbox"
                                               value={model.name}
                                               onChange={handleSeriesFilter}
                                               checked={selectedModels.includes(model.name)}
                                               className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                        />
                                        <label htmlFor={model.name} className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                                            {model.name}
                                        </label>
                                    </div>
                                </Dropdown.Item>
                            ))}
                        </Dropdown>
                        <a href={'#'} className="uppercase text-sm font-semibold inline-flex items-center rounded-lg text-blue-600 hover:text-blue-700 dark:hover:text-blue-500  hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2">
                            Sales Report
                            <svg className="w-2.5 h-2.5 ml-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
