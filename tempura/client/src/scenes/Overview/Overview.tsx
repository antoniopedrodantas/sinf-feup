import React from 'react';
import SingleValueCard from 'src/components/SingleValueCard/SingleValueCard';
import './styles/Overview.css';

const Overview: React.FC = () => {
  return (
    <>
      <SingleValueCard type="text" title="Titulo" value="3"/>
      <SingleValueCard type="text" title="Titulo" value="2"/>
    </>
  );
};

export default Overview;
