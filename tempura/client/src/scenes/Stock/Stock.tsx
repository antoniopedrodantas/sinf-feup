import React from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import CustomTable from '../../components/CustomTable/CustomTable';
import './styles/Stock.css';


const Stock: React.FC = () => {

  const columns1 = ["ID", "Name", "Stock", "Sold", "Avg. Purchase Price", "Avg. Selling Price"];
  const types1   = ["text", "text", "number", "number", "money", "money"];
  const values1  = [
                      ["0001", "Sushi", "550", "345", "9.2", "15.0"],
                      ["0002", "Hossomakis", "550", "345", "9.6", "16.2"],
                      ["0003", "Sashimi", "5150", "345", "11.5", "17.5"],
                      ["0004", "Yakisoba", "550", "345", "8.8", "13.0"],
                      ["0005", "Robata", "550", "345", "5.2", "10.0"],
                      ["0006", "Uramakis", "550", "345", "9.9", "16.5"],
                      ["0007", "Niguiri", "550", "345", "7.5", "14.7"],
                      ["0008", "Tempura", "550", "345", "6.1", "12.2"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"],
                      ["0009", "Wasabi", "550", "345", "10.2", "10.9"]

                    ];
  return (
    <>
      <div className="stock-content">
        {/* apenas para simular date-selection component */}
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

/*
TODO
- scroll after certain products
*/