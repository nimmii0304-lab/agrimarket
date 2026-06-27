import { Navbar, Nav, Container, Badge } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut } from 'lucide-react';

const NavigationBar = () => {
    const { user, logout } = useAuth();
    const { cart } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const cartItemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <Navbar expand="lg" className="navbar-custom sticky-top">
            <Container>
                <Navbar.Brand as={Link} to="/" className="fw-bold" style={{ color: '#2e7d32' }}>
                    AgriMarket
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">Home</Nav.Link>
                        <Nav.Link as={Link} to="/products">Shop</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        {user ? (
                            <>
                                <Nav.Link as={Link} to="/cart" className="position-relative me-3">
                                    <ShoppingCart size={20} />
                                    {cartItemsCount > 0 && (
                                        <Badge bg="success" pill className="position-absolute top-0 start-100 translate-middle">
                                            {cartItemsCount}
                                        </Badge>
                                    )}
                                </Nav.Link>
                                <Nav.Link className="me-3">
                                    <User size={20} className="me-1" />
                                    {user.username}
                                </Nav.Link>
                                <Nav.Link onClick={handleLogout} style={{ cursor: 'pointer' }}>
                                    <LogOut size={20} /> Logout
                                </Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register" className="btn btn-primary-custom ms-2 text-white">
                                    Sign Up
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;
