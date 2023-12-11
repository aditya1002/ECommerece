import pic from "./Coffee-cup.jpg";
import React from 'react';
import "./NavBar.css";
import { useContext,useState } from "react";
import {Nav,Container,Navbar,NavDropdown,Dropdown,Button, Row} from 'react-bootstrap';
import { AiOutlineShoppingCart } from "react-icons/ai";
import {Link,useNavigate} from 'react-router-dom';

import  data  from "./data";
import { CartState } from "./Context/Context";
function NavBar() {
  const navigate =useNavigate();
  //const[logged,setlogged]=useState(false);
  const Logout =()=>{
    localStorage.clear();
    //window.reload();
   // navigate('/');
  }
  var logged = false;
  var name = localStorage.getItem("user");
  //var profname= ;
  if(localStorage.getItem("user")){
    logged = true;
  }
  const {state : {cart},
}=CartState()
  let count=0;
  return (
    <>
   <div className="Navi">
    <Container className="Navelements">
      <Row>
      <div className="Navelements" >
      <Link className="hits" to="/"><img src={pic} className="image" alt=""></img></Link>
      </div>
        <div className="Navelements">
        <Link className="hits" to="/">Home</Link>
        <Link className="hits" to ="/Food">Food Plaza</Link>
        </div>
        {/* <div  className="dropdown"> */}
             {/* <div className="dropdown-content">
               <Link to="/Food">Link 1</Link>
               <Link to="#">Link 2</Link>
               <Link to="#">Link 3</Link>
             </div> */}
           {/* </div> */}
           <div className="dropdown">
            <Link className="hits">Shop</Link>
             <div className="dropdown-content">
               <Link to="/Groceries">Groceires</Link>
               <Link to="/Vegetables">Vegetables</Link>
               <a href="#">Other</a>
             </div>
           </div>
       <div className="Navelements"  > <form class="form-inline my-2 my-lg-0">
             <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
             <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
             </form>
             </div>
         <div className="Navelements"  >   
          <Link className="hits" to="/cart">
             <AiOutlineShoppingCart/>
               <sup>{cart.length}</sup>
             </Link> 
             </div>
             { logged ===false &&
             <div className="Navelements"> 
        <Link className="hits" to="/login">Login</Link>
        </div>}
        { logged ===true &&
          <div className="dropdown">
            <Link className="hits" to="/Profile">Hello, {name.slice(1,name.length-1)}</Link>
             <div className="dropdown-content">
             <Link className="hits" to ="/Profile" >Your Account</Link>
             <Link className="hits" to="/">Track My Shipment</Link>
             <Link className="hits" to ="/" onClick={Logout}>Logout</Link>
             </div>
           </div>
        }
        {/* {logged == true &&  <div className="Navelements"> 
        <Link className="hits" to="/cart">Logout</Link>
        </div>
       } */}
      </Row>
    </Container>
    </div>
    </>
  );
}

export default NavBar












// <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
//       <Container>
//      {/* <Navbar.Brand> <Link to="/"><img src={pic} className="image" alt=""></img></Link></Navbar.Brand>
//         <Navbar.Brand >
//         <Link to="/">Home</Link>
//         </Navbar.Brand> */}
//         <Navbar.Toggle aria-controls="responsive-navbar-nav" />
//         <Navbar.Collapse id="responsive-navbar-nav">
//           <Nav className="me-auto">
//           <div className="Navelements" className="dropdown">
//             <button className="dropbtn">Dropdown</button>
//             <div className="dropdown-content">
//               <a href="#">Link 1</a>
//               <a href="#">Link 2</a>
//               <a href="#">Link 3</a>
//             </div>
//           </div>
//           </Nav>
//           <Nav>
//             <Link  className="element" href="#pricing">Track My Shipment</Link>
//             {/* <Nav.Link href="#deets">Medicines</Nav.Link> */}
//             <Link  className="element" eventKey={2} to="/login">
//               Login
//             </Link>
//             {/* <div className="right"> */}
//             <form class="form-inline my-2 my-lg-0">
//             <input class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
//             <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
//             </form>
//             <Link  to="/cart">
//             <AiOutlineShoppingCart/>
//               <sup>{cart.length}</sup>
//             </Link>
//             <Nav.Link className="element"  eventKey={2} href="#">
//               Wishlist
//             </Nav.Link>
//             <Nav.Link className="element" eventKey={2} href="#">
//               Profile
//             </Nav.Link>
//             {/* </div> */}
            
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
    