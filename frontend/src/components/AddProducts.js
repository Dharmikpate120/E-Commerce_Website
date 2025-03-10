import React, { useContext, useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { apiContext } from "../context/apiContext";

const AddProducts = () => {
  const { insertProduct, userCookie, signinRef, homeRef } =
    useContext(apiContext);
  const ImageInput = useRef();
  const [ProductDetails, setProductDetails] = useState({
    Name: "",
    Category: "",
    Description: "",
    Price: "",
  });
  const [ProductImages, setProductImages] = useState([]);
  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  const onTextChange = (e) => {
    setProductDetails({ ...ProductDetails, [e.target.name]: e.target.value });
  };
  const onImageChange = (e) => {
    setProductImages(e.target.files);
  };

  const submitProductDetails = () => {
    // homeRef.current.click();
    if (
      ProductDetails.Name === "" ||
      ProductDetails.Category === "" ||
      ProductDetails.Description === "" ||
      ProductDetails.Price === "" ||
      ProductImages.length < 0
    ) {
      alert("all fields are necessary!");
      return;
    }
    insertProduct(ProductDetails, Array.from(ProductImages));
    setProductDetails({
      Name: "",
      Category: "",
      Description: "",
      Price: "",
    });
    // console.log(sellerRef.current);
  };
  return (
    <div className="addProductsMain">
      <div className="productHeader">Add New Product</div>
      <div className="MainForm">
        <div className="title">Enter Product Name:</div>
        <div className="titleValue">
          <input
            type="text"
            name="Name"
            value={ProductDetails.Name}
            onChange={onTextChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Product's Category:</div>
        <select
          className="dropdownList"
          value={ProductDetails.Category}
          onChange={onTextChange}
          name="Category"
        >
          <option value="" defaultChecked>
            None
          </option>
          <option value="Mens">Men's</option>
          <option value="Womens">Women's</option>
          <option value="electronic">electronic</option>
          <option value="furniture">furniture</option>
        </select>
        <div className="title">Enter Product's Description:</div>
        <div className="titleValue">
          <input
            type="text"
            name="Description"
            value={ProductDetails.Description}
            onChange={onTextChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Product's Price:</div>
        <div className="titleValue">
          <input
            type="text"
            name="Price"
            value={ProductDetails.Price}
            onChange={onTextChange}
          ></input>
          <i className="trash1 fa-solid fa-trash"></i>
        </div>
        <div className="title">Enter Product's Images:</div>
        {/* <div className="titleValue"> */}

        <input
          className="ImageInput"
          type="file"
          multiple={true}
          name="FirmEmail"
          onChange={onImageChange}
          ref={ImageInput}
        ></input>
        {/* <div className="productImageDisplayer" onClick={ImageClicker}>
          <i className="fa-solid fa-plus"></i>
        </div> */}
        {/* <i className="trash1 fa-solid fa-trash"></i>
        </div> */}
        <div className="sellerButton">
          <NavLink onClick={submitProductDetails}>Add Product</NavLink>
        </div>
      </div>
    </div>
  );
};

export default AddProducts;
