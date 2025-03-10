import { useContext, useEffect, useState } from "react";
import Productcard from "./Productcard";
import { apiContext } from "../context/apiContext";
import { HashLink } from "react-router-hash-link";

const Home = () => {
  const { userCookie, signinRef, fetchProducts, fetchLikedItems } =
    useContext(apiContext);

  const [products, setproducts] = useState();
  const electronic = [];
  const furniture = [];
  const mens = [];
  const womens = [];

  useEffect(() => {
    const fetchdata = async () => {
      if (userCookie.current || userCookie.current === "") {
        var likedItems = await fetchLikedItems();
        var product = await fetchProducts();

        product.forEach((_, i) => {
          if (likedItems?.includes(`${product[i].product_id}`)) {
            product[i] = { ...product[i], liked: "fa-solid" };
          } else {
            product[i] = { ...product[i], liked: "fa-regular" };
          }
        });
        setproducts(product);
      }
    };

    fetchdata();
  }, [fetchLikedItems, fetchProducts, userCookie]);

  useEffect(() => {
    if (userCookie.current === "" || userCookie.current === null) {
      signinRef.current.click();
    }
  }, [userCookie, signinRef]);

  if (products) {
    products.forEach((element) => {
      if (element.category === "electronic") {
        electronic.push(element);
      } else if (element.category === "furniture") {
        furniture.push(element);
      } else if (element.category === "Mens") {
        mens.push(element);
      } else if (element.category === "Womens") {
        womens.push(element);
      }
    });
  }
  return (
    <div className="homeMain">
      <div className="discounts">
        <div className="discount">
          <img src="http://localhost:5000/images/Sale_discounts.jpg" alt="" />
        </div>
      </div>
      <div className="title">Categories:</div>
      <div className="categories">
        <HashLink smooth to="/#electronic" className="electronics">
          <p className="categoryTitle">Electronics</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/electronics_category.png"
            alt=""
          />
        </HashLink>
        <HashLink smooth to="/#furniture" className="furnitures">
          <p className="categoryTitle">Furnitures</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Furniture_category.jpg"
            alt=""
          />
        </HashLink>
        <HashLink smooth to="/#men" className="Mens">
          <p className="categoryTitle">Men's</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Mens_category.jpg"
            alt=""
          />
        </HashLink>
        <HashLink smooth to="/#women" className="Women's">
          <p className="categoryTitle">Women's</p>
          <img
            className="categoryImage"
            src="	http://localhost:5000/images/Womens_category.jpg"
            alt=""
          />
        </HashLink>
      </div>
      <div className="products">
        <div className="title" id="electronic">
          Electronics:
        </div>
        <Productcard products={electronic} />
      </div>
      <div className="products">
        <div className="title" id="furniture">
          Furnitures:
        </div>
        <Productcard products={furniture} />
      </div>
      <div className="products">
        <div className="title" id="men">
          Men's:
        </div>
        <Productcard products={mens} />
      </div>
      {/* <div className="products">
        <div className="title" id="women">
          Women's:
        </div>
        <Productcard products={womens} />
      </div> */}
    </div>
  );
};

export default Home;
