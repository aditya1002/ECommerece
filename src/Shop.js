import Axios  from 'axios';
import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
 import SideNav from "./SideNav";
 import { mini,maxi } from './SideNav';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import Cards from "./Cards";
import NavBar from "./NavBar";
import Footer from './Footer';
import { NameContext } from './App';
// import  { FilterContext } from './FilterCon';
export default function Shop() {
    const { min,max,setMax,setMin } = useContext(NameContext);
    // console.log(min);
    // console.log(max);
    var[groceries,setGroceries]=useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/Groceries").then((res)=>{
            setGroceries(res.data);
            setMin(0);
            setMax(0);
        })  
    }, [])
   if(min>0){
    groceries =groceries.filter((item)=> item.price>=min && item.price<=max);
}
    console.log(groceries);
    return (
        <>
        <NavBar/>
        <SideNav/>
    {/* <div className='boxer'> */}
    <Container  className='container-fluid'>
    <Row className='cardcontainer' >
        {groceries.map((item)=>{
           
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


// var{min,setMin,max,setMax}=useContext(FilterContext);    
 // var {mini} = SideNav.priceFilter();
    // console.log("shop",mini);
    // console.log("from shop",min);
    // const value = useContext(FilterContext);  
    // var mini= useContext(FilterContext);
//    console.log(value);
// const{
//     value:{min}
// }=FilterState();
// console.log(value);