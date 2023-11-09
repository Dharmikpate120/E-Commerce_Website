import React, { useContext } from "react";
import { apiContext } from "../context/apiContext";

const Card = (props) => {
  const { addToCart } = useContext(apiContext);
  var product = props.productDetails;
  const cartButton = () => {
    addToCart(product.product_id);
    console.log(product.product_id);
  };
  const productImages =product.image.split(";")
  console.log(productImages)

  return (
    <div className="cardMain">
      <div className="cardInternal">
        <div className="likeButton">
        <i className="notliked fa-regular fa-heart"></i>
        <i className="liked fa-solid fa-heart"></i>
      </div>
        <div className="images">
          <img
            className="productImage"
            src={`http://localhost:5000/products_images/${productImages[0]}`}
            alt=""
          />
        </div>
        <div className="cardtitle">{product.name}</div>
        {/* <div className="cardcategory">{product.category}</div> */}
        <div className="cardbottom">
          <div className="cardprice">Rs.{product.price}/-</div>
          <div className="cardrating">{product.rating} *</div>
        </div>
        {/* <div className="titleAndPrice"></div> */}
        {/* <div className="description">
      {product.description}
      </div> */}
      </div>
      <div className="cartButton" onClick={cartButton}>
        Add To Cart
      </div>
    </div>
  );
};

export default Card;
