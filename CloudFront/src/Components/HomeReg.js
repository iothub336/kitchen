import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./homemaker.css";

function HomeReg() {
  const [areaList, setAreaList] = useState([]);

  const [selectedArea, setSelectedArea] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");

  function getArea() {
    axios
      .get("http://127.0.0.1:8000/addarea/add/")
      .then((res) => {
        setAreaList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(areaList);
  
  useEffect(() => {
    getArea();
  }, []);

  function homeMakerRegister() {

    if (!validatePhoneNumber(phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    const data = {
      area: selectedArea,
      name,
      phoneNumber,
      email,
      status:'Pending'
    };
    console.log(data);

    axios
      .post("http://127.0.0.1:8000/homemakerreg/register/", data)
      .then((res) => {
        alert("Registered Successfully" +  "Id : " +res.data.userId + "Password : " +res.data.password); 
        clearAll();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearAll() {

    setSelectedArea("");
    setEmail("");
    setName("");
    setPhoneNumber("");

  } 


  const handlePhoneNumberChange = (e) => {
    const inputPhoneNumber = e.target.value;
    // Remove any non-digit characters from input
    const cleanedPhoneNumber = inputPhoneNumber.replace(/\D/g, "");
    // Limit the length to 10 digits
    const trimmedPhoneNumber = cleanedPhoneNumber.slice(0, 10);
    // Update state
    setPhoneNumber(trimmedPhoneNumber);
  };

  // Function to validate phone number
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phoneNumber);
  };
  

  return (

    <div className="container-fluid home-body">
      <div className=" col-md-6 container pt-5">
        <div className=" shadow p-5">
          <div className="card-header  text-center">
            <h3>Home Maker Registration Form</h3>
          </div>
          <div className="card-body">
            <div className="form-group my-2">
              <label className="form-label my-2">Select Area</label>
              <select
                className="form-select mb-3 text-center"
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                required
              >
                <option value="" hidden>
                  ---select---
                </option>
                {areaList.map((item, index) => (
                  <option key={index} value={item.area}>
                    {item.area}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group my-2">
              <label className="form-label">Name</label>
              <input
                type="text"
                placeholder="Enter Name"
                className="form-control"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="row my-2">
              <div className="col">
                <div className="form-group my-2">
                  <label className="form-label">Phone Number</label>
                  <input
                    type="text"
                    placeholder="Enter Phone Number"
                    className="form-control"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
              </div>
              <div className="col">
                <div className="form-group my-2">
                  <label className="form-label">Email</label>
                  <input
                    type="text"
                    placeholder="Enter Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer my-3 text-center">
            <button
              className="btn btn-primary w-100 mb-3"
              onClick={homeMakerRegister}
            >
              Submit
            </button>
            <Link to="/" className="fw-bold" style={{ textDecoration: "none",color:'black' }}>
              Alredy Registered ? Login
            </Link>
          </div>
        </div>
      </div>
    </div>

  );
}

export default HomeReg;
