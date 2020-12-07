import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';


const Purchases: React.FC = () => {

  const lables =["Vitor", "Bernas", "Tone", "Filipe", "Leonor"];
  const values = ["13", "5", "3", "5", "7"];

  const lables2 =["Jan", "Feb", "Mar", "Apr", "May", "June"];
  const values2 = ["500", "200", "120", "310", "400", "297"];
  const values3 = ["300", "180", "80", "180", "220", "110"];

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
