import React from "react";

const CartItem = (props) => {
  const item = props.item;
  return (
    <div className="item">
      <div className="productImage">
        <img
          src={"http://localhost:5000/products_images/" + item.image[0]}
          alt=""
        />
      </div>
      <div className="cartInformation">
        <div className="productTitle">{item.name}</div>
        <div className="productDescription">{item.description}</div>
      </div>
      <div className="pricing">
        <div className="price">
          <div>price:</div>
          <div>
            {item.price}
            <i className="fa-solid fa-indian-rupee-sign" />
          </div>
        </div>
        <div className="quantity">
          <div>quantity:</div>
          <div>x{item.count}</div>
        </div>
        <div className="totalPrice">
          <div>totalprice :</div>
          <div>
            {parseInt(item.price) * parseInt(item.count)}
            <i className="fa-solid fa-indian-rupee-sign" />
          </div>
        </div>
      </div>
      {/* <div className="delete">del</div> */}
    </div>
  );
};

export default CartItem;
