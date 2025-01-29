import React, { useContext } from "react";
import Card from "./Card";
import { apiContext } from "../context/apiContext";

const Productcard = (props) => {
  var products = props.products;
  return (
    <>
      <div className="cards">
        {/* left arrow start */}
        <div className="coverLeft"></div>

        <div className="cardscroll">
          {products.map((element, i) => {
            return <Card productDetails={element} key={i} />;
          })}
        </div>
        <div className="coverRight"></div>
      </div>
    </>
  );
};

export default Productcard;
