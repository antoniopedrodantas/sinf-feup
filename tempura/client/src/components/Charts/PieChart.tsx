import React from 'react'
import { Pie } from 'react-chartjs-2'

interface PieChartProps{
    title: String;
    labels: String[];
    data: String[];
}

const PieChart: React.FC<PieChartProps> = ({title, labels, data}) => {

    var palette = [
        'rgb(255,57,69)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(0, 163, 51)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
    ]

    const generateColors = (i: any) =>{
        var colorsArray = []

        for(var j = 0; j < i; j++){
            colorsArray[j] = palette[j];
        }

        return colorsArray;
    }

    var colors = generateColors(labels.length);

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
                            backgroundColor: colors,
                            borderColor:  colors
                            
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