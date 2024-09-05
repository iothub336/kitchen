import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link,  Outlet } from "react-router-dom";

function UserDashboard() {
  return (
    <div className="container-fluid bodybg">
      <Navbar className=" shadow fw-bold">
        <Navbar.Brand href="/" className="ms-5">
          Cloud Kitchen
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end me-5" >
          <Link
            to="kitchen"
            className="me-5"
            style={{ textDecoration: "none", color: "black" }}
          >
            Kitchen
          </Link>
          <Link
            to="myOrder"
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
  )
}

export default UserDashboard