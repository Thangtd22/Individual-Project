import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function VerifyOrder({ totalprice }) {
    const nav = useNavigate();
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const validResult = checkValidate();
        if (validResult) {
            alert("order successfully");
            nav("/checkout");
        }
    }
    const checkValidate = () => {
        let isValid = true;
        let mess = "";
        if (name == "") {
            mess += "The name field cannot be left\n";
            isValid = false;
        }
        if (address == "") {
            mess += "The address field cannot be left\n";
            isValid = false;
        }
        if (phone == "") {
            mess += "The phone field cannot be left\n";
            isValid = false;
        }
        if (email == "") {
            mess += "The email field cannot be left\n";
            isValid = false;
        }
        if (!email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            mess += "The email is invalid\n";
            isValid = false;
        }
        if (!isValid) {
            alert(mess);
        }
        return isValid
    }
    return (
        <Container>
            <Row style={{ backgroundColor: '#d8dee8', borderTopLeftRadius: '10px', borderTopRightRadius: '10px', paddingTop: '10px', paddingBottom: '5px' }}>
                <h4>Order Information</h4>
            </Row>
            <Row style={{ paddingTop: '15px', borderLeft: '1px solid #d8dee8', borderRight: '1px solid #d8dee8', borderBottom: '1px solid #d8dee8', borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Col>
                        <Form.Group as={Row} style={{ paddingBottom: '10px', margin: '0 10px 0 10px' }}>
                            <Form.Label column md={2}>Name</Form.Label>
                            <Col>
                                <Form.Control id='name' type='text' placeholder='Name' onChange={(e) => setName(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px', margin: '0 10px 0 10px' }}>
                            <Form.Label column md={2}>Address</Form.Label>
                            <Col>
                                <Form.Control id='address' type='text' placeholder='Address' onChange={(e) => setAddress(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px', margin: '0 10px 0 10px' }}>
                            <Form.Label column md={2}>Phone</Form.Label>
                            <Col>
                                <Form.Control id='phone' type='text' value={phone} placeholder='Phone' onChange={(e) => { const re = /^[0-9\b]+$/; if (e.target.value === "" || re.test(e.target.value)) setPhone(e.target.value) }}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px', margin: '0 10px 0 10px' }}>
                            <Form.Label column md={2}>Email</Form.Label>
                            <Col>
                                <Form.Control id='email' type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Row style={{ margin: '0 10px 0 10px', paddingBottom: '10px', paddingTop: '5px' }}>
                            <Row>
                                <Col>
                                    <h5>Notional price</h5>
                                </Col>
                                <Col>
                                    <h5>{totalprice}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Shipping fee</h5>
                                </Col>
                                <Col>
                                    <h5>0</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Discount</h5>
                                </Col>
                                <Col>
                                    <h5>0</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>VAT</h5>
                                </Col>
                                <Col>
                                    <h5>{totalprice * 0.08}</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h5>Total price</h5>
                                </Col>
                                <Col>
                                    <h5>{totalprice + totalprice * 0.08}</h5>
                                </Col>
                            </Row>
                        </Row>
                        <Row style={{ margin: '0 10px 0 10px', paddingBottom: '20px' }}>
                            <Button type='submit' variant='danger'>Check Out</Button>
                        </Row>
                    </Col>
                </Form>
            </Row>
        </Container>
    )
}