import React,{ useState,useContext }from 'react'
import Axios  from 'axios';
import { useEffect } from 'react';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import Cards from "./Cards";
import NavBar from "./NavBar";
import Footer from './Footer';
import SideNav from './SideNav';
import { NameContext } from './App';
export default function Food() {
  const { min,max,setMax,setMin } = useContext(NameContext);
    var[food,setFood]=useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/Food").then((res)=>{
            setFood(res.data);
            setMin(0);
            setMax(0);
        })
        
    }, []);
    if(min>0){
       food =food.filter((item)=> item.price>=min && item.price<=max);
      console.log(min);
  }
    console.log(food);
  return (
    <>

<NavBar/>
<SideNav/>
    {/* <div className='boxer'> */}
    <Container  className='container-fluid'>
    <Row className='cardcontainer' >
        {food.map((item)=>
   
   <Col className='col-sm-4'>
    <Cards key={item.id} item={item}/>
    </Col> 
    ) 
    }
    </Row>
    </Container>  
    {/* </div> */}
    {/* <Footer/> */}
    
    </>
  )
}
