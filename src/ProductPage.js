import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import  Axios  from 'axios';
import { Card, Container,Button } from 'react-bootstrap';
import { CartState } from './Context/Context';
import NavBar from './NavBar';
// import SideNav from './SideNav';
export default function ProductPage() {
    const { 
      state: {cart},
  dispatch,
  }= CartState()
    let { id } = useParams();
    const[prod,setProd]=useState([]);
    useEffect(() => {
       Axios.get(`http://localhost:3001/ProductNo/${id}`).then((res)=>{
            setProd(res.data);
       })
    }, []);
    // console.log(prod);
  return (
      <>  
      <NavBar/>
      {/* <SideNav/> */}
      {prod.map((i)=>{
        return(
         <Container>
        <Card>
        <Card.Body>
            {i.title}
            <br/>
            {i.text}
            <br/>
            {i.price}
        </Card.Body>
        <Card.Img src={i.image}></Card.Img>
        {
          cart.some((p)=>p.id === i.id) ?(
        <Button onClick={()=>{
          dispatch({
            type:'REMOVE_FROM_CART',
            payload:i,
          });
          
        }} variant ="danger">Remove from Cart</Button>
          ):(
        <Button onClick={()=>{
          dispatch({
            type:'ADD_TO_CART',
            payload:i,
          });
         
        }} disabled={!i.Stock}>{!i.Stock ?"Out of Stock": "Add to Cart"}</Button>
          )
        }
        </Card>
        </Container>  
        )
    })}
   </>
  )
}
