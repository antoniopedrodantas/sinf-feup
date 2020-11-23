import React from 'react';

import SideBar from '../../components/SideBar';
import './styles/Financial.css';

export const Financial: React.FC = () => {
  return (
    <>
      <div className="row h-100">
        <div className="left-side col-md-2">
            <SideBar coreview="financial"/>
        </div>
        <div className="right-side col-md-10">
          FINANCIAL: All the other content should be placed here
        </div>
      </div>
    </>
  ); 
};
export default Financial;