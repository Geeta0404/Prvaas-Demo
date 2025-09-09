import React from "react";
import Image5 from '../assets/Gallery4.jpeg';
import InnerBanner from './InnerBanner'

const Contact = () => {
  return (
    <>
      <InnerBanner />
    <div className="container my-5">

{/* <h6 className="text-center" style={{ color: "#ee6401" }}>   WELCOME TO THE PERFECT SMILE DENTAL CLINIC    </h6> */}
      {/* <h2 className="text-center mb-5">Contact Us</h2> */}

      {/* Top Section with Icons */}
      <div className="row text-center">
  <div className="col-md-4 mb-3">
    <div className="p-4 border rounded bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
      <i className="fas fa-map-marker-alt fa-3x text-primary mb-3"></i>
      <h5 className="fw-bold">OUR MAIN OFFICE</h5>
      <p>203 Century Building, Behind Kimaya Hotel, Erandawane Karve Road, Pune-38</p>
    </div>
  </div>
  <div className="col-md-4 mb-3">
    <div className="p-4 border rounded bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
      <i className="fas fa-phone fa-3x text-primary mb-3"></i>
      <h5 className="fw-bold">PHONE NUMBER</h5>
     
    <span>+91-9970765500</span>
    </div>
  </div>
  {/* <div className="col-md-3 mb-3">
    <div className="p-4 border rounded bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
      <i className="fas fa-phone fa-3x text-primary mb-3"></i>
      <h5 className="fw-bold">PHONE NUMBER</h5>
      <span>+91-9607351425</span>
      <span>Dr. Aditya Jadhav</span>
    </div>
  </div> */}
  <div className="col-md-4 mb-3">
    <div className="p-4 border rounded bg-white shadow-sm h-100 d-flex flex-column justify-content-center">
      <i className="fas fa-envelope fa-3x text-primary mb-3"></i>
      <h5 className="fw-bold">EMAIL</h5>
      <p>
        <a href="mailto:hello@theme.com" className="text-decoration-none">
        info@prvaas.com
        </a>
      </p>
    </div>
  </div>
</div>


      {/* Bottom Section with Contact Form & Text */}
      <div className="row mt-5 justify-content-center align-items-center">

      <h2 className="text-center mb-5">Feel Free to Contact Us</h2>
        {/* Contact Form */}
        <div className="col-md-6">
          {/* <h4 className="fw-bold">Get in touch</h4>
          <p>
            <em>We believe sustainability is vitally important.</em>
          </p>
          <p>
            Etiam sit amet convallis erat – class aptent taciti sociosqu ad litora torquent per conubia!
          </p>
          <div className="d-flex gap-3">
          <a href="https://www.facebook.com/dradityaperfectsmiledentalclinic/" className="text-dark fs-4" target='_blank'><i className="fab fa-facebook-f"></i></a>
            <a href="#" className="text-dark fs-4">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-dark fs-4">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="text-dark fs-4">
              <i className="fab fa-linkedin"></i>
            </a>
          </div> */}
          <img src={Image5} alt="Description" className="w-100 h-75 d-block mx-auto" />
        </div>

        {/* Contact Form */}
        <div className="col-md-6">
        <form className="p-5 shadow rounded bg-white">
  <div className="row mb-3 ">
    <div className="col-md-6">
      {/* <label className="form-label">First Name</label> */}
      <input
        type="text"
        className="form-control custom-input"
        placeholder="First Name"
      />
    </div>
    <div className="col-md-6">
      {/* <label className="form-label">Last Name</label> */}
      <input
        type="text"
        className="form-control custom-input"
        placeholder="Last Name"
      />
    </div>
  </div>
  <div className="mb-3">
    {/* <label className="form-label">Mobile Number</label> */}
    <input
      type="tel"
      className="form-control custom-input"
      placeholder="Phone"
    />
  </div>
  <div className="mb-3">
    {/* <label className="form-label">Gmail</label> */}
    <input
      type="email"
      className="form-control custom-input"
      placeholder="Email"
    />
  </div>
  <div className="mb-3 ">
    {/* <label className="form-label">Message</label> */}
    <textarea
      className="form-control custom-input"
      rows="3"
      placeholder="Message"
    ></textarea>
  </div>
  <button type="submit" className="btn btn-primary w-100">
    SUBMIT
  </button>
</form>

</div>

      </div>
    </div>
    </>
  );
};

export default Contact;
