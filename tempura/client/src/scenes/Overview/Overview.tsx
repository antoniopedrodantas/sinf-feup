import React from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import './styles/Overview.css';

const Overview: React.FC = () => {
  return (
    <>
    <div id="cenas">
      <SingleValueCard type="text" title="Titulo" value="3"/>
      <SingleValueCard type="text" title="Titulo" value="2" />
        <SingleValueCard type="text" title="Titulo" value="14,700 €"  />
      </div>
      <div id="cenas">
        <SingleValueCard type="text" title="Titulo" value="3" />
        <SingleValueCard type="text" title="Titulo" value="2" />
        <SingleValueCard type="text" title="Titulo" value="2000000 €" />
      </div>
    </>
  );
};

export default Overview;
