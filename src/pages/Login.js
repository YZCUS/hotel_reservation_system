import React, { useState, useContext } from "react";
import { AuthOptions } from "../authentication/AuthOptions";
import { Container, Form, Button } from "react-bootstrap";
import { useNavigate, Link } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(
    "Please enter your username and password"
  );
  const { login } = useContext(AuthOptions);
  const navigate = useNavigate();

  async function fetchCustomerId(username, password) {
    try {
      const response = await fetch(
        `http://localhost:8080/auth/login?username=${encodeURIComponent(
          username
        )}&password=${encodeURIComponent(password)}`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        return jsonResponse;
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log("Error fetch customerId ", error);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerId = await fetchCustomerId(username, password);
    if (customerId) {
      login(username, customerId);
      console.log("Logged in", customerId);
      navigate("/");
    } else {
      setMessage("Invalid username or password");
    }
  };
  return (
    <div>
      <Container
        className="d-flex flex-column mt-5 py-3 justify-content-center align-content-center"
        style={{ height: "100%" }}
      >
        <h3 className="text-center mb-4">{message}</h3>
        <Form
          className="d-flex flex-column justify-content-center mx-auto"
          onSubmit={handleSubmit}
          style={{ width: "40%" }}
        >
          <Form.Group controlId="formBasicEmail">
            <Form.Label className="my-2">Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label className="my-2">Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Button
            className="d-flex mx-auto mt-3"
            variant="primary"
            type="submit"
          >
            Login
          </Button>
          <Link className="text-center mt-3" to="/register">
            Don't have an account? Register
          </Link>
        </Form>
      </Container>
    </div>
  );
}
