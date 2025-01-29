import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";

const PreviousOrder = () => {
  const { userCookie, signinRef } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  return (
    <>
      <div className="OrdersMain">
        <div className="Ordertitle">Previous Orders</div>
        <div className="order">
          <div className="productImage">image</div>
          <div className="details">
            <div className="information">
              <div className="title">title</div>
              <div className="quantity">quantity</div>
              <div className="price">pricewhen purchased</div>
            </div>
            <div className="container">
              <div className="Description">description</div>
              <div className="date">20/01/2004</div>
            </div>
            <div className="orderButtons">
              <div className="addCart">buy again</div>
              <div className="addFavourites">Add to Favourites</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PreviousOrder;
