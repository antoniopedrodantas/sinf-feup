import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';


const Purchases: React.FC = () => {

  const lables =["vitor", "bernas", "tone", "filipe", "leonor"];
  const values = ["13", "5", "3", "5", "7"];

  const lables2 =["vitor", "bernas"];
  const values2 = ["13", "5"];
  return (
    <>
      <PieChart title="a tua prima" labels={lables} data={values}/>
      <p></p>
      <PieChart title="Supplier Region" labels={lables2} data={values2}/>
    </>
  );
};

export default Purchases;
