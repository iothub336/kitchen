import axios from "axios";
import React, { useState, useEffect } from "react";

function AddCategory() {
  const [category, setCategory] = useState("");

  function addCategory() {
    const data = {
      category,
    };

    console.log(data);

    axios
      .post("http://127.0.0.1:8000/category/add/", data)
      .then((res) => {
        alert("Added Successfully");
        getCategory()
        clearAll();
      })

      .catch((err) => {
        console.log(err);
        alert("Error");
      });
  }

  function clearAll() {
    setCategory("");
  }

  const [categoryList, setCategoryList] = useState([]);

  function getCategory() {
    axios
      .get("http://127.0.0.1:8000/category/add/")
      .then((res) => {
        setCategoryList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(categoryList);
  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 pt-5">
          <div className="card shadow">
            <div className="card-header text-center">
              <h3>Add Category</h3>
            </div>
            <div className="card-body">
              <div className="form-group p-3">
                <label className="form-label">Category</label>
                <input
                  type="text"
                  placeholder="Enter category"
                  className="form-control"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </div>
            </div>
            <div className="card-footer">
              <button className="btn btn-warning w-100" onClick={addCategory}>
                Add
              </button>
            </div>
          </div>
        </div>

        <div className="col-md-3 container mt-5">
        <table className=" table mt-3 table-striped table-hover text-center shadow">
          <thead>
            <tr>
              <th>Category</th>
            </tr>
          </thead>
          <tbody>
            {
              categoryList.map((item,index)=>(
                <tr key={index}>
                  <td>{item.category}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
        </div>
      </div>
    </div>
  );
}

export default AddCategory;
