import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";

const SellerForm = () => {
  const { userCookie, signinRef, registerSellerDetails } =
    useContext(apiContext);
  const [sellerLogo, setsellerLogo] = useState();
  const [sellerData, setsellerData] = useState({
    FirmName: "",
    FirmAddress: "",
    FirmPhone: "",
    FirmEmail: "",
    GSTNO: "",
  });

  const onChange = (e) => {
    setsellerData({ ...sellerData, [e.target.name]: e.target.value });
  };
  const onLogoChange = (e) => {
    setsellerLogo(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const submitForm = async () => {
    console.log(sellerData);
    if (
      sellerData.FirmName === "" ||
      sellerData.Firmaddress === "" ||
      sellerData.FirmPhone === "" ||
      sellerData.FirmEmail === "" ||
      sellerData.GSTNO === ""
    ) {
      alert("all field are necessary!");
      return;
    }
    await registerSellerDetails(sellerData, sellerLogo);
    console.log("done");
  };

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
            <input
              type="text"
              name="FirmName"
              value={sellerData.FirmName}
              onChange={onChange}
            ></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter your Firm Address</div>
          <div className="titleValue">
            <input
              type="text"
              name="FirmAddress"
              value={sellerData.FirmAddress}
              onChange={onChange}
            ></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter Firm's Phone:</div>
          <div className="titleValue">
            <input
              type="text"
              name="FirmPhone"
              value={sellerData.FirmPhone}
              onChange={onChange}
            ></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter Firm's Email:</div>
          <div className="titleValue">
            <input
              type="text"
              name="FirmEmail"
              value={sellerData.FirmEmail}
              onChange={onChange}
            ></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="title">Enter Firm's logo:</div>

          <input type="file" name="FirmLogo" onChange={onLogoChange}></input>

          <div className="title">Enter Firm's GSTNO:</div>
          <div className="titleValue">
            <input
              type="text"
              name="GSTNO"
              value={sellerData.GSTNO}
              onChange={onChange}
            ></input>
            <i className="trash1 fa-solid fa-trash"></i>
          </div>
          <div className="sellerButton">
            <NavLink onClick={submitForm}>submit</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default SellerForm;
