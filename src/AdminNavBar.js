import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import {Link,useNavigate} from 'react-router-dom';
export default function AdminNavBar() {
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
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/adminDashboard">Admin Nav</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/adminDashboard">Home</Nav.Link>
            <Nav.Link href="/StockDetails">Stocks & Inventory</Nav.Link>
            <Nav.Link href="/OrderCare">Order Care</Nav.Link>
            <NavDropdown title="Accounts" id="basic-nav-dropdown">
              <NavDropdown.Item href="/Accounts/Incomes">Income</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Expenditure</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Balance Sheet
              </NavDropdown.Item>
            </NavDropdown>
            { logged ===false &&
             <div className="Navelements"> 
        <Link  to="/login" >Login</Link>
        </div>}
        { logged ===true &&
          
          <div className="dropdown">
            <Nav.Link  href="">Hello, {name.slice(1,name.length-1)}</Nav.Link>
             <Nav.Link className="hits" to ="/" onClick={Logout}>Logout</Nav.Link>
             </div>
        }
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
 


    </>
  )
}
