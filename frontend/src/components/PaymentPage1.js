import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";

const PaymentPage1 = () => {
  const { userCookie, signinRef } = useContext(apiContext);
   useEffect(() => {
     if (userCookie.current === "" || userCookie.current === null) {
       signinRef.current.click();
     }
   }, [userCookie, signinRef]);

  return (
    <div className="paymentMain">
      <div className="productSummary">
        {/* <img
          src={require("../images/profile_placeholder.png")}
          alt="hello"
        /> */}
        <div className="title">Page Under Construction!</div>
        {/* <div className="title">your grand total:</div> */}
      </div>
    </div>
  );
};

export default PaymentPage1;
