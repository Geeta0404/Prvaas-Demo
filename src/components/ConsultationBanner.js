import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Banner from "../assets/consultantBanner.jpg";
import { Link } from 'react-router-dom';

const ConsultationBanner = () => {
  return (
    <div
      className="position-relative d-flex align-items-center py-4 px-3"
      style={{
        backgroundImage: `url(${Banner})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "50vh",
        lineHeight:"45px"
      }}
    >
      {/* Black Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 1 }}
      ></div>

      {/* Content */}
      <div className="container text-left d-flex position-relative text-white" style={{ zIndex: 2 }}>
        <div className="row py-5">
          <div className="group py-5">
            <p className="mb-2 text-capitalize fw-bold">
              Schedule an appointment for a
            </p>
            <h2 className="fw-bolder pb-2 text-white text-uppercase">Complimentary Consultation</h2>       
          
            {/* <button className="btn bg-light fw-bold px-4">
              Book Now
            </button> */}
 
            <button className="btn py-2"><Link to="/contact" className="btn bg-light text-dark more-services-btn"> Book Now </Link></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsultationBanner;
