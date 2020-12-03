import React from 'react';

import './styles/Overview.css';
import CustomTable from '../../components/CustomTable/CustomTable';

const Overview: React.FC = () => {

  const columns1 = ["Name", "Price", "Description", "Test", "Test", "Test"];
  const types2   = ["text", "percentage", "text", "money", "money","text"];
  const values3  = [
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "12.4", "Windóóóhhhhh", "12", "2", "Fafe"]
                    ];


  return (
    <>
      <CustomTable columns={columns1} type={types2} values={values3} />
    </>
  );
};

export default Overview;
