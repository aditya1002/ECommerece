import React, { useEffect, useState } from 'react'
import { Card,Row,Col,Container,InputGroup ,Form,Button} from 'react-bootstrap';
import AdminNavBar from './AdminNavBar';
import Axios from 'axios';
export default function OrderCare() {
    const[status,setOrderStatus] = useState([]);
    const[order,setOrder] = useState('');
    const[Deliverystatus,setDeliveryStatus] = useState('ordered');
    const [selected, setSelected] = useState(null);
    useEffect(() => {
        Axios.get("http://localhost:3001/OrderStatus").then((res)=>{
            setOrderStatus(res.data);
        })
    }, []);
    const statusSetter=(e,id)=>{
        setDeliveryStatus(e.target.value);
        console.log(e.target.name);
    }
    console.log(Deliverystatus);
    
    const updater=(e)=>{
        console.log(e.target.value);
        setOrder(e.target.value);
        Axios.post("http://localhost:3001/DelStatus", {
        Deliverystatus:Deliverystatus,
        order:order
  }).then((res)=>{
    if(res.data==="Okay")
    window.alert("Delivery Status updated to ",Deliverystatus);
  })
}
  return (
    <>
    <AdminNavBar/>
        <Container>
        {
            status.map((i)=>{
                return(
            <Card>
               {/* <Card.Img src={i.image}></Card.Img> */}
               <Card.Header>{i.title}</Card.Header>
               <Card.Body>
               <table>
               <tr>

               <h5>Address</h5>
               <p>{i.Address}</p>
               </tr>
                <h6>Delivery Status</h6>
                <p>{i.DeliveryStatus}</p>
                <input type='checkbox'  value='Shipped' name='DeliveryStatus'  checked={Deliverystatus==='Shipped' && i.id_Orders} onClick={(e)=>{statusSetter(e,i.id_Orders)}}></input>
                <label>Shipped</label>
                <input type='checkbox' value='On the Way' name='DeliveryStatus'  checked={Deliverystatus==='On the Way'} onClick={statusSetter}></input>
                <label>On the Way</label>
                <input type='checkbox' value='Delivered' name='DeliveryStatus'   checked={Deliverystatus==='Delivered' } onClick={statusSetter}></input>
                <label>Delivered</label>
                <Button value={i.id_Orders} onClick={updater}> Update</Button>
               </table>
               </Card.Body>
            </Card>
                )
            })
        }
        </Container>
    </>
  )
}
