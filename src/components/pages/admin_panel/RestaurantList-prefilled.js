import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaDownload } from "react-icons/fa";

const RestaurantList = () => {
  const [category, setCategory] = useState("roadtrip");
  const [hotels, setHotels] = useState([]);
  const [editingHotel, setEditingHotel] = useState(null); // store hotel being edited
  const [formData, setFormData] = useState({}); // form values

  const categories = [
    { value: "roadtrip", label: "Road Trip" },
    { value: "hillstation", label: "Hill Station" },
    { value: "nightlife", label: "Night Life" },
    { value: "adventure", label: "Adventure" },
    { value: "beaches", label: "Beaches" },
  ];

  // Fetch hotels by category
  useEffect(() => {
    fetch(`http://localhost:5000/api/hotels/category/${category}`)
      .then((res) => res.json())
      .then((data) => setHotels(data))
      .catch((err) => console.error(err));
  }, [category]);

  // Start editing
  const handleEdit = (hotel) => {
    setEditingHotel(hotel);
    setFormData(hotel); // prefill form
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingHotel(null);
    setFormData({});
  };

  // Handle delete
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this?")) {
      fetch(`http://localhost:5000/api/hotels/${id}`, { method: "DELETE" })
        .then((res) => res.json())
        .then(() => {
          setHotels((prev) => prev.filter((hotel) => hotel.id !== id));
          alert("Hotel deleted successfully!");
        })
        .catch((err) => console.error("Delete error:", err));
    }
  };

  // Download placeholder
  const handleDownload = (id) => {
    alert(`Download details for hotel ID: ${id}`);
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Submit update
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/hotels/${editingHotel.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData), // ✅ send updated form data
    })
      .then((res) => res.json())
      .then((updatedHotel) => {
        setHotels((prev) =>
          prev.map((h) => (h.id === updatedHotel.id ? updatedHotel : h))
        );
        setEditingHotel(null); // hide form after update
        setFormData({});
        alert("Hotel updated successfully!");
      })
      .catch((err) => console.error("Update error:", err));
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <Sidebar />

        <div className="col-lg-10 offset-lg-2 col-md-7 offset-md-5 col-12 p-4">
          {!editingHotel ? (
            <>
              {/* List view */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h1 className="fs-3 fw-bold">Admin Restaurant List</h1>

                <select
                  className="form-select w-auto"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <table className="table table-bordered table-hover">
                <thead className="table-dark">
                  <tr>
                    <th>S.No</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                      <tr key={hotel.id}>
                        <td>{index + 1}</td>
                        <td>{hotel.name}</td>
                        <td>{hotel.email}</td>
                        <td>{hotel.phone}</td>
                        <td>{hotel.totalPriceInr}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2"
                            onClick={() => handleEdit(hotel)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger me-2"
                            onClick={() => handleDelete(hotel.id)}
                          >
                            <FaTrash />
                          </button>
                          <button
                            className="btn btn-sm btn-success"
                            onClick={() => handleDownload(hotel.id)}
                          >
                            <FaDownload />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="text-center">
                        No data found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </>
          ) : (
            <>
              {/* Edit form */}
<h2 className="fs-4 fw-bold mb-3">Update Hotel</h2>
<form onSubmit={handleUpdate} className="row g-3">
  {/* Name */}
  <div className="col-md-6">
    <label className="form-label">Name</label>
    <input
      type="text"
      name="name"
      value={formData.name || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Host Name */}
  <div className="col-md-6">
    <label className="form-label">Host Name</label>
    <input
      type="text"
      name="hostName"   
      value={formData.hostName || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Email */}
  <div className="col-md-6">
    <label className="form-label">Email</label>
    <input
      type="email"
      name="email"
      value={formData.email || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Phone */}
  <div className="col-md-6">
    <label className="form-label">Phone</label>
    <input
      type="text"
      name="phone"
      value={formData.phone || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Address */}
  <div className="col-12">
    <label className="form-label">Address</label>
    <input
      type="text"
      name="address"
      value={formData.address || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* City */}
  <div className="col-md-4">
    <label className="form-label">City</label>
    <input
      type="text"
      name="city"
      value={formData.city || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* State */}
  <div className="col-md-4">
    <label className="form-label">State</label>
    <input
      type="text"
      name="state"
      value={formData.state || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Country */}
  <div className="col-md-4">
    <label className="form-label">Country</label>
    <input
      type="text"
      name="country"
      value={formData.country || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Main Description */}
  <div className="col-12">
    <label className="form-label">Main Description</label>
    <textarea
      name="mainDescription"   
      value={formData.mainDescription || ""}
      onChange={handleChange}
      className="form-control"
      rows="3"
    ></textarea>
  </div>

  {/* Short Description */}
  <div className="col-12">
    <label className="form-label">Short Description</label>
    <textarea
      name="shortDescription"   
      value={formData.shortDescription || ""}
      onChange={handleChange}
      className="form-control"
      rows="2"
    ></textarea>
  </div>

  {/* Bedrooms */}
  <div className="col-md-3">
    <label className="form-label">Bedrooms</label>
    <input
      type="number"
      name="bedrooms"  
      value={formData.bedrooms || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Bathrooms */}
  <div className="col-md-3">
    <label className="form-label">Price</label>
    <input
      type="number"
      name="totalPriceInr"   
      value={formData.totalPriceInr || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Check-in */}
  <div className="col-md-3">
    <label className="form-label">Check-in Time</label>
    <input
      type="time"
      name="checkInTime"   
      value={formData.checkInTime || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Check-out */}
  <div className="col-md-3">
    <label className="form-label">Check-out Time</label>
    <input
      type="time"
      name="checkOutTime"   
      value={formData.checkOutTime || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Single Occupation Price */}
  <div className="col-md-6">
    <label className="form-label">Single Occupation Price</label>
    <input
      type="number"
      name="singleOccupationPrice"   
      value={formData.singleOccupationPrice || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Double Occupation Price */}
  <div className="col-md-6">
    <label className="form-label">Double Occupation Price</label>
    <input
      type="number"
      name="doubleOccupationPrice"   
      value={formData.doubleOccupationPrice || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div>

  {/* Status */}
  {/* <div className="col-md-6">
    <label className="form-label">Status</label>
    <select
      name="status"
      value={formData.status || "active"}
      onChange={handleChange}
      className="form-select"
    >
      <option value="active">Active</option>
      <option value="inactive">Inactive</option>
    </select>
  </div> */}

  {/* Rating */}
  {/* <div className="col-md-6">
    <label className="form-label">Rating</label>
    <input
      type="number"
      name="rating"   
      step="0.1"
      min="0"
      max="5"
      value={formData.rating || ""}
      onChange={handleChange}
      className="form-control"
    />
  </div> */}

  <div className="col-12">
    <button type="submit" className="btn btn-primary">Update Hotel</button>
  </div>
</form>

            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantList;
