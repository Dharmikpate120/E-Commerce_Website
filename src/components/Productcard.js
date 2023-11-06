import React from "react";
import Card from "./Card";

const Productcard = (props) => {
  var products = props.products;
  return (
    <>
      <div className="cards">
        {/* left arrow start */}
        <div className="coverLeft">
        </div>

        <div className="cardscroll">
          {products.map((element, i) => {
            return <Card productDetails={element} key={i} />;
          })}
        </div>
        <div className="coverRight">
        </div>
      </div>
    </>
  );
};

export default Productcard;
