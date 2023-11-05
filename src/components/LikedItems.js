import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";

const LikedItems = () => {
  const { userCookie, signinRef } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  return <div>likes</div>;
};

export default LikedItems;
