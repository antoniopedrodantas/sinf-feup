import React from "react";
import './styles/SingleValueCard.css';
import { SVCNumberProp, SVCTextProp } from "./SVCMoneyProp";

type SingleValueCardProps = SVCNumberProp  | SVCTextProp;

const SingleValueCard: React.FC<SingleValueCardProps> = ({ type, title, value }) => {
  const classNames = `card card-${type}`;

  const suffixedValue = () => {
    switch (type) {
      case 'money': return value + " €";
      case 'percentage': return value + ' %';
      case 'unit': return value + ' unit' + (value != 1 ? 's' : '');
      case 'date': return value + ' day' + (value != 1 ? 's' : '');
      case 'text': default: return value;
    }
  }

  return (
    <>
      <div className={classNames}>
        <h2 className="card-title">{title}</h2>
        <h1 className="card-value">{suffixedValue()}</h1>
      </div>
    </>
  );
};

export default SingleValueCard;