import React, { useState } from "react";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import roadTrip from "../assets/road-trip.jpg";
import HillStation from "../assets/Hill-Station.jpg";
import Adventure from "../assets/Adventure.jpg";
import { Container, Row, Col, Button, Badge } from "react-bootstrap";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const travelData = [
  {
    title: "France",
    subtitle: "PLACES IN",
    image: roadTrip,
    listings: "3 Listings",
  },
  {
    title: "Maldives",
    subtitle: "TRAVEL TO",
    image: HillStation,
    listings: "3 Listings",
  },
  {
    title: "Rome",
    subtitle: "TRAVEL TO",
    image: Adventure,
    listings: "2 Listings",
  },
  {
    title: "Tokyo",
    subtitle: "EXPLORE",
    image: roadTrip,
    listings: "5 Listings",
  },
  {
    title: "Bali",
    subtitle: "VISIT",
    image: HillStation,
    listings: "4 Listings",
  },
];

const AnantFarms = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [startIndex, setStartIndex] = useState(0);
  const itemsPerPage = 3;

  const handleImageClick = (index) => {
    setPhotoIndex(index);
    setIsOpen(true);
  };

  const nextSlide = () => {
    setStartIndex((prev) => (prev + 1) % travelData.length);
  };

  const prevSlide = () => {
    setStartIndex(
      (prev) => (prev - 1 + travelData.length) % travelData.length
    );
  };

  const visibleItems =
    travelData.slice(startIndex, startIndex + itemsPerPage).length < itemsPerPage
      ? [
          ...travelData.slice(startIndex),
          ...travelData.slice(0, itemsPerPage - (travelData.length - startIndex)),
        ]
      : travelData.slice(startIndex, startIndex + itemsPerPage);

  return (
    <Container className="py-5 text-center  text-left p-4">
      <Row className="d-flex justify-content-center align-items-center">
      <Col md={5} className="resort-card-modern">
  <Badge bg="light" text="dark" className="mb-3 px-3 py-2 fs-6">
    🏕 Resort Highlight
  </Badge>
  <h2 className="resort-title-modern mb-4">Anant Farms - a homely resort</h2>

  <table className="resort-table mb-4">
    <tbody>
      <tr>
        <td>💰 Price</td>
        <td>₹3000.00</td>
      </tr>
      <tr>
        <td>👤 Host</td>
        <td><strong>Anirudha Ambekar</strong></td>
      </tr>
      <tr>
        <td>📍 Address</td>
        <td>Brahmanghar, near Velhe (421212)</td>
      </tr>
      <tr>
        <td>🏙 City / District</td>
        <td>Pune</td>
      </tr>
      <tr>
        <td>🌐 State</td>
        <td>Maharashtra</td>
      </tr>
      <tr>
        <td>🗺 Country</td>
        <td>India</td>
      </tr>
    </tbody>
  </table>

  <Button variant="warning" className="btn-more text-white px-4 py-2 fw-semibold">
    Discover More
  </Button>
</Col>

        <Col md={7}>
          {/* Cards Row */}
          <Row className="justify-content-left" style={{ scrollBehavior: "smooth" }}>
            {visibleItems.map((place, index) => {
              const realIndex = (startIndex + index) % travelData.length;
              return (
                <Col key={index} md={4} className="mb-4 d-flex justify-content-center">
                  <div
                    className="position-relative image-hover-wrapper"
                    onClick={() => handleImageClick(realIndex)}
                    style={{
                      cursor: "pointer",
                      width: "286px",
                      height: "260px",
                      borderRadius: "45%",
                      overflow: "hidden",
                      boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    }}
                  >
                    <img
                      src={place.image}
                      alt={place.title}
                      className="w-100 h-100"
                      style={{ objectFit: "cover" }}
                    />
                    <div
                      className="hover-overlay"
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(13, 110, 253, 0.4)",
                        opacity: 0,
                        transition: "opacity 0.3s ease-in-out",
                        zIndex: 1,
                      }}
                    />
                    <div
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 0,
                        width: "100%",
                        textAlign: "center",
                        zIndex: 2,
                        color: "#fff",
                      }}
                    >
                      <span className="badge bg-warning text-dark mb-1">
                        {place.listings}
                      </span>
                      <div
                        className="text-uppercase"
                        style={{ fontSize: "12px", letterSpacing: "1px" }}
                      >
                        {place.subtitle}
                      </div>
                      <div
                        className="fw-bold"
                        style={{ fontSize: "18px", letterSpacing: "0.5px" }}
                      >
                        {place.title}
                      </div>
                    </div>
                  </div>
                </Col>
              );
            })}
          </Row>

          {/* Buttons Below Cards */}
          <div className="d-flex justify-content-center mt-3">
            <Button variant="outline-primary mx-3" onClick={prevSlide}>
              <FaChevronLeft />
            </Button>
            <Button variant="outline-primary" onClick={nextSlide}>
              <FaChevronRight />
            </Button>
          </div>

          {/* Lightbox */}
          {isOpen && (
            <Lightbox
              open={isOpen}
              close={() => setIsOpen(false)}
              index={photoIndex}
              slides={travelData.map((item) => ({ src: item.image }))}
            />
          )}
        </Col>
      </Row>

      {/* Hover Effect Styling */}
      <style>{`
        .image-hover-wrapper:hover .hover-overlay {
          opacity: 1;
        }
      `}</style>
    </Container>
  );
};

export default AnantFarms;
