import  Axios  from 'axios';
import React, { useEffect, useState } from 'react'
import {Card, Button} from 'react-bootstrap';
import { CartState } from './Context/Context';
// import Address from './Address';
import {Link,useNavigate} from 'react-router-dom';
import NavBar from './NavBar';
export default function UserOrders(){ 
    const navigate = useNavigate();
        // const {image,title,text,price} = item;
        const { 
            state: {cart},
        dispatch,
        }= CartState()
    const[orders,setOrders] = useState([]);
    const name = JSON.parse(localStorage.getItem("user"));
    useEffect(() => {
        Axios.get(`http://localhost:3001/getorders/${name}`).then((response)=>{
            setOrders(response.data);
            // console.log(response.data);
        })
    }, []);
    // console.log(result);
    
  return (
    <>
    <NavBar/>
    <h1>User Orders</h1>
       <h2>
        
        {orders.map((i)=>{
            var a= i.Address;
             a= a.substring(0,a.indexOf(' '));
            var result = new Date(i.OrderDate); 
            result.setDate(result.getDate() + 1);
            result=result.toString();
            result = result.substring(3,result.indexOf("00"));
            var returnwindow = new Date(i.OrderDate);
            returnwindow.setDate(returnwindow.getDate()+14);
            returnwindow=returnwindow.toString();
            returnwindow = returnwindow.substring(3,returnwindow.indexOf("00"));
            return(
                <>
                <Card>
                <table>
                <tr>
                <td>Order Placed</td>
                <td>Total Price </td>
                <td>Ship To</td>
                <td>Order#{i.id_Orders}</td>
                </tr>
                <tr>
                <td>{i.OrderDate}</td>
               <td>{i.Cost}</td>
               <td>{a}</td>
                <td><Link>View Order Details</Link>|<Link>Invoice</Link></td> 
               </tr>
               <tr>
                <td>Delivered:{result}</td>
               </tr>
                <Card.Img src ={i.image}></Card.Img>
                <Card.Body>
                <tr>Product: {i.title}</tr>
                 
                    {i.text}
                    <tr><td>Return Window closed on:{returnwindow}</td> </tr>
                    <tr>
                    { cart.includes((p)=>p.id === i.id) ?(
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
         window.alert("Added to Cart");
        //  navigate("/cart");
        }} disabled={!i.Stock}>{!i.Stock ?"Out of Stock": "Buy Again"}</Button>
          )
        }
                    </tr>
                </Card.Body>
                    </table>
                    
                </Card>
                </>
            )
        })}
        </h2>
    </>
  )
}
