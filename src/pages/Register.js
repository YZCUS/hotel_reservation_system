import React, { useState } from "react";
import { Button, Container, Form, Alert } from "react-bootstrap";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [usernameExists, setUsernameExists] = useState(false);
  const [passwordNotMatch, setPasswordNotMatch] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(
    "Please enter your information for registration"
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkUsernameExists = async (username) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/customer/check?username=${username}`,
        { method: "GET" }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        setUsernameExists(jsonResponse.exists);
      }
      throw new Error("Request failed!");
    } catch (error) {
      console.log("Error checkUsernameExists ", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (formData.password !== formData.confirmPassword) {
      setPasswordNotMatch(true);
      setLoading(false);
      return;
    }
    setPasswordNotMatch(false);
    await checkUsernameExists(formData.username);
    if (usernameExists) {
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setMessage("Registration successful!");
        // Redirect or further actions here...
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration error:", error);
      setError("Registration failed due to an error");
    }
    setLoading(false);
  };

  return (
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
        {error && <Alert variant="danger">{error}</Alert>}
        {usernameExists && (
          <Alert variant="warning">Username already exists</Alert>
        )}
        
        {passwordNotMatch && (
          <Alert variant="danger">Passwords do not match</Alert>
        )}

        <Form.Group controlId="formUsername">
          <Form.Label className="my-2">Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            onBlur={() => checkUsernameExists(formData.username)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label className="my-2">Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formConfirmPassword">
          <Form.Label className="my-2">Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formName">
          <Form.Label className="my-2">Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label className="my-2">Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPhoneNumber">
          <Form.Label className="my-2">Phone Number</Form.Label>
          <Form.Control
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={loading}
          className="mt-3 mx-auto"
        >
          Register
        </Button>
      </Form>
    </Container>
  );
}
