import React from 'react'
import NavBar from './NavBar'
import { Container,Card,Dropdown } from 'react-bootstrap'
import './PaymentInfo.css';
import { useState,useRef,useEffect } from 'react';
import { Button } from 'react-bootstrap';
// import { createChainedFunction } from '@mui/material';
import  Axios  from 'axios';
import bcrypt from 'bcryptjs-react';
import { useNavigate } from 'react-router-dom';
const salt = bcrypt.genSaltSync(3);
export default function PaymentInfo() {
    const navigate=useNavigate();
    const[paymentinformation,setPaymentinformation] = useState('credit');
    const[cardinfo,setcardinfo]=useState("");
    const[cvv,setCVV] = useState("");
    const paymentinfosetter=e=>{
        setPaymentinformation(e.target.value);
    }
    const [card, setCard] = useState('');
    const handleCardDisplay = () => {
        const rawText = [...cardinfo.split(' ').join('')] // Remove old space
        const creditCard = [] // Create card as array
        rawText.forEach((t, i) => {
            if (i % 4 === 0 && i !== 0) creditCard.push(' ') // Add space
            creditCard.push(t)
        })
        return creditCard.join('') // Transform card array to string
    }
    const name = JSON.parse(localStorage.getItem('user'));
    // console.log(name);
    function validateByLuhn(cardinfo){
        let sum = 0;
       
      let shouldDouble = false;
      for (let i = cardinfo.length - 1; i >= 0; i--) {
         let digit = parseInt(cardinfo.charAt(i));
         if (shouldDouble) { 
            if ((digit *= 2) > 9) digit = digit - 9;
         }
         sum = sum + digit;
         shouldDouble = !shouldDouble;
      }
     
      return sum % 10 === 0;
    }
    function cardsetter(){
        const car = cardinfo.split(" ").join("");
        setCard(car);
        saver(car);
    }
    function saver(car){
        // let cardinfo = event.target.value;
       
        // console.log(car);
        var isValid=false;
        let validatoralgo = validateByLuhn(car);
        if(car.length==15){
            if(validatoralgo && (car.indexOf("34") == 0 || car.indexOf("37") == 0)){
                isValid=true;
            }
        }
        else if(car.length==13){
            if(validatoralgo &&(car[0]==4)){
                isValid=true;
            }
        }
        else if(car.length==16){
            if(validatoralgo && car[0]==4){
                isValid=true;
            }

            else if(validatoralgo && (car[0]==5 && (car[1]>=1) || car[0]==5 &&(car[1]<=5) )){
                // console.log(isValid);
                isValid=true;
            }
        }
        if (isValid && cvv.length==3 || cvv.length==4) {
        //    window.alert("Valid Card Number");
           var hash = bcrypt.hashSync(cvv, salt);
           console.log(cvv);
           console.log("hash is ",hash);
           var com = bcrypt.compareSync(cvv,hash);
           console.log(com);
           Axios.post(`http://localhost:3001/paymentInfo/${name}`,{
            cardnumber : car,
            cvv :hash,
            paymentType : paymentinformation,
           
           }).then((res)=>{
            // console.log(res.data);
            window.alert("entered successfully");
            navigate("/");
           })

        } else {
            if(isValid){

                window.alert("Invalid CVV Number");
                inputRefc.current.focus();
            }
            else{
                window.alert("Invalid Card Number");
                inputRef.current.focus();
            }
        }
        // console.log(paymentinformation);
    }
    const inputRef = useRef();
    const inputRefc = useRef();
    useEffect(() => {
        inputRef.current.focus();
        inputRefc.current.focus();
      }, []);
      const [paymentData,setPaymentData] = useState([]);
      useEffect(()=>{
        Axios.get(`http://localhost:3001/getPaymentInfo/${name}`).then((response)=>{
            setPaymentData(response.data);
        })
    },[]);
//    const[displayer,setDisplayer]=useState('');
    // console.log(paymentData);
  return (
    <>
    <NavBar/>
    <Container className='paymentcontainer'>
        <Card>
        <label>Mode of Payment</label>
        <td><input type ='radio' value='credit' name='payment' checked={paymentinformation==='credit'} onChange={paymentinfosetter}></input> <label>Credit Card</label><br/>
                    {
                        paymentinformation==='credit' && <div>
                            
                            <h5>Enter number</h5> 
                            <input className='credut' maxlength="19" placeholder="0000 0000 0000 0000"  value={handleCardDisplay()} onChange={(e)=>{setcardinfo(e.target.value); }} ref={inputRef}></input>
                            <input type='password' className='credut' maxlength="4" placeholder="0000"   onChange={(e)=>{setCVV(e.target.value); }} ref={inputRefc}></input>
                            <Button onClick={(e)=>{cardsetter(e);}}>Save</Button>
                        </div>
                    }
                    <input type ='radio' value='debit' name='payment' checked={paymentinformation==='debit'} onChange={paymentinfosetter}></input> <label>Debit Card</label><br/>
                    {
                        paymentinformation==='debit' && <div>
                            
                            <h5>Enter number</h5> 
                            <input maxlength="19" placeholder="0000 0000 0000 0000" value={handleCardDisplay()} onChange={(e)=>{setcardinfo(e.target.value); }} ref={inputRef}></input>
                            <input type='password' className='credut' maxlength="4" placeholder="0000"   onChange={(e)=>{setCVV(e.target.value); }} ref={inputRefc}></input>
                            <Button onClick={(e)=>{cardsetter(e)}}>Save</Button>
                        </div>
                    }
                    <input type ='radio' value='upi' name='payment' checked={paymentinformation==='upi'} onChange={paymentinfosetter}></input> <label>UPI</label><br/>
                    
                    <input type ='radio' value='cash' name='payment' checked={paymentinformation==='cash'} onChange={paymentinfosetter}></input> <label>Cash on Deliver(COD)</label></td>
        </Card>
        <Card>
        {paymentData.map((val)=>{
            var ca =val.CardNo;
            var n = ca.substring(ca.length-4,ca.length-1);
          {/* console.log(n); */}
            return(
                <>
            <p>{val.PaymentType} ending with {n} <Button variant='dark'>Edit</Button></p>
            
            </>
            )
        })}
    </Card>
    </Container>
    </>
  )
}
