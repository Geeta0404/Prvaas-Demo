// src/components/HeroSection.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Testimonial = () => {
    const slides = [
  {
    id: 1,
    name: "Shantanu Shenolikar",
    title: 'Painless treatment from a highly trained doctor',
    description: `Painless treatment from a highly trained doctor. Dr.Aditya explains everything, right from the plan of treatment, reasons to do so and precautions to be taken afterwards. The clinic is well equipped and comfortable.`,
    rating: '4.9',
    reviewText: 'Trusted by Millions of customers',
    reviewLink: '#'
  },
  {
    id: 2,
    name: "Deepali Suhag",
    title: 'Dr. Aditya explains you everything in a detailed',
    description: `Dr. Aditya explains you everything in a very detailed manner. The best thing is I found him very ethical, he won't suggest any unnecessary procedures unlike many other dentists I've come across.
He doesn't get irritated by your queries, be it a very silly one. I'm very satisfied with the treatment. His work is close to perfection, must say! The assistant is also very warm and courteous. It's a well-maintained, neat and clean dental clinic with a lot of modern equipments.
Highly recommended!`,
    rating: '5.0',
    reviewText: 'Thousands of Happy Patients',
    reviewLink: '#'
  },
  {
    
      id: 3,
      name: "Kushagra Anil Nagar",
    title: 'Very good experience',
    description: `Best dental clinic i have ever been to.The doctor is too good with the treatments. Highly Recommended if you've got dental problems.`,
    rating: '5.0',
    reviewText: 'Thousands of Happy Patients',
    reviewLink: '#'
  },
  {
    id: 4,
    name: "Taran Kamble",
    title: 'Best dental clinic i have ever been to',
    description: `Dr. Aditya is very friendly and briefs his patients very nicely about the process.
Overall it was a very nice experience getting a treatment from Dr. Aditya.
Perfect smile dental clinic is perfect place to visit your dentist today.`,
    rating: '5.0',
    reviewText: 'Thousands of Happy Patients',
    reviewLink: '#'
  },
  {
    id: 5,
    name: "Abhishek Ingle",
    title: 'Dr. Aditya handles you with such ease',
    description: `Dr. Aditya handles you with such ease. You wouldn't even realize when you're done with your treatment. Worth every penny. Highly recommended.`,
    rating: '5.0',
    reviewText: 'Thousands of Happy Patients',
    reviewLink: '#'
  },
  {
    id: 6,
    name: "Shantanu Shenolikar",
    title: 'Best dentist in Pune',
    description: `Best dentist in Pune and that too at very reasonable fees. Dr.Aditya is very intelligent, friendly and explained me many things about how I can keep my teeth healthy. He answered all my questions about my treatment.`,
    rating: '5.0',
    reviewText: 'Thousands of Happy Patients',
    reviewLink: '#'
  }
];
  return (



<section className="hero-section text-light py-5 position-relative" style={{ backgroundColor: '#1a1d29' }}>
  <button className="carousel-control-prev position-absolute start-0 translate-middle-y" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev" style={{ top: '50%', transform: 'translateX(-50%)' }}>
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>

  <div className="container p-5">
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slider, index) => (
          <div key={slider.id} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
            <div className="row align-items-center">
              <div className="col-lg-8">
                <p className="text-uppercase small mb-2">Why work with Dr. Aditya Jadhav?</p>
                <h1 className="display-4 fw-bold mb-4">{slider.title}</h1>
                <p className="lead">{slider.description}</p>

                <h5 className="fw-bold">- {slider.name}</h5>
              </div>
              <div className="col-lg-4">
                <div className="card text-center text-light p-4" style={{ backgroundColor: '#3b3f54' }}>
                  <h1 className="display-3 fw-bold">{slider.rating}</h1>
                  <div className="mb-3">⭐⭐⭐⭐⭐</div>
                  <p>{slider.reviewText}</p>
                  <a href={slider.reviewLink} className="text-light text-decoration-underline">Leave a review</a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>

  <button className="carousel-control-next position-absolute end-0 translate-middle-y" type="button" data-bs-target="#heroCarousel" data-bs-slide="next" style={{ top: '50%', transform: 'translateX(50%)' }}>
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</section>



  
  );
};

export default Testimonial;
