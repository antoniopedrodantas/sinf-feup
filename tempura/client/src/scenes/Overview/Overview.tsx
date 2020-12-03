import React from 'react';

import './styles/Overview.css';
import CustomTable from '../../components/CustomTable/CustomTable';

const Overview: React.FC = () => {

  const columns1 = ["Name", "Price", "Description", "Test", "Test", "Test"];
  const types1   = ["text", "percentage", "text", "money", "money","text"];
  const values1  = [
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"],
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"]
                    ];

  const columns2 = ["Name", "Sold Units"];
  const types2   = ["text","number"];
  const values2  = [
                      ["Sushi", "12"],
                      ["Tempura", "100"]
                    ];
  const columns3 = ["Name", "Purchased Units", "Price"];
  const types3   = ["text","number", "money"];
  const values3  = [
                      ["Sushi", "500", "7.8"],
                      ["Tempura", "100", "12"],
                      ["Robata", "270", "5.2"],
                      ["Wasabi", "140", "9"]
                    ];


  return (
    <>
      <CustomTable title="Product Listing" columns={columns1} type={types1} values={values1} />
      <p></p>
      <CustomTable title="Top Products Sold" columns={columns2} type={types2} values={values2} />
      <p></p>
      <CustomTable title="Top Purchased Products" columns={columns3} type={types3} values={values3} />
    </>
  );
};

export default Overview;
