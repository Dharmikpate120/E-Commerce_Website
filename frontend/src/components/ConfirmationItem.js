import React from "react";

const ConfirmationItem = (props) => {
  return (
    <div className="ItemMain">
      <div className="index">{props.index}</div>
      <div className="productName">{props.product.name}</div>
      <div className="totalQuantity">
        {props.product.price + " * " + props.quantity}
      </div>
      <div className="totalprice">
        {props.product.price * props.quantity}
        <i className="fa-solid fa-indian-rupee-sign" />
      </div>
    </div>
  );
};

export default ConfirmationItem;
