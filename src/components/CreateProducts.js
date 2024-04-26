import { useEffect, useState } from 'react';
import { Row, Col, Container, Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
export default function CreateProducts({ data = [], data2 = [] }) {
    const [pid, setPid] = useState("")
    const [pname, setPname] = useState("");
    const [pprice, setPprice] = useState(0);
    const [pquantity, setPquantity] = useState(0);
    const [pdate, setPdate] = useState("");
    const [pcat, setPcat] = useState("");
    const [pstatus, setPstatus] = useState(false);

    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:9999/products");
        setProducts(response.data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // let pname = document.getElementById('pname').value;
        // let pprice = document.getElementById('pprice').value;
        // let pquantity = document.getElementById('pquantity').value;
        // let pdate = document.getElementById('pdate').value;
        // let pcat = document.getElementById('pcat').value;
        const validResult = checkValidate();
        if (validResult) {
            axios.post("http://localhost:9999/products", { "id": pid, "name": pname, "price": pprice, "quantity": pquantity, "createAt": pdate, "catId": pcat, "status": pstatus })
                .then((response) => console.log(response))
                .catch((error) => console.log(error))
            alert("Create new product successfully !!");
        }
    }
    const checkValidate = () => {
        let the_alert = "";
        let isValid = true;
        if (pid == "") {
            the_alert += "The id field cannot be left blank\n";
            isValid = false;
        }
        if (!pid.match(/^P\d{3}$/)) {
            the_alert += "The id field is invalid\n";
            isValid = false;
        }
        if (products.find(p => p.id == pid)) {
            the_alert += "The id existed\n";
            isValid = false;
        }
        if (pname == "") {
            the_alert += "The name field cannot be left blank\n";
            isValid = false;
        }
        if (pdate == "") {
            the_alert += "The date field cannot be left blank\n";
            isValid = false;
        }
        if (pcat == "" || pcat == 0) {
            the_alert += "The category field must be selected\n";
            isValid = false;
        }
        if (pprice <= 0) {
            the_alert += "The price must greater than 0\n";
            isValid = false;
        }
        if (pquantity <= 0) {
            the_alert += "The quantity must greater than 0\n";
            isValid = false;
        }
        if (!isValid) {
            alert(the_alert);
        }
        return isValid;
    }
    console.log(pcat);
    return (
        <Container>
            <Row style={{ textAlign: 'center' }}>
                <h3>Create new products</h3>
            </Row>
            <Row style={{ paddingBottom: '10px' }}>
                <Link to='/'>Go home</Link>
            </Row>
            <Row>
                <Form onSubmit={(e) => handleSubmit(e)}>
                    <Row>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Id:</Form.Label>
                            <Col>
                                <Form.Control id='pid' type='text' onChange={(e) => setPid(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Name:(*)</Form.Label>
                            <Col>
                                <Form.Control id='pname' type='text' placeholder='Enter product name ...' onChange={(e) => setPname(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Price:</Form.Label>
                            <Col>
                                <Form.Control id='pprice' type='number' min={0} onChange={(e) => setPprice(parseInt(e.target.value))}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Quantity:</Form.Label>
                            <Col>
                                <Form.Control id='pquantity' type='number' min={0} onChange={(e) => setPquantity(parseInt(e.target.value))}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Create At:</Form.Label>
                            <Col>
                                <Form.Control id='pdate' type='date' onChange={(e) => setPdate(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Category:</Form.Label>
                            <Col>
                                <Form.Select id='pcat' onChange={(e) => setPcat(parseInt(e.target.value))}>
                                    <option value={0}>--select categories--</option>
                                    {
                                        data2.map((c, index) => (
                                            <option key={index} value={c.id}>{c.name}</option>
                                        ))
                                    }
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Status:</Form.Label>
                            <Col>
                                <Form.Check  onChange={(e) => setPstatus(e.target.checked)} />
                            </Col>
                        </Form.Group>
                    </Row>
                    <Row >
                        <Col><Button type='submit'>Create</Button></Col>
                    </Row>
                </Form>
            </Row>
        </Container>

    )
}