import { useEffect, useState } from 'react';
import React from 'react'
import AdminNavBar from './AdminNavBar'
import { Card,Row,Col,Container,InputGroup ,Form} from 'react-bootstrap';
import  Axios  from 'axios';
export default function AdminDash() {
    const[Totalorders,setTotalOrders]= useState([]); 
    const[MaxCount,setMaxCount]= useState([]); 
    const[select,setSelect]= useState('');
         useEffect(() => {
           Axios.get("http://localhost:3001/DashDetails/Orders").then((res)=>{
            setTotalOrders(res.data);
        })
        // if(select>0){
        //     window.location.reload();
        //     Axios.get(`http://localhost:3001/DashDetails/MaxCount/${select}`).then((res)=>{
        //         setMaxCount(res.data);
        //  })
        // }
        // else{
            Axios.get("http://localhost:3001/DashDetails/MaxCount/").then((res)=>{
                setMaxCount(res.data);
         }) 
      //  }     
     },[] );
     console.log(Totalorders); 
     console.log(MaxCount);
     var total = 0;
  return (
    <>
        <AdminNavBar/>
        <Container>
            <Card>
                <Card.Header>Dash Board</Card.Header>
                <h3> Hit Product!!! </h3>
               
                {/* <Form.Control as="select"
                    onChange={(e)=>{
                        setSelect(e.target.value);
                    }} >
                <option>1</option><option>3</option> <option>5</option>
                </Form.Control> */}
                {MaxCount.map((i)=>{
                    return(
                        <>
                        <h5>
                            {i.title}   
                        </h5>
                        <Card>
                            <Card.Img src={i.image}>

                            </Card.Img>
                        </Card>
                        </>
                    )
                })}
               
                <Card.Body><table>
                <tr>
                <th>Date</th><p></p>
                <th>Orders</th><p></p>
                <th>Earnings</th>
                
                </tr>
                  
                {Totalorders.map((i)=>{
                    total =total + i.TotalDayEarnings;
                    return(
                        <>
                        <tr>
                    <td> {i.OnDay} </td>
                    <td></td>
                    <td>{i.totalOrders}</td>
                   <td></td>
                    <td>{i.TotalDayEarnings}</td>
                    </tr>
                    
                    </>
                    )
                })}
                <tr>
                <td></td>
                        <th>Total Earnings:</th>
                        <td></td>
                        <td>{total}</td>
                    </tr>
                </table></Card.Body>
            </Card>
        </Container>
    </>
  )
}
