import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function Aboutus() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col md="auto">
          <h1>About Us</h1>
          <p>
            Welcome to our hotel reservation system. We are committed to providing our customers with the best and most seamless hotel booking experience.
          </p>
          <p>
            Our system allows you to search for hotels in your desired location, compare prices, and make a reservation in just a few clicks. We work with a wide range of hotels to ensure that you can find the perfect place to stay, no matter your budget or preferences.
          </p>
          <p>
            We pride ourselves on our customer service and are always here to help if you have any questions or issues. Thank you for choosing us for your hotel booking needs.
          </p>
        </Col>
      </Row>
    </Container>
  );
}