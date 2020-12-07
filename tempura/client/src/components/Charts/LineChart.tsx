

import React from 'react';
import { Pie } from 'react-chartjs-2';
import './styles/LineChart.css';

interface PieChartProps{
    title: String;
    labels: String[];
    data: String[];
}

const LineChart: React.FC<PieChartProps> = ({title, labels, data}) => {

    return(
        <>
           <div className="pie-chart">
                <h3 className="chart-title">{title}</h3>
                <div className="chart-values">
                    
                </div>
            </div>
        </>
    );

};
export default LineChart;