// import React from 'react'
// import InnerBanner from './InnerBanner';
// import NightLifeInner from './NightLifeInner';

// const NightLife = ()=>{
//     return(
//         <div>
//           <InnerBanner />
//            <NightLifeInner />
//         </div>
//     )
// }

// export default NightLife;


import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import InnerBanner from "./InnerBanner";

export default function Beaches() {
  const [beachData, setBeachData] = useState([]);
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
        const res = await axios.get("http://localhost:5000/api/nightlife");
        setBeachData(res.data);
      } catch (err) {
        console.error("Error loading beach data:", err);
        setError("Failed to load beach resorts");
      }
    };
    fetchData();
  }, []);

  const handleImageClick = (images, index) => {
    setLightboxImages(images.map((img) => ({ src: img.url })));
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  return (
    <>
      <InnerBanner />
      <div style={{ backgroundColor: "#f0f0f0" }}>
        <div className="py-5 container">
          {error && <p className="text-danger">{error}</p>}

          {beachData.length === 0 && !error ? (
            <p>Loading...</p>
          ) : (
            <div className="d-flex flex-column gap-5">
              {beachData.map((hotel, index) => (
                <div
                  className="d-flex justify-content-center align-items-center mb-5 row"
                  key={hotel.id || index}
                >
                  {/* LEFT COLUMN */}
                  <div className="col-md-5 resort-card-modern text-center">
                    <div className="p-3">
                      <span className="mb-3 px-3 py-2 fs-6 badge text-dark text-center bg-light">
                        🏖 Beach Resort
                      </span>
                      <h2 className="resort-title-modern mb-4">{hotel.name}</h2>

                      <table className="table resort-table text-center mb-4">
                        <tbody>
                          <tr>
                            <td>Price</td>
                            <td>₹{hotel.totalPriceINR?.toLocaleString() || "0.00"}</td>
                          </tr>
                          <tr>
                            <td>Host</td>
                            <td className="fw-semibold">{hotel.host_name || "N/A"}</td>
                          </tr>
                          <tr>
                            <td>Address</td>
                            <td>{hotel.address}</td>
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
                            <td>{hotel.country}</td>
                          </tr>
                        </tbody>
                      </table>

                      <button
                        className="btn-more text-white px-4 py-2 fw-semibold btn btn-info"
                        onClick={() => {
                          const isLoggedIn = localStorage.getItem("user");
                          const slug = slugify(hotel.name);

                          if (isLoggedIn) {
                            navigate(`/resort/${slug}`);
                          } else {
                            const confirmRedirect = window.confirm(
                              "You must be logged in to continue. Do you want to login now?"
                            );
                            if (confirmRedirect) {
                              navigate("/login", {
                                state: { redirectTo: `/resort/${slug}` },
                              });
                            }
                          }
                        }}
                      >
                        Discover More
                      </button>
                    </div>
                  </div>

                  {/* RIGHT COLUMN - Image Grid */}
                  <div className="col-md-7">
                    <div className="row g-2">
                      {hotel.images && hotel.images.length > 0 ? (
                        hotel.images.slice(0, 6).map((img, imgIndex) => (
                          <div className="col-4" key={imgIndex}>
                            <div
                              className="position-relative image-hover-wrapper"
                              onClick={() => handleImageClick(hotel.images, imgIndex)}
                              style={{
                                cursor: "pointer",
                                height: "250px",
                                borderRadius: "8px",
                                overflow: "hidden",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                              }}
                            >
                              <img
                                src={img.url}
                                alt={img.caption || `beach-resort-${imgIndex}`}
                                className="w-100 h-100"
                                style={{ objectFit: "cover" }}
                              />
                              <div className="hover-overlay" />
                            </div>
                          </div>
                        ))
                      ) : (
                        [...Array(6)].map((_, imgIndex) => (
                          <div className="col-4" key={imgIndex}>
                            <img
                              src={`https://source.unsplash.com/600x400/?beach,sea,resort,${imgIndex}`}
                              alt={`fallback-beach-${imgIndex}`}
                              className="img-fluid rounded shadow-sm"
                              style={{
                                height: "120px",
                                objectFit: "cover",
                                width: "100%",
                              }}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Lightbox Viewer */}
          {lightboxOpen && (
            <Lightbox
              open={lightboxOpen}
              close={() => setLightboxOpen(false)}
              index={photoIndex}
              slides={lightboxImages}
            />
          )}
        </div>

        {/* Hover Overlay Style */}
        <style>{`
          .image-hover-wrapper:hover .hover-overlay {
            opacity: 1;
          }
          .hover-overlay {
            position: absolute;
            top: 0; left: 0;
            width: 100%; height: 100%;
            background-color: rgba(13, 110, 253, 0.4);
            opacity: 0;
            transition: opacity 0.3s ease-in-out;
            z-index: 1;
          }
        `}</style>
      </div>
    </>
  );
}
