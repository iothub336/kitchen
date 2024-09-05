import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function ViewOrder() {

  const [orderList, setOrderList] = useState([]);
  const kitchenId = sessionStorage.getItem("UserId");

  function getOrderDetails() {
    axios
      .get(`http://127.0.0.1:8000/orders/kitchen/${kitchenId}/`)
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


  function deliverFood(kitchenId,id)
  {
    debugger
      axios.put(`http://127.0.0.1:8000/orders/deliver/${kitchenId}/${id}/`)
      .then((res)=>{
        alert("Delivered")
        getOrderDetails()
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className='container'>
       <div className="col">
          <h4 className="text-center mt-5 bg-light shadow py-3">Food Ordered</h4>
          <table className="table mt-5 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Food Name</th>
                <th>Price</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
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
                    <td>
                      <Link className="btn btn-warning" onClick={()=>deliverFood(item.kitchenId,item.id)}>Accept</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
    </div>
  )
}

export default ViewOrder