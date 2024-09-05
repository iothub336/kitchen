import React, { useState, useEffect } from "react";
import axios from "axios";

function AddFood() {
  const [category, setCategory] = useState("");
  const [foodName, setFoodName] = useState("");
  const [orderFrom, setOrderFrom] = useState("");
  const [orderTill, setOrderTill] = useState("");
  const [price, setPrice] = useState("");
  const [foodFile, setFoodFile] = useState("");
  const [cList, setCList] = useState([]);
  const [foodList, setFoodList] = useState([]);

  const userId = sessionStorage.getItem("UserId");
  console.log(userId);

  function getCategory() {
    axios
      .get("http://127.0.0.1:8000/category/add/")
      .then((res) => {
        setCList(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
  }

  console.log(cList);

  useEffect(() => {
    getCategory();
    getFoodDetails();
  }, []);

  function addFood() {
    const data = {
      category,
      userId,
      foodName,
      orderFrom,
      orderTill,
      price,
      foodFile,
    };

    console.log(data, "Hi");

    axios
      .post("http://127.0.0.1:8000/addfood/add/", data)
      .then((res) => {
        alert("Added Successfully");
        getFoodDetails();
        clearAll();
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  }

  function clearAll() {
    setCategory("");
    setOrderTill("");
    setOrderFrom("");
    setPrice("");
    setFoodName("");
  }

  const image = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setFoodFile(reader.result);
    };
  };

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

  console.log(foodList, "My Food");

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-5 container mt-5">
          <div className="shadow p-4">
            <div className="card-body">
              <h3 className="text-center">Add Food List</h3>
              <div className="form-group">
                <label className="form-label">Select Category</label>
                <select
                  className="form-select mb-3 text-center "
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option selected value="" hidden>
                    ----Select----
                  </option>
                  {cList.map((item, index) => (
                    <option key={index} value={item.category}>
                      {item.category}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group my-2">
                <label>Food Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter Food Name"
                  value={foodName}
                  onChange={(e) => setFoodName(e.target.value)}
                />
              </div>
              <div className="row my-2">
                <div className="col">
                  <div className="form-group my-2">
                    <label>Food Image</label>
                    <input
                      type="file"
                      className="form-control"
                      onChange={image}
                    />
                  </div>
                </div>
                <div className="col my-2">
                  <div className="form-group">
                    <label>Price</label>
                    <input
                      type="text"
                      placeholder="Enter Price"
                      className="form-control"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-group">
                    <label>Order From</label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Enter Food Name"
                      value={orderFrom}
                      onChange={(e) => setOrderFrom(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="form-group">
                    <label>Order Till</label>
                    <input
                      type="time"
                      className="form-control"
                      placeholder="Enter Food Name"
                      value={orderTill}
                      onChange={(e) => setOrderTill(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="card-footer my-4">
              <button className="btn btn-danger w-100" onClick={addFood}>
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-5 container mt-5">
          <h3 className="text-center py-4 shadow">Added Food List</h3>
          <table className=" table mt-3 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Category</th>
                <th>Food</th>
                <th>Order From</th>
                <th>Order Till</th>
                <th>Price</th>
              </tr>
            </thead>
            <tbody>
              {foodList.map((item, index) => (
                <tr key={index}>
                  <td>{item.category}</td>
                  <td>{item.foodName}</td>
                  <td>{item.orderFrom}</td>
                  <td>{item.orderTill}</td>
                  <td>{item.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddFood;
