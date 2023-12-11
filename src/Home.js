import {useState} from 'react';
import React from 'react';
import NavBar from "./NavBar";
import pic3 from "./Facewash.jpg";
import './Home.css';
import Cards from "./Cards";
import Footer from './Footer';
import { CartState } from './Context/Context';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
 const Home =() =>{
  const {state :{products}} = CartState();
  // const {state :{cart}} = CartState();
  
  return (
    <>
    <NavBar/>
    {/* <div className='boxer'> */}
    <Container  className='container-fluid'>
    <Row className='cardcontainer' >
    <img className='im' src={pic3} alt=" " />
        {
    products.map((item)=>
   
   <Col className='col-sm-4'>
    <Cards key={item.id} item={item}/>
    </Col> 
    ) 
    }
    </Row>
    </Container>  
    {/* </div> */}
    <Footer/>
    
    </>
  );
}
export default Home;




































// const cardInfo = [
  //   {image:"https://i0.wp.com/beewel.in/wp-content/uploads/2022/11/South-Indian-Filter-Coffee-with-filter.jpg?fit=600%2C600&ssl=1",title:"AB",text:"asfg"},
  //   {image:"https://images-prod.healthline.com/hlcmsresource/images/AN_images/coffee-worlds-biggest-source-of-antioxidants-1296x728-feature.jpg",title:"CD",text:"asfg"},
  //   {image:"https://hips.hearstapps.com/hmg-prod/images/iced-coffee-1597680350.jpg?crop=1.00xw:0.655xh;0,0.0838xh",title:"DE",text:"asfg"},
  //   // {image:"",title:"",text:""},
  // ];
  // const renderCard=(card,index)=>{
  //   return(
      
  //   )
  // }



// <Container className="cardcontainer">
//     <Row>
//     {cardInfo.map((card,index) =>(
//       <Col key={index} xs={12} md={4} lg={4}>
//       <Card>
//     {/* <Card style={{ width: '18rem' }}> */}
//       <Card.Img className="cardimage" src={card.image} />
//       <Divider/>
//       <Card.Body>
//         <Card.Title>{card.title}</Card.Title>
//         <Card.Text>
//           {card.text}
//         </Card.Text>
//         <Button variant="primary">Add to Bag</Button>
//       </Card.Body>
//     </Card>
//     </Col>
    
//     ))}
//     </Row>
//     </Container>
     
   
   






















 