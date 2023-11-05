import React, { useContext, useEffect, useRef, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";
const FillUserInfo = () => {
  const { userCookie, signinRef, setUserDetails } = useContext(apiContext);
  const profileRef = useRef(null);
  const uploader = useRef(null);
  const [profileImageShow, setprofileImageShow] = useState(null);
  const [profileImage, setprofileImage] = useState(null);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  const [UserData, setUserData] = useState({
    Firstname: "",
    Lastname: "",
    Address: "",
    Phone: "",
    Birthdate: "",
    Gender: "",
    seller: "",
  });
  const OnChange = (e) => {
    setUserData({ ...UserData, [e.target.name]: e.target.value });
    
  };

  const submitPersonalInformation = async () => {
    await setUserDetails(UserData,profileImage);
    profileRef.current.click();
  };
  const uploadClicker = () => {
    uploader.current.click();
  };
  const PIChange = (e) => {
    setprofileImage(e.target.files[0]);
    
    setprofileImageShow(URL.createObjectURL(e.target.files[0]));
  };
  return (
    <div className="UserInfoMain">
      <div className="UserInfoForm">
        <div className="imageUploader">
          <div className="title">Upload your image</div>
          <div className="profileImageDisplayer" onClick={uploadClicker}>
            {profileImageShow && (
              <img src={`${profileImageShow}`} alt="Your profile image" />
            )}
          </div>
          <input
            type="file"
            ref={uploader}
            className="uploader"
            onChange={PIChange}
            name="profileImage"
          />
        </div>

        <div className="title">Enter Your Firstname</div>
        <div className="titleValue">
          <input
            type="text"
            name="Firstname"
            value={UserData.Firstname}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Your lastname</div>
        <div className="titleValue">
          <input
            type="text"
            name="Lastname"
            value={UserData.Lastname}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Your Address</div>
        <div className="titleValue">
          <input
            type="text"
            name="Address"
            value={UserData.Address}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Your Phone Number</div>
        <div className="titleValue">
          <input
            type="text"
            name="Phone"
            value={UserData.Phone}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Your BirthDate</div>
        <div className="titleValue">
          <input
            type="text"
            name="Birthdate"
            value={UserData.Birthdate}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Your Gender</div>
        <div className="titleValue">
          <input
            type="text"
            name="Gender"
            value={UserData.Gender}
            onChange={OnChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <NavLink to="/Profile/personalInformation" ref={profileRef}></NavLink>
        <div className="Buttons">
          <div className="proceedBtn" onClick={submitPersonalInformation}>
            Submit
          </div>
          <div className="proceedBtn">Finish Later!</div>
        </div>
      </div>
    </div>
  );
};

export default FillUserInfo;
