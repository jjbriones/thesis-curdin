import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';
import {Card, Modal} from "flowbite-react";

interface Data {
    x: number;
    y: number;
    features?: { name: string, values: number }[];
}

interface Props {
    title: string;
    series: ApexAxisChartSeries;
}

const LineScatterChart: React.FC<Props> = ({title, series}) => {
    const [options, setOptions] = useState<ApexCharts.ApexOptions>({});
    const [allData, setAllData] = useState<{ x: number; y: number; }[]>([]);
    const [seriesData, setSeriesData] = useState<ApexAxisChartSeries>(series);
    const [regressionLine, setRegressionLine] = useState<{ x: number, y: number }[]>([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedData, setSelectedData] = useState<Data>({} as Data);

    useEffect(() => {
        setAllData(() => {
            let d = [] as { x: number, y: number }[];

            series.forEach((s: { data: any[]; }) => d.push(...s.data));

            return d;
        });

        const regression = (data: { x: number; y: number; }[]) => {
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
            const n = data.length;

            data.forEach((value: { x: number; y: number; }) => {
                sumX += value.x;
                sumY += value.y;
                sumXY += value.x * value.y;
                sumX2 += value.x * value.x;
                sumY2 += value.y * value.y;
            });

            let slope = Number(((n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)).toFixed(2));
            let intercept = Number(((sumY - slope * sumX) / n).toFixed(2));

            return {slope, intercept};
        }

        let min_x = Math.min(...allData.map((d: { x: number; }) => d.x));
        let max_x = Math.max(...allData.map((d: { x: number; }) => d.x));

        if (series.every((s: { data: any[]; }) => s.data.length > 0)) {
            setRegressionLine(() => {
                const data = [] as any[];
                const {slope, intercept} = regression(allData);

                data.push({x: min_x, y: slope * min_x + intercept});
                data.push({x: max_x, y: slope * max_x + intercept});

                return data;
            });
        }

        setSeriesData([
            ...series,
            {
                name: 'Regression Line',
                type: 'line',
                data: regressionLine,
            }
        ]);

        setOptions({
            title: {text: title},
            noData: {text: 'No Data Available'},
            chart: {
                height: 350,
                type: 'line',
                events: {
                    dataPointSelection: (event: any, chartContext: any, config: any) => {
                        const {seriesIndex, dataPointIndex} = config;

                        if (chartContext.w.config.series[seriesIndex].type === 'scatter') {
                            const x = chartContext.w.config.series[seriesIndex].data[dataPointIndex].x;
                            const y = chartContext.w.config.series[seriesIndex].data[dataPointIndex].y;
                            const features = chartContext.w.config.series[seriesIndex].data[dataPointIndex].features;

                            setSelectedData({x, y, features});
                            setShowModal(true);
                        }
                    }
                },
                zoom: {enabled: true, type: 'xy'}
            },
            fill: {type: 'solid', opacity: 0.8},
            markers: {size: [5, 5]},
            tooltip: {shared: false, intersect: true},
            legend: {show: true, position: 'right'},
            xaxis: {
                type: 'numeric',
                tickAmount: 10,
                labels: {
                    formatter: (value: any) => {
                        return value.toFixed(2);
                    }
                },
                title: {
                    text: 'Predicted Price',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        color: '#263238'
                    }
                }
            },
            yaxis: {
                labels: {
                    formatter: (value: any) => {
                        return value.toFixed(2);
                    }
                },
                title: {
                    text: 'Actual Price',
                    style: {
                        fontSize: '14px',
                        fontWeight: 'bold',
                        fontFamily: 'Helvetica, Arial, sans-serif',
                        color: '#263238'
                    }
                }
            }
        });
    }, [title, series]);

    return (
        <div className="mixed-chart">
            <Chart options={options} series={seriesData} type="line" height={350}/>
            <Modal onClose={() => setShowModal(false)} show={showModal} size={'sm'}>
                <Modal.Header/>
                <Modal.Body>
                    {/* TODO: Show the features from seriesData like AreaSQM, Floors, Bathrooms, etc. */}
                    <div className={'flex justify-around flex-col'}>
                        <Card className={'max-w-sm mb-2'}>
                            <h5 className={'text-lg font-bold tracking-tight text-gray-900 dark:text-white'}>
                                Estimated Price
                            </h5>
                            <p>
                                P{selectedData.x} million
                            </p>
                        </Card>

                        <h5 className={'text-lg font-bold tracking-tight text-gray-900 dark:text-white'}>
                            Features
                        </h5>
                        <ul>
                            {selectedData.features?.map((feature, index) => (
                                <li key={index}>
                                    {feature.name}: {feature.values}
                                </li>
                            ))}
                        </ul>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default LineScatterChart;
