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

  if (!farm) return <h2 style={{ color: "white" }}>Resort not found</h2>;

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxOpen(true);
  };

  const hostDetails = [
    { label: "Description", value: farm.description },
    { label: "Bedrooms", value: farm.bedrooms },
    { label: "Single Beds", value: farm.singleBeds },
    { label: "Double Beds", value: farm.doubleBeds },
    { label: "Basic Facilities", value: farm.basicFacilities },
    { label: "Entertainment Facilities", value: farm.entertainmentFacilities },
    { label: "Living Rooms", value: farm.livingRooms },
    { label: "Cooking & Cleaning", value: farm.cookingCleaningFacilities },
    { label: "Adults Allowed", value: farm.adultsAllowed },
    { label: "Other Spaces", value: farm.otherSpaces },
    { label: "Children Allowed", value: farm.childrenAllowed },
    { label: "Max Children Allowed", value: farm.numberOfChildrenAllowed },
    { label: "Child Age Limit", value: farm.childAgeLimit },
    { label: "Max Guests Allowed", value: farm.maxGuestsAllowed },
    { label: "Breakfast Available", value: farm.breakfastAvailable },
    { label: "Check-in Time", value: farm.checkInTime },
    { label: "Check-out Time", value: farm.checkOutTime },
    { label: "Rules", value: farm.rules },
    { label: "Total Price (INR)", value: farm.totalPriceINR },
    { label: "Single Occupation", value: farm.singleOccupation },
    { label: "Double Occupation", value: farm.doubleOccupation },
    { label: "Extra Bed With Person", value: farm.extraBedWithPerson },
    { label: "Adult Breakfast", value: farm.adultBreakfast },
    { label: "Adult Lunch", value: farm.adultLunch },
    { label: "Adult Dinner", value: farm.adultDinner },
    { label: "Child Breakfast", value: farm.childBreakfast },
    { label: "Child Lunch", value: farm.childLunch },
    { label: "Child Dinner", value: farm.childDinner },
  ];

  const half = Math.ceil(hostDetails.length / 2);
  const leftColumn = hostDetails.slice(0, half);
  const rightColumn = hostDetails.slice(half);

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
            <div className="p-4 shadow-sm rounded bg-white text-dark info-card">
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

        <Card className="guest-details-card my-5 bg-dark text-white">
          <Card.Body>
            <Card.Title>
              <h2 className="mb-5 resort-name text-center fw-bold">🏡 Guest Accommodation Details</h2>
            </Card.Title>
            <Row>
              <Col md={6}>
                <Table bordered responsive className="guest-details-table text-white">
                  <tbody>
                    {leftColumn.map((item, index) => (
                      <tr key={index}>
                        <td>{item.label}</td>
                        <td>{item.value || "N/A"}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Col>
              <Col md={6}>
                <Table bordered responsive className="guest-details-table text-white">
                  <tbody>
                    {rightColumn.map((item, index) => (
                      <tr key={index}>
                        <td>{item.label}</td>
                        <td>{item.value || "N/A"}</td>
                      </tr>
                    ))}
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
