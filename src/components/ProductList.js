import axios from 'axios';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';
export default function ProductList({ data = [], setCart, cart = [] }) {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetchProducts();
    }, [])
    const fetchProducts = async () => {
        const response = await axios.get("http://localhost:9999/products");
        setProducts(response.data);
    }

    const addToCart = (product) => {
        let newcart = [...cart];
        let productInCart = cart.find(p => p.id === product.id);
        if (productInCart) {
            productInCart.cartQuantity++;
        }
        else {
            productInCart = { ...product, cartQuantity: 1 };
            newcart.push(productInCart);
        }
        setCart(newcart);
    }
    const handleClick = (e, product) => {
        e.preventDefault();
        addToCart(product);
    }
    return (
        <Container>
            <Row>
                {
                    products.map((p, index) => (
                        <Col key={index} style={{ paddingBottom: '20px' }} xs={12} sm={3}>
                            <Card style={{ width: '100%', height: '100%' }} >
                                <Link to={`/products/${p.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    <Card.Img variant="top" src={`/assets/images/${p.image}`} />
                                    <Card.Body>
                                        <Card.Title>{p.name}</Card.Title>
                                        <Card.Text>
                                            {p.price}
                                        </Card.Text>
                                    </Card.Body>
                                </Link>
                                <Button onClick={(e) => handleClick(e, p)}>Add to cart</Button>
                            </Card>
                        </Col>
                    ))
                }
            </Row>
        </Container>
    )
}