import React, { useContext, useEffect } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { apiContext } from "../context/apiContext";

const ProfileNavbar = () => {
  const { fetchUserCookie, userCookie, fetchSellerData, sellerData,setsellerData } =
    useContext(apiContext);
  const signout = () => {
    document.cookie = "user=;path=/";
    fetchUserCookie();
    console.log(userCookie);
  };
  useEffect(() => {
    return async () => {
      setsellerData(await fetchSellerData());
    };
  }, []);

  return (
    <div className="ProfileMain">
      <div className="profileNavigation">
        <div className="opener">
          <hr />
          <hr />
          <hr />
        </div>
        <div className="navigator">
          <NavLink className="linker" to="/Profile/personalInformation">
            <div className="buttons">Personal Information</div>
          </NavLink>
          <hr />
          <NavLink className="linker" to="/Profile/SellerInformation">
            <div className="buttons">Firm Information</div>
          </NavLink>
          <hr />
          <NavLink className="linker" to="/Profile/previousorders">
            <div className="buttons">previous orders</div>
          </NavLink>
          <hr />
          <NavLink className="linker" to="/Profile/SellerForm">
            <div className="buttons">Become a Seller</div>
          </NavLink>
          <hr />
          <NavLink className="linker" to="/Signin">
            <div className="buttons" onClick={signout}>
              Signout
            </div>
          </NavLink>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default ProfileNavbar;
