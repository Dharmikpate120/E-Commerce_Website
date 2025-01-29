import React, { useContext, useEffect, useState } from "react";
import { apiContext } from "../context/apiContext";
import LikeItem from "./LikeItem";

const LikedItems = () => {
  const { userCookie, signinRef, fetchLikedItems, fetchLikedProducts } =
    useContext(apiContext);
  const [Items, setItems] = useState([]);
  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  useEffect(() => {
    const fetchdata = async () => {
      const likedProducts = await fetchLikedItems();
      var string1 = "";
      // console.log(likedProducts);
      likedProducts.forEach((element) => {
        string1 = string1 + element + ";";
      });
      const likedItems = await fetchLikedProducts(string1);
      setItems(likedItems);
    };
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="LikedItems">
      <div className="likedItemsInternal">
        {Items.length === 0 ? (
          <div className="placeHolder">no liked items</div>
        ) : (
          Items.map((element, i) => {
            return <LikeItem item={element} key={i} />;
          })
        )}
      </div>
    </div>
  );
};

export default LikedItems;
