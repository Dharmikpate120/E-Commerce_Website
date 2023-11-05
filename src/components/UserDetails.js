import React, { useContext, useEffect } from "react";
import { apiContext } from "../context/apiContext";

const UserDetails = () => {
  const { userCookie, signinRef } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  return (
    <>
      <div className="userDetailsMain">
        <div className="userDetails">
          <div className="firstName">
            <div className="title">Enter Your Firstname:</div>
            <div className="titleValue">
              <input type="text" name="firstname" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="lastName">
            <div className="title">Enter Your LastName:</div>
            <div className="titleValue">
              <input type="text" name="lastname" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="address">
            <div className="title">Enter Your Address:</div>
            <div className="titleValue">
              <input type="text" name="address" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="phoneNumber">
            <div className="title">Enter Your PhoneNumber:</div>
            <div className="titleValue">
              <input type="text" name="phone" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="birthDate">
            <div className="title">Enter Your BirthDate:</div>
            <div className="titleValue">
              <input type="text" name="birthdate" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="gender">
            <div className="title">Enter Your Gender:</div>
            <div className="titleValue">
              <input type="text" name="gender" />
              <i class="trash1 fa-solid fa-trash"></i>
            </div>
          </div>
          <div className="Submit">
            <input type="button" value="Submit" />
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDetails;
