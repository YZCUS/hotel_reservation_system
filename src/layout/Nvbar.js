import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { AuthOptions } from "../authentication/AuthOptions";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Nvbar() {
  const { auth, username, logout } = useContext(AuthOptions);
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Booking
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/aboutus">
              About us
            </Nav.Link>
            <Nav.Link as={Link} to="/gallery">
              Gallery
            </Nav.Link>
          </Nav>
          {auth ? (
            <>
              <Navbar.Text>Signed in as:</Navbar.Text>
              <NavDropdown title={username} id="basic-nav-dropdown">
                <NavDropdown.Item as={Link} to="/profile">
                  Profiles
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/reservation">
                  New booking
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/history">
                  History
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={logout} as={Link} to="/">
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            </>
          ) : (
            <Nav>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
              <Nav.Link as={Link} to="/register">
                Register
              </Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
