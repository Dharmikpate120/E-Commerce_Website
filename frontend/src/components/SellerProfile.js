import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";

const SellerProfile = () => {
  const { userCookie, signinRef, fetchSellerData } = useContext(apiContext);
  const [sellerData, setsellerData] = useState({});

  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  useEffect(() => {
    if (userCookie.current && userCookie.current !== "") {
      async function datafetcher() {
        setsellerData(await fetchSellerData());
      }
      datafetcher();
    }
  }, [fetchSellerData, setsellerData, userCookie]);

  console.log(sellerData);
  if (sellerData.error) {
    console.log(sellerData.error);
    return (
      <>
        <div className="sellerProfileMain">
          <div className="warning">{sellerData.error}</div>
          <div className="sellerButton">
            <NavLink to="/Profile/SellerForm">register Now!</NavLink>
          </div>
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
                  sellerData && sellerData.LogoName
                }`}
                alt=""
              />
            </div>
            <div className="title">Firm's Name:</div>
            <div className="value">{sellerData && sellerData.FirmName}</div>
            <div className="title">Firm's Address:</div>
            <div className="value">{sellerData && sellerData.FirmAddress}</div>

            <div className="title">Firm's Phone:</div>
            <div className="value">{sellerData && sellerData.FirmPhone}</div>
            <div className="title">Firm's Email:</div>
            <div className="value">{sellerData && sellerData.FirmEmail}</div>
            <div className="title">Firm's GSTNO:</div>
            <div className="value">{sellerData && sellerData.GSTNo}</div>
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
