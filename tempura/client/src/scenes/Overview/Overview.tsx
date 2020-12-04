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
        <SingleValueCard type="text" title="Titulo bem grande para teste" value="Totally-not-Yakuza" />
        <SingleValueCard type="money" title="Titulo" value={2000000} />
        <SingleValueCard type="money" title="Titulo" value={2000000} />
        <SingleValueCard type="unit" title="Titulo" value={1} />
        <SingleValueCard type="unit" title="Titulo" value={10} />
        <SingleValueCard type="date" title="Titulo" value={1.5} />
        <SingleValueCard type="date" title="Titulo" value={10} />
      </div>
    </>
  );
};

export default Overview;
