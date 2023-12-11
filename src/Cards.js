import React, { useState } from 'react'
import {Col,Button,Card } from 'react-bootstrap';
import {Divider} from "@mui/material";
import { Link, Navigate, useNavigate } from 'react-router-dom'; 
import "./Cards.css";
import { CartState } from './Context/Context';
import NavBar from './NavBar';
const Cards = ({item}) => {
  const {image,title,text,price,id} = item;
  const { 
    state: {cart},
dispatch,
}= CartState()
var ops=['add','rm'];
const cartupdater=(params)=>{
console.log("Updater called");
console.log("Value is ",{params});
}
// localStorage.setItem("cart", JSON.stringify(cart));
    return (
        <> 
         <Col md={4}>
      <Card className='homercard'>
     <Link to={`/ProductPage/${id}`}> <Card.Img className='cardsimage' src={image} /></Link>
      <Divider/>
      <Card.Body className='homecbody'>
        <h5>{title}</h5>
        <Card.Text>
          {text}
        </Card.Text>
        <Card.Text>
          Rs.{price}
        </Card.Text>
        {
          cart.some((p)=>p.id === item.id) ?(

        <Button onClick={()=>{
          dispatch({
            type:'REMOVE_FROM_CART',
            payload:item,
          });
          cartupdater(ops[1]);
        }} variant ="danger">Remove from Cart</Button>
          ):(
        <Button onClick={()=>{
          dispatch({
            type:'ADD_TO_CART',
            payload:item,
          });
          cartupdater(ops[0]);
        }} disabled={!item.Stock}>{!item.Stock ?"Out of Stock": "Add to Cart"}</Button>
          )
        }
       <Link to={`/ProductPage/${id}`}> <Button style={{"margin":"10px"}}>View Item</Button></Link>
      </Card.Body>
    </Card>
    </Col>
    
       
        </>
    );
}

export default Cards;
