import React from 'react'
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css"

function SignUp() {
  return (
    <div className='body'>
        <Navbar className=" shadow fw-bold">
        <Container>
          <Navbar.Brand href="/">Cloud Kitchen</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link
              to="/"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Log In
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='container'>
        <Link to="/UserReg" className='btn btn-warning my-5' >Register as User</Link>
        <Link to="/HomeReg"  className='btn btn-warning my-5 float-end'>Register as Home Maker</Link>
      </div>
    </div>
  )
}

export default SignUp