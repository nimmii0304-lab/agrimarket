import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Leaf, Truck, ShieldCheck } from 'lucide-react';

const Home = () => {
    return (
        <div>
            <Container>
                <div className="hero-section">
                    <h1 className="display-4 fw-bold mb-4">Fresh Agricultural Products<br/>Delivered to You</h1>
                    <p className="lead mb-5">Support local farmers and get the highest quality produce, seeds, and equipment.</p>
                    <Link to="/products">
                        <Button className="btn-primary-custom btn-lg px-5">Shop Now</Button>
                    </Link>
                </div>

                <Row className="mt-5 pt-5 text-center g-4">
                    <Col md={4}>
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                            <Leaf size={48} className="text-success mb-3" />
                            <h3 className="h5 fw-bold">100% Organic</h3>
                            <p className="text-muted">Fresh from the farms, certified organic products for a healthier lifestyle.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                            <Truck size={48} className="text-success mb-3" />
                            <h3 className="h5 fw-bold">Fast Delivery</h3>
                            <p className="text-muted">We ensure your products reach you fresh and in the shortest time possible.</p>
                        </div>
                    </Col>
                    <Col md={4}>
                        <div className="p-4 bg-white rounded-3 shadow-sm h-100">
                            <ShieldCheck size={48} className="text-success mb-3" />
                            <h3 className="h5 fw-bold">Secure Checkout</h3>
                            <p className="text-muted">Your transactions are safe with our industry-leading secure payment gateways.</p>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default Home;
