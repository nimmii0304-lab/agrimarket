import { useState } from 'react';
import { Container, Form, Alert, Row, Col, Card } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to login');
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center mt-5">
            <Row className="w-100 justify-content-center">
                <Col md={6} lg={5}>
                    <Card className="border-0 shadow-sm p-4 rounded-4">
                        <Card.Body>
                            <h2 className="text-center mb-4 fw-bold" style={{ color: '#2e7d32' }}>Welcome Back</h2>
                            {error && <Alert variant="danger">{error}</Alert>}
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className="form-control-custom"
                                        placeholder="Enter your username"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        className="form-control-custom"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </Form.Group>
                                <button className="btn btn-primary-custom w-100 mb-3" type="submit">
                                    Login
                                </button>
                                <p className="text-center text-muted">
                                    Don't have an account? <Link to="/register" style={{ color: '#2e7d32' }}>Sign up</Link>
                                </p>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;
