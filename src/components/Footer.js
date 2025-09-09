import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaPinterestP,
  FaLinkedinIn,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa";
import Logo from '../assets/logoP.webp';
// import "./Footer.css";
 // Create a separate CSS file or use module.css

const Footer = () => {
  return (
    <>
    <footer className="text-light pt-5 pb-3" style={{backgroundColor:"#263A49"}}>
      <Container>
        <Row className="gy-4">
          <Col md={3}>
            <a href="/" className="mb-5">
  <img src={Logo} alt="Traveler Logo" height="60" />
</a>
            <p className="mt-3">
            Travel.Education For The Mind & Education For The Heart.
            </p>
          </Col>

          <Col md={3}>
            <h5 className="mb-3 fw-bold">RECENT POST</h5>
            <div className="d-flex mb-2">
              <img
                src="https://picsum.photos/60?1"
                alt="post1"
                className="rounded me-2"
                width="60"
                height="60"
              />
              <div>
                <small className="text-uppercase fw-bold">BEST JOURNEY TO PEACEFUL PLACES</small>
                <br />
                <small className="text-light">📅 February 17, 2022</small>
              </div>
            </div>
            <div className="d-flex">
              <img
                src="https://picsum.photos/60?2"
                alt="post2"
                className="rounded me-2"
                width="60"
                height="60"
              />
              <div>
                <small className="text-uppercase fw-bold">TRAVEL WITH FRIENDS IS BEST</small>
                <br />
                <small className="text-light">📅 February 17, 2022</small>
              </div>
            </div>
          </Col>

          <Col md={3}>
            <h5 className="mb-3 fw-bold">CONTACT US</h5>
            <p className="mb-1">
              <FaPhoneAlt className="me-2" />
              +91-9970765500
            </p>
            <p className="mb-1">
              <FaEnvelope className="me-2" />
              info@prvaas.com
            </p>
            <p className="mb-1">
              <FaMapMarkerAlt className="me-2" />
              203 Century Building, Behind Kimaya Hotel, Erandawane Karve Road, Pune-38
            </p>
          </Col>

          <Col md={3}>
            <h5 className="mb-3 fw-bold">OUR GALLERY</h5>
            <div className="d-flex flex-wrap gap-2">
              {[1, 2, 3, 4, 5, 6].map((img) => (
                <img
                  key={img}
                  src={`https://picsum.photos/60?random=${img}`}
                  alt={`gallery-${img}`}
                  className="rounded"
                  width="60"
                  height="60"
                />
              ))}
            </div>
          </Col>
        </Row>

        <hr className="my-4 border-light opacity-25" />

        <Row className="align-items-center">
          <Col md={6}>
            <p className="mb-2 mb-md-0">
              Subscribe our newsletter for more update & news !!
            </p>
            <Form className="d-flex">
              <Form.Control
                type="email"
                placeholder="Enter Your Email.."
                className="me-2 rounded-pill"
              />
              <Button variant="light" className="rounded-pill px-4 fw-bold">
                SUBSCRIBE
              </Button>
            </Form>
          </Col>

          <Col
            md={6}
            className="text-md-end mt-4 mt-md-0 d-flex flex-column align-items-md-end"
          >
            <div className="d-flex gap-3 mb-3">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaPinterestP />
              <FaLinkedinIn />
            </div>
            <div className="d-flex flex-wrap gap-3 small">
              <span>Privacy Policy</span>
              <span>Support</span>
              <span>Terms & Condition</span>
            </div>
           
          </Col>
         
        </Row>
      
      </Container>
    </footer>
    <footer className="text-light" style={{backgroundColor:"#223645"}}>
      <Container>
      <Row>
        <Col md={12}>
          <p className="small py-3 mt-2 mb-0 text-center">
              Copyright © 2022 Traveler. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>

    </footer>
    </>
  );
};

export default Footer;
