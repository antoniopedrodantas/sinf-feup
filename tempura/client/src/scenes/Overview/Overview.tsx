import React from 'react';
import './styles/Overview.css';
import CustomTable from '../../components/CustomTable/CustomTable';

const Overview: React.FC = () => {

  const columns1 = ["Name", "Price", "Whatever"];
  const types2= ["text", "money", "text"];
  const values3 = [
    ["Sushi", "12", "ok"],
    ["Tempura", "10", "ok"],
    ["Sashimi", "12", "ok"]
  ];

  return (
    <>
      <CustomTable columns={columns1} type={types2} values={values3} />
    </>
  );
};

export default Overview;
