import React, { useContext, useEffect, useState } from "react";
import { Container, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { AuthOptions } from "../authentication/AuthOptions";
import { Link, useNavigate } from "react-router-dom";

export default function Profile() {
  const { customerId } = useContext(AuthOptions);
  const [currentUser, setCurrentUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phoneNumber: "123-456-7890",
  });
  const navigate = useNavigate();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/profile/getCustomerInfo/${customerId}`,
          { method: "GET" }
        );
        if (response.ok) {
          const data = await response.json();
          setCurrentUser({
            name: data.name,
            email: data.email,
            phoneNumber: data.phoneNumber,
          });
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (customerId) {
      fetchUserData();
    } else {
      navigate("/login");
    }
  }, [customerId, navigate]);

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
    email: "",
    phoneNumber: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmitPasswordChange = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmNewPassword) {
      setError("New passwords do not match.");
      return;
    }
    try {
      const response = await fetch(
        "http://localhost:8080/profile/change_password",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
            currentPassword: formData.currentPassword,
            newPassword: formData.newPassword,
          }),
        }
      );

      if (response.ok) {
        setMessage("Password updated successfully.");
        setError("");
      } else {
        setError("Failed to update password.");
      }
    } catch (error) {
      setError("An error occurred.");
    }
  };

  const handleSubmitContactChange = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "http://localhost:8080/profile/update_contact",
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerId,
            email: formData.email,
            phoneNumber: formData.phoneNumber,
          }),
        }
      );

      if (response.ok) {
        setMessage("Contact information updated successfully.");
        setError("");
      } else {
        setError("Failed to update contact information.");
      }
    } catch (error) {
      setError("An error occurred.");
    }
  };
  return (
    <div>
      <Container
        className="d-flex flex-column mt-5 py-3 justify-content-center align-content-center"
        style={{ height: "100%", width: "50%" }}
      >
        <h2 className="text-center mb-4">Profile</h2>

        <div className="user-current-details">
          <h5>Current User Information</h5>
          <p>To change Username or Name, please contact us!</p>
          <p>
            <b>Name:</b> {currentUser.name}
          </p>
          <p>
            <b>Email:</b> {currentUser.email}
          </p>
          <p>
            <b>Phone Number:</b> {currentUser.phoneNumber}
          </p>
        </div>

        <hr />

        {message && <Alert variant="success">{message}</Alert>}
        {error && <Alert variant="danger">{error}</Alert>}
        <Form
          className="d-flex flex-column justify-content-center mx-auto"
          onSubmit={handleSubmitPasswordChange}
          style={{ width: "45%" }}
        >
          <h5>Change Password</h5>
          <Form.Group controlId="formCurrentPassword">
            <Form.Label className="my-2">Current Password</Form.Label>
            <Form.Control
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formNewPassword">
            <Form.Label className="my-2">New Password</Form.Label>
            <Form.Control
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formConfirmNewPassword">
            <Form.Label className="my-2">Confirm New Password</Form.Label>
            <Form.Control
              type="password"
              name="confirmNewPassword"
              value={formData.confirmNewPassword}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Change Password
          </Button>
        </Form>

        <hr />

        <Form
          className="d-flex flex-column justify-content-center mx-auto"
          onSubmit={handleSubmitContactChange}
          style={{ width: "45%" }}
        >
          <h5>Update Contact Information</h5>
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
          <Button variant="primary" type="submit" className="mt-3">
            Update Contact Info
          </Button>
        </Form>
      </Container>
    </div>
  );
}
