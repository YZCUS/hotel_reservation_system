import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Form, Row, Col } from "react-bootstrap";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link, useNavigate } from "react-router-dom";

export default function Reservation() {
  const [searchParams, setSearchParams] = useState({
    hotelBrand: "",
    bedNumber: "",
    roomType: "",
    minPrice: "",
    maxPrice: "",
    checkInDate: "",
    checkOutDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setSearchParams({ ...searchParams, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/reservation/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(searchParams),
      });

      if (response.ok) {
        const results = await response.json();
        navigate('/search-results', { state: { results } }); // Pass results to SearchResult.js
      } else {
        console.error("Search failed");
      }
    } catch (error) {
      console.error("Error performing search:", error);
    }
  };

  return (
    <div>
      <Container
        className="d-flex flex-column mt-5 py-3 justify-content-center align-content-center"
        style={{ height: "100%", width: "70%" }}
      >
        <h2 className="text-center mb-4">Search Your Stays</h2>
        <Form
          className="d-flex flex-column justify-content-center mx-auto"
          onSubmit={handleSubmit}
          style={{ width: "70%" }}
        >
          <Row>
            <Col md={6}>
              <Form.Group controlId="hotelBrand">
                <Form.Label className="my-2">Hotel Brand</Form.Label>
                <Form.Control
                  as="select"
                  name="hotelBrand"
                  onChange={handleChange}
                  value={searchParams.hotelBrand}
                >
                  <option value="">Select Brand</option>
                  <option value="Hyatt">Hyatt</option>
                  <option value="W Hotel">W Hotel</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="bedNumber">
                <Form.Label className="my-2">Bed Number</Form.Label>
                <Form.Control
                  as="select"
                  name="bedNumber"
                  onChange={handleChange}
                  value={searchParams.bedNumber}
                >
                  <option value="">Select Number</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  required
                </Form.Control>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="roomType">
                <Form.Label className="my-2">Room Type</Form.Label>
                <Form.Control
                  as="select"
                  name="roomType"
                  onChange={handleChange}
                  value={searchParams.roomType}
                >
                  <option value="">Select Type</option>
                  <option value="Standard">Standard</option>
                  <option value="View">View</option>
                  <option value="Execution">Execution</option>
                  <option value="President">President</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <Form.Group controlId="minPrice">
                    <Form.Label className="my-2">Min Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="minPrice"
                      onChange={handleChange}
                      value={searchParams.minPrice}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="maxPrice">
                    <Form.Label className="my-2">Max Price</Form.Label>
                    <Form.Control
                      type="number"
                      name="maxPrice"
                      onChange={handleChange}
                      value={searchParams.maxPrice}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="checkInDate">
                <Form.Label className="my-2">Check-in Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkInDate"
                  onChange={handleChange}
                  value={searchParams.checkInDate}
                  required
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="checkOutDate">
                <Form.Label className="my-2">Check-out Date</Form.Label>
                <Form.Control
                  type="date"
                  name="checkOutDate"
                  onChange={handleChange}
                  value={searchParams.checkOutDate}
                  required
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit" className="mt-3 mx-auto">
            Search
          </Button>
        </Form>
      </Container>
    </div>
  );
}
