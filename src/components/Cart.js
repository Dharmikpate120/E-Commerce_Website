import React, { useContext, useEffect, useRef, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const { userCookie, signinRef, fetchProductsById } = useContext(apiContext);
  const [items, setitems] = useState(null);
  var total = useRef(0);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  useEffect(() => {
    const fetchdata = async () => {
      const data = await fetchProductsById();
      setitems(data);
    };
    fetchdata();
  }, [fetchProductsById]);
  useEffect(() => {
    if (!items) {
      return;
    } else {
      total.current = 0;
      items.forEach((element) => {
        total.current = total.current + element.price * element.count;
      });
    }
  }, [items]);

  return (
    items && (
      <>
        <div className="cartMain">
          <div className="cartTitle">your cart:</div>
          <div className="cover">
            <div className="items">
              {items.map((element, i) => {
                return <CartItem item={element} key={i} />;
              })}

              <div className="finalMain">
                <div className="finalPayable">
                  <div className="headding">Sub Total:</div>
                  <div className="Finalvalue">
                    {total.current}$(inc. of all taxes)
                  </div>
                </div>
              </div>
              <div className="proceedBtn">
                <NavLink to="/confirmationPage">Proceed to Buy!</NavLink>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default Cart;
