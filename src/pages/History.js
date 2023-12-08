import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link } from "react-router-dom";

export default function History() {
  const { customerId } = useContext(AuthOptions);
  const [reservations, setReservations] = useState([]);

  return (
    <div>
      <Container>
        <h3 className="d-flex mx-auto mt-4 justify-content-center">History</h3>
        {customerId && <h3>Customer ID: {customerId}</h3>}
        <div className="py-4">
          <table className="table border shadow">
            <thead>
              <tr>
                <th scope="col">ReservationID</th>
                <th scope="col">Room Type</th>
                <th scope="col">Check In Date</th>
                <th scope="col">Check Out Date</th>
                <th scope="col">Price</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation, index) => (
                <tr>
                  <th scope="row" key={index}>
                    {index + 1}
                  </th>
                  <td>{reservation.id}</td>
                  <td>{reservation.roomType}</td>
                  <td>{reservation.checkin}</td>
                  <td>{reservation.checkout}</td>
                  <td>{reservation.price}</td>
                  <td>
                    <Link className="btn btn-primary mx-2" to={`/`}>
                      View
                    </Link>
                    <Link className="btn btn-outline-primary mx-2" to={`/`}>
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      // onClick={() => deleteUser(user.id)}
                    >
                      Cancel
                    </button>
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
