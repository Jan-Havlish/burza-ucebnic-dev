import React, { useState } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { useUser } from "./UserContext";

const NavBar = () => {
  const user = useUser();
  if (user) {
    console.log("Jméno uživatele:", user.displayName);
  }

  const [expanded, setExpanded] = useState(false);

  const closeNavMenu = () => {
    setExpanded(false);
  };

  return (
    <Navbar bg="danger" variant="dark" expand="lg" expanded={expanded}>
      <Navbar.Brand as={NavLink} to="/" onClick={closeNavMenu}>
        Domů
      </Navbar.Brand>
      <Navbar.Toggle
        aria-controls="basic-navbar-nav"
        onClick={() => setExpanded(!expanded)}
      />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={NavLink} to="/ucebnice" onClick={closeNavMenu}>
            Učebnice
          </Nav.Link>
          <Nav.Link as={NavLink} to="/o" onClick={closeNavMenu}>
            O burze
          </Nav.Link>
          {user ? (
            <Nav.Link as={NavLink} to="/user" onClick={closeNavMenu}>
              {" "}
              {user.displayName}
            </Nav.Link>
          ) : (
            <Nav.Link as={NavLink} to="/login" onClick={closeNavMenu}>
              Příhlásit se
            </Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
