import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [accounts, setAccounts] = useState([]);
    const nav = useNavigate();
    useEffect(() => {
        fetchAccounts();
    }, [])
    const fetchAccounts = async () => {
        const response = await axios.get("http://localhost:9999/accounts");
        setAccounts(response.data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const validResult = checkValidate();
        if (validResult) {
            accounts.map((a) => {
                if (a.email == email && a.password == password) {
                    alert("Sign In Successfully !");
                    localStorage.setItem("users", JSON.stringify({ email: a.email, role: a.role }));
                    if (a.role == "admin") {
                        nav("/products");
                    }
                    if (a.role == "user") {
                        nav("/");
                    }
                }
            })
        }
    }
    const checkValidate = () => {
        let isValid = true;
        let mess = "";
        if (email == "") {
            mess += "The email field cannot be left\n";
            isValid = false;
        }
        if (password == "") {
            mess += "The password field cannot be left\n";
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
            <Row style={{ textAlign: 'center' }}>
                <Col>
                    <h1>Sign In</h1>
                </Col>
            </Row>
            <Row>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Col>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Email(*)</Form.Label>
                            <Col>
                                <Form.Control id='email' type='text' onChange={(e) => setEmail(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Password(*)</Form.Label>
                            <Col>
                                <Form.Control id='password' type='text' onChange={(e) => setPassword(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                    <Row style={{ textAlign: 'center' }}>
                        <Col><Button type='submit'>Login</Button></Col>
                    </Row>
                </Form>
            </Row>
        </Container>
    )
}