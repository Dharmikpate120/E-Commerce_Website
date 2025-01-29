import React from "react";
import image from "../images/Main_Web_Logo.png";
import { NavLink } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footermain">
      <div className="logoTitle">
        <NavLink to="/" className="websiteImage">
          <img src={image} alt="" />
        </NavLink>
        <div className="websiteTitle">
          <NavLink to="/">
            E-Commerce <br />
            Website
          </NavLink>
        </div>
      </div>
      <div className="importantLinks">
        <div className="title">Important Links</div>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/Profile/personalInformation">Profile Page</NavLink>
          </li>
          <li>
            <NavLink to="/fillUserInfo">Edit Personal Information</NavLink>
          </li>
          <li>
            <NavLink to="/Favourites">Your Favourites</NavLink>
          </li>
          <li>
            <NavLink to="/Cart">Your Cart</NavLink>
          </li>
          <li>
            <NavLink to="/Profile/SellerForm">Become A Seller</NavLink>
          </li>
          <li>
            <NavLink to="/Profile/SellerInformation">
              Firm's Information
            </NavLink>
          </li>
          <li>
            <NavLink to="/addNewProduct">Add New Product</NavLink>
          </li>
        </ul>
      </div>
      <div className="contactUs">
        <div className="title">Contact Us</div>
        <div className="linksMain">
          <NavLink to="mailto:dharmik7458@gmail.com">
            <i className="fa-solid fa-envelope"></i>
            <div>E-Commerce Website</div>
          </NavLink>
          <NavLink to="tel:+91-9723361679">
            <i className="fa-solid fa-phone"></i>
            <div>+91-9723361679</div>
          </NavLink>
          <NavLink to="/">
            <i className="fa-brands fa-facebook"></i>
            <div>Facebook</div>
          </NavLink>
          <NavLink to="/">
            <i className="fa-brands fa-instagram"></i>
            <div>Instagram</div>
          </NavLink>
          <NavLink to="/">
            <i className="fa-brands fa-x-twitter"></i>
            <div>Twitter</div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Footer;
