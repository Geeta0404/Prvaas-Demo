import React from "react";
import Sidebar from "./Sidebar"; // Adjust path as needed
import "bootstrap/dist/css/bootstrap.min.css";

const Hotels = () => {
  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-lg-8 offset-lg-2 col-md-7 offset-md-5 col-12 p-4">
          <h1 className="fs-3 fw-bold">Admin Hotels</h1>
          <p>Welcome to the admin panel!</p>
        </div>
      </div>
    </div>
  );
};

export default Hotels;
