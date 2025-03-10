import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import ConfirmationItem from "./ConfirmationItem";
import { NavLink } from "react-router-dom";

const ConfirmationPage = () => {
  const [UserDetails, setUserDetails] = useState();
  const [CartItems, setCartItems] = useState([{ price: null }]);
  const [Quantity, setQuantity] = useState([0]);
  const [TotalPrice, setTotalPrice] = useState(0);
  const [TotalQuantity, setTotalQuantity] = useState(0);
  const {
    userCookie,
    signinRef,
    fetchUserDetails,
    fetchCartItems,
    fetchProductsById,
  } = useContext(apiContext);
  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  useEffect(() => {
    return async () => {
      const data1 = await fetchUserDetails();
      console.log(data1);
      setUserDetails(data1);
      const data2 = await fetchCartItems();
      setQuantity(
        data2[1].map(({ count }) => {
          return count;
        })
      );
      var products = await fetchProductsById(data2[0]);
      products = products.map((el) => {
        var filter = data2[1].filter((d) => {
          return d.id === el.product_id;
        });
        el.count = filter[0].count;
        return el;
      });
      setCartItems(products);
    };
  }, [fetchCartItems, fetchProductsById, fetchUserDetails]);
  useEffect(() => {
    var totalprice = 0;
    var totalquantity = 0;

    CartItems.forEach(({ count, price }, i) => {
      totalprice = totalprice + Number(price) * Number(count);
      totalquantity = totalquantity + Number(count);
    });
    setTotalPrice(totalprice);
    setTotalQuantity(totalquantity);
  }, [CartItems, Quantity]);

  return (
    <>
      <div className="confirmationMain">
        <div className="personalInformation">
          <div className="title">Your Name:</div>
          <div className="titleValue">
            <div>
              {UserDetails
                ? UserDetails.firstname + " " + UserDetails.lastname
                : "No Name"}
            </div>
          </div>
          <div className="title">Your Address:</div>
          <div className="titleValue">
            <div>{UserDetails ? UserDetails.address : "No Address"}</div>
          </div>
          <div className="title">Your Phone:</div>
          <div className="titleValue">
            <div>
              {UserDetails ? UserDetails.mobilenumber : "No Phone Number"}
            </div>
          </div>
          <div className="title">Your Email:</div>
          <div className="titleValue">
            <div>{UserDetails ? UserDetails.email : "No Email Address"}</div>
          </div>
        </div>
        <div className="itemsMain">
          <div className="title">Your orders:</div>
          {/* <div className="itemsList"> */}
          <div className="header">
            <div className="index">Index</div>
            <div className="productName">Product Name</div>
            <div className="totalQuantity">Quantity</div>
            <div className="totalprice">TotalPrice</div>
          </div>
          <div className="Items">
            {CartItems.map((element, i) => {
              return (
                <ConfirmationItem
                  product={element}
                  quantity={element.count}
                  key={i}
                  index={i + 1}
                />
              );
            })}
          </div>
          <div className="grandTotal">
            <div className="totalitems">
              <div className="title">Total Items:{TotalQuantity}</div>
            </div>
            <div className="grandtotal">
              <div className="title">
                Grand Total:{TotalPrice}
                <i className="fa-solid fa-indian-rupee-sign" />
              </div>
              <div className="notice">(Inc. of all Taxes)</div>
            </div>
          </div>
        </div>
        <div className="confirmationButton">
          <NavLink to="/paymentPage" className="proceedBtn">
            Proceed to Payment
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
