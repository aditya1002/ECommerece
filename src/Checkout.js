import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import Axios from 'axios';
import { Container,Card, Button,Form} from 'react-bootstrap'
import { CartState } from './Context/Context';
import "./Checkout.css";
import {Link,useNavigate} from 'react-router-dom';
export default function Checkout() {
    let name = JSON.parse(localStorage.getItem('user'));
    const {
        state: { cart },
        dispatch,
      } = CartState();
    //   console.log(cart);
    const[defadd,setDefadd]= useState([]);
    const[checkaddress,setcheckaddress]=useState('');
    const[showaddress,setShowaddress] = useState(false);  
    const[selectedaddress,setSelectedaddress]=useState([]);
    const[payment ,setPayment]= useState('credit');
    const[paymentMode,setPaymentMode]= useState('');
    const[payData,setPayData] = useState([]);
    const[DeliveryStatus,setDeliveryStatus] = useState("ordered");
    const navigate = useNavigate();
    var cit;
    useEffect(() => {
        if (localStorage.getItem("user")) {
            Axios.get(`http://localhost:3001/Address/${name}`).then((response) => {
                setcheckaddress(response.data);
            });
            Axios.get(`http://localhost:3001/Addressdef/${name}`).then((response) => {
                setDefadd(response.data);
                
            });
            Axios.get(`http://localhost:3001/getPaymentInfo/${name}`).then((response)=>{
            setPayData(response.data);
        })
        } 
        if (!localStorage.getItem("user")) {
          navigate('/Login');
        }
        else if(cart.length==0) {
          navigate('/Cart');
        }
       
        
    }, []);
    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    var price = cart.price;
    // console.log(price);
    var total =0;
    var shipping=100;
    var othercharges =100;
    var others=1;
    var Grand =0;
    console.log(paymentMode);
    const addressappear=()=>{ 
        setShowaddress(!showaddress);
        
    }
    function selectorexec(){
         const updater = [selectedaddress];
        
        // console.log(updater);
           setShowaddress(!showaddress);
           setDefadd(updater);
        };
        const paymentsetter=e=>{
            setPayment(e.target.value);
        }
        // console.log(defadd);
        var billadd=[];
        {defadd.map((val,i)=>{
            // billadd.push(val.name);
            // billadd.push(val.secmob);
            // billadd.push(val.flatno);
            // billadd.push(val.area);
            billadd.push(val.city);
        })
    }
    // billadd.push(defadd[0]);
   if( billadd[0]==='Hyderabad'){
        others=0;
    }
    var itemsforbase=[];
    var count =[];
    var pricebreakdown =[];
    {cart.forEach(element => {
        itemsforbase.push(element.id);
        count.push(element.qty);
        pricebreakdown.push(element.price);
    });}
    function order(){
        var billing ="";
        // {billadd.forEach(element => {
        //     billing+=element+" ";
        // });}
       
        {defadd.map((val)=>{
            billing+=val.name+" ";
            billing+=val.secmob+" ";
            billing+=val.flatno+" ";
            billing+=val.area+" ";
            billing+=val.city+" ";
        })} 
        console.log(billing);
        // setDeliveryStatus("ordered");
       console.log(shipping);
       console.log(JSON.stringify(count));
       console.log(JSON.stringify(itemsforbase));
       console.log(name);
       console.log(JSON.stringify(pricebreakdown));
       console.log(DeliveryStatus);
       console.log(date);
       var itemquant = JSON.stringify(count);
       var individualitems = JSON.stringify(itemsforbase);
       var separateprices = JSON.stringify(pricebreakdown);
       Axios.post(`http://localhost:3001/checkoutinfo/${name}`,{
            billing:billing,
            shipping:shipping,
            itemquant:itemquant,
            individualitems:individualitems,
            separateprices:separateprices,
            DeliveryStatus:DeliveryStatus,
            date:date
       }).then((response)=>{
        if(response.data=="Okay"){
            window.alert("Order Placed Successfully");
            window.location.reload();
            navigate('/');
        }
       })
    }
  return (
    <>
        <NavBar/>
        <Container className='checkoutcontainer'>
        <Link to="/">Home</Link>{'>'}<Link to="/cart">Cart</Link>
            <Card>
            <table>
                <tr>
                    <td>Address</td>
                   
                    { defadd.map((i)=>{
                        return(
                            <>
                            {/* {i.defaults == 1 ? <td>Default</td> :<td></td>} */}
                            <td>{i.name}<br/> {i.secmob}<br/> {i.area}, {i.city} <br/>{i.state}</td>
                            </>
                        )
                    })}
                    <Link onClick={addressappear}>{showaddress? <p>Close</p>: <p>Change</p>}</Link>
                    {
                        showaddress=== true && <div>
                            <Card>
                        {checkaddress.map((val)=>{    
                        return(
                            <>
                           <input type='radio' value={val} name ='abc'  onChange={()=>{setSelectedaddress(val);}} selected={selectedaddress.name===val.name} />
                            
                            <label>{val.name}</label>
                            <br/>
                            <label>{val.secmob}<br/>{val.area},{val.city}<br/>{val.state}</label>
                            </>
                        )
                   })}
                   <Button onClick={selectorexec}>Use this address</Button>
                            </Card>
                        </div>
                    }
                   
                </tr>
                <br/>
                <tr>
                    <td>Payment</td>
                 <td>  {payData.map((val)=>{
                            var ca =val.CardNo;
                            var n = ca.substring(ca.length-4,ca.length-1);
                        return(
                            <>
                            <p>{val.PaymentType} ending with {n} <Button value ={val.CardNo} onClick={(e) => { setPaymentMode(e.target.value); }} variant='dark'>Select</Button></p>
                            </>
                        )
                    })}
                    </td> 
                    
                    <td><input type ='radio' value='credit' name='payment' checked={payment==='credit'} onChange={paymentsetter}></input> <label>Credit Card</label><br/>
                    {
                        payment==='credit' && <div>
                            
                            <h5>Enter number</h5> 
                            <input></input>
                            
                        </div>
                    }
                    <input type ='radio' value='debit' name='payment' checked={payment==='debit'} onChange={paymentsetter}></input> <label>Debit Card</label><br/>
                    {
                        payment==='debit' && <div>
                            
                            <h5>Enter number</h5> 
                            <input></input>
                            
                        </div>
                    }
                    <input type ='radio' value='upi' name='payment' checked={payment==='upi'} onChange={paymentsetter}></input> <label>UPI</label><br/>
                    
                    <input type ='radio' value='cash' name='payment' checked={payment==='cash'} onChange={paymentsetter}></input> <label>Cash on Deliver(COD)</label></td>
                    
                </tr>        
                <tr>
                    <td>Items&Delivery</td>     
                    {cart.map((itemfinal)=>{
                        total =  total + itemfinal.price *itemfinal.qty;
                            return(
                            <>
                            <td><img src ={itemfinal.image}/> {itemfinal.title} <br/> {itemfinal.text} <br/> {itemfinal.qty} <br/> {itemfinal.price}</td>
                           
                            </>
                            )
                        })
                    }   
                </tr>
                <td>Price :{total}  <br/>Shipping Charges:{ others===1 ? <p>Other Charges{othercharges} + Original Shipping{shipping}= {shipping = othercharges+shipping} </p>: <p>{shipping}</p>  }<br/>Grand Total:{Grand=total+shipping}</td>
                <tr>     
                { 
                    cart.length ===0 ? <Button disabled>Nothing in Cart</Button> : <Button onClick={order}>Place Order</Button>
                }
                </tr>
            </table>     
            </Card>
        </Container>
    </>
  )
}
