import React, { useState, useEffect } from "react";
import axios from "axios";

function MyOrder() {
  const [orderList, setOrderList] = useState([]);
  const userId = sessionStorage.getItem("UserId");

  function getOrderDetails() {
    axios
      .get(`http://127.0.0.1:8000/orders/details/${userId}/`)
      .then((res) => {
        setOrderList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(orderList, "My Order");

  useEffect(() => {
    getOrderDetails();
  }, []);

  return (
    <div className="container-fluid">
      <div className="mt-5 row">
        <div className="col mx-5">
          <h4 className="text-center bg-warning shadow py-2">Food Ordered</h4>
          <table className="table mt-5 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList
                .filter((res) => res.status === "Ordered")
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.foodName}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col mx-5">
          <h4 className="text-center bg-success py-2">Food Delivered</h4>
          <table className="table mt-5 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orderList
                .filter((res) => res.status === "Delivered")
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.foodName}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default MyOrder;
