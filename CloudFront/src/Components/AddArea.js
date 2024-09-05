import axios from "axios";
import React, { useState, useEffect } from "react";

function AddArea() {
  const [area, setArea] = useState("");
  const [selectedFile, setSelectedFile] = useState("");
  const [myFile, setMyFile] = useState(""); 

  function addArea() {

    const data = {
      area,
    };
    console.log(data);

    axios
      .post("http://127.0.0.1:8000/addarea/add/", data)
      .then((res) => {
        alert("Added Successfully");
        clearAll();
        getArea();
      })
      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  }

  function clearAll() {
    setArea("");
  }

  const [areaList, setAreaList] = useState([]);

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

  const handleFile = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSelectedFile(reader.result);
    };
  };

  const uploadFile = (e) => {
    const file = e.target.files[0];
    setMyFile(file);
  };

 

  // function addArea() {

  //   const formData = new FormData();
  //   formData.append("area", area);
  //   formData.append("selectedFile", selectedFile);
  //   formData.append("myFile", myFile);

  //   axios
  //     .post("http://127.0.0.1:8000/fileupload/upload/", formData)
  //     .then((res) => {
  //       alert("Added Successfully");
  //       clearAll();
  //       getArea();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       alert("Error");
  //     });
      
  // }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-5 pt-5">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3>Add Area</h3>
            </div>
            <div className="card-body">
              <div className="form-group p-3">
                <label className="form-label">Area Name</label>
                <input
                  type="text"
                  placeholder="Enter area name"
                  className="form-control"
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                />
              </div>
             
            </div>
            <div className="card-footer">
              <button className="btn btn-warning w-100" onClick={addArea}>
                Add
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-3 container mt-5 ">
          <table className=" table mt-3 table-striped table-hover text-center shadow">
            <thead>
              <tr>
                <th>Area</th>
              </tr>
            </thead>
            <tbody>
              {areaList.map((item, index) => (
                <tr key={index}>
                  <td>{item.area}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default AddArea;
