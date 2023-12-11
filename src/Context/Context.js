import React, { createContext, useContext, useReducer } from 'react'
// import {proddata} from "../data";
import data from "../data";
import { cartReducer } from './Reducer';
const Cart=createContext();
const Context = ({children}) => {
    // const products = proddata;
    const products = data;
    
    const [state, dispatch] = useReducer(cartReducer, {
      products: products,
      cart: [],
    });
      console.log(products);
    
      return (
        <>
        <Cart.Provider value={{ state, dispatch }}>
          {children}
        </Cart.Provider>
        
        </>
      );
    };
    

    export const CartState = () => {
        return useContext(Cart);
      };
      
      
      export default Context;