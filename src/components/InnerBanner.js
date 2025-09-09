import React from 'react';
import { Container } from 'react-bootstrap';
import Bannerimg from '../assets/bg-aboutus.jpg';
import { useLocation } from 'react-router-dom';

const InnerBanner = () => {

    const location = useLocation();

  const bannerTitles = {
    "/about": "ABOUT US",
    "/contact": "CONTACT US",
    "/destination": "DESTINATION",
    "/gallery": "GALLERY",
    "/beaches":"Beaches",
    "/RoadTrip":"Road Trip",
    "/Hillstation":"Hill Station",
    "/adventure":"Adventure",
    "/nightlife":"Night Life",
    "/historicplaces":"Historic Places",
    "/login":"Login",
    "/signup":"Signup",
    // "/resort/anant-farms-a-homely-resort":"Resort",
  };

  const title = bannerTitles[location.pathname] || "Resort";
  return (
    <section
      className="vh-75 d-flex align-items-center text-center text-white position-relative"
      style={{
        backgroundImage: `url(${Bannerimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'Bottom',
        objectFit:"cover",
      }}
    >
      {/* Dark Overlay */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 1,
        }}
      ></div>

      {/* Actual Content - must be higher z-index */}
      <Container style={{ position: 'relative', zIndex: 2, marginTop: "50px" }}>
      <h1 className="Banner-Head fw-bold pt-5 w-60">{title}</h1>
    </Container>
    </section>
  );
};

export default InnerBanner;
