import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { Col, Container, Row, Card } from 'react-bootstrap'
import './Profile.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
export default function Profile
    () {
        const navigate = useNavigate();
        var logged = false;
        useEffect(()=>{
            if (!localStorage.getItem("user")){
                navigate('/Login');
            }
        },[]);
    return (
        <>
            <NavBar />
            
            <Container className="contain">
                <Row className='heads mt-6'>
                    <Col className='lg-4'>
                        <p style={{color : 'white'}}>Your Account</p>
                    </Col>
                </Row>
                <Row>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/UserOrders" style={{ textDecoration: 'none', color:'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png"></img>
                                        <Col className='sm-8'>
                                            <h6>Your Orders</h6>
                                            <span className='cardtext'>Track ,Return or Buy Again</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/LoginEdit" style={{ textDecoration: 'none', color:'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://media.istockphoto.com/id/936681148/vector/lock-icon.jpg?s=1024x1024&w=is&k=20&c=T396EUPHYuKRQDtX8esiGOdrLQaSAyUvMlgyL48ibic="></img>
                                        <Col className='sm-8'>
                                            <h6>Login & Security</h6>
                                            <span className='cardtext'>Edit Passwords,Mobile Number and name</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/Address" style={{ textDecoration: 'none', color:'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://img.freepik.com/free-vector/location_53876-25530.jpg?w=740&t=st=1696859251~exp=1696859851~hmac=7443d96739f6e99310b919a45f3865c87a981c7ca5c06bcb3e832a308ea11c18"></img>
                                        <Col className='sm-8'>
                                            <h6>Your Addresses</h6>
                                            <span className='cardtext'>Edit Addresses for Orders and Gifts</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-5'>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/PaymentInfo" style={{ textDecoration: 'none', color: 'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://5.imimg.com/data5/SELLER/Default/2022/4/IA/KZ/SS/138517450/credit-card-cash-withdrawal-service-1000x1000.jpg"></img>
                                        <Col className='sm-8'>
                                            <h6>Payment Options</h6>
                                            <span className='cardtext'>Add, Edit Payment Options</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://media.istockphoto.com/id/1318287938/vector/customer-service-women-with-headphones-and-microphone-with-computer-concept-illustration-for.jpg?s=1024x1024&w=is&k=20&c=kpH3RrP-ZAm2Wt7KaqajuzOa_XVZSBYPIvCXGSodJ4M="></img>
                                        <Col className='sm-8'>
                                            <h5>Contact Us</h5>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                    <Col className='col-sm-4'>
                        <Card className='cards'>
                            <Link to="/" style={{ textDecoration: 'none', color:'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <img className="cardimages" src="https://www.bigmountainanalytics.com/wp-content/uploads/2019/04/shutterstock_1119451958-930x620.jpg"></img>
                                        <Col className='sm-8'>
                                            <h6>Prime</h6>
                                            <span className='cardtext'>Get a subsrciption and avail more benifits</span>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>
                </Row>
            </Container>
            
        </>
    )
}
