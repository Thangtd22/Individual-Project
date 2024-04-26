import { useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'

export default function Register(){
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");
    const [gender, setGender] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    const checkValidate = () => {
        let isValid = true;
        let mess = "";
        if (email == "") {
            mess += "The email field cannot be left";
            isValid = false;
        }
        if (password == "") {
            mess += "The password field cannot be left";
            isValid = false;
        }
        if(dob==""){

        }
    }
    return(
        <Container>
            <Row style={{ textAlign: 'center' }}>
                <Col>
                    <h1>Sign Up</h1>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Col>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Email(*)</Form.Label>
                            <Col>
                                <Form.Control id='email' type='text'></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Password(*)</Form.Label>
                            <Col>
                                <Form.Control id='password' type='text'></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Date of birth</Form.Label>
                            <Col>
                                <Form.Control id='dob' type='date'></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Gender</Form.Label>
                            <Col>
                                <Form.Select id='gender'>
                                    <option>male</option>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Row style={{ textAlign: 'center' }}>
                        <Col><Button type='submit'>Register</Button></Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}