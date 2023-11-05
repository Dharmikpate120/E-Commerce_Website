import React from "react";
import Card from "./Card";

const Productcard = (props) => {
  var products = props.products;
  return (
    <>
      <div className="cards">
        {/* left arrow start */}
        <div className="coverLeft">
          <div className="moveLeft">
            <i className="fa-solid fa-arrow-left"></i>
          </div>
        </div>

        <div className="cardscroll">
          {products.map((element, i) => {
            return <Card productDetails={element} key={i} />;
          })}
        </div>
        <div className="coverRight">
          <div className="moveRight">
            <i className="fa-solid fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Productcard;
