import React from 'react'
import Axios from 'axios';
import NavBar from './NavBar'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link} from 'react-router-dom';
import { useState } from 'react';
import './Login.css';
import { CartState } from './Context/Context';
import { CardGroup } from 'react-bootstrap';
function OTP() {
  const [phoneNumber, changePhonenumber] = useState("");
    const [password, changepassword] = useState("");
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);
  const [justifyActive, setJustifyActive] = useState('tab1');;
  const Login = () => {
    Axios.post("http://localhost:3001/Form", {
        phoneNumber: phoneNumber,
    }).then((res) => {
      
    })
    Axios.post("http://localhost:3001/otp", {
      password: password,
  }).then((res) => {
    console.log(res);
  })

}
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  return (
    <>
    <NavBar/>
    
    <div className="login">
    <Card className="logincard">
    <h3>Login Using</h3>
      <Card.Body >
      <Button className="primarys" style={{color:'black'}} onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>Phone</Button>
    <Button className="secondary" style={{color:'black'}} onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>Email</Button>
      <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control type="phone" placeholder="+91 | Mobile number*" onChange={(e) => { changePhonenumber(e.target.value); }} />
        </Form.Group>
      <Button variant="primary" type="submit" onClick={Login}>
        Send OTP
      </Button>
    </Form>
    </Card.Body>
    </Card>
    </div>
    </>
)
  }

  export default OTP;