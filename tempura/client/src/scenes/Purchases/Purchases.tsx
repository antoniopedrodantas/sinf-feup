import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Purchases.css';



const Purchases: React.FC = () => {
  return (
    <>
      <div className="row h-100">
        <div className="left-side col-md-2">
            <SideBar />
        </div>
        <div className="right-side col-md-10">
          PURCHASES: All the other content should be placed here 
        </div>
      </div>
    </>
  );
};

export default Purchases;
