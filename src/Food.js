import React,{ useState }from 'react'
import Axios  from 'axios';
import { useEffect } from 'react';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import Cards from "./Cards";
import NavBar from "./NavBar";
import Footer from './Footer';
// import SideNav from './SideNav';
export default function Food() {
    const[food,setFood]=useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/Food").then((res)=>{
            setFood(res.data);
        })
        
    }, []);
    console.log(food);
  return (
    <>

<NavBar/>
{/* <SideNav/> */}
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
