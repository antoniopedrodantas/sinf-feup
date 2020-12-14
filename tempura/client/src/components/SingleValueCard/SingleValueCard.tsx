import React from "react";
import { SVCNumberProp, SVCTextProp } from "./SVCMoneyProp";
import './styles/SingleValueCard.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";

type SingleValueCardProps = SVCNumberProp  | SVCTextProp;

const SingleValueCard: React.FC<SingleValueCardProps> = ({ type, title, value, supplierID}) => {
  const classNames = `card card-${type}`;

  const suffixedValue = () => {
    switch (type) {
      case 'money': return parseFloat(value.toString()).toFixed(2) + " €";
      case 'percentage': return value + ' %';
      case 'unit': return value + ' unit' + (value != 1 ? 's' : '');
      case 'date': return value + ' day' + (value != 1 ? 's' : '');
      case 'text': default: 
        if(title == "Largest Margin Supplier"){
          return <Link  className="link2" to={"/supplier/" + supplierID}>{value}</Link>;
        }
        else{
          return value;
        }
    }
  }

  return (
    <>
      <div className={classNames}>
        <h3 className="card-title">{title}</h3>
        <h1 className="card-value">{suffixedValue()}</h1>
      </div>
    </>
  );
};

export default SingleValueCard;