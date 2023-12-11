import React, { useEffect, useState } from 'react'
import NavBar from './NavBar'
import './Address.css';
import { Col, Container, Row, Card } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import Axios, * as others from 'axios';
import Footer from './Footer';
export default function Address() {
    const [def, setdef] = useState(false);
    const [Addressdata, setAddressdata] = useState([]);
    let name = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();
    var logged = false;
    
    useEffect(() => {
        if (localStorage.getItem("user")) {
            Axios.get(`http://localhost:3001/Address/${name}`).then((response) => {
                setAddressdata(response.data);
            });
        }
    
    else{
              logged = true;
              navigate('/Login');
            
          }
        }, []);
    console.log(Addressdata);
    var counter = Addressdata.length;
    var i = 0;
    return (
        <>
            <NavBar />
            <Container className="contain">
                <Row className='heads mt-6'>
                    <Col className='lg-4'>
                   
                        <p className='pathfinder'> <Link to='/Profile' style={{ textDecoration: 'none',colour :' rgb(128, 128, 128)',hover : 'green'}}>Your Account</Link> {'>'} Your Addresses</p>
                    </Col>
                </Row>
                <Row className='mt-3'>
                    <Col className='col-sm-4'>
                        <Card className='newcards'>
                            <Link to="/NewAddress" style={{ textDecoration: 'none', color: 'black' }}>
                                {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                <Card.Body>
                                    <Row>
                                        <Col className='sm-8'>
                                            <h1 className='addcards'>+</h1>
                                            <p className='newer'>Add Address</p>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Link>
                        </Card>
                    </Col>

                    {Addressdata.map((val, i) => {
                        {/* if(val.defaults==1){
                    setdef(true);
                }
                console.log(setdef); */}
                        return (
                            <Col className='col-sm-4'>
                                <Card className='addresscards'>
                                    {/* <Link to="/" style={{ textDecoration: 'none', color:'black' }}> */}
                                    {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> */}
                                    <Card.Body>
                                        <Row> <p className='bord'></p></Row>
                                        <Row>
                                            <Col className='sm-8'>

                                                <h6 className='head'>{++i}. {val.name}</h6>
                                                <Row>
                                                    <span className='cardtext'>{val.flatno}</span>
                                                    <span className='cardtext'>{val.area}</span>
                                                    <span className='cardtext'>{val.city}</span>
                                                    <span className='cardtext'>{val.state}</span>
                                                    <span className='cardtext'>{val.country}</span>
                                                </Row>
                                                <Row>
                                                    <span className='cardtext'>Phone Number:{val.secmob}</span></Row>

                                            </Col>
                                        </Row>
                                        <br />
                                        <Row className='cardtext'>
                                            <Link>Edit</Link><p>|</p><Link>Remove</Link>
                                        </Row>
                                    </Card.Body>
                                    {/* </Link> */}
                                </Card>
                            </Col>

                        )
                    })}
                </Row>
            </Container>
            <Footer />
        </>
    )
}
{/* <Col className='col-sm-4'>
                <Card className='cards'>
                    <Link to="/" style={{ textDecoration: 'none', color:'black' }
                        {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> 
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
       
            <Col className='col-sm-4'>
                <Card className='cards'>
                    <Link to="/" style={{ textDecoration: 'none', color: 'black' }}>
                        {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> 
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
                        {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> 
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
                        {/* <Card.Img src="https://cdn.vox-cdn.com/uploads/chorus_asset/file/22337486/new_icon.png" ></Card.Img> 
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
        </Row> */}