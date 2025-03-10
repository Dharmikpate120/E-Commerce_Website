import React, { useContext, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { apiContext } from "../context/apiContext";

function Navbar() {
  const { signinRef, homeRef, fetchUserCookie, userCookie } =
    useContext(apiContext);
  const location = useLocation();
  useEffect(() => {
    const searchbar = document.querySelector(".search");
    searchbar.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    fetchUserCookie();
  }, [fetchUserCookie, userCookie]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location, location.pathname]);
  return (
    <>
      <div className="NavbarMain">
        <NavLink to="/Signin" className="displayNone" ref={signinRef}></NavLink>
        <NavLink to="/" ref={homeRef} className="title">
          ecommerce web
        </NavLink>
        <form
          className="search"
          onClick={() => {
            homeRef.current.click();
          }}
        >
          <div className="searchbar">
            <input
              className="searchbar_text"
              type="text"
              name="search"
              placeholder="search for categories"
            />
            <button className="searchbutton" type="submit">
              <i className="searchicon fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </form>
        <div className="navigation">
          <NavLink to="/Favourites">
            <i className="fa-regular fa-heart"></i>
          </NavLink>
          <NavLink to="Cart">
            <i className="fa-solid fa-cart-shopping"></i>
          </NavLink>
          <NavLink to="/Profile/personalInformation" className="profile">
            Profile <i className="fa-solid fa-caret-down"></i>
            {/* <div className="profileInner">
              <div className="profileimage"></div>

              <div className="content">
                Name: dharmik patel
                <br />
              </div>
              <div className="content">mobile No: 9723361679</div>
            </div> */}
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Navbar;
