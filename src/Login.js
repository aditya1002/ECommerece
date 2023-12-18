import React from 'react'
import Axios from 'axios';
import NavBar from './NavBar'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Link, useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './Login.css';
import { CartState } from './Context/Context';
import { CardGroup,Row,Col,Container,InputGroup } from 'react-bootstrap';
function Login() {
  const navigate = useNavigate();
  const [loginstatus ,setloginStatus] =useState(false);
  const [phoneNumber, changePhonenumber] = useState("");
  const [password, changepassword] = useState("");
 const [justifyActive, setJustifyActive] = useState('tab1');
 const[passshow,setpassshow] = useState(true);
const shower = ()=>{
  setpassshow(!passshow);
}
    const handleJustifyClick = (value) => {
      if (value === justifyActive) {
        return;
      }
      setJustifyActive(value);
    };  
  const {
    state: { cart },
    dispatch,
  } = CartState();
  console.log(cart);

const LoginPass = (event) => {
  event.preventDefault();
  Axios.post("http://localhost:3001/Login", {
      phoneNumber: phoneNumber,
      password : password
  }).then((res) => {
    console.log(res.data)
   // console.log(res);
    if(res.data.auth){
      console.log(res.data);
      localStorage.setItem("user",JSON.stringify(res.data.result[0].name));
      setloginStatus(true);
      if(setloginStatus){
        userAuthenticated()
        localStorage.setItem("token",res.data.token);
        console.log();
        if(res.data.token && res.data.result[0].role==='user'){
           navigate('/');
        }
        else if( res.data.token && res.data.result[0].role==='admin'){
          navigate('/adminDashboard');
        }
        else{
          window.alert("No token please auth");
         // setloginStatus(false);
        }
      }
     // console.log(setloginStatus);
     // AfterLogin();
    }
    else{
      setloginStatus(false);
      window.alert(res.data.message);
    }
})}
const userAuthenticated=()=>{
  Axios.get("http://localhost:3001/isUserAuth",{ headers:{
    "x-access-token": localStorage.getItem("token"),
  },
}).then((res)=>{
    console.log(res);
  });
}

  return (
    <>
    <NavBar/>
    
    <Container className='container-fluid-bg'>
    <Row>
    <Col className='col-md-4'>
    <Card>
    <img  className='LoginImg' src='https://img.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_1150-37336.jpg?w=740&t=st=1699257517~exp=1699258117~hmac=fe04e9d0bb9be1506e777779bedc9a1939bb11b53277eb880b576870836d3c56'></img>
    </Card>
    </Col>
    <Col className='col-md-4'>
    <Card className="logincard">
    {/* <h3>Login Using</h3> */}
      <img  className='cardimager' src='https://icons.veryicon.com/png/o/internet--web/prejudice/user-128.png'></img>
      <Card.Body >
     <Button className='Buttoons' style={{color:'black'}} onClick={() => handleJustifyClick('tab2')} active={justifyActive === 'tab2'}>OTP</Button>
    <Button className='Buttoons' style={{color:'black'}} onClick={() => handleJustifyClick('tab1')} active={justifyActive === 'tab1'}>Password</Button>
      {justifyActive === 'tab1'&& <div>
      <Form onSubmit={(e)=>LoginPass(e)}>
      <Form.Group  controlId="formBasicPhone" autoComplete="on" onChange={(e)=>{changePhonenumber(e.target.value);}}>
        <Form.Label>Phone</Form.Label>
        <Form.Control  className='mb-3' type="text" placeholder="Enter Phone" />
      </Form.Group>

      <Form.Group  controlId="formBasicPassword" onChange={(e)=>{changepassword(e.target.value); }} >
        <Form.Label>Password</Form.Label>
    <InputGroup>
        <Form.Control  className='mb-3' type={passshow ? 'password' :'text' } placeholder="Password"/>   
    <Link onClick={shower}>{passshow ? <img width="48" height="48" src="https://img.icons8.com/color/48/show-password.png" alt="show-password"/>: <img width="50" height="50" src="https://img.icons8.com/ios-filled/50/hide.png" alt="hide"/>}</Link>
    </InputGroup>
      </Form.Group>
      {/* <Form.Group  className='mb-3'   controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Form.Group controlId="formBasicCheckbox">
      <Link to="/ForgotPass">Forgot Password</Link>
      </Form.Group>
      <Button className='Buttons' type="submit" >
        Submit
      </Button>
      <Form.Text className="text-muted" style={{fontWeight:'900',color:'black',fontSize:'Medium'}}>
          Don't Have an account? <Link to="/signup">Signup</Link>
        </Form.Text>
    </Form>
     
    </div>}
      {justifyActive === 'tab2' && <div> 
       <Form>
      <Form.Group  controlId="formBasicEmail">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control  className='mb-3' type="phone" placeholder="+91 | Mobile number*" onChange={(e) => { changePhonenumber(e.target.value); }} />
        </Form.Group>
      <Button className='Buttons' type="submit" onClick={Login}>
        Send OTP
      </Button>
        <Form.Text className="text-muted">
          Don't Have an account? <Link to="/signup">Signup</Link>
        </Form.Text>
    </Form>
       </div>} 
      
    </Card.Body>
  
    </Card>
    </Col>
   
    </Row>
    </Container>
    
    {/* <Footer/> */}

     
    </>
  )
}

export default Login


//   const Login = () => {
//     Axios.post("http://localhost:3001/Login", {
//         phoneNumber: phoneNumber,
//     }).then((res) => {
//       // if(res.stausCode===200){

//       //   <Link to="/OTP"></Link>
//       // }
//     })
//     Axios.post("http://localhost:3001/otp", {
//       password: password,
//   }).then((res) => {
   
//   })

// }
// const AfterLogin=()=>{
// if(loginstatus){
//   console.log("Here I am ");

//  }

// }