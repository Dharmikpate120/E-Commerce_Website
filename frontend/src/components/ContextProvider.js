import React, { useRef, useState } from "react";
import { apiContext } from "../context/apiContext";

const ContextProvider = (props) => {
  const [sellerData, setsellerData] = useState({});
  const host = "http://localhost:5000";
  const signinRef = useRef(null);
  const homeRef = useRef("a");
  const sellerRef = useRef(null);
  const userCookie = useRef("");

  const UserSignin = async (email, password) => {
    const body = {
      email: `${email}`,
      password: `${password}`,
    };
    const user = await fetch(`${host}/auth/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });
    const user1 = await user.json();

    if (user1.user) {
      document.cookie = `user=${user1.user};path=/;max-age=${
        60 * 60 * 24 * 10
      }`;

      fetchUserCookie();
      homeRef.current.click();
      return;
    } else {
      return user1.error;
    }
  };

  const fetchCookie = (cookieKey) => {
    var cookies = document.cookie;
    var cookiesArray = cookies.split(";");
    var cookiesExploded = [];
    cookiesArray.forEach((element, index) => {
      cookiesExploded[index] = element.split("=");
      cookiesExploded[index][0] = cookiesExploded[index][0].trim();
    });
    var id = null;
    cookiesExploded.forEach((element, index) => {
      if (element[0] === cookieKey) {
        id = index;
      }
    });
    if (cookiesExploded[id] != null) {
      return cookiesExploded[id][1];
    }
    return null;
  };
  const fetchUserCookie = () => {
    userCookie.current = fetchCookie("user");
  };

  const UserSignup = async (username, email, password) => {
    const body = {
      username: `${username}`,
      email: `${email}`,
      password: `${password}`,
    };
    const user = await fetch(`${host}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const user1 = await user.json();
    if (user1.user) {
      document.cookie = `user=${user1.user};path=/;max-age=${
        60 * 60 * 24 * 10
      }`;
      fetchUserCookie();
      homeRef.current.click();
    } else {
      console.log(user1.error);
    }
  };

  const setUserDetails = async (UserData, profileImage) => {
    const body1 = new FormData();
    body1.append("Firstname", UserData.Firstname);
    body1.append("Lastname", UserData.Lastname);
    body1.append("Address", UserData.Address);
    body1.append("Phone", UserData.Phone);
    body1.append("Birthdate", UserData.Birthdate);
    body1.append("Gender", UserData.Gender);
    body1.append("seller", "0");
    body1.append("profileImage", profileImage);
    try {
      await fetch(`${host}/userdata/userdetails`, {
        method: "POST",
        headers: {
          auth_token: `${userCookie.current}`,
        },
        body: body1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserDetails = async () => {
    const details = await fetch(`${host}/userdata/fetchUserDetails`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth_token: userCookie.current,
      },
    });
    const details1 = await details.json();

    return details1[0];
  };

  const fetchProducts = async () => {
    const products = await fetch(`${host}/userdata/fetchProducts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const products1 = await products.json();
    return products1;
  };

  const addToCart = async (product_id) => {
    const body = { product_id: product_id };
    const item = await fetch(`${host}/userdata/addToCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        auth_token: userCookie.current,
      },
      body: JSON.stringify(body),
    });
    const item1 = await item.json();
    return item;
  };
  const fetchCartItems = async () => {
    var productIdArray = [];
    var productCountArray = [];

    const item = await fetch(`${host}/userdata/fetchCart`, {
      method: "POST",
      headers: {
        auth_token: userCookie.current,
      },
    });
    const item1 = await item.json();
    if (item1.EmptyJWT) {
      return [];
    }
    const value = item1.product_id.split(";");
    value.forEach((element1) => {
      const value1 = element1.split("x");

      productIdArray.push(value1[0]);
      productCountArray.push(value1[1]);
    });
    productIdArray.pop();
    productCountArray.pop();
    return [productIdArray, productCountArray];
  };

  const emptyCart = async () => {
    await fetch(`${host}/userdata/emptyCart`, {
      method: "POST",
      headers: {
        auth_token: userCookie.current,
      },
    });
  };

  const fetchProductsById = async (product_ids) => {
    var products = "";
    var item1 = [];
    const ItemIndex = product_ids;
    if (ItemIndex.length === 0) {
      return [];
    }
    ItemIndex[0].forEach((element) => {
      products = products + `${element};`;
    });
    var items = await fetch(`${host}/userdata/fetchProductsId`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product_id: products }),
    });
    items = await items.json();
    ItemIndex[0].forEach((element, i) => {
      var count = parseInt(element);
      items.forEach((element1) => {
        if (element1.product_id === count) {
          item1.push({ ...element1, count: ItemIndex[1][i] });
        }
      });
    });

    return item1;
  };

  const fetchLikedProducts = async (products) => {
    var items = await fetch(`${host}/userdata/fetchProductsId`, {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ product_id: products }),
    });
    items = await items.json();
    return items;
  };

  const registerSellerDetails = async (sellerData, sellerLogo) => {
    const body = new FormData();

    body.append("FirmName", sellerData.FirmName);
    body.append("FirmAddress", sellerData.FirmAddress);
    body.append("FirmPhone", sellerData.FirmPhone);
    body.append("FirmEmail", sellerData.FirmEmail);
    body.append("GSTNO", sellerData.GSTNO);
    body.append("sellerLogo", sellerLogo);

    const response = await fetch(`${host}/userdata/registerSeller`, {
      method: "POST",
      headers: { auth_token: userCookie.current },
      body: body,
    });
  };

  const fetchSellerData = async () => {
    const response = await fetch(`${host}/userdata/fetchSellerData`, {
      method: "POST",
      headers: { auth_token: userCookie.current },
    });

    const response1 = await response.json();
    return response1;
  };
  const insertProduct = async (ProductDetails, ProductImages) => {
    const body = new FormData();
    ProductImages.forEach((element) => {
      body.append("productImages", element);
    });
    body.append("Name", ProductDetails.Name);
    body.append("Category", ProductDetails.Category);
    body.append("Description", ProductDetails.Description);
    body.append("Price", ProductDetails.Price);

    const response = await fetch(`${host}/userdata/insertProduct`, {
      method: "POST",
      headers: { auth_token: userCookie.current },
      body: body,
    });
  };

  const fetchLikedItems = async () => {
    const response = await fetch(`${host}/userdata/fetchLikedItems`, {
      method: "POST",
      headers: {
        auth_token: userCookie.current,
      },
    });
    const response1 = await response.json();
    if (response1.EmptyJWT) {
      return [];
    }
    return response1;
  };

  const insertLikes = async (product_id) => {
    const response = await fetch(`${host}/userdata/InsertLikes`, {
      method: "POST",
      headers: {
        auth_token: userCookie.current,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: product_id }),
    });
    const response1 = await response.json();
    return response1;
  };

  const DeleteLikes = async (product_id) => {
    const response = await fetch(`${host}/userdata/DeleteLikes`, {
      method: "POST",
      headers: {
        auth_token: userCookie.current,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product_id: product_id }),
    });
    const response1 = await response.json();
    return response1;
  };

  return (
    <apiContext.Provider
      value={{
        signinRef,
        homeRef,
        sellerRef,
        UserSignin,
        UserSignup,
        fetchCookie,
        userCookie,
        fetchUserCookie,
        fetchProducts,
        setUserDetails,
        fetchUserDetails,
        addToCart,
        fetchCartItems,
        emptyCart,
        fetchProductsById,
        registerSellerDetails,
        fetchSellerData,
        sellerData,
        setsellerData,
        insertProduct,
        fetchLikedItems,

        insertLikes,
        DeleteLikes,
        fetchLikedProducts,
      }}
    >
      {props.children}
    </apiContext.Provider>
  );
};

export default ContextProvider;
