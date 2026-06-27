import { Container } from 'react-bootstrap';

const Footer = () => {
    return (
        <footer className="bg-dark text-white py-4 mt-5">
            <Container className="text-center">
                <h5>AgriMarket</h5>
                <p className="text-muted mb-0">Providing fresh and quality agricultural products directly to you.</p>
                <small className="text-muted">&copy; {new Date().getFullYear()} AgriMarket. All rights reserved.</small>
            </Container>
        </footer>
    );
};

export default Footer;
