import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar1";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfilePage from "./components/ProfilePage";
import PreviousOrder from "./components/PreviousOrder";
import LikedItems from "./components/LikedItems";
import Cart from "./components/Cart";
import ProfileNavbar from "./components/ProfileNavbar";
import Signin from "./components/Signin";
import Signup from "./components/Signup";
import ConfirmationPage from "./components/ConfirmationPage";
import PaymentPage1 from "./components/PaymentPage1";
import ContextProvider from "./components/ContextProvider";
import UserDetails from "./components/UserDetails";
import SellerForm from "./components/SellerForm";
import FillUserInfo from "./components/FillUserInfo";
import Footer from "./components/Footer";
import SellerProfile from "./components/SellerProfile";
import AddProducts from "./components/AddProducts";
function App() {
  
  return (
    <>
      <ContextProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/fillUserInfo" element={<FillUserInfo/>}/>

            <Route path="/Profile" element={<ProfileNavbar />}>
              <Route path="personalInformation" element={<ProfilePage />} />
              <Route path="SellerInformation" element={<SellerProfile />} />
              <Route path="previousorders" element={<PreviousOrder />} />
              <Route path="Sellerform" element={<SellerForm />} />
            </Route>
            <Route path="/userDetails" element={<UserDetails />} />

            <Route path="/Favourites" element={<LikedItems />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/confirmationPage" element={<ConfirmationPage />} />
            <Route path="/paymentPage" element={<PaymentPage1 />} />
            <Route path="/addNewProduct" element={<AddProducts />} />

          </Routes>
          <Footer />
        </BrowserRouter>
      </ContextProvider>
    </>
  );
}

export default App;
