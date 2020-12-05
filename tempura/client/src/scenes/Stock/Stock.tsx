import React from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import './styles/Stock.css';


const Stock: React.FC = () => {

  const columns1 = ["Name", "Price", "Description", "Test", "Test", "Test"];
  const types1   = ["text", "text", "text", "money", "money", "money"];
  const values1  = [
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"],
                      ["Sushi", "12", "Best in Japan", "1", "244", "Fafe"],
                      ["Tempura", "10", "CR7 das Tempuras", "1", "2", "Fafe"],
                      ["Sashimi", "24", "Windóóóhhhhh", "122", "12", "Fafe"]
                    ];
  return (
    <>
      <div className="stock-content">
        {/* adicionar algo para simular date selection */}
        <div className="date-selection">
          # 2019 ?
        </div>
        <div className="top-cards">
          <SingleValueCard type="money" title="Total assets in Stock" value={52500}/>
          <SingleValueCard type="text" title="Inventory Turnover" value="3.4"/>
        </div>
        <div className="bottom-cards">
          <SingleValueCard type="text" title="Average Sales quantity" value="80"/>
          <SingleValueCard type="text" title="Inventory Period" value="107.4"/>
        </div>
        <div className="product-listing">
          <CustomTable title="Product Listing" columns={columns1} type={types1} values={values1} />
        </div>
      </div>
    </>
  );
};

export default Stock;
