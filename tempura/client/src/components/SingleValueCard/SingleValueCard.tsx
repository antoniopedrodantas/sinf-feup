import React from "react";
import { SVCNumberProp, SVCDateProp, SVCTextProp } from "./SVCMoneyProp";
import './styles/SingleValueCard.css';

type SingleValueCardProps = SVCDateProp | SVCNumberProp  | SVCTextProp;

const SingleValueCard: React.FC<SingleValueCardProps> = ({ type, title, value }) => {
  const classNames = `card card-${type}`;
  return (
    <>
      <div className={classNames}>
        <h2 className="card-title">{title}</h2>
        <h1 className="card-value">{value}</h1>
      </div>
    </>
  );
};

export default SingleValueCard;