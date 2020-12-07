

import React from 'react';
import { Line } from 'react-chartjs-2';
import { reduceEachLeadingCommentRange } from 'typescript';
import './styles/LineChart.css';

interface PieChartProps{
    title: String;
    labels: String[];
    data: String[];
}

const LineChart: React.FC<PieChartProps> = ({title, labels, data}) => {

    var palette = [
        'rgb(255,57,69)',   //red
        'rgb(0, 163, 51)',  //green
        'rgb(255, 205, 86)',//yellow
        'rgb(253, 106, 2)', //orange
        'rgb(54, 162, 235)',//blue
        'rgb(101, 67, 33)', //brown
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)',
        'rgb(102, 0, 161)',
        'rgb(217, 1, 102)',
        'rgb(56,71, 83)'
    ]

    const generateColors = (i: any) =>{
        var colorsArray = []

        for(var j = 0; j < i; j++){
            colorsArray[j] = palette[j % palette.length];
        }

        return colorsArray;
    }

    var colors = generateColors(labels.length);
    return(
        <>
           <div className="line-chart">
                <h3 className="chart-title">{title}</h3>
                <div className="chart-values">
                    <Line 
                        data={{
                            labels:labels,
                            datasets: [{
                                data: data,
                                backgroundColor: colors,
                                borderColor: colors,
                                lineColor: 'red',
                                fill: false
                            }]
                        }}
                        options={{
                            scales:{
                                yAxes:[{
                                    ticks:{
                                        min: 0,
                                        beginAtZero: true
                                    }
                                }]
                            }
                        }}
                    />
                </div>
            </div>
        </>
    );

};
export default LineChart;