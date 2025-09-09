import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Diagnosis from "../assets/Diagnosis-And-X-Ray-Imaging.webp";
import Scaling from "../assets/Scaling-And-Polishing46_59.webp";
import Filling from "../assets/Filling.webp";
import Root from "../assets/Root-Canal-Treatment-1.webp";
import Bleaching from "../assets/Bleaching-Of-Teeth.webp";
import Dental from "../assets/Dental-ExtractionsTeeth-Extractions.webp";
import Gum from "../assets/Gum-Disease-Treatments.webp";
import Childrens from "../assets/Childrens-Dental-Care.webp";
import Dentures from "../assets/Dentures-And-Other-Prosthetic-Treatment.webp";
import Orthodontics from "../assets/Orthodontics-Treatment.webp";
import Implants from "../assets/Implants.webp";
import { Link } from 'react-router-dom';

const treatments = [
  { imgSrc: Diagnosis, title: 'Diagnosis And X-Ray Imaging', linkText: 'View' },
  { imgSrc: Scaling, title: 'Scaling & Polishing', linkText: 'View' },
  { imgSrc: Filling, title: 'Dental Bridges', linkText: 'View' },
  { imgSrc: Root, title: 'Tooth Fillings', linkText: 'View' },
  { imgSrc: Bleaching, title: 'Root Canal Treatment', linkText: 'View' },
  { imgSrc: Dental, title: 'Bleaching Of Teeth', linkText: 'View' },
  { imgSrc: Gum, title: 'Tooth Extractions', linkText: 'View' },
  { imgSrc: Childrens, title: 'Treatment for gum diseases', linkText: 'View' },
  { imgSrc: Dentures, title: 'Dentures And Other Prosthetic ', linkText: 'View' },
  { imgSrc: Orthodontics, title: 'Orthodontic Treatment', linkText: 'View' },
  { imgSrc: Implants, title: 'Implants', linkText: 'View' },
];

const TreatmentSection = ({ showAll = true }) => {
  // Conditionally show treatments
  const visibleTreatments = showAll ? treatments.slice(0, 11) : treatments.slice(0, 6);

  return (
    <div className="container py-5">
      <h6 className="text-center" style={{ color: "#ee6401" }}>
        WELCOME TO THE PERFECT SMILE DENTAL CLINIC
      </h6>
      <h2 className="text-center mb-5">Our Treatments</h2>

      <div className="row">
        {visibleTreatments.map((treatment, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card treatment-card border-0 overflow-hidden">
              <div className="card-img-wrapper">
                <img src={treatment.imgSrc} className="card-img-top" alt={treatment.title} />
              </div>
              <div className="card-body">
                <h5 className="card-title">{treatment.title}</h5>
                <a href="#" className="view-link">{treatment.linkText} →</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* More Services Button */}
      {!showAll && (
        <div className="text-center mt-4">
          <Link to="/treatment" className="btn more-services-btn"> More Services</Link>
        </div>
      )}
    </div>
  );
};

export default TreatmentSection;
