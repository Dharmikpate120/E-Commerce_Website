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
      <div className="discounts">
        <div className="discount">
          <img
            src="http://localhost:5000/images/Sale_discounts.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="title">Categories:</div>
      <div className="categories">
        <div className="electronics">
          <p className="categoryTitle">Electronics</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/electronics_category.png"
            alt=""
          />
        </div>
        <div className="furnitures">
          <p className="categoryTitle">Furnitures</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Furniture_category.jpg"
            alt=""
          />
        </div>
        <div className="Mens">
          <p className="categoryTitle">Men's</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Mens_category.jpg"
            alt=""
          />
        </div>
        <div className="Women's">
          <p className="categoryTitle">Women's</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Womens_category.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="products">
        <div className="title">Electronics:</div>
        <Productcard products={electronic} />
      </div>
      <div className="products">
        <div className="title">Furnitures:</div>
        <Productcard products={furniture} />
      </div>
    </div>
  );
};

export default Home;
