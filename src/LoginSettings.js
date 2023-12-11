import React, { useState,useEffect } from 'react'
import NavBar from './NavBar'
import Form from 'react-bootstrap/Form';
import {Button,Card,Row,Col, Container} from 'react-bootstrap';
import { useNavigate,Link } from 'react-router-dom';
import Axios from 'axios';
import './LoginSettings.css';
import Footer from './Footer';
export default function LoginSettings() {
  let name = JSON.parse(localStorage.getItem('user'));
  // let username = JSON.parse(localStorage.getItem('user'));
  const[profileData,setProfiledata] = useState([]);
  const navigate = useNavigate();
  var logged = false;
  useEffect(() => {
    if (localStorage.getItem("user")) {
        Axios.get(`http://localhost:3001/ProfileEdit/${name}`).then((response) => {
            setProfiledata(response.data);
        });
    }
  
  else{
          logged = true;
          navigate('/Login');
        
      }
    }, []);
    console.log(profileData);
  return (
    <>
    <NavBar/>
    <Container className='settings'>
          <h1 style={{fontSize:'larger',color:'white'}}>  <Link to='/Profile' style={{ textDecoration: 'none',colour :'white',hover : 'black'}}>Your Account</Link> {'>'}Login Settings</h1>
        <Card className='Cardsetting'>
       <br/>
     {profileData.map(val=>{
      return(
         <table >
 <tr className='tabl'>
 <td className='settingsrow'>Email</td></tr>
 <tr> </tr>
   <td  className='settingsrow'>{val.email}</td>
   <td className='But'><Button className='Bu' onClick={'/EditDetails'}>Edit</Button></td>
 
 <tr className='tabl'>
 <td className='settingsrow'>Phone</td></tr>
 <tr></tr>
   <td  className='settingsrow'>{val.phone}</td>
   <td className='But'><Button className='Bu'>Edit</Button></td>
 
 <tr className='tabl'>
 <td className='settingsrow'>Name</td></tr>
 <tr></tr>
   <td  className='settingsrow'>{name}</td>
   <td className='But'><Button className='Bu'>Edit</Button></td>
 
 <tr className='tabl'>
 <td className='settingsrow'>Password</td></tr>
 <tr></tr>
   <td  className='settingsrow'>****</td>
   <td className='But'><Button className='Bu'>Edit</Button></td>
 
 </table>
   ) })} 
      
      </Card>
      </Container>
      <Footer/>
    </>
  )
}



