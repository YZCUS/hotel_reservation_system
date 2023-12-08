import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer mt-auto py-3 bg-light">
            <Container>
                <Row>
                    <Col className="text-center">
                        Hotel Reservation © 2023
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
