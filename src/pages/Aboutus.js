import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

export default function Aboutus() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={8}>
          <Card className="shadow">
            <Card.Body>
              <Card.Title as="h1" className="text-center">
                About Us
              </Card.Title>
              <Card.Text>
                Welcome to our hotel reservation system. We are committed to
                providing our customers with the best and most seamless hotel
                booking experience.
              </Card.Text>
              <Card.Text>
                Our system allows you to search for hotels in your desired
                location, compare prices, and make a reservation in just a few
                clicks. We work with a wide range of hotels to ensure that you
                can find the perfect place to stay, no matter your budget or
                preferences.
              </Card.Text>
              <Card.Text>
                We pride ourselves on our customer service and are always here
                to help if you have any questions or issues. Thank you for
                choosing us for your hotel booking needs.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
