import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Sales.css';


const Sales: React.FC = () => {
  return (
    <>
      <div className="row h-100">
        <div className="left-side col-md-2">
            <SideBar coreview="sales"/>
        </div>
        <div className="right-side col-md-10">
          SALES: All the other content should be placed here
        </div>
      </div>
    </>
  );
};

export default Sales;
