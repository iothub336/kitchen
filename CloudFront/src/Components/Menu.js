import React, { useState, useEffect } from "react";
import axios from "axios";

import { useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation();
  const userId = location.state.userId;

  const id = sessionStorage.getItem("UserId");

  console.log(userId);

  const [foodList, setFoodList] = useState([]);

  function getFoodDetails() {
    axios
      .get(`http://127.0.0.1:8000/addfood/details/${userId}/`)
      .then((res) => {
        setFoodList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  } 

  useEffect(() => {
    getFoodDetails();
  }, []);

  console.log(foodList, "food");

  function isOrderEnabled(orderFrom, orderTill) {
    const currentTime = new Date();
    const fromTime = parseTimeString(orderFrom);
    const tillTime = parseTimeString(orderTill);
    return currentTime >= fromTime && currentTime <= tillTime;
  }

  function parseTimeString(timeString) {
    const [hours, minutes] = timeString.split(":");
    const time = new Date();
    time.setHours(parseInt(hours, 10));
    time.setMinutes(parseInt(minutes, 10));
    time.setSeconds(0);
    return time;
  }

  const [orders,setOrders]=useState([])

  function isOrderPlaced(item){
    return orders.some(order=>order.userId && order.foodName===item.foodName)
  }

  function addOrder(item) {
    const data = {
      foodName: item.foodName,
      price: item.price,
      category: item.category,
      userId: id,
      kitchenId: item.userId,
      status:'Ordered'
    };

    setOrders([...orders,data])
    console.log(data);
    axios
      .post("http://127.0.0.1:8000/orders/add/", data)
      .then((res) => {
        alert("Ordered Successfully");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (     
    <div className="container mt-5">
      <div className="row">
        {foodList.map((item, index) => (
          <div key={item.id} className="col-md-3 my-4">
            <div className="card shadow">
              <img
                src={item.foodFile}
                className="card-img-top"
                height={200}
                alt={item.foodName}
              />
              <div className="card-body">
                <div className="d-flex">
                  <h5>{item.foodName}</h5>
                  <h6 className="ms-auto ">Rs : {item.price}</h6>
                </div>
                <div className="d-flex">
                  <p>
                    <strong>From :</strong> {item.orderFrom}{" "}
                    {item.category === "South Indian Break Fast" ? "AM" : "PM"}
                  </p>
                  <p className="ms-auto ">
                    <strong>To : </strong>
                    {item.orderTill}{" "}
                    {item.category === "South Indian Break Fast" ? "AM" : "PM"}
                  </p>
                </div>
                
              </div>
              <div className="card-footer">

              {/* {isOrderEnabled(item.orderFrom, item.orderTill) ? (
                 isOrderPlaced(item) ?(
                  <button className="btn btn-primary float-end" disabled>
                    Order
                  </button>
                 ):(
                  <button className="btn btn-primary float-end" onClick={()=>addOrder(item)}>Order</button>
                 )
                ):(
                  <button className="btn btn-primary float-end" disabled>
                  Order
                </button>
                )} */}

                {isOrderEnabled(item.orderFrom, item.orderTill) ? (
                  <button className="btn btn-danger float-end" onClick={()=>addOrder(item)}>Order</button>
                ) : (
                  <button className="btn btn-primary float-end" disabled>
                    Order
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Menu;
