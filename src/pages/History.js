import React, { useContext, useEffect, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link,useNavigate } from "react-router-dom";

export default function History() {
  const { customerId } = useContext(AuthOptions);
  const [reservations, setReservations] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    async function findResservationByCutsomerId(customerId) {
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
        console.log("Error findResservationByCutsomerId ", error);
      }
    }
    if (customerId) {
      findResservationByCutsomerId(customerId);
    }
    else {
      navigate("/login");
    }
  }, [customerId,navigate]);
  console.log(reservations);

  const isWithinTwoDays = (checkInDate) => {
    const today = new Date();
    const twoDaysLater = new Date(today);
    twoDaysLater.setDate(twoDaysLater.getDate() + 2);

    const checkIn = new Date(checkInDate);
    return checkIn <= twoDaysLater;
  };

  const cancelReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/reservation/cancel?reservationId=${reservationId}`,
        { method: "PUT" }
      );
      if (response.ok) {
        setReservations(
          reservations.filter(
            (reservation) => reservation.reservationId !== reservationId
          )
        );
      } else {
        throw new Error("Cancel failed!");
      }
    } catch (error) {
      console.log("Error Cancel Reservation ", error);
    }
  };

  return (
    <div>
      <Container>
        <h3 className="d-flex mx-auto mt-4 justify-content-center">History</h3>
        {customerId && <h3>Customer ID: {customerId}</h3>}
        <div></div>
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">No. </th>
                <th scope="col">Reservation ID</th>
                <th scope="col">Room Type</th>
                <th scope="col">Check In Date</th>
                <th scope="col">Check Out Date</th>
                <th scope="col">Price</th>
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
                  <td>{reservation.roomType}</td>
                  <td>{reservation.checkInDate}</td>
                  <td>{reservation.checkOutDate}</td>
                  <td>{reservation.totalPrice}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/`}>
                      View
                    </Link>
                    {!isWithinTwoDays(reservation.checkInDate) && (
                      <>
                        <Link className="btn btn-outline-primary mx-2" to={`/`}>
                          Edit
                        </Link>
                        <button
                          className="btn btn-danger mx-2"
                          onClick={() =>
                            cancelReservation(reservation.reservationId)
                          }
                        >
                          Cancel
                        </button>
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
