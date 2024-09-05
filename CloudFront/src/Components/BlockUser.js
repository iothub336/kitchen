import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function BlockUser() {
  const [userList, setUserList] = useState([]);

  function getUserList() {
    axios
      .get("http://127.0.0.1:8000/userreg/register/")
      .then((res) => {
        setUserList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getUserList();
  }, []);

  function blockUser(userId) {
    debugger;
    axios
      .delete(`http://127.0.0.1:8000/userreg/delete/${userId}/`)
      .then((res) => {
        alert("User deleted successfully");
        getUserList();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container-fluid">
      <div className="col-md-8 container mt-5">
        <h3 className="text-center my-3  shadow py-2">Registered Users</h3>
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
            {userList.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.phoneNumber}</td>
                <td>{item.email}</td>
                <td>{item.area}</td>
                <td>
                  <Link
                    className="btn btn-danger"
                    onClick={() => blockUser(item.userId)}
                  >
                    Block
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default BlockUser;
