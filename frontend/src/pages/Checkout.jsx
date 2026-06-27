import { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../api/axios';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
    const { cart, fetchCart } = useCart();
    const navigate = useNavigate();
    const [address, setAddress] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Credit Card');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const cartItems = cart?.items || [];
    const total = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

    const handleCheckout = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await api.post('/orders/place', {
                shippingAddress: address,
                paymentMethod: paymentMethod
            });
            setSuccess(true);
            fetchCart(); // refresh cart (which should be empty now)
            setTimeout(() => {
                navigate('/');
            }, 3000);
        } catch (err) {
            setError('Failed to place order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <Container className="mt-5 text-center py-5">
                <CheckCircle size={80} className="text-success mb-4" />
                <h1 className="fw-bold">Order Placed Successfully!</h1>
                <p className="text-muted lead mt-3">Thank you for your purchase. Redirecting to home...</p>
            </Container>
        );
    }

    if (cartItems.length === 0) {
        return (
            <Container className="mt-5 text-center py-5">
                <h3 className="text-muted">No items to checkout.</h3>
                <Button className="btn-primary-custom mt-4" onClick={() => navigate('/products')}>Back to Shop</Button>
            </Container>
        );
    }

    return (
        <Container className="mt-5">
            <h2 className="fw-bold mb-4">Checkout</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-4">
                <Col lg={8}>
                    <Card className="border-0 shadow-sm rounded-4 mb-4">
                        <Card.Body className="p-4">
                            <h4 className="fw-bold mb-4">Shipping Details</h4>
                            <Form onSubmit={handleCheckout}>
                                <Form.Group className="mb-4">
                                    <Form.Label>Full Address</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        className="form-control-custom"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        placeholder="123 Farm Lane, Agriculture City..."
                                    />
                                </Form.Group>
                                
                                <h4 className="fw-bold mb-4 mt-5">Payment Method</h4>
                                <Form.Group className="mb-4">
                                    <Form.Check 
                                        type="radio" 
                                        label="Credit/Debit Card" 
                                        name="paymentMethod" 
                                        value="Credit Card"
                                        checked={paymentMethod === 'Credit Card'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="mb-2"
                                    />
                                    <Form.Check 
                                        type="radio" 
                                        label="Cash on Delivery" 
                                        name="paymentMethod" 
                                        value="COD"
                                        checked={paymentMethod === 'COD'}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                    />
                                </Form.Group>
                                
                                <Button type="submit" className="btn-primary-custom btn-lg w-100" disabled={loading}>
                                    {loading ? 'Processing...' : 'Place Order'}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={4}>
                    <Card className="border-0 shadow-sm rounded-4 sticky-top" style={{ top: '100px' }}>
                        <Card.Body className="p-4 bg-light rounded-4">
                            <h5 className="fw-bold mb-4">Order Summary</h5>
                            {cartItems.map((item) => (
                                <div key={item.id} className="d-flex justify-content-between mb-2">
                                    <small className="text-muted text-truncate w-75">{item.quantity}x {item.product.name}</small>
                                    <small className="fw-bold">${(item.product.price * item.quantity).toFixed(2)}</small>
                                </div>
                            ))}
                            <hr />
                            <div className="d-flex justify-content-between">
                                <h5 className="fw-bold mb-0">Total</h5>
                                <h5 className="fw-bold text-success mb-0">${total.toFixed(2)}</h5>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Checkout;
