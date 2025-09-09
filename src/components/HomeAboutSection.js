import React from 'react';
import { Container, Row, Col, Button, Card , Nav} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'; // You'll create this CSS file
import BeachScene from '../assets/Beach Scene.jpg'
import TravelCouple from '../assets/Travel Couple.jpg'
import Decor from '../assets/Decor Items.png'
import { BsPersonFill } from 'react-icons/bs';
import { FaPlane } from 'react-icons/fa';
import { Link } from "react-router-dom";


const HomeAboutSection = () => {
  return (
    <div className="promo-section py-5">
      <Container>
        <Row className="align-items-center">
          {/* Left Side Image and Elements */}
          <Col md={6} className="position-relative">
          <Row className="align-items-center">
          <Col md={12} className="position-relative">
          <img
               src={TravelCouple}
              alt="Travel Couple"
              className="img-fluid rounded-4"              
            />


          </Col>

          <Col md={6}>
            
          {/* <div className="discount-circle">50% Discount</div> */}
            <img
              src={Decor}
              alt="Decor Items"
              className="decor-image"
            />
          </Col>

          <Col md={6}>
          <img
               src={BeachScene}
              alt="Beach Scene"
              className="img-fluid rounded-4 beach-image"
            />
          </Col>

            </Row>


          </Col>

          {/* Right Side Content */}
          <Col md={6} className="mt-4 mt-md-0">
          
            <h2 className="fw-bold mb-3">
            About us
            </h2>
            <p className="text-muted mb-4">
            Hit the road! Discover the best bits of India on an epic trip, with friends,family,colleagues,couples travellers just like you.
            As a platform that helps travelers find the fastest and best routes across India, Prvaas understands that a journey doesn’t end at a destination. Navigating around a city, even if it’s your first time there, should be simple, time-saving and cost-effective so that you can enjoy a fully immersive experience.
            </p>
            <p className="text-muted mb-4">
            From the Indian Mountains to the Indian Beaches, Prvaas offer countless sites and attractions. In the past, inner-city transportation—aside from the public kind—was limited, but today, urban mobility alternatives such as shared bikes, scooters and e-scooters are all the rage.our versatile applications and our other related stages, recreation and business voyagers can investigate, explore, analyze costs and book an extensive variety of administrations taking into account their movement needs.
            </p>
            <Row className="mb-4">
              <Col md={6} className="d-flex align-items-start gap-2">
              <div className="icon-circle bg-warning text-black d-flex align-items-center justify-content-center">
      <BsPersonFill size={24} />
    </div>
                <div>
                  <h6 className="fw-bold mb-1">Friendly Guide</h6>
                  <p className="mb-0 small text-muted">There are many variations of passages of lorem Ipsum.</p>
                </div>
              </Col>
              <Col md={6} className="d-flex align-items-start gap-2">
              <div className="icon-circle bg-warning text-black d-flex align-items-center justify-content-center">
      <FaPlane size={24} />
    </div>
              
                <div>
                  <h6 className="fw-bold mb-1">Safety Travel</h6>
                  <p className="mb-0 small text-muted">There are many variations of passages of lorem Ipsum.</p>
                </div>
              </Col>
            </Row>
       
            <Button variant="warning" className="px-4 py-2 rounded-pill fw-semibold text-white">
            <Link  to="/about" className="text-uppercase fw-bold text-black" style={{textDecoration:"none"}}>
    About Us
  </Link>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default HomeAboutSection;
