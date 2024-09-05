import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link,  Outlet } from "react-router-dom";

function HomeMakerDashboard() {
  return (
    <div className="container-fluid bodybg">
      <Navbar className=" shadow fw-bold">
        <Navbar.Brand href="/" className="ms-5">
          Cloud Kitchen
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-5" >
          <Link
            to="addFood"
            className="me-5"
            style={{ textDecoration: "none", color: "black" }}
          >
            Add Food
          </Link>
          <Link
            to="viewOrder"
            className="me-5"
            style={{ textDecoration: "none", color: "black" }}
          >
            Orders
          </Link>
         
          <Link
            to="/"
            className="me-4"
            style={{ textDecoration: "none", color: "black" }}
          >
            Log out
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default HomeMakerDashboard;
