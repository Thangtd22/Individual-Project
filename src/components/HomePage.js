import { useEffect, useState } from "react";
import CreateProducts from "./CreateProducts";
import Footer from "./Footer";
import Header from "./Header";
import Products, { Category } from "./Products";
import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import axios from 'axios';
import ProductDetail from "./ProductDetail";
import EditProduct from "./EditProduct";
export default function HomePage({ cart }) {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    useEffect(() => {
        //call API -> get app categories ("http://localhost:9999/categories")
        fetchCategories();
    }, []);
    const fetchCategories = async () => {
        const response = await axios.get("http://localhost:9999/categories");
        setCategories(response.data);
    }
    return (
        <Container fluid>
            <Row style={{ lineHeight: '50px', borderBottom: '10px solid #422422', paddingBottom: '20px' }}>
                <Header cart={cart}/>
            </Row>
            <Row style={{ margin: "20px auto" }}>
                <Col xs={12} md={4} xl={3}>
                    <Category data={products} data2={categories} test="category" />
                </Col>
                <Col>
                    <Outlet />
                </Col>
            </Row>
            <Row style={{ paddingTop: '20px' }}>
                <Footer />
            </Row>
        </Container>
    )
}