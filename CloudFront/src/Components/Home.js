import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";
import axios from "axios";

function Home() {
  const [user, setUser] = useState("");
  const [id, setId] = useState("");
  const [password, Setpassword] = useState("");

  const usertype = ["Admin", "User", "HomeMaker"];
  const navigate = useNavigate();

  function Login() {
    debugger;

    const data = {
      usertype: user,
      userId: id,
      password,
    };

    console.log(data);

    sessionStorage.setItem("UserId", id);

    if (data.usertype === "Admin") {
      axios
        .post("http://127.0.0.1:8000/cloudadmin/login/", data)
        .then((res) => {
          alert("Login Successfully");
          navigate("/adminDashboard/addArea");
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid Credentials");
        });
    } else if (data.usertype === "User") {
      axios
        .post("http://127.0.0.1:8000/userreg/login/", data)
        .then((res) => {
          debugger;
          alert("Login Successfully");
          navigate("/userDashboard/kitchen");
        })
        .catch((err) => {
          console.log(err);
          alert("Invalid Credentials");
        });
    } else if (data.usertype === "HomeMaker") {
      axios
        .post("http://127.0.0.1:8000/homemakerreg/login/", data)
        .then((res) => {
          alert("Login Successfully");
          navigate("/homeMakerDashboard/addFood");
        })
        .catch((res) => {
          console.log(res.data);
          alert("Not approved user");
        });
    }
  }

  return (
    <div className="body1">
      <Navbar className=" shadow fw-bold">
        <Container>
          <Navbar.Brand href="/" className="me-3">Cloud Kitchen</Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Link
              to="/SignUp"
              style={{ textDecoration: "none", color: "blue" }}
            >
              Sign Up
            </Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="my-5">
        <div className="col-md-5 container p-5 shadow ">
          <div className="card-header ">
            <h2 className="text-center">Login Now</h2>
          </div>
          <div className="card-body">
            <label className="form-label">Select User Type:</label>
            <select
              className="form-select mb-3 text-center "
              value={user}
              onChange={(e) => setUser(e.target.value)}
              required
            >
              <option selected value="" hidden>
                ----Select----
              </option>
              {usertype.map((user, index) => {
                return (
                  <option key={index} value={user}>
                    {user}
                  </option>
                );
              })}
            </select>
            <label className="form-label my-2">Enter User Id:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter User Id"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
            <label className="form-label my-2">Enter Password:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => Setpassword(e.target.value)}
            />
          </div>
          <div className="card-footer text-center">
            <Link className="btn btn-primary w-100 my-4" onClick={Login}>
              Login
            </Link>
            <Link
              to="/SignUp"
              className="fw-bold "
              style={{ textDecoration: "none", color: "black" }}
            >
              New User ? Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
