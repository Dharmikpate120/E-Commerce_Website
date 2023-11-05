import { useContext, useEffect, useState } from "react";
import Productcard from "./Productcard";
import { apiContext } from "../context/apiContext";

const Home = () => {
  const { userCookie, signinRef, fetchProducts } = useContext(apiContext);

  const [products, setproducts] = useState();
  const electronic = [];
  const furniture = [];
  const [loader, setloader] = useState(false);
  
  useEffect(() => {
    setloader(true);
    fetchProducts().then((results) => {
      setproducts(results);
    });
    setloader(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchProducts]);
  useEffect(() => {
    if (userCookie.current === "") {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);
  // console.log(products);
  if (products) {
    products.forEach((element) => {
      // console.log(element.category)
      if (element.category === "electronic") {
        electronic.push(element);
      } else if (element.category === "furniture") {
        furniture.push(element);
      }
    });
  }
  return (
    <div className="homeMain">
      <div className="category">electronic</div>
      <Productcard products={electronic} />

      <div className="category">furniture</div>
      <Productcard products={furniture} />
    </div>
  );
};

export default Home;
