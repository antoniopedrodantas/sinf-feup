import React from 'react';
import { Line } from 'react-chartjs-2';
import './styles/Charts.css';

interface PieChartProps{
    title: String;
    labels: String[];
    data: String[];
    data2?: String[];
}

const LineChart: React.FC<PieChartProps> = ({title, labels, data, data2}) => {

    return(
        <>
           <div className="line-chart">
                <h3 className="chart-title">{title}</h3>
                <div className="chart-values line-values">
                    <Line 
                        data={{
                            labels:labels,
                            datasets: [
                            {
                                data: data,
                                label: 'Cost of Goods Solds',
                                backgroundColor: 'rgb(255,57,69)',
                                borderColor: 'rgb(255,57,69)',
                                fill: false,
                                lineTension: 0,
                                pointRadius: 6,
                                pointHoverRadius: 8
                            },
                            {
                                data: data2,
                                label: 'Sales Revenue',
                                backgroundColor: 'green',
                                borderColor: 'green',
                                fill: false,
                                lineTension: 0,
                                pointRadius: 6,
                                pointHoverRadius: 8
                            }
                        ]
                        }}
                        options={{
                            scales:{
                                yAxes:[{
                                    ticks:{
                                        min: 0,
                                        beginAtZero: true,
                                        fontSize:16,
                                        fontColor:'white'
                                    }
                                }],
                                xAxes:[{
                                    gridLines: {
                                        display: false,
                                    },
                                    ticks:{
                                        fontSize:16,
                                        fontColor:'white'
                                    }
                                }]
                            },
                            legend:{
                                display: data2 == null ? false: true, 
                                position: 'bottom'
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );

};
export default LineChart;