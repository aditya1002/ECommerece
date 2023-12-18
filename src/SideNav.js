import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'; 
import './SideNav.css';
import { useState,useEffect,useContext,createContext} from 'react';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import { NameContext } from './App';
export default function SideNav() {
    const {setMin} = useContext(NameContext);
    const {setMax,setPrime} = useContext(NameContext);
     const[minner,setMinner]= useState('');
     const[maxer,setMaxer]= useState('');
     const[p,setP]= useState(false);
    //  console.log(minner);
    //  console.log(maxer);
     function handle() {
         if(isNaN(minner) || isNaN(maxer) || minner<0 || maxer<0){
            window.alert("Enter a number greater than 0");
        }
        else{
            setMin(minner);
            setMax(maxer);
            // setPrime(p);
        }
    }
  return (
    <>
    
        <div>
            <Container>
                <Card className='sideCard'>
                    <Card.Body className="item">
                    <h6>Delivery</h6>
                    <input type='checkbox' value="true" onChange={(e)=>{setP(e.target.value)}}>
                    </input>
                        <label>Prime</label>
                        <h6>Category</h6>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Groceries">Groceires</Link><br/>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Groceries">Vegetables</Link><br/>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Food">Food</Link><br/>
                        <h6>Price</h6>
                        <input type="text" style={{"width":"30%"}} placeholder='Min' onInput={(e)=>{setMinner(e.target.value);}}></input> 
                        <input type='text' style={{"width":"30%"}} placeholder='Max' onInput={(e)=>{setMaxer(e.target.value)}}></input> 
                        <Button onClick={()=>handle()}>Go</Button>
                        <h6>Deals & Discounts</h6>
                        <Link style={{ "text-decoration": "none","color":"black"}}>All Discounts</Link><br/>
                        <Link style={{ "text-decoration": "none","color":"black"}}>Todays Deals</Link>
                        <h6>Availability</h6>
                    <input type='checkbox'>
                    </input>
                        <label> Include Out Of Stock</label>
                     </Card.Body>
                </Card>
            </Container>
        </div>
    </>
  )
}














 //  console.log(minner);
    //  const{min,setMin,max,setMax}=useContext(FilterContext);
    // const changeState = () => {   
    //     setstate({data:`state/props of parent component  
    //     is send by onClick event to another component`});  
    //     childtoParent(state.data);
    //    }; 
    //import Shop from './Shop';
// import  { FilterContext } from './FilterCon';
// import FilterCon from './FilterCon';
// var mini,maxi; 