import React, { useContext, useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap/";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link, useNavigate } from "react-router-dom";

export default function History() {
  const { customerId } = useContext(AuthOptions);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function findReservationByCutsomerId(customerId) {
      try {
        const response = await fetch(
          `http://localhost:8080/reservation/history?customerId=${customerId}`,
          { method: "POST" }
        );
        if (response.ok) {
          const jsonResponse = await response.json();
          console.log(jsonResponse);
          setReservations(jsonResponse);
        }
        throw new Error("Request failed!");
      } catch (error) {
        console.log("Error findReservationByCutsomerId ", error);
      }
    }
    if (customerId) {
      findReservationByCutsomerId(customerId);
    } else {
      navigate("/login");
    }
  }, [customerId, navigate]);

  const handleView = async (reservation) => {
    navigate("/view", { state: { reservation } });
  };

  const isWithinTwoDays = (checkInDate) => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);

    const checkIn = new Date(checkInDate);
    return checkIn <= twoDaysLater;
  };

  const updateReservation = async (customerId, reservationId, newStatus) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/update?customerId=${customerId}&reservationId=${reservationId}&newStatus=${newStatus}`,
        { method: "POST" }
      );
      if (response.ok) {
        const updatedReservations = reservations.map((reservation) =>
          reservation.reservationId === reservationId
            ? { ...reservation, status: newStatus }
            : reservation
        );
        setReservations(updatedReservations);
        navigate("/history");
      } else {
        throw new Error(`${newStatus} Fail!`);
      }
    } catch (error) {
      console.log("Error update reservation status", error);
    }
  };

  return (
    <div>
      <Container>
        <h3 className="d-flex mx-auto mt-4 justify-content-center">History</h3>
        <p>
          To cancel the reservation within 2 days, please contact customer
          service
        </p>
        <div></div>
        <div className="pb-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">No. </th>
                <th scope="col">Reservation ID</th>
                <th scope="col">Room Type</th>
                <th scope="col">Check In Date</th>
                <th scope="col">Check Out Date</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr>
                  <th scope="row" key={reservation.reservationId}>
                    {index + 1}
                  </th>
                  <td>{reservation.reservationId}</td>
                  <td>
                    {reservation.hotelName} - {reservation.roomType} -{" "}
                    {reservation.roomNumber}
                  </td>
                  <td>{reservation.checkInDate}</td>
                  <td>{reservation.checkOutDate}</td>
                  <td>{reservation.totalPrice}</td>
                  <td>{reservation.status}</td>
                  <td>
                    <Button
                      variant="primary"
                      className="mx-2"
                      onClick={() => handleView(reservation)}
                    >
                      View
                    </Button>
                    {reservation.status === "pending" && (
                      <>
                        <Button
                          variant="outline-primary"
                          className=" mx-2"
                          onClick={() =>
                            updateReservation(
                              customerId,
                              reservation.reservationId,
                              "confirmed"
                            )
                          }
                        >
                          Confirm
                        </Button>
                      </>
                    )}

                    {(reservation.status === "pending" ||
                      (reservation.status === "confirmed" &&
                        !isWithinTwoDays(reservation.checkInDate))) && (
                      <>
                        <Button
                          variant="outline-danger"
                          className="mx-2"
                          onClick={() =>
                            updateReservation(
                              customerId,
                              reservation.reservationId,
                              "cancelled"
                            )
                          }
                        >
                          Cancel
                        </Button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
}
