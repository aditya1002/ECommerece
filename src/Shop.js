import Axios  from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
 import SideNav, { FilterContext, FilterState } from "./SideNav";
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import Cards from "./Cards";
import NavBar from "./NavBar";
import Footer from './Footer';

// import SideNav from './SideNav';
export default function Shop() {
   
    const[groceries,setGroceries]=useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/Groceries").then((res)=>{
            setGroceries(res.data);
        })  
    }, []);

    // const value = useContext(FilterContext);  
    // var mini= useContext(FilterContext);
//    console.log(value);
const{
    value:{min}
}=FilterState();
console.log(value);
    return (
        <>
        <NavBar/>
        <SideNav/>
    {/* <div className='boxer'> */}
    <Container  className='container-fluid'>
    <Row className='cardcontainer' >
        {groceries.map((item)=>{
            if(item.price){
              
              
               {/* return(
                <Col className='col-sm-4'>
    <Cards key={item.id} item={item}/>
    </Col> 
               ) */}
            }     
            return(

            <Col className='col-sm-4'>
    <Cards key={item.id} item={item}/>
    </Col> 
            )
            
        }
   
    ) 
    }
    </Row>
    </Container>  
    {/* </div> */}
    {/* <Footer/> */}
    
    </>
  )
}
