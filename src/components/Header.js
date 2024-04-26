import { Row, Col, Nav, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
export default function Header({ cart }) {
    const [user, setUser] = useState(null);
    const nav = useNavigate();
    useEffect(() => {
        const storedUser = localStorage.getItem("users");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, [])
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("users");
        setUser(null);
        nav("/");
    }
    return (
        <div style={{ backgroundColor: '#422422', color: 'white' }}>
            {user ? (
                <Nav as="ul">
                    <Nav.Item as="li">
                        <Nav.Link href='/cart'><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1" />
                        </svg>user</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Button onClick={(e) => handleLogout(e)}>Logout</Button>
                    </Nav.Item>
                </Nav>
            ) : (
                <Nav as="ul" >
                    <Nav.Item as="li">
                        <Nav.Link href="/auth/register">Register</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/auth/login">Login</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li">
                        <Nav.Link href="/cart" style={{ color: 'white' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                                <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
                            </svg>
                            Cart({cart.length})
                        </Nav.Link>
                    </Nav.Item>
                </Nav>
            )}
        </div>
    )
}