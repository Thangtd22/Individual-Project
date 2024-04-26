import { useState } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import VerifyOrder from './VerifyOrder';
export default function Cart({ data = [], cart = [], setCart }) {
    const clearStorage = (e) => {
        e.preventDefault();
        // localStorage.clear();
    }
    const removeFromCart = (e, product) => {
        e.preventDefault();
        setCart(cart.filter(p => p.id !== product.id));
    }
    const totalprice = cart.reduce((acc, curr) => acc + curr.price * curr.cartQuantity, 0);
    return (
        <Container>
            <Row style={{ textAlign: 'center', paddingBottom: '10px' }}>
                <h3>Cart</h3>
            </Row>
            <Row>
                <Row style={{ paddingBottom: '10px' }}>
                    <Col>
                        <Button onClick={(e) => clearStorage(e)}>Clear Cart</Button>
                    </Col>
                </Row>
                {cart.length === 0 ? (<h3 style={{ textAlign: 'center' }}>Empty cart</h3>) :
                    (<>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Product</th>
                                    <th>Price</th>
                                    <th>Image</th>
                                    <th>Quantity</th>
                                    <th>Total</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    cart.map((p, index) => (
                                        <tr key={index}>
                                            <td>{p.id}</td>
                                            <td>{p.name}</td>
                                            <td>{p.price}</td>
                                            <td><img src={`/assets/images/${p.image}`} /></td>
                                            <td>
                                                <div style={{ display: 'flex' }}>
                                                    {p.cartQuantity === 1 ? (
                                                        <Button disabled style={{ backgroundColor: 'grey', borderColor: 'grey' }} onClick={(e) => {
                                                            let updateCart = cart.map(item => {
                                                                if (item.id === p.id) {
                                                                    return { ...item, cartQuantity: item.cartQuantity > 1 ? item.cartQuantity - 1 : 1 };
                                                                }
                                                                return item;
                                                            });
                                                            setCart(updateCart);
                                                        }}>-</Button>
                                                    ) : (
                                                        <Button onClick={(e) => {
                                                            let updateCart = cart.map(item => {
                                                                if (item.id === p.id) {
                                                                    return { ...item, cartQuantity: item.cartQuantity > 1 ? item.cartQuantity - 1 : 1 };
                                                                }
                                                                return item;
                                                            });
                                                            setCart(updateCart);
                                                        }}>-</Button>
                                                    )}
                                                    <span style={{ paddingTop: "0.75rem", paddingBottom: "0.75rem", paddingRight: "10px", paddingLeft: "10px", backgroundColor: 'white', borderRadius: '5px' }}>{p.cartQuantity}</span>
                                                    {p.cartQuantity === p.quantity ? (
                                                        <Button disabled style={{ backgroundColor: 'grey', borderColor: 'grey' }} onClick={(e) => {
                                                            let updateCart = cart.map((item) => {
                                                                if (item.id === p.id) {
                                                                    return { ...item, cartQuantity: item.cartQuantity < item.quantity ? item.cartQuantity + 1 : item.quantity };
                                                                }
                                                                return item;
                                                            });
                                                            setCart(updateCart);
                                                        }}>+</Button>
                                                    ) : (
                                                        <Button onClick={(e) => {
                                                            let updateCart = cart.map((item) => {
                                                                if (item.id === p.id) {
                                                                    return { ...item, cartQuantity: item.cartQuantity < item.quantity ? item.cartQuantity + 1 : item.quantity };
                                                                }
                                                                return item;
                                                            });
                                                            setCart(updateCart);
                                                            console.log(updateCart)
                                                        }}>+</Button>
                                                    )}
                                                </div>
                                            </td>
                                            <td>{p.price * p.cartQuantity}</td>
                                            <td>
                                                <Button style={{ backgroundColor: 'transparent', color: 'black', border: 0 }} onClick={(e) => removeFromCart(e, p)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                                                    </svg>Del
                                                </Button>
                                            </td>
                                        </tr>
                                    ))
                                }
                                <tr>
                                    <td colSpan={4}>
                                        <h5>Total price</h5>
                                    </td>
                                    <td colSpan={2} style={{ textAlign: 'end' }}>
                                        <h5>{totalprice}</h5>
                                    </td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </Table>
                        <Row style={{ paddingTop: "10px" }}>
                            <VerifyOrder cart={cart} totalprice={totalprice} />
                        </Row>
                    </>)
                }
            </Row>
        </Container>
    )
}