import React from 'react'
import { Pie } from 'react-chartjs-2'

interface PieChartProps{
    title: String;
    labels: String[];
    data: String[];
}

const PieChart: React.FC<PieChartProps> = ({title, labels, data}) => {
    return(
        <>
           <div className="pie-chart">
            <h3 className="chart-title">{title}</h3>
            <div className="chart-values">
                <Pie 
                    data={{
                        labels:labels,
                        datasets: [{
                            data: data,
                            backgroundColor: ['red','blue', 'green']
                        }]
                    }}
                    options={{

                    }}
                
                />
            </div>
        </div>
        </>
    );

};
export default PieChart;