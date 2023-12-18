import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import AdminNavBar from './AdminNavBar'
import Axios from 'axios';
import { Card,Row,Col,Container,InputGroup ,Form,Button} from 'react-bootstrap';
export default function StockDetails() {
    const[inventory,setInventory] = useState([]);
    useEffect(() => {
        Axios.get("http://localhost:3001/Stock&Inventory/Inventory").then((res)=>{
            setInventory(res.data);
        })
    }, []);
    console.log(inventory);
  return (
    <>
    <AdminNavBar/>
        <Card>
        <Card.Header>Stock & Inventory Details</Card.Header>
        <table>
        <tr>
        <th>Id</th>
        <th>Title</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        </tr>
        {inventory.map((i)=>{
            return(
            <>
            <tr>
            
                <td>{i.id}</td>
                <td>{i.title}</td>
                <td>{i.price}</td>
                <td>{i.Stock}</td>
                <td>{i.Category}</td>
                <Button>Add</Button>
            </tr>
            <td></td>
            </>
            )
        })}
        </table>
        <h5>New Seller : <Link to ="/SellerSignup">Signup</Link></h5>
        
        </Card>
    </>
  )
}
