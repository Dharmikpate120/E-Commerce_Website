import React, { useContext, useEffect, useRef, useState } from "react";
import { apiContext } from "../context/apiContext";
import { NavLink } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const {
    userCookie,
    signinRef,
    fetchProductsById,
    fetchCartItems,
    emptyCart,
  } = useContext(apiContext);
  const [items, setitems] = useState([]);
  // const [cartRefresher, setcartRefresher] = useState(false);
  var total = useRef(0);
  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  useEffect(() => {
    const fetchdata = async () => {
      if (userCookie.current || userCookie.current === "") {
        const [productIds, counts] = await fetchCartItems();
        var data = await fetchProductsById(productIds);
        data = data.map((el) => {
          var filter = counts.filter((d) => {
            return d.id === el.product_id;
          });
          el.count = filter[0].count;
          return el;
        });
        setitems(data);
        // console.log(data);
      }
    };
    fetchdata();
  }, [userCookie, fetchCartItems, fetchProductsById]);
  useEffect(() => {
    if (items.length === 0) {
      return;
    } else {
      total.current = 0;
      items.forEach((element) => {
        total.current =
          total.current + Number(element.price) * Number(element.count);
      });
    }
  }, [items]);
  return (
    items &&
    (items.length ? (
      <>
        <div className="cartMain">
          <div className="cartTitle" id="cartMain">
            your cart:
          </div>
          <div className="cover">
            <div className="items">
              {items.map((element, i) => {
                return <CartItem item={element} key={i} />;
              })}

              <div className="finalMain">
                <div className="finalPayable">
                  <div className="headding">Sub Total:</div>
                  <div className="Finalvalue">
                    {total.current}
                    <i className="fa-solid fa-indian-rupee-sign" />
                    {" (inc. of all taxes)"}
                  </div>
                </div>
              </div>
              <div className="actionButtons">
                <div
                  className="emptyBtn"
                  onClick={() => {
                    if (window.confirm("Are you Sure?")) {
                      emptyCart();
                      setitems([]);
                      window.scrollTo({ top: 0 });
                    } else {
                      return;
                    }
                  }}
                >
                  Empty Yo Cart
                </div>
                <div className="proceedBtn">
                  <NavLink to="/confirmationPage">Proceed to Buy!</NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="cartMain">
        <div className="placeHolder">No Items In Yo Cart!</div>
      </div>
    ))
  );
};

export default Cart;
