import { Container, Row, Col, Card, Button, ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const Cart = () => {
    const { cart, removeFromCart } = useCart();

    const cartItems = cart?.items || [];
    const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const handleRemove = (id) => {
        removeFromCart(id);
        toast.success("Item removed from cart");
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Container className="mt-5">
                <h2 className="fw-bold mb-4" style={{ color: '#2e7d32' }}>Your Shopping Cart</h2>
            
            {cartItems.length === 0 ? (
                <div className="text-center py-5 bg-white rounded-4 shadow-sm">
                    <h4 className="text-muted mb-4">Your cart is empty</h4>
                    <Link to="/products">
                        <Button className="btn-primary-custom px-4 py-2">Continue Shopping</Button>
                    </Link>
                </div>
            ) : (
                <Row className="g-4">
                    <Col lg={8}>
                        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
                            <ListGroup variant="flush">
                                <AnimatePresence>
                                    {cartItems.map((item) => (
                                        <motion.div 
                                            key={item.id}
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <ListGroup.Item className="p-4 d-flex align-items-center">
                                        <img src={item.product.imageUrl || 'https://via.placeholder.com/100'} alt={item.product.name} className="rounded" style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
                                        <div className="ms-4 flex-grow-1">
                                            <h5 className="fw-bold mb-1">{item.product.name}</h5>
                                            <p className="text-muted mb-0">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-end ms-4">
                                            <h5 className="fw-bold text-success mb-2">${(item.product.price * item.quantity).toFixed(2)}</h5>
                                            <Button variant="outline-danger" size="sm" className="d-flex align-items-center" onClick={() => handleRemove(item.id)}>
                                                <Trash2 size={16} className="me-1" /> Remove
                                            </Button>
                                        </div>
                                    </ListGroup.Item>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </ListGroup>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
                            <Card.Body className="p-4">
                                <h4 className="fw-bold mb-4">Order Summary</h4>
                                <div className="d-flex justify-content-between mb-3">
                                    <span className="text-muted">Subtotal</span>
                                    <span className="fw-bold">${total.toFixed(2)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4 pb-4 border-bottom">
                                    <span className="text-muted">Shipping</span>
                                    <span className="fw-bold">Free</span>
                                </div>
                                <div className="d-flex justify-content-between mb-4">
                                    <h5 className="fw-bold">Total</h5>
                                    <h5 className="fw-bold text-success">${total.toFixed(2)}</h5>
                                </div>
                                <div className="d-grid">
                                    <Link to="/checkout" className="btn btn-primary-custom btn-lg d-flex align-items-center justify-content-center">
                                        Proceed to Checkout <ArrowRight size={20} className="ms-2" />
                                    </Link>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            )}
            </Container>
        </motion.div>
    );
};

export default Cart;
