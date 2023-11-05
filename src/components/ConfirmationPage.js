import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";
import ConfirmationItem from "./ConfirmationItem";
import { NavLink } from "react-router-dom";

const ConfirmationPage = () => {
  const { userCookie, signinRef } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  return (
    <>
      <div className="confirmationMain">
        <div className="personalInformation">
          <div className="title">Your Name:</div>
          <div className="titleValue">
            <input type="text" name="Name"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Your Address:</div>
          <div className="titleValue">
            <input type="text" name="Name"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Your Phone:</div>
          <div className="titleValue">
            <input type="text" name="Name"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Your Email:</div>
          <div className="titleValue">
            <input type="text" name="Name"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
        </div>
        <div className="itemsMain">
          <div className="title">Your orders:</div>
          {/* <div className="itemsList"> */}
          <div className="header">
            <div className="index">Index</div>
            <div className="productName">Product Name</div>
            <div className="totalQuantity">Quantity</div>
            <div className="totalprice">TotalPrice</div>
          </div>
          <div className="Items">
            <ConfirmationItem />
            <ConfirmationItem />
            <ConfirmationItem />
            <ConfirmationItem />
            <ConfirmationItem />

            {/* </div> */}
          </div>
          <div className="grandTotal">
            <div className="totalitems">
              <div className="title">Total Items:50</div>
            </div>
            <div className="grandtotal">
              <div className="title">Grand Total:10000$</div>
              <div className="notice">(Inc. of all Taxes)</div>
            </div>
          </div>
        </div>
        <div className="confirmationButton">
          <NavLink to="/paymentPage" className="proceedBtn">
            Proceed to Payment
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
