import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";

const SellerForm = () => {
  const { userCookie, signinRef } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  return (
    <>
      <div className="SellerformMain">
        <div className="sellerform">
          <div className="title">Enter your Firm Name</div>
          <div className="titleValue">
            <input type="text" name="FirmName"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter your Firm Address</div>
          <div className="titleValue">
            <input type="text" name="FirmAddress"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter GST Number:</div>
          <div className="titleValue">
            <input type="text" name="GSTNo"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter Firm's Email:</div>
          <div className="titleValue">
            <input type="text" name="FirmEmail"></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerForm;
