import React from 'react';
import './styles/Purchases.css';
import PieChart from '../../components/Charts/PieChart';
import LineChart from '../../components/Charts/LineChart';


const Purchases: React.FC = () => {

  const lables =["vitor", "bernas", "tone", "filipe", "leonor"];
  const values = ["13", "5", "3", "5", "7"];

  const lables2 =["Jan", "Feb", "Mar", "Apr", "May"];
  const values2 = ["20", "2", "8", "5", "7"];

  return (
    <>
      <PieChart title="Supplier Region" labels={lables} data={values}/>
      <p></p>
      <LineChart title="Revenue Growth" labels={lables2} data={values2}/>
    </>
  );
};

export default Purchases;
