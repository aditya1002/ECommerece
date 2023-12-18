import React from 'react'
import NavBar from './NavBar'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import "./Signup.css";
import Axios from 'axios';
import { useState } from 'react';
import AdminNavBar from './AdminNavBar';
export default function SellerSignup() {
    const [phoneNumber, changePhonenumber] = useState("");
    const [category, Category] = useState("");
    const [name, changeName] = useState("");
    const [Email, changeEmail] = useState("");
    const [image, changeimage] = useState("");
    const [title, changetitle] = useState("");
    const[password,changepassword]=useState("");
    const handleSubmit=()=>{
      if(!phoneNumber|| !category || !name|| !Email){
        window.alert("please fill all the fields");
      }
      else if(isNaN(phoneNumber)){
        window.alert("Enter Phone Number")
      }
      else{
        Axios.post("http://localhost:3001/Signup/Seller",{
            name: name,
            phone:phoneNumber,
            Email:Email,
            password:password,
           
        }).then((res)=>{
            if(res.data ==="okay"){
              window.alert("Signed up successfully");
            }
        })
      }
       
    }
  return (
    <>
    <AdminNavBar/>
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
        <Form.Control type="password" placeholder="password" onChange={(e)=>{changepassword(e.target.value);}}/>
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
