import React, { useContext, useRef, useState } from "react";
import { apiContext } from "../context/apiContext";

const Card = (props) => {
  const { addToCart, insertLikes, DeleteLikes } = useContext(apiContext);
  var product = props.productDetails;
  const [likeStatus, setlikeStatus] = useState(true);
  // if (product.liked) {
  //   setlikeStatus("fa-solid");
  // }

  const cartButton = () => {
    addToCart(product.product_id);
  };
  const productImages = product.image.split(";");

  const insertLike = async () => {
    setlikeStatus(false);
    if (product.liked === "fa-regular") {
      product.liked = "fa-solid";
    } else if (product.liked === "fa-solid") {
      product.liked = "fa-regular";
    }

    const response = await insertLikes(product.product_id);
    // console.log(response.alreadyPresent);
    if (response.alreadyPresent) {
      const response = await DeleteLikes(product.product_id);
    }
    setlikeStatus(true);
  };

  return (
    <div className="cardMain">
      <div className="cardInternal">
        <div className="likeButton" onClick={likeStatus ? insertLike : null}>
          <i className={`notliked ${product.liked} fa-heart`}></i>
        </div>
        <div className="images">
          <img
            className="ProductImage"
            src={`http://localhost:5000/products_images/${productImages[0]}`}
            alt=""
          />
        </div>
        <div className="cardtitle">{product.name}</div>
        {/* <div className="cardcategory">{product.category}</div> */}
        <div className="cardbottom">
          <div className="cardprice">
            Rs.{product.price}
            <i className="fa-solid fa-indian-rupee-sign" />
          </div>
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
