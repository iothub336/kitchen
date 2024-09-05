import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function AddMaker() {
  const [makerList, setMakerList] = useState([]);

  function getMakerList() {
    axios
      .get("http://127.0.0.1:8000/homemakerreg/register/")
      .then((res) => {
        setMakerList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getMakerList();
  }, []);

  function approveHomeMaker(userId) {
    debugger;
    axios
      .put(`http://127.0.0.1:8000/homemakerreg/approve/${userId}/`)
      .then((res) => {
        alert("Approved");
        getMakerList();
      })

      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-6 container mt-5">
          <h3 className="text-center my-3  shadow py-2">
            Registered Home Makers
          </h3>
          <table className="table mt-5 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Area</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {makerList
                .filter((res) => res.status === "Pending")
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{item.area}</td>
                    <td>
                      <Link
                        className="btn btn-success"
                        onClick={() => approveHomeMaker(item.userId)}
                      >
                        Approve
                      </Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className="col-md-4 offset-1 container  mt-5">
          <h3 className="text-center my-3  shadow py-2 bg-success">
            Approved Home Makers
          </h3>
          <table className="table mt-5 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone Number</th>
                <th>Email</th>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {makerList
                .filter((res) => res.status === "Approved")
                .map((item, index) => (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.email}</td>
                    <td>{item.area}</td>
                    {/* <td>
                      <Link
                        className="btn btn-success"
                        onClick={() => approveHomeMaker(item.userId)}
                      >
                        Approve
                      </Link>
                    </td> */}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddMaker;
