import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';


const Purchases: React.FC = () => {

  const lables =["Vitor", "Bernas", "Tone", "Filipe", "Leonor"];
  const values = ["13", "5", "3", "5", "7"];

  const lables2 =["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["20", "2", "8", "5", "7", "2"];
  const values3 = ["0", "20", "8", "1", "3", "2"];

  return (
    <>
      <PieChart title="Supplier Region" labels={lables} data={values}/>
      <p></p>
      <LineChart title="Revenue Growth" labels={lables2} data={values2}/>
      <p></p>
      <LineChart title="Cost of Goods Sold vs Sales Revenue" labels={lables2} data={values2} data2={values3}/>
    </>
  );
};

export default Purchases;
