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

export default function Review() {
  const { state } = useLocation();
  const { reservation, room } = state;
  const navigate = useNavigate();
  const { customerId } = useContext(AuthOptions);
  useEffect(() => {
    if (!customerId) {
      navigate("/login");
    }
  }, [customerId, navigate]);
  const handleConfirm = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/update?reservationId=${reservation.reservationId}&newStatus=confirmed`,
        { method: "PUT" }
      );
      if (response.ok) {
        navigate("/history");
      } else {
        throw new Error("Confirm Fail!");
      }
    } catch (error) {
      console.log("Error confirming reservation", error);
    }
  };
  const handleBack = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/update?reservationId=${reservation.reservationId}&newStatus=cancelled`,
        { method: "PUT" }
      );
      if (response.ok) {
        navigate("/reservation");
      } else {
        throw new Error("Cancel Fail!");
      }
    } catch (error) {
      console.log("Error cancelling reservation", error);
    }
  };
  const handleHold =  () => {
    navigate("/history");
  };
  return (
    <div>
      <Container
        className="d-flex flex-column mt-5 py-3 justify-content-center align-content-center"
        style={{ height: "100%", width: "70%" }}
      >
        <h2 className="text-center mb-4">Review Your Reservation</h2>
        <Card
          className="d-flex flex-column justify-content-center mx-auto mb-3"
          style={{ width: "55%" }}
        >
          <Card.Body>
            <Card.Title>Reservation Details</Card.Title>
            <ListGroup className="list-group-flush">
              <ListGroupItem>Hotel: {room.hotelName}</ListGroupItem>
              <ListGroupItem>Hotel Address: {room.hotelAddress}</ListGroupItem>
              <ListGroupItem>Room Number: {room.roomNumber}</ListGroupItem>
              <ListGroupItem>Room Type: {room.roomType}</ListGroupItem>
              <ListGroupItem>Bed Number: {room.bedNumber}</ListGroupItem>
              <ListGroupItem>Capacity: {room.capacity}</ListGroupItem>
              <ListGroupItem>
                Price per Night: ${room.pricePerNight}
              </ListGroupItem>
              <ListGroupItem>
                Total Price: ${reservation.totalPrice}
              </ListGroupItem>
              <ListGroupItem>
                Check-in Date: {reservation.checkInDate}
              </ListGroupItem>
              <ListGroupItem>
                Check-out Date: {reservation.checkOutDate}
              </ListGroupItem>
            </ListGroup>
          </Card.Body>
          <Card.Footer>
            <Button variant="outline-primary" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="secondary" onClick={handleBack} className="ms-2">
              Back
            </Button>
            <Button variant="info" onClick={handleHold} className="ms-2">
              Hold for 15 minutes
            </Button>
          </Card.Footer>
        </Card>
      </Container>
    </div>
  );
}
