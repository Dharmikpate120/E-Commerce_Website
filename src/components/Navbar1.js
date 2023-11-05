import React, { useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { apiContext } from "../context/apiContext";

function Navbar() {
  const { signinRef, homeRef, fetchUserCookie, fetchUserDetails } =
    useContext(apiContext);

  useEffect(() => {
    const searchbar = document.querySelector(".search");
    searchbar.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    const NavbarMain = document.querySelector(".NavbarMain");
    const navpadding = document.querySelector(".navpadding");
    navpadding.style.setProperty("height", `${NavbarMain.clientHeight}px`);
    window.addEventListener("resize", () => {
      navpadding.style.setProperty("height", `${NavbarMain.clientHeight}px`);
    });
    fetchUserCookie();
  }, [fetchUserCookie]);
  // fetchUserDetails();

  return (
    <>
      <div className="NavbarMain">
        <NavLink to="/Signin" className="displayNone" ref={signinRef}></NavLink>
        <NavLink to="/" ref={homeRef} className="title">
          ecommerce web
        </NavLink>
        <form className="search">
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
      <div className="navpadding"></div>
    </>
  );
}

export default Navbar;
