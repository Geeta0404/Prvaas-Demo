// src/pages/NatureShield.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

export default function NatureShield() {
  const [hillStationData, setHillStationData] = useState([]);
  const [error, setError] = useState(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxImages, setLightboxImages] = useState([]);
  const [photoIndex, setPhotoIndex] = useState(0);

  const navigate = useNavigate();

  const slugify = (str) =>
    str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/hillstation");
        setHillStationData(res.data);
      } catch (err) {
        console.error("Error loading hotel data:", err);
        setError("Failed to load data");
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (images, index) => {
    setLightboxImages(
      images.map((img) => ({
        src: img.url.startsWith("http")
          ? img.url
          : `http://localhost:5000/uploads/${img.url}`,
      }))
    );
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div style={{ backgroundColor: "#f0f0f0" }}>
      <div className="container py-5">
        {error && <p className="text-danger">{error}</p>}

        {hillStationData.length === 0 && !error ? (
          <p>Loading...</p>
        ) : (
          <div className="d-flex flex-column gap-5">
            {hillStationData.map((hotel, index) => (
              <div
                className="row align-items-center justify-content-center mb-5"
                key={hotel.id || index}
              >
                {/* LEFT COLUMN - Resort Info */}
                <div className="col-md-5 resort-card-modern text-center">
                  <div className="p-3">
                    <span className="mb-3 px-3 py-2 fs-6 badge text-dark bg-light">
                      <i className="bi bi-star-fill"></i> Resort Highlight
                    </span>
                    <h2 className="resort-title-modern mb-4">{hotel.name}</h2>

                    <table className="table resort-table text-center mb-4">
                      <tbody>
                        <tr>
                          <td>Price</td>
                          <td>
                            ₹{hotel.totalPriceINR?.toLocaleString() || "0.00"}
                          </td>
                        </tr>
                        <tr>
                          <td>Host</td>
                          <td className="fw-semibold">{hotel.host_name || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Address</td>
                          <td>{hotel.address || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>City / District</td>
                          <td>{hotel.city || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>State</td>
                          <td>{hotel.state || "N/A"}</td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td>{hotel.country || "N/A"}</td>
                        </tr>
                      </tbody>
                    </table>

                    <button
                      className="btn btn-info px-4 py-2 fw-semibold text-white"
                      onClick={() =>
                        navigate(`/resort/${hotel.slug || slugify(hotel.name)}`)
                      }
                    >
                      Discover More
                    </button>
                  </div>
                </div>

                {/* RIGHT COLUMN - Image Grid */}
                <div className="col-md-7">
                  <div className="row g-2">
                    {hotel.images && hotel.images.length > 0
                      ? hotel.images.slice(0, 6).map((img, imgIndex) => (
                          <div className="col-4" key={imgIndex}>
                            <div
                              className="position-relative image-hover-wrapper"
                              onClick={() =>
                                handleImageClick(hotel.images, imgIndex)
                              }
                              style={{
                                cursor: "pointer",
                                height: "250px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              }}
                            >
                              <img
                                src={
                                  img.url.startsWith("http")
                                    ? img.url
                                    : `http://localhost:5000/uploads/${img.url}`
                                }
                                alt={img.caption || `resort-image-${imgIndex}`}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                              <div className="hover-overlay" />
                            </div>
                          </div>
                        ))
                      : [...Array(6)].map((_, imgIndex) => (
                          <div className="col-4" key={imgIndex}>
                            <img
                              src={`https://source.unsplash.com/600x400/?nature,travel,${imgIndex}`}
                              alt={`fallback-nature-${imgIndex}`}
                              className="img-fluid rounded shadow-sm"
                              style={{
                                height: "120px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
                        ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox */}
        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            index={photoIndex}
            slides={lightboxImages}
            close={() => setLightboxOpen(false)}
            controller={{ closeOnBackdropClick: true }}
          />
        )}
      </div>
    </div>
  );
}
