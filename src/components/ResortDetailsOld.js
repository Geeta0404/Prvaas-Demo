import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table } from "react-bootstrap";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import { formsDataDetails } from "../utils/constant";
import InnerBanner from "./InnerBanner";

// Slugify helper
const slugify = (str) =>
  str.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "");

const ResortDetails = () => {
  const { resortName } = useParams();
  const decodedSlug = slugify(resortName);

  const farm = formsDataDetails.find((f) => slugify(f.name) === decodedSlug);

  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  if (!farm) return <h2>Resort not found</h2>;

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };



  return (
    <div style={{ backgroundColor: "#000520fa" }}>
      <InnerBanner />
      <Container className="py-5">
        <h2 className="mb-5 resort-name text-center fw-bold">{farm.name}</h2>

        <Row className="align-items-center justify-content-center gy-5">
          <Col md={6}>
            <div className="p-4">
              <p className="lh-lg styled-description">{farm.mainDescription}</p>
            </div>
          </Col>

          <Col md={6}>
            <div className="p-4 shadow-sm rounded bg-white info-card">
              <h2 className="text-center mb-4 fw-bold">{farm.Information}</h2>
              <Table className="resort-table mb-0">
                <tbody>
                  <tr><td><strong>Host:</strong></td><td>{farm.host}</td></tr>
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
          {farm.images.map((img, index) => (
            <Col key={index} xs={6} md={4} lg={3} className="mb-4">
              <img
                src={img}
                alt={`gallery-${index}`}
                className="img-fluid"
                style={{ borderRadius: "8px", cursor: "pointer" }}
                onClick={() => openLightbox(index)}
              />
            </Col>
          ))}
        </Row>
<Card className="guest-details-card my-5">
  <Card.Body>
    <Card.Title>
      <h2  className="mb-5 resort-name text-center fw-bold text-light">     🏡 Guest Accommodation Details</h2>
    </Card.Title>
    <Row>
      <Col md={6}>
        <Table bordered responsive className="guest-details-table">
              <tbody>
                  <tr><td><strong>Name</strong></td><td>{farm.name}</td></tr>
                  <tr><td><strong>Description</strong></td><td>{farm.description}</td></tr>
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
        <Table bordered responsive className="guest-details-table">
              <tbody>
                  <tr><td><strong>Breakfast Available</strong></td><td>{farm.breakfastAvailable}</td></tr>
                  <tr><td><strong>Check-in Time</strong></td><td>{farm.checkInTime}</td></tr>
                  <tr><td><strong>Check-out Time</strong></td><td>{farm.checkOutTime}</td></tr>
                  <tr><td><strong>Rules</strong></td><td>{farm.rules}</td></tr>
                  <tr><td><strong>Total Price (INR)</strong></td><td>₹{farm.totalPriceINR}</td></tr>
                  <tr><td><strong>Single Occupation</strong></td><td>{farm.singleOccupation}</td></tr>
                  <tr><td><strong>Double Occupation</strong></td><td>{farm.doubleOccupation}</td></tr>
                  <tr><td><strong>Extra Bed With Person</strong></td><td>{farm.extraBedWithPerson}</td></tr>
                  <tr><td><strong>Adult Breakfast</strong></td><td>{farm.adultBreakfast}</td></tr>
                  <tr><td><strong>Adult Lunch</strong></td><td>{farm.adultLunch}</td></tr>
                  <tr><td><strong>Adult Dinner</strong></td><td>{farm.adultDinner}</td></tr>
                  <tr><td><strong>Child Breakfast</strong></td><td>{farm.childBreakfast}</td></tr>
                  <tr><td><strong>Child Lunch</strong></td><td>{farm.childLunch}</td></tr>
                  <tr><td><strong>Child Dinner</strong></td><td>{farm.childDinner}</td></tr>
                  
                  
                </tbody>
            </Table>
      </Col>
    </Row>
  </Card.Body>
</Card>

        {lightboxOpen && (
          <Lightbox
            open={lightboxOpen}
            close={() => setLightboxOpen(false)}
            index={photoIndex}
            slides={farm.images.map((src) => ({ src }))}
          />
        )}
      </Container>
    </div>
  );
};

export default ResortDetails;
