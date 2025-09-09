import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import InnerBanner from "./InnerBanner";
import PhotoSphereViewer from "photo-sphere-viewer";
import "photo-sphere-viewer/dist/photo-sphere-viewer.css";

const ResortDetails = () => {
  const viewerRef = useRef(null);
  const { resortName } = useParams();
  const [farm, setFarm] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [zoomStyle, setZoomStyle] = useState({});

  useEffect(() => {
    const fetchResortData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/hotels/${resortName}`);
        const data = await response.json();
        setFarm(data);
        if (data?.images?.length > 0) {
          setSelectedImage(data.images[0]);
        }
      } catch (error) {
        console.error("Error fetching resort:", error);
      }
    };
    fetchResortData();
  }, [resortName]);

  useEffect(() => {
    if (typeof selectedImage === "string" && selectedImage.toLowerCase().includes("360")) {
      const viewer = new PhotoSphereViewer.Viewer({
        container: viewerRef.current,
        panorama: selectedImage,
        navbar: true,
        defaultLat: 0.3,
        defaultLong: 0,
      });
      return () => viewer.destroy();
    }
  }, [selectedImage]);

  const handleImageClick = (img) => {
    setSelectedImage(img);
    setZoomStyle({});
  };

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomStyle({
      transformOrigin: `${x}% ${y}%`,
      transform: "scale(2)",
    });
  };

  const handleMouseLeave = () => setZoomStyle({});

  if (!farm) {
    return <h2 className="text-dark text-center py-5">Loading resort...</h2>;
  }

  return (
    <div style={{ backgroundColor: "#000520fa" }}>
      <InnerBanner />
      <Container className="py-5 text-white">
        <h2 className="mb-5 resort-name text-center fw-bold">{farm.name}</h2>

        <Row className="align-items-center justify-content-center gy-5">
          <Col md={6}>
            <div className="p-4">
              <p className="lh-lg styled-description">{farm.mainDescription}</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="p-4 shadow-sm rounded bg-white info-card">
              <h2 className="text-center mb-4 fw-bold text-dark">{farm.Information || "Resort Information"}</h2>
              <Table className="resort-table mb-0">
                <tbody>
                  <tr><td><strong>Host:</strong></td><td>{farm.hostName}</td></tr>
                  <tr><td><strong>Email:</strong></td><td>{farm.email}</td></tr>
                  <tr><td><strong>Phone:</strong></td><td>{farm.phone}</td></tr>
                  <tr><td><strong>Price:</strong></td><td>₹{farm.totalPriceINR}</td></tr>
                  <tr><td><strong>Address:</strong></td><td>{farm.address}</td></tr>
                  <tr><td><strong>State:</strong></td><td>{farm.state}</td></tr>
                  <tr><td><strong>Country:</strong></td><td>{farm.country}</td></tr>
                </tbody>
              </Table>
            </div>
          </Col>
        </Row>

        <h2 className="my-5 resort-name text-center fw-bold">Gallery</h2>
        <Row>
          <Col md={4}>
            <Row>
              {farm.images?.map((img, index) => {
                const is360 = typeof img === "string" && img.toLowerCase().includes("360");
                return (
                  <Col key={index} xs={6} className="mb-3">
                    <div
                      className="hover-zoom-container position-relative"
                      onClick={() => handleImageClick(img)}
                      style={{
                        cursor: "pointer",
                        border: selectedImage === img ? "2px solid #f78c1f" : "1px solid transparent",
                        transition: "border 0.3s ease",
                        borderRadius: "8px",
                        overflow: "hidden",
                      }}
                    >
                      {is360 && (
                        <span className="position-absolute top-0 start-0 bg-warning text-dark px-2 py-1 fw-bold small rounded-end" style={{ zIndex: 2 }}>
                          360°
                        </span>
                      )}
                      <img
                        src={img.url}
                        alt={`resort-img-${index}`}
                        className="thumbnail-img w-100 rounded shadow-sm"
                        style={{ transition: "transform 0.3s ease" }}
                      />
                    </div>
                  </Col>
                );
              })}
            </Row>
          </Col>

          <Col md={8}>
            {typeof selectedImage === "string" && selectedImage.toLowerCase().includes("360") ? (
              <div
                ref={viewerRef}
                style={{
                  height: "500px",
                  width: "100%",
                  borderRadius: "8px",
                  overflow: "hidden",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              />
            ) : (
              <div
                className="zoom-preview border"
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                style={{
                  overflow: "hidden",
                  width: "100%",
                  height: "500px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                  boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
                }}
              >
                <img
                  src={selectedImage.url || ""}
                  alt="Selected Resort"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.3s ease",
                    ...zoomStyle,
                  }}
                />
              </div>
            )}
          </Col>
        </Row>

        {/* Guest Details Card */}
        <Card className="guest-details-card my-5 bg-dark text-white">
          <Card.Body>
            <Card.Title>
              <h2 className="mb-5 resort-name text-center fw-bold text-light">🏡 Guest Accommodation Details</h2>
            </Card.Title>
            <Row>
              <Col md={6}>
                <Table bordered responsive className="guest-details-table text-white">
                  <tbody>
                    <tr><td><strong>Name</strong></td><td>{farm.name}</td></tr>
                    <tr><td><strong>Description</strong></td><td>{farm.shortDescription}</td></tr>
                    <tr><td><strong>{farm.bedrooms === "NA" ? "Tents" : "Bedrooms"}</strong></td><td>{farm.bedrooms === "NA" ? `${farm.tent} Tents` : farm.bedrooms}</td></tr>
                    <tr><td><strong>Single Beds</strong></td><td>{farm.singleBeds}</td></tr>
                    <tr><td><strong>Double Beds</strong></td><td>{farm.doubleBeds}</td></tr>
                    <tr><td><strong>Basic Facilities</strong></td><td>{farm.basicFacilities}</td></tr>
                    <tr><td><strong>Entertainment Facilities</strong></td><td>{farm.entertainmentFacilities}</td></tr>
                    <tr><td><strong>Living Rooms</strong></td><td>{farm.livingRooms}</td></tr>
                    <tr><td><strong>Cooking & Cleaning</strong></td><td>{farm.cookingCleaningFacilities}</td></tr>
                    <tr><td><strong>Adults Allowed</strong></td><td>{farm.adultsAllowed}</td></tr>
                    <tr><td><strong>Children Allowed</strong></td><td>{farm.otherSpaces}</td></tr>
                    <tr><td><strong>Max Children Allowed</strong></td><td>{farm.childrenAllowed}</td></tr>
                    <tr><td><strong>Child Age Limit</strong></td><td>{farm.childAgeLimit}</td></tr>
                    <tr><td><strong>Max Guests Allowed</strong></td><td>{farm.maxGuestsAllowed}</td></tr>
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table bordered responsive className="guest-details-table text-white">
                  <tbody>
                    <tr><td><strong>Breakfast Available</strong></td><td>{farm.breakfastAvailable}</td></tr>
                    <tr><td><strong>Check-in Time</strong></td><td>{farm.checkInTime}</td></tr>
                    <tr><td><strong>Check-out Time</strong></td><td>{farm.checkOutTime}</td></tr>
                    <tr><td><strong>Rules</strong></td><td>{farm.rules}</td></tr>
                    <tr><td><strong>Total Price (INR)</strong></td><td>₹{farm.totalPriceINR}</td></tr>
                    <tr><td><strong>Single Occupation</strong></td><td>{farm.singleOccupationPrice}</td></tr>
                    <tr><td><strong>Double Occupation</strong></td><td>{farm.doubleOccupationPrice}</td></tr>
                    <tr><td><strong>Extra Bed With Person</strong></td><td>{farm.extraBedPrice}</td></tr>
                    <tr><td><strong>Adult Breakfast</strong></td><td>{farm.adultBreakfastPrice}</td></tr>
                    <tr><td><strong>Adult Lunch</strong></td><td>{farm.adultLunchPrice}</td></tr>
                    <tr><td><strong>Adult Dinner</strong></td><td>{farm.adultDinnerPrice}</td></tr>
                    <tr><td><strong>Child Breakfast</strong></td><td>{farm.childBreakfastPrice}</td></tr>
                    <tr><td><strong>Child Lunch</strong></td><td>{farm.childLunchPrice}</td></tr>
                    <tr><td><strong>Child Dinner</strong></td><td>{farm.childDinnerPrice}</td></tr>
                  </tbody>
                </Table>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default ResortDetails;
