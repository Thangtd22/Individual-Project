import axios from 'axios';
import { useEffect, useState } from 'react'
import { Container, Row, Col, Form, Button } from 'react-bootstrap'
import { useParams, Link } from 'react-router-dom'
export default function EditProduct() {
    const [product, setProduct] = useState({});
    const { productid } = useParams();
    const [pid, setPid] = useState("");

    useEffect(() => {
        fetchProduct();
    }, []);
    const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:9999/products/${productid}`);
        setProduct(response.data);
    }
    return (
        <Container>
            <Row>
                <Link to={"/"}>Go home</Link>
            </Row>
            <Form>
                <Row>
                    <Col>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Product ID : </Form.Label>
                            <Col>
                                <Form.Control type='text' defaultValue={product.id} onClick={(e) => setPid(e.target.value)}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Name : </Form.Label>
                            <Col>
                                <Form.Control type='text' defaultValue={product.name}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Price : </Form.Label>
                            <Col>
                                <Form.Control type='number' defaultValue={product.price}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Quantity : </Form.Label>
                            <Col>
                                <Form.Control type='number' defaultValue={product.quantity}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Category : </Form.Label>
                            <Col>
                                <Form.Select>
                                    <></>
                                </Form.Select>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Create At : </Form.Label>
                            <Col>
                                <Form.Control type='date' defaultValue={product.createAt}></Form.Control>
                            </Col>
                        </Form.Group>
                        <Form.Group as={Row} style={{ paddingBottom: '10px' }}>
                            <Form.Label column md={2}>Status : </Form.Label>
                            <Col>
                                <Form.Control type='text' ></Form.Control>
                            </Col>
                        </Form.Group>
                    </Col>
                </Row>
                <Row style={{ textAlign: 'center', paddingTop: '20px' }}>
                    <Col>
                        <Button>Edit</Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}