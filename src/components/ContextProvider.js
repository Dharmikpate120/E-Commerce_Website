import React, { useRef } from "react";
import { apiContext } from "../context/apiContext";

const ContextProvider = (props) => {
  const host = "http://localhost:5000";
  const signinRef = useRef(null);
  const homeRef = useRef(null);
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
      document.cookie = `user=${user1.user};max-age=${60 * 60 * 24 * 10}`;

      fetchUserCookie();
      homeRef.current.click();
    } else {
      console.log(user1.error);
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
      document.cookie = `user=${user1.user};max-age=${60 * 60 * 24 * 10}`;
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
    console.log(userCookie);
    const item = await fetch(`${host}/userdata/addToCart`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        auth_token: userCookie.current,
      },
      body: JSON.stringify(body),
    });
    const item1 = await item.json();
    console.log(item1);
    return item;
  };
  // const fetchCart = async () => {
  //   const item = await fetch(`${host}/userdata/fetchCart`, {
  //     method: "POST",
  //     headers: {
  //       auth_token: userCookie.current,
  //     },
  //   });
  //   const item1 = await item.json();
  //   console.log(userCookie);
  // };
  // fetchCart();

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

  const fetchProductsById = async (product_ids) => {
    var products = "";
    var item1 = [];
    const ItemIndex = await fetchCartItems();
    // console.log(ItemIndex[0]);
    // console.log(ItemIndex[1]);
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
      // console.log(ItemIndex[1][i]);
    });
    
    // console.log(item1);
    return item1;
  };
  return (
    <apiContext.Provider
      value={{
        signinRef,
        homeRef,
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
        fetchProductsById,
      }}
    >
      {props.children}
    </apiContext.Provider>
  );
};

export default ContextProvider;
