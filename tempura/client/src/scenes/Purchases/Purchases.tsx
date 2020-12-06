import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';


const Purchases: React.FC = () => {

  const lables =["vitor", "bernas", "tone"];
  const values = ["1", "2", "3"]
  return (
    <>
      <PieChart title="a tua prima" labels={lables} data={values}/>
    </>
  );
};

export default Purchases;
