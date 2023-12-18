import React from 'react'
import NavBar from './NavBar'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Axios from 'axios';
import { useState,useEffect} from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom'; 
import './NewAddress.css';
import { Checkbox } from '@mui/material';
import Footer from './Footer';
export default function () {
    const navigate = useNavigate();
    var logged = false;
    useEffect(()=>{
        if (!localStorage.getItem("user")){
            navigate('/Login');
        }
    },[navigate]);
    let profname = JSON.parse(localStorage.getItem('user'));
    const [phoneNumber, changePhonenumber] = useState("");
    const [flat, changeflat] = useState("");
    const [Area, changeArea] = useState("");
    const [city, changecity] = useState("");
    const [pincode, changepincode] = useState("");
    const [landmark, changelandmark] = useState("");
    const [name, changeName] = useState("");
    const [Country, changeCountry] = useState("");
    const [State, changeState] = useState("");
    const [checked, setChecked] = React.useState(false); 
   const handleChange=(e)=> {
      setChecked(e.target.checked);
   }
   // eslint-disable-next-line no-unused-vars
   const handle=(e)=>{
    changeState(e.target.value);
   }
    const AddressSubmit = (e) => {
        if ( !phoneNumber|| !flat || !city || !Country || !State || !pincode || !Area) {
            window.alert("please fill all the fields");
            e.preventDefault();
        }
        else {
             Axios.post(`http://localhost:3001/NewAddress/${profname}`, {
                name: name,
                phone: phoneNumber,
                flat: flat,
                Area: Area,
                city: city,
                State: State,
                Country: Country,
                pincode: pincode,
                landmark: landmark,
                checked:checked,
            }).then((res) => {
                if(res==="null"){
                    window.alert("Success");
                }
            })
       }
       // e.preventDefault();
    }
    return (
        <>
            <NavBar />
            <div className="login">
            <Container>
                <Card className="logincard">
                    <Card.Body >
                        <Form >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Name" controlId="formBasicName" onChange={(e) => { changeName(e.target.value); }} />
                            <Form.Label>Phone</Form.Label>
                            <Form.Control type="text" placeholder="+91| Mobile Number" controlId="formBasicPhone" onChange={(e) => { changePhonenumber(e.target.value); }} />
                            <Form.Label>Flat No,House ,Building</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changeflat(e.target.value); }} />
                            <Form.Label>Area</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changeArea(e.target.value); }} />
                            <Form.Label>City</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changecity(e.target.value); }} />
                            <Form.Label>PinCode</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changepincode(e.target.value); }} />
                            <Form.Label>LandMark (optional)</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changelandmark(e.target.value); }} />
                            <Form.Label>Country</Form.Label>
                            <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changeCountry(e.target.value); }} />
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>State</Form.Label>
                                <br />
                                <Form.Control type="text" controlId="formBasicPhone" onChange={(e) => { changeState(e.target.value); }}/>
                            </Form.Group>
                            <input value = "test" type = "checkbox" onChange = {handleChange}/><span> Set as Default</span> <br/>
                            <Button variant="primary" type="submit" onClick={AddressSubmit}>
                                Submit
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                </Container>
            </div>
            <Footer/>
        </>
    )
}
 {/* <Form.Select id="country-state" name="country-state" onSelect={(e) => { handle(e.target.name); }}>
                                    <option >Select state</option>
                                    <option >Andaman and Nicobar Islands</option>
                                    <option >Andhra Pradesh</option>
                                    <option >Arunachal Pradesh</option>
                                    <option >Assam</option>
                                    <option >Bihar</option>
                                    <option >Chandigarh</option>
                                    <option >Chhattisgarh</option>
                                    <option >Dadra and Nagar Haveli</option>
                                    <option >Daman and Diu</option>
                                    <option >Delhi</option>
                                    <option >Goa</option>
                                    <option >Gujarat</option>
                                    <option >Haryana</option>
                                    <option >Himachal Pradesh</option>
                                    <option >Jammu and Kashmir</option>
                                    <option >Jharkhand</option>
                                    <option >Karnataka</option>
                                    <option >Kerala</option>
                                    <option >Ladakh</option>
                                    <option >Lakshadweep</option>
                                    <option >Madhya Pradesh</option>
                                    <option >Maharashtra</option>
                                    <option >Manipur</option>
                                    <option >Meghalaya</option>
                                    <option >Mizoram</option>
                                    <option >Nagaland</option>
                                    <option >Odisha</option>
                                    <option >Puducherry</option>
                                    <option >Punjab</option>
                                    <option >Rajasthan</option>
                                    <option >Sikkim</option>
                                    <option >Tamil Nadu</option>
                                    <option >Telangana</option>
                                    <option >Tripura</option>
                                    <option >Uttar Pradesh</option>
                                    <option >Uttarakhand</option>
                                    <option >West Bengal</option>
                                </Form.Select> */}