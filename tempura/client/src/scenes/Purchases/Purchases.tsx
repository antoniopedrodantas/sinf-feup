import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';


const Purchases: React.FC = () => {

  const lables =["vitor", "bernas", "tone", "filipe", "leonor"];
  const values = ["13", "5", "3", "5", "7"];

  return (
    <>
      <PieChart title="a tua prima" labels={lables} data={values}/>
      <p></p>
      <LineChart title="Supplier Region" labels={lables} data={values}/>
    </>
  );
};

export default Purchases;
