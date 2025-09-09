import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import roadTrip from '../assets/road-trip.jpg';
import HillStation from '../assets/Hill-Station.jpg';
import Adventure from '../assets/Adv.jpeg';
import nightLife from '../assets/Night-Life.jpg';
import historicPlace from '../assets/Historic-Places.jpg';
import Beaches from '../assets/Beaches.jpg';

const activities = [
  {
    title: "Road Trip",
    img: roadTrip,
    icon: "fa-solid fa-car",
    link: "/RoadTrip",
  },
  {
    title: "Hill Station",
    img: HillStation,
    icon: "fa-solid fa-campground",
    link: "/Hillstation",
  },
  {
    title: "Adventure",
    img: Adventure,
    icon: "fa-solid fa-person-hiking",
    link: "/adventure",
  },
  {
    title: "Night Life",
    img: nightLife,
    icon: "fa-solid fa-suitcase-rolling",
    link: "/nightlife",
  },
  // {
  //   title: "Historic Places",
  //   img: historicPlace,
  //   icon: "fa-solid fa-history",
  //   link: "/historicplaces",
  // },
  {
    title: "Beaches",
    img: Beaches,
    icon: "fa-solid fa-person-swimming",
    link: "/beaches",
  },
];

const CARDS_PER_VIEW = 4;

const CategoryActivities = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (currentIndex < activities.length - CARDS_PER_VIEW) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const translateX = -currentIndex * (100 / CARDS_PER_VIEW);

  return (
    <section className="category-activities-section py-5 text-center position-relative">
      <Container>
        <h2 className="light-heading">ACTIVITIES</h2>
        <h2 className="section-title fw-bold mb-3">
          CATEGORY & <span className="text-warning">ACTIVITIES</span>
        </h2>

        <div className="slider-controls">
          <button className="slider-btn" onClick={handlePrev} disabled={currentIndex === 0}>
            &#8592;
          </button>
          <div className="slider-window">
            <div
              className="slider-track"
              style={{ transform: `translateX(${translateX}%)` }}
            >
              {activities.map((item, index) => (
                <div className="slider-card" key={index}>
                  <div
                    className="image-circle mb-3"
                    style={{ backgroundImage: `url(${item.img})` }}
                  >
                    <i className={`activity-icon ${item.icon}`}></i>
                  </div>
                  <div className="activity-info shadow-sm p-3 rounded bg-white">
                    <h5 className="fw-bold mb-1 text-black">
                      <Link className="text-black text-decoration-none" to={item.link}>{item.title}</Link>
                    </h5>
                    <p className="text-muted small mb-0">{item.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            className="slider-btn"
            onClick={handleNext}
            disabled={currentIndex >= activities.length - CARDS_PER_VIEW}
          >
            &#8594;
          </button>
        </div>
      </Container>
    </section>
  );
};

export default CategoryActivities;
