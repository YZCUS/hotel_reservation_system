import React, { useContext, useEffect, useState } from "react";
import {
  Container,
  Card,
  ListGroup,
  ListGroupItem,
  Button,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthOptions } from "../authentication/AuthOptions";

export default function ViewReservation() {
  const { reservation } = useLocation().state;
  const navigate = useNavigate();
  const { customerId } = useContext(AuthOptions);
  const [reservationDetail, setReservationDetail] = useState({});
  useEffect(() => {
    if (!customerId) {
      navigate("/login");
    }
    if (!reservation) {
      navigate("/history");
    } else {
      getReservationDetailsById(reservation.reservationId);
    }
  }, [customerId, navigate, reservation]);
  const isWithinTwoDays = (checkInDate) => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);

    const checkIn = new Date(checkInDate);
    return checkIn <= twoDaysLater;
  };
  const getReservationDetailsById = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/view?reservationId=${reservationId}`,
        { method: "GET" }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setReservationDetail(jsonResponse);
      } else {
        throw new Error("Request failed!");
      }
    } catch (error) {
      console.log("Error getReservationDetailsById ", error);
    }
  };

  const handleBack = async () => {
    navigate("/history");
  };

  const handleConfirm = async (customerId, reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/update?customerId=${customerId}&reservationId=${reservationId}&newStatus=confirmed`,
        { method: "POST" }
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
  const handleCancel = async (customerId, reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/update?customerId=${customerId}&reservationId=${reservationId}&newStatus=cancelled`,
        { method: "POST" }
      );
      if (response.ok) {
        navigate("/history");
      } else {
        throw new Error("Cancel Fail!");
      }
    } catch (error) {
      console.log("Error cancelling reservation", error);
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">View Reservation</h2>
      <Card
        className="d-flex flex-column justify-content-center mx-auto mb-3"
        style={{ width: "55%" }}
      >
        <Card.Body>
          <Card.Title>Reservation Details</Card.Title>
          <ListGroup className="list-group-flush">
            <ListGroupItem>Hotel: {reservationDetail.hotelName}</ListGroupItem>
            <ListGroupItem>
              Hotel Address: {reservationDetail.hotelAddress}
            </ListGroupItem>
            <ListGroupItem>
              Room Number: {reservationDetail.roomNumber}
            </ListGroupItem>
            <ListGroupItem>
              Room Type: {reservationDetail.roomType}
            </ListGroupItem>
            <ListGroupItem>
              Bed Number: {reservationDetail.bedNumber}
            </ListGroupItem>
            <ListGroupItem>
              Capacity: {reservationDetail.capacity}
            </ListGroupItem>
            <ListGroupItem>
              Price per Night: ${reservationDetail.pricePerNight}
            </ListGroupItem>
            <ListGroupItem>
              Total Price: ${reservationDetail.totalPrice}
            </ListGroupItem>
            <ListGroupItem>
              Check-in Date: {reservationDetail.checkInDate}
            </ListGroupItem>
            <ListGroupItem>
              Check-out Date: {reservationDetail.checkOutDate}
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
        <Card.Footer>
          {reservation.status === "pending" && (
            <>
              <Button
                variant="outline-primary"
                onClick={() =>
                  handleConfirm(customerId, reservation.reservationId)
                }
              >
                Confirm
              </Button>
              <Button
                variant="danger"
                onClick={() =>
                  handleCancel(customerId, reservation.reservationId)
                }
                className="ms-2"
              >
                Cancel
              </Button>
            </>
          )}
          {reservation.status === "confirmed" &&
            !isWithinTwoDays(reservation.checkInDate) && (
              <Button
                variant="danger"
                onClick={() =>
                  handleCancel(customerId, reservation.reservationId)
                }
              >
                Cancel
              </Button>
            )}
          <Button variant="secondary" onClick={handleBack} className="ms-2">
            Back
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  );
}
