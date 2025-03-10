import React, { useContext } from "react";
import { apiContext } from "../context/apiContext";

const LikeItem = (props) => {
  const { addToCart } = useContext(apiContext);
  const item = props.item;
  var image = "http://localhost:5000/products_images/";
  image = image + item.image[0];
  const cartButton = () => {
    addToCart(item.product_id);
  };
  return (
    <div className="likeItemMain">
      <div className="productimage">
        <img src={image} alt="" />
      </div>
      <div className="productdetails">
        <div className="productName">
          <span className="title">Name :</span>
          {item.name}
        </div>
        <div className="productCategory">
          <span className="title">Category :</span>
          {item.category}
        </div>
        <div className="productdescription">
          <span className="title">Description : </span>
          {item.description}
        </div>
      </div>
      <div className="priceAndRating">
        <div className="price">
          <span className="title">price : </span>
          {item.price}
          <i className="fa-solid fa-indian-rupee-sign" />
        </div>
        <div className="Rating">
          <span className="title">rating</span> :{item.rating}
        </div>
      </div>
      <div className="buttons" onClick={cartButton}>
        <div className="addToCart">addToCart</div>
      </div>
    </div>
  );
};

export default LikeItem;
