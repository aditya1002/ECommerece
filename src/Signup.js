import React from 'react'
import NavBar from './NavBar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Signup.css";
import Axios from 'axios';
import { useState } from 'react';
const Signup = (e) => {
    const [phoneNumber, changePhonenumber] = useState("");
    const [password, changepassword] = useState("");
    const [name, changeName] = useState("");
    const [Email, changeEmail] = useState("");
    
    const handleSubmit=()=>{
      if(!phoneNumber|| !password || !name|| !Email){
        window.alert("please fill all the fields");
      }
      else if(isNaN(phoneNumber)){
        window.alert("Enter Phone Number")
      }
      else{
        Axios.post("http://localhost:3001/Signup",{
            name: name,
            phone:phoneNumber,
            Email:Email,
            password:password
        }).then((res)=>{
            
        })
      }
       
    }

  return (
   <>
    <NavBar/>
    <div className="login">
    <Card className="logincard">
      <Card.Body >
    <Form >
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter Name" controlId="formBasicName" onChange={(e)=>{changeName(e.target.value);}} />
        <Form.Label>Phone</Form.Label>
        <Form.Control type="text" placeholder="+91| Mobile Number" controlId="formBasicPhone" onChange={(e)=>{changePhonenumber(e.target.value);}} />
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  onChange={(e)=>{changeEmail(e.target.value);}}/>
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e)=>{changepassword(e.target.value);}}/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleSubmit} >
        Submit
      </Button>
      </Form>
      </Card.Body>
      </Card>
      </div>
   </>
  )
}

export default Signup