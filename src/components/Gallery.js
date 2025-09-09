import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Carousel } from 'react-bootstrap';

// Example image imports
import Image1 from '../assets/Gallery1.webp';
import Image2 from '../assets/Gallery2.webp';
import Image3 from '../assets/Gallery3.webp';
import Image4 from '../assets/Gallery4.jpeg';
import Image5 from '../assets/Gallery5.webp';

const images = [Image1, Image2, Image3, Image4, Image5];

const ResponsiveGallery = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openModal = (index) => {
    setCurrentIndex(index);
    setShowModal(true);
  };

  const handleSelect = (selectedIndex) => {
    setCurrentIndex(selectedIndex);
  };

  return (
    <div className="container py-5">
       <h6 className="text-center" style={{ color: "#ee6401" }}>
        WELCOME TO THE PERFECT SMILE DENTAL CLINIC
      </h6>
      <h2 className="text-center mb-5">Our Gallery</h2>


      <div className="row">
        {images.map((src, index) => (
          <div className="col-6 col-md-4 col-lg-3 mb-4" key={index}>
            <img
              src={src}
              alt={`Gallery ${index}`}
              className="img-fluid rounded shadow-sm gallery-image"
              onClick={() => openModal(index)}
            />
          </div>
        ))}
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg" dialogClassName="custom-modal">
        <Modal.Body className="p-0">
          <div className="lightbox-container no-background">
            <Carousel activeIndex={currentIndex} onSelect={handleSelect} interval={null} className="custom-carousel">
              {images.map((src, index) => (
                <Carousel.Item key={index}>
                  <img src={src} alt={`Gallery ${index}`} className="d-block lightbox-image" />
                </Carousel.Item>
              ))}
            </Carousel>
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ResponsiveGallery;

/* CSS Styles */
// import './GalleryStyles.css';