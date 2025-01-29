import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiContext } from "../context/apiContext";

const Signup = () => {
  const { UserSignup, fetchUserCookie } = useContext(apiContext);
  useEffect(() => {
    const signinform = document.querySelector(".signinForm");
    signinform.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // console.log("hello");
  }, []);
  const [userCred, setuserCred] = useState({
    username: "",
    email: "",
    password: "",
  });

  const inputChange = (e) => {
    setuserCred({ ...userCred, [e.target.name]: [e.target.value] });
  };

  const Submit = async () => {
    try {
      UserSignup(userCred.username, userCred.email, userCred.password);
      await fetchUserCookie();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="signinMain">
        <div className="signin">
          <div className="signinTitle">Sign Up</div>
          <form className="signinForm">
            <div className="input">
              <div className="text">Name</div>
              <input
                type="text"
                name="username"
                value={userCred.username}
                onChange={inputChange}
              />
            </div>
            <div className="input">
              <div className="text">Email</div>
              <input
                type="text"
                name="email"
                value={userCred.email}
                onChange={inputChange}
              />
            </div>

            <div className="input">
              <div className="text">Password</div>
              <input
                type="password"
                name="password"
                value={userCred.password}
                onChange={inputChange}
              />
            </div>
            <div className="SigninSubmit">
              <input
                className="SigninButton"
                type="submit"
                value="Signup"
                onClick={Submit}
              />
            </div>
          </form>
          <div className="signupLink">
            Already have an account? <NavLink to="/Signin">Sign In</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
