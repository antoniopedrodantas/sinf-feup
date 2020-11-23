import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Stock.css';


const Stock: React.FC = () => {
  return (
    <>
      <div className="row h-100">
        <div className="left-side col-md-2">
            <SideBar coreview="stock"/>
        </div>
        <div className="right-side col-md-10">
          STOCK: All the other content should be placed here
        </div>
      </div>
    </>
  );
};

export default Stock;
