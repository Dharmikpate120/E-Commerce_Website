import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiContext } from "../context/apiContext";

const Signin = () => {
  useEffect(() => {
    const signinform = document.querySelector(".signinForm");
    signinform.addEventListener("submit", (e) => {
      e.preventDefault();
    });
    // console.log("hello");
  }, []);
  const { UserSignin,fetchUserCookie } = useContext(apiContext);

  const [UserCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const CredChange = (e) => {
    setUserCred({ ...UserCred, [e.target.name]: [e.target.value] });
  };

  const Submit = async () => {
    try {

      await UserSignin(UserCred.email, UserCred.password);
      await fetchUserCookie();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinMain">
      <div className="Alert">content of Alert</div>
      <div className="signin">
        <div className="signinTitle">Log In</div>
        <form className="signinForm" action="">
          <div className="input">
            <div className="text">Email</div>
            <input
              type="text"
              name="email"
              value={UserCred.email}
              onChange={CredChange}
            />
          </div>

          <div className="input">
            <div className="text">Password</div>
            <input
              type="password"
              name="password"
              value={UserCred.password}
              onChange={CredChange}
            />
          </div>
          <div className="SigninSubmit">
            <input
              className="SigninButton"
              type="submit"
              value="Login"
              onClick={Submit}
            />
          </div>
        </form>
        <div className="signupLink">
          Don't have an account? <NavLink to="/Signup">Sign Up</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Signin;
