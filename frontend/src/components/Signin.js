import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiContext } from "../context/apiContext";

const Signin = () => {
  useEffect(() => {
    const signinform = document.querySelector(".signinForm");
    signinform.addEventListener("submit", (e) => {
      e.preventDefault();
    });
  }, []);
  const { UserSignin, fetchUserCookie } = useContext(apiContext);
  const [alert, setalert] = useState();
  const [displayAlert, setdisplayAlert] = useState("none");
  const [UserCred, setUserCred] = useState({
    email: "",
    password: "",
  });

  const CredChange = (e) => {
    setUserCred({ ...UserCred, [e.target.name]: [e.target.value] });
  };

  const Submit = async () => {
    try {
      setalert(await UserSignin(UserCred.email, UserCred.password));
      setdisplayAlert("flex");
      setTimeout(() => {
        setalert("");
        setdisplayAlert("none");
      }, [3000]);
      await fetchUserCookie();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="signinMain">
      <div className="Alert" style={{ display: `${displayAlert}` }}>
        {alert}
      </div>
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
