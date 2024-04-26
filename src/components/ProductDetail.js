import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';

export default function ProductDetail() {
    const { productid } = useParams();
    const [product, setProduct] = useState({});
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        fetchProduct();
        fetchCategory();
    }, [])
    const fetchProduct = async () => {
        const response = await axios.get(`http://localhost:9999/products/${productid}`);
        setProduct(response.data);
    }
    const fetchCategory = async () => {
        const response = await axios.get(`http://localhost:9999/categories`);
        setCategories(response.data);
    }
    return (
        <Container>
            <Row>
                <Link to={"/"}>Go home</Link>
            </Row>
            <Row>
                <Col>
                    <div>Product ID : </div>
                    <div>Name : </div>
                    <div>Price : </div>
                    <div>Quantity : </div>
                    <div>Category : </div>
                    <div>Create At : </div>
                    <div>Status : </div>
                </Col>
                <Col>
                    <div>{product?.id}</div>
                    <div>{product?.name}</div>
                    <div>{product?.price}</div>
                    <div>{product?.quantity}</div>
                    <div>{categories.map(c => { if (c.id == product?.catId) return c.name })}</div>
                    <div>{product?.createAt ? product.createAt : "No data"}</div>
                    <div>{product?.status == true ? "In stock" : "Out stock"}</div>
                </Col>
            </Row>
        </Container>
    )
}