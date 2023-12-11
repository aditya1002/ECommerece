import React from 'react'
import {Container,Row,Col} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import "./Footer.css";
function Footer() {
  return (
    <div className="Box">
    <Container className="Container">
      <Row className="Rows">
        <Col className="Col">
           <h4 style={{color:"black",fontWeigth:'400'}}><u>About Us</u></h4>
          <Link className="Link" >Aim</Link>
          <Link className="Link" >Vision</Link>
          <Link className="Link" >Testimonials</Link>
        </Col> 
        <Col className="Col">
           <h4 style={{color:"black",fontWeigth:'400'}}><u>Services</u></h4>
          <Link className="Link" >Delivery</Link>
          <Link className="Link" >Membership</Link>
          <Link className="Link" >Become a Partner</Link>
        </Col>
        <Col className="Col">
           <h4 style={{color:"black",fontWeigth:'400'}}><u>Contact Us</u></h4>
          <Link className="Link" >Uttar Pradesh</Link>
          <Link className="Link" >Ahemdabad</Link>
          <Link className="Link" >Indore</Link>
         
        </Col>
        <Col className="Col">
           <h4 style={{color:"black",fontWeigth:'400'}}><u>Social Media</u></h4>
          <Link className="Link" >
            <i className="fab fa-facebook-f">
              <span style={{ marginLeft: "10px" }}>
                Facebook
              </span>
            </i>
          </Link>
          <Link className="Link" >
            <i className="fab fa-instagram">
              <span style={{ marginLeft: "10px" }}>
                Instagram
              </span>
            </i>
          </Link>
          <Link className="Link" >
            <i className="fab fa-twitter">
              <span style={{ marginLeft: "10px" }}>
                Twitter
              </span>
            </i>
          </Link>
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default Footer