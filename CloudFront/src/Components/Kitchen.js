import axios from "axios";
import React, { useEffect, useId, useState } from "react";
import {useNavigate,  Link } from "react-router-dom";
import "./Kitchen.css"

import img1 from "../Assets/Images/bf1.jpg"
import img2 from "../Assets/Images/bf2.jpg"
import img3 from "../Assets/Images/bf3.jpg"
import img4 from "../Assets/Images/bf6.jpg"
import img5 from "../Assets/Images/bg8.jpg"

function Kitchen() {
  const userId = sessionStorage.getItem("UserId");

  const [userList, setUserList] = useState([]);
  const [kitchenList, setKitchenList] = useState([]);
  const [userArea, setUserArea] = useState("");
  const navigate=useNavigate()

  function getUserById() {

    axios
      .get(`http://127.0.0.1:8000/userreg/details/${userId}/`)
      .then((res) => {
        setUserList(res.data);
        setUserArea(res.data.area);
        getKitchenList(res.data.area);
      })
      .catch((err) => {
        console.log(err);
      });

  }

  function getKitchenList(area) {

    axios
      .get(`http://127.0.0.1:8000/homemakerreg/nearby/${area}/`)
      .then((res) => {
        setKitchenList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
      
  }

  useEffect(() => {
    getUserById();
  }, []);

  console.log(userList, "Logged user");
  console.log(kitchenList, "Kitchen ");

  function viewMenu(id)
  {
    navigate("/userDashboard/menu",{state:{userId:id}})
  }

  return (
    <div className="container mt-5">

<div class="container">
  <div class="row mb-5 sliders text-center">
    <div class="col-md-2 mx-3">
      <img src={img1} class="img-thumbnail enlarge-on-hover rounded-circle" alt="Image 1" />
    </div>
    <div class="col-md-2 mx-3">
      <img src={img2} class="img-thumbnail enlarge-on-hover rounded-circle" alt="Image 2" />
    </div>
    <div class="col-md-2 mx-3">
      <img src={img3} class="img-thumbnail enlarge-on-hover rounded-circle" alt="Image 3" />
    </div>
    <div class="col-md-2 mx-3">
      <img src={img4} class="img-thumbnail enlarge-on-hover rounded-circle" alt="Image 4" />
    </div>
    <div class="col-md-2 mx-3">
      <img src={img5} class="img-thumbnail enlarge-on-hover rounded-circle" alt="Image 5" />
    </div>
  </div>
</div>

      <div className="row">
        {kitchenList.map((item, index) => (
          <div className="col-md-3 shadow p-2">
            <div className="card-header text-center">
              <h4 style={{ fontFamily: "cursive" }}>{item.name}</h4>
            </div>
            <div className="card-body text-center my-3">
              <h6>Phone Number: {item.phoneNumber}</h6>
              <h6>Email: {item.email}</h6>
              <h6>Address: {item.area}</h6>
              <button className="btn btn-primary float-end" onClick={()=>viewMenu(item.userId)}>View</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Kitchen;
