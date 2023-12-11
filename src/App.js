import { useState } from 'react';
import React from 'react';
import data from "./data";
import NavBar from './NavBar';
import Home from "./Home";
import Cart from "./Cart";
import Login from "./Login";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Signup from './Signup';
import './App.css';
import OTP from './OTP';
import Profile from './Profile';
import Address from './Address';
import NewAddress from './NewAddress';
import ForgotPass from './ForgotPass';
import LoginSettings from './LoginSettings';
import Checkout from './Checkout';
import PaymentInfo from './PaymentInfo';
import UserOrders from './UserOrders';
import ProductPage from './ProductPage';
import Shop from './Shop';
import Food from './Food';
function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/cart" element={<Cart />} >
            </Route>
            <Route path="/signup" element={<Signup />} >
            </Route>
            <Route path="/OTP" element={<OTP />} >
            </Route>
            <Route path="/Profile" element={<Profile />}>
            </Route>
            <Route path="/Address" element={<Address />}>
            </Route>
            <Route path="/NewAddress" element={<NewAddress />}>
            </Route>
            <Route path="/ForgotPass" element={<ForgotPass />}>
            </Route>
            <Route path="/LoginEdit" element={<LoginSettings />}>
            </Route>
            <Route path="/CheckOut" element={<Checkout />}>
            </Route>
            <Route path="/PaymentInfo" element={<PaymentInfo />}>
            </Route>
            <Route path="/UserOrders" element={<UserOrders/>}>
            </Route>
            <Route path="/ProductPage/:id" element={<ProductPage/>}>
            </Route>
            <Route path="/Groceries" element={<Shop/>}>
            </Route>
            <Route path="/Food" element={<Food/>}>
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>

  );
}

export default App;
// export{Selected};









































// const [cartItems,setcartItems]=useState([]);
    // const {prodItems}=data;
    // const handleAddProduct = (product)=>{
    //   const ProductExist = cartItems.find((item)=> item.id === product.id);
    //   if(ProductExist){
    //     setcartItems(cartItems.map((item) => item.id === product.id ?{
    //       ...ProductExist,quantity: ProductExist.quantity+1
    //     }:item));
    //   }
    //   else{
    //     setcartItems([...cartItems,{...product,quantity:1}])
    //   }
    //  };


//  {/* <Routes prodItems={prodItems} cartItems={cartItems} handleAddProduct={handleAddProduct}/> */}