// import React, { useState } from 'react';
// import Axios from 'axios';
// import{Form,Card, Container,Row,Button} from 'react-bootstrap';
// import { PhoneNumberContextImpl } from 'twilio/lib/rest/lookups/v2/phoneNumber';
// import NavBar from './NavBar';
// import { useNavigate } from 'react-router-dom';
// function ForgotPass() {
//     const navigate = useNavigate();
//     const[phone,changePhonenumber]=useState("");
//     const[verifier,changeVerifier]=useState("");
//     let u = JSON.parse(localStorage.getItem('user'));
//     const ForgotP=(e)=>{
//         Axios.post("http://localhost:3001/ForgotPassword", {
//             phone : phone,
//             verifier:verifier,
//         }).then((res) => {
//             console.log(res);
//             if(res.data=="Ok"){
//                 navigate('/')
//             }
//             else{
//                 window.alert("Please Try Again");
//             }
//         })
//         e.preventDefault();
//     }
//     return (
//         <>
//         <NavBar/>
//         <div className="login">
//     <Card className="logincard">
//     <h3>Login Using</h3>
//       <Card.Body >
//       <Form onSubmit={(e)=>ForgotP(e)}>
//       <Form.Group className="mb-3" controlId="formBasicPhone" autoComplete="on" onChange={(e)=>{changePhonenumber(e.target.value);}}>
//         <Form.Label>Phone</Form.Label>
//         <Form.Control type="text" placeholder="Enter Phone Number" />
//       </Form.Group>
//       <Form.Group className="mb-3" controlId="formBasicPhone" autoComplete="on" onChange={(e)=>{changeVerifier(e.target.value);}}>
//         <Form.Label>Verification(Ex: Adma,If name is Aditya, Email is mail2..)</Form.Label>
//         <Form.Control type="text" placeholder="Enter Last 2 Letters Of name and first 2 Letters Of Email " />
//       </Form.Group>
//       <Button variant="primary" type="submit" >
//         Submit
//       </Button>
//     </Form>
//     </Card.Body>
//     </Card>
//      </div>
    
//         </>
//     );
// }

// export default ForgotPass;
