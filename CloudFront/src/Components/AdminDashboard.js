import React, { useState, useEffect } from "react";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate, Outlet } from "react-router-dom";
import "./background.css"

function AdminDashboard() {
  return (
    <div className="container-fluid bodybg">
      <Navbar className=" shadow fw-bold">
        <Navbar.Brand href="/" className="ms-4">Cloud Kitchen</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Link to="addArea" className="me-4" style={{ textDecoration: "none", color: "black" }}>
            Add area
          </Link>
          <Link to="addCategory" className="me-4" style={{ textDecoration: "none", color: "black" }}>
            Add Category
          </Link>
          <Link to="addMaker" className="me-4" style={{ textDecoration: "none", color: "black" }}>
            Approve Makers
          </Link>
          <Link to="blockUser" className="me-4" style={{ textDecoration: "none", color: "black" }}>
            Block Users
          </Link>
          <Link to="/" className="me-4" style={{ textDecoration: "none", color: "black" }}>
            Log out
          </Link>
        </Navbar.Collapse>
      </Navbar>
      <Outlet />
    </div>
  );
}

export default AdminDashboard;
