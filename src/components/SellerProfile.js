import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";

const SellerProfile = () => {
  const { sellerData, fetchSellerData, setsellerData } = useContext(apiContext);
  useEffect(() => {
    return async () => {
      setsellerData(await fetchSellerData());
    };
  }, []);

  if (sellerData.error) {
    console.log(sellerData.error);
    return (
      <>
        <div className="sellerProfileMain">
          <div className="warning">{sellerData.error}</div>
          <div className="sellerButton"><NavLink to="/Profile/SellerForm">register Now!</NavLink></div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="sellerProfileMain">
          <div className="title">Your Firm's Information:</div>

          <div className="sellerInternal">
            <div className="logoMain">
              <img
                src={`http://localhost:5000/seller_logo/${
                  sellerData && sellerData.firm_logo
                }`}
                alt=""
              />
            </div>
            <div className="title">Firm's Name:</div>
            <div className="value">
              {sellerData && sellerData.firm_name}
            </div>
            <div className="title">Firm's Address:</div>
            <div className="value">
              {sellerData && sellerData.firm_address}
            </div>

            <div className="title">Firm's Phone:</div>
            <div className="value">
              {sellerData && sellerData.firm_phone}
            </div>
            <div className="title">Firm's Email:</div>
            <div className="value">
              {sellerData && sellerData.firm_email}
            </div>
            <div className="title">Firm's GSTNO:</div>
            <div className="value">
              {sellerData && sellerData.GSTNO}
            </div>
            <div className="sellerButton">
              <NavLink to="/Profile/SellerForm">Edit Information</NavLink>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default SellerProfile;
