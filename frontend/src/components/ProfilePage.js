import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  const { userCookie, signinRef, fetchUserDetails } = useContext(apiContext);
  const [UserDetails, setUserDetails] = useState();

  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  useEffect(() => {
    if (userCookie.current && userCookie.current !== "") {
      fetchUserDetails().then((results) => {
        setUserDetails(results);
      });
    }
  }, [fetchUserDetails, userCookie]);
  return (
    UserDetails && (
      <>
        <div className="content">
          <div className="information1">
            <div className="nameAndAddress">
              <div className="label">Your Name</div>

              <div className="value">
                {UserDetails.firstname} {UserDetails.lastname}
              </div>
              <div className="label">Your Address</div>

              <div className="value">{UserDetails.address}</div>
            </div>
            <div className="profilepic">
              <div className="image">
                <img
                  src={
                    "http://localhost:5000/profile_images/" + UserDetails.image
                  }
                  alt="Profile"
                />
              </div>
            </div>
          </div>
          <div className="information2">
            <div className="phone">
              <div className="label">Your Phone</div>

              <div className="value">{UserDetails.mobilenumber}</div>
            </div>
            <div className="address">
              <div className="label">Your email</div>

              <div className="value">{UserDetails.email}</div>
            </div>
          </div>
          <div className="information2">
            <div className="phone">
              <div className="label">Your Birthdate</div>

              <div className="value">{UserDetails.Birthdate}</div>
            </div>
            <div className="address">
              <div className="label">Your gender</div>

              <div className="value">{UserDetails.Gender}</div>
            </div>
          </div>
          <div className="editButtonMain">
            <NavLink className="editButton" to="/fillUserInfo">
              Edit Information
            </NavLink>
          </div>
        </div>
      </>
    )
  );
};

export default ProfilePage;
