import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link, useNavigate, useLocation } from "react-router-dom";

export default function SearchResult() {
  const navigate = useNavigate();
  const { customerId } = useContext(AuthOptions);
  useEffect(() => {
    if (!customerId) {
      navigate("/login");
    }
  }, [customerId, navigate]);
  const location = useLocation();
  const { results, searchParams } = location.state || {
    results: [],
    searchParams: {},
  };
  const handleReserve = async (room) => {
    try {
      const pendingReservation = {
        roomId: room.roomId,
        customerId: customerId,
        checkInDate: room.checkInDate,
        checkOutDate: room.checkOutDate,
        totalPrice: room.totalPrice,
        status: "pending",
      };
      const response = await fetch(
        "http://localhost:8080/reservation/pending",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(pendingReservation),
        }
      );
      if (response.ok) {
        navigate("/review", {
          state: { reservation: await response.json(), room: room },
        });
      }
      else {
        console.log("Error creating pending reservation", response.status);
      }
    } catch (err) {
      console.log("Error creating pending reservation", err);
    }
  };
  return (
    <div>
      <Container
        className="d-flex flex-column mt-5 py-3 justify-content-center align-content-center"
        style={{ height: "100%", width: "70%" }}
      >
        <h2 className="text-center mb-4">Search Results</h2>
        {results.length > 0 ? (
          results.map((room, index) => (
            <Card
              className="d-flex flex-column justify-content-center mx-auto mb-3"
              key={index}
              style={{ width: "55%" }}
            >
              <Card.Body>
                <Card.Title>
                  {room.roomNumber} - {room.roomType} - {room.hotelName}
                </Card.Title>
                <ListGroup className="list-group-flush">
                  <ListGroupItem>
                    Price per Night: ${room.pricePerNight}
                  </ListGroupItem>
                  <ListGroupItem>Bed Number: {room.bedNumber} / Capacity: {room.capacity}</ListGroupItem>
                  <ListGroupItem>
                    Check in: {searchParams.checkInDate} / Check out: {searchParams.checkOutDate}
                  </ListGroupItem>
                  <ListGroupItem>
                    Hotel Address: {room.hotelAddress}
                  </ListGroupItem>
                  <ListGroupItem>
                    Total Price: ${room.totalPrice} 
                  </ListGroupItem>
                </ListGroup>
              </Card.Body>
              <Button onClick={() => handleReserve(room)}>Reserve</Button>
            </Card>
          ))
        ) : (
          <p>No rooms found matching your criteria.</p>
        )}
      </Container>
    </div>
  );
}
