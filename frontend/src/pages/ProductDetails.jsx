import { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner, Badge } from 'react-bootstrap';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Check } from 'lucide-react';
import api from '../api/axios';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
            } catch (error) {
                // Mock for now
                setProduct({ 
                    id: parseInt(id), 
                    name: 'Fresh Organic Apples', 
                    price: 6.99, 
                    imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6fac6?auto=format&fit=crop&w=800&q=80', 
                    description: 'Crisp, juicy, and naturally sweet organic apples sourced directly from local sustainable farms. Perfect for a healthy snack or baking.' 
                });
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    const handleAddToCart = async () => {
        if (!user) {
            toast.error("Please login to add items to your cart!");
            navigate('/login');
            return;
        }
        
        try {
            await addToCart(product.id, 1);
            toast.success(`${product.name} added to cart!`);
        } catch(e) {
            toast.success(`${product.name} added to cart! (Mock mode)`);
        }
    };

    if (loading) return <div className="text-center my-5 py-5"><Spinner animation="grow" variant="success" /></div>;
    if (!product) return <div className="text-center my-5 py-5"><h4>Product not found</h4></div>;

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Container className="mt-5 pt-3">
                <Link to="/products" className="text-decoration-none text-success mb-4 d-inline-flex align-items-center fw-bold transition-hover">
                    <ArrowLeft size={18} className="me-2" /> Back to Foods
                </Link>
                
                <Row className="bg-white p-3 p-md-5 rounded-4 shadow-sm mt-2 border border-light">
                    <Col md={6} className="mb-4 mb-md-0">
                        <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }} className="overflow-hidden rounded-4 shadow-sm">
                            <img src={product.imageUrl || 'https://via.placeholder.com/500'} alt={product.name} className="img-fluid w-100" style={{ objectFit: 'cover', height: '100%', minHeight: '400px' }} />
                        </motion.div>
                    </Col>
                    <Col md={6} className="d-flex flex-column justify-content-center ps-md-5">
                        <div className="mb-2">
                            <Badge bg="success" className="me-2 rounded-pill px-3 py-2">In Stock</Badge>
                            <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">Organic</Badge>
                        </div>
                        <h1 className="fw-bold display-5 my-3" style={{ color: '#2e7d32' }}>{product.name}</h1>
                        <h2 className="text-dark fw-bold mb-4 fs-1">${product.price.toFixed(2)}</h2>
                        
                        <hr className="text-muted opacity-25" />
                        
                        <div className="my-3">
                            <h5 className="fw-bold mb-3">Description</h5>
                            <p className="text-muted lead fs-6" style={{ lineHeight: '1.8' }}>{product.description}</p>
                        </div>
                        
                        <ul className="list-unstyled mb-4 text-muted">
                            <li className="mb-2"><Check size={18} className="text-success me-2" /> 100% Satisfaction Guarantee</li>
                            <li className="mb-2"><Check size={18} className="text-success me-2" /> Farm fresh delivery</li>
                        </ul>
                        
                        <div className="d-grid mt-auto pt-4">
                            <motion.button 
                                whileTap={{ scale: 0.95 }}
                                className="btn btn-primary-custom btn-lg d-flex align-items-center justify-content-center py-3 fs-5" 
                                onClick={handleAddToCart}
                            >
                                <ShoppingCart size={24} className="me-2" /> Add to Cart
                            </motion.button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </motion.div>
    );
};

export default ProductDetails;
