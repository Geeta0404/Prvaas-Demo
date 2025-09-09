import React from 'react';
import { Container, Button } from 'react-bootstrap';
import Bannerimg from '../assets/BannerImg.jpg';
import { Link } from 'react-router-dom';


const HomeBanner = () => {
  return (
    <section
      className="vh-100 d-flex align-items-center text-center text-white position-relative"
      style={{
        backgroundImage: `url(${Bannerimg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
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
      <Container style={{ position: 'relative', zIndex: 2 , marginTop:"50px"}}>
        <h1 className="Banner-Head fw-bold pt-5 w-60">Journey to Explore World</h1>
        <p className="lead mt-3 mb-4 fw-medium">
        Travel.Education For The Mind & Education For The Heart.
        </p>

       
        <div className="d-flex justify-content-center gap-3">
         <Link to="/login">
  <Button variant="warning" className="px-4 py-2 rounded-pill fw-bold">
    Login
  </Button>
</Link>
 <Link to="/signup">
          <Button variant="outline-light" className="px-4 py-2 rounded-pill fw-bold">
          Signup
          </Button>
          </Link>
        </div>
      </Container>
    </section>
  );
};

export default HomeBanner;
