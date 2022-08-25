import React, { useContext, useState } from "react";
import { Container, Navbar } from "react-bootstrap";
import logo from "../assets/logo.svg";
import AuthModal from "./modal/AuthModal";

export default function NavbarUser() {
  return (
    <div>
      <Container>
        <Navbar fixed="top d-flex bg-white justify-content-between">
          <Navbar.Brand className="ms-3 ps-5">
            <img src={logo} style={{ maxWidth: "70px" }} alt="logobrand" />
          </Navbar.Brand>
          <AuthModal />
        </Navbar>
      </Container>
    </div>
  );
}
