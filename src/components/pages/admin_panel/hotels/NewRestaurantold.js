import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Sidebar from "../Sidebar";

const initialFormData = {
  name: "", host_name: "", email: "", phone: "", address: "",
  city: "", state: "", country: "",

  main_description: "", short_description: "",

  bedrooms: "", single_beds: "", double_beds: "", living_rooms: "", other_spaces: "",

  adults_allowed: "", children_allowed: "", child_age_limit: "", number_of_children_allowed: "", max_guests_allowed: "",

  basic_facilities: "", entertainment_facilities: "", cooking_cleaning_facilities: "",

  breakfast_available: "", check_in_time: "", check_out_time: "", rules: "",

  total_price_inr: "", single_occupation_price: "", double_occupation_price: "", extra_bed_price: "",
  adult_breakfast_price: "", adult_lunch_price: "", adult_dinner_price: "",
  child_breakfast_price: "", child_lunch_price: "", child_dinner_price: ""
};

const NewRestaurant = () => {
  const [formData, setFormData] = useState(initialFormData);
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [category, setCategory] = useState("adventure");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const previews = images.map(img => URL.createObjectURL(img));
    setImagePreviews(previews);
    return () => previews.forEach(url => URL.revokeObjectURL(url));
  }, [images]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 6) {
      alert("You can upload a maximum of 6 images.");
      return;
    }
    setImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    data.append("category", category);
    images.forEach(image => data.append("images[]", image));

    try {
      await axios.post(`http://localhost:5000/api/${category}/add-hotel`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Hotel added successfully!");
      setFormData(initialFormData);
      setImages([]);
      setCategory("adventure");
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      console.error("Submission error:", err);
      alert("Error submitting form");
    }
  };

  const renderInput = (key) => {
    const label = key.replace(/_/g, " ").replace(/\b\w/g, l => l.toUpperCase());

    if (["main_description", "short_description", "rules"].includes(key)) {
      return (
        <div key={key} className="mb-3">
          <label className="form-label fw-semibold">{label}</label>
          <textarea
            name={key}
            value={formData[key]}
            onChange={handleChange}
            rows={3}
            className="form-control"
          />
        </div>
      );
    }

    const type = key.includes("price") || key.includes("bed") || key.includes("room") || key.includes("allowed") || key.includes("limit")
      ? "number"
      : key.includes("email")
      ? "email"
      : key.includes("check_")
      ? "time"
      : key.includes("phone")
      ? "tel"
      : "text";

    return (
      <div key={key} className="mb-3">
        <label className="form-label fw-semibold">{label}</label>
        <input
          type={type}
          name={key}
          value={formData[key]}
          onChange={handleChange}
          className="form-control"
          required={["name", "email", "phone"].includes(key)}
          min={type === "number" ? 0 : undefined}
          pattern={key === "phone" ? "[0-9]{10}" : undefined}
          title={key === "phone" ? "Enter a 10-digit phone number" : undefined}
        />
      </div>
    );
  };

  const sections = {
    "Contact Info": ["name", "host_name", "email", "phone", "address", "city", "state", "country"],
    "Descriptions": ["main_description", "short_description"],
    "Room Details": ["bedrooms", "single_beds", "double_beds", "living_rooms", "other_spaces"],
    "Guest Info": ["adults_allowed", "children_allowed", "child_age_limit", "number_of_children_allowed", "max_guests_allowed"],
    "Facilities": ["basic_facilities", "entertainment_facilities", "cooking_cleaning_facilities"],
    "Meals & Timings": ["breakfast_available", "check_in_time", "check_out_time", "rules"],
    "Pricing": [
      "total_price_inr", "single_occupation_price", "double_occupation_price", "extra_bed_price",
      "adult_breakfast_price", "adult_lunch_price", "adult_dinner_price",
      "child_breakfast_price", "child_lunch_price", "child_dinner_price"
    ]
  };

  return (
    <div className="bg-light min-vh-100">
      <div className="d-flex">
        <Sidebar />
      <div className="flex-grow-1 p-4 p-lg-5">
  <div className="container">
    <div className="row justify-content-center">
      <div className="col-12 offset-lg-2 col-lg-10 bg-white p-4 rounded shadow-sm">
        <h2 className="fw-bold mb-4">Add Resort / Hotel</h2>

        <div className="mb-4">
          <label className="form-label fw-semibold">Category</label>
          <select
            value={category}
            onChange={handleCategoryChange}
            className="form-select"
          >
            <option value="adventure">Adventure</option>
            <option value="hillstation">Hillstation</option>
            <option value="beaches">Beaches</option>
            <option value="nightlife">Nightlife</option>
            <option value="roadtrip">Roadtrip</option>
          </select>
        </div>

        <form onSubmit={handleSubmit}>
          {Object.entries(sections).map(([sectionTitle, keys]) => (
            <div key={sectionTitle} className="border rounded p-4 mb-4 bg-light">
              <h5 className="fw-semibold mb-3">{sectionTitle}</h5>
              <div className="row">
                {keys.map(key => (
                  <div key={key} className="col-md-6">
                    {renderInput(key)}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="border rounded p-4 mb-4 bg-light">
            <h5 className="fw-semibold mb-3">Upload Images (Max 6)</h5>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              ref={fileInputRef}
              className="form-control mb-3"
            />
            {imagePreviews.length > 0 && (
              <div className="row g-3">
                {imagePreviews.map((src, index) => (
                  <div key={index} className="col-6 col-md-4">
                    <img
                      src={src}
                      alt={`preview-${index}`}
                      className="img-fluid rounded border"
                      style={{ height: "160px", objectFit: "cover", width: "100%" }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="text-end">
            <button type="submit" className="btn btn-primary px-4 py-2">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</div>

      </div>
    </div>
  );
};

export default NewRestaurant;
