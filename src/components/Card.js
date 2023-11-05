import React, { useContext } from "react";
import { apiContext } from "../context/apiContext";

const Card = (props) => {
  const {addToCart} = useContext(apiContext);
  var product = props.productDetails;
  const cartButton =()=> {
    addToCart(product.product_id);
    console.log(product.product_id);
  }
  return (
    <div className="cardMain">
      <div className="likeButton">
        <i className="notliked fa-regular fa-heart"></i>
        <i className="liked fa-solid fa-heart"></i>
      </div>
      <div className="images">
        <img
          className="productImage"
          src="../images/profile_placeholder.png"
          alt=""
        />
      </div>
      <div className="titleAndPrice">
        <div className="title">{product.name}</div>
        <div className="price">Rs.{product.price}/-</div>
      </div>
      <div className="description">
      {product.description}
      </div>
      <div className="cartButton" onClick={cartButton}>Add To Cart</div>
    </div>
  );
};

export default Card;
