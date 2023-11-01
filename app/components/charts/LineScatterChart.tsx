import React, {useEffect, useState} from 'react';
import Chart from 'react-apexcharts';

interface DataPoint {
    x: number;
    y: number;
}

interface Props {
    title: string;
    data: DataPoint[] | any[];
}

const LineScatterChart: React.FC<Props> = ({title, data}) => {
    const [options, setOptions] = useState({});
    const [series, setSeries] = useState([]);

    useEffect(() => {
        const regression = (data: DataPoint[]) => {
            let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0, sumY2 = 0;
            let n = data.length;

            for (let i = 0; i < n; i++) {
                sumX += data[i].x;
                sumY += data[i].y;
                sumXY += data[i].x * data[i].y;
                sumX2 += data[i].x * data[i].x;
                sumY2 += data[i].y * data[i].y;
            }

            let slope = Number(((n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX)).toFixed(2));
            let intercept = Number(((sumY - slope * sumX) / n).toFixed(2));

            return {slope, intercept};
        }

        let min_x = Math.min(...data.map(d => d.x));
        let max_x = Math.max(...data.map(d => d.x));

        let lineData = [
            {x: min_x, y: regression(data).slope * min_x + regression(data).intercept},
            {x: max_x, y: regression(data).slope * max_x + regression(data).intercept}
        ];

        setOptions({
            title: {
                text: title,
            },
            noData: {
                text: 'Loading...',
            },
            chart: {
                height: 350,
                type: 'line',
            },
            fill: {
                type: 'solid',
                opacity: 0.8
            },
            markers: {
                size: [5, 1],
            },
            tooltip: {
                shared: false,
                intersect: false,
            },
            legend: {
                show: true
            },
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
                tickAmount: 7,
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

        setSeries([{
            name: 'Prediction',
            type: 'scatter',
            data: data
        }, {
            name: 'Regression Line',
            type: 'line',
            data: lineData
        }]);
    }, [data]);

    return (
        <div className="mixed-chart">
            <Chart options={options} series={series} type="line" height={350}/>
        </div>
    );
};

export default LineScatterChart;
