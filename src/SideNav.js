import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'; 
import './SideNav.css';
import { useState,useEffect,useContext,createContext} from 'react';
import { Container,Row,Col,Button,Card } from 'react-bootstrap';
import Shop from './Shop';


// const FilterContext = createContext();
const FilterContext=createContext();
function SideNav({children}) {
    const[min,setMin]= useState('');
    
    const[max,setMax]=useState();
    
    function priceFilter(){
        priceFilter1();
        
        //  console.log(min);
        return min;
    }
    function priceFilter1(){
        
        return max;
    }
    
  return (
    <>
    <FilterContext.Provider value={min}>
    {/* {console.log(min)} */}
       {children}
    </FilterContext.Provider>
        <div>
            <Container>
                <Card className='sideCard'>
                    <Card.Body>
                    <h6>Delivery</h6>
                    <input type='checkbox'>
                    </input>
                        <label>  All Prime</label>
                        <h6>Category</h6>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Groceries">Groceires</Link><br/>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Groceries">Vegetables</Link><br/>
                        <Link style={{ "text-decoration": "none","color":"black"}} to="/Food">Food</Link><br/>
                        <h6>Price</h6>
                        <input type="text" style={{"width":"30%"}} placeholder='Min' onInput={(e)=>{setMin(e.target.value);}}></input> <input type='text' style={{"width":"30%"}} placeholder='Max' onInput={(e)=>{setMax(e.target.value)}}></input> 
                        <Button onClick={priceFilter}>Go</Button>
                     </Card.Body>
                </Card>
            </Container>
        </div>
    </>
  )
}

export const FilterState = () => {
    return useContext(FilterContext);
  };

export default SideNav;