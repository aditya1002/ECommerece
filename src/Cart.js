import { useEffect, useState } from "react";
import { useNavigate,Link } from 'react-router-dom';
import React from 'react';
import { Card,Button, Col, Container, Form, Image, ListGroup, Row } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { CartState } from "./Context/Context";
// import Rating from "./Rating";
import "./Cart.css";
import NavBar from "./NavBar";

function Cart() {
  const[cartstatus,setCartStatus]=useState(false);
  const navigate = useNavigate();
  const {
    state: {cart},
    dispatch,
  } = CartState();
  const [total, setTotal] = useState();
  useEffect(() => {
    if(cart.Cost>0){
      setTotal(
        cart.reduce((acc, curr) => acc + Number(curr.Cost) * curr.qty, 0)
        );
        // localStorage.setItem("cart",cart);

    }
    else{

      setTotal(
        cart.reduce((acc, curr) => acc + Number(curr.price) * curr.qty, 0),
        cart.reduce((acc, curr) => acc + Number(curr.Cost) * curr.qty, 0)
        );
    }
        localStorage.setItem("cart",cart);

    }, [cart]);
    console.log(cart);
  const proceeder = () => {
    // const navigate = useNavigate();
    var logged = false;
    if (localStorage.getItem("user")) {
      logged = true;
      navigate('/CheckOut');
    }
    else {
      navigate('/Login');
    }
  }
  var ops =['rm','add','change'];
  function cartupdater(params){
    console.log("Updater at cart");
    console.log('value is',{params});
  }
  return (

    <>
      <NavBar />
      {
        cart.length==0 ? 
      <Container>
      <Card style={{"padding":"100px"}}>Nothing in Cart Buy something 
        <Link to ='/'>here</Link></Card>
        </Container>
        :   
       <Container>
        <ListGroup className="cartelements">
          <span className="title">Subtotal ({cart.length}) items</span>
          {cart.map((prod) => (
            <ListGroup.Item key={prod.id}>
              <Row>
                <Col md={2}>
                  <Image src={prod.image} fluid rounded />
                  <h6>{prod.title}</h6>
                </Col>
                <Col md={2}>
                  <span>{prod.text}</span>
                </Col>
                <Col md={2}>
                  {prod.qty} x {prod.price} =₹ {prod.qty * prod.price}
                 </Col>
                <Col md={2}>
                  {/* <Rating rating={prod.ratings} /> */}
                </Col>
                <Col md={2}>
                  <Form.Control
                    as="select"
                    value={prod.qty}
                    onChange={(e) =>{
                      dispatch({
                        type: "CHANGE_CART_QTY",
                        payload: {
                          id: prod.id,
                          qty: e.target.value,
                        },
                      });
                      cartupdater(ops[2]);
                    }
                    }
                  >
                    {[...Array(prod.Stock).keys()].map((x) => (
                      <option key={x + 1}>{x + 1}</option>
                    ))}
                  </Form.Control>
                </Col>
                <Col md={2}>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() =>{
                      dispatch({
                        type: "REMOVE_FROM_CART",
                        payload: prod,
                      })
                      cartupdater(ops[0]);
                    }
                    }
                  >
                    <AiFillDelete fontSize="20px" />
                  </Button>
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <Col className="md-6" style={{ justifyContent: "left" }}>
          <span style={{ fontWeight: 700, fontSize: 20,color:'white' }}>Total: ₹ {total}</span>
        </Col>

        <Row className="mt-3" style={{ float: "left" }}>
          <Button type="button" disabled={cart.length === 0} onClick={proceeder}>
            Proceed to Checkout
          </Button>
        </Row>
      </Container>
      }
    </>
  );
}

export default Cart;