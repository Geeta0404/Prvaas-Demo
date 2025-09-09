import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Aditya from "../assets/drAditya.webp"
import Nimisha from "../assets/drNimisha.webp"
import Mrunal from "../assets/drMrunal.webp"
import Swapnil from "../assets/drSwapnil.webp"
import Niraj from "../assets/drNiraj.webp"
import Krushna from "../assets/drKrushna.webp"

// Sample Data for Doctors
const doctors = [
  {
    imgSrc: Aditya,
    name: 'Dr Aditya M. Jadhav',
    role: 'BDS, Head Dentist',
    description: 'Owner of Perfect Smile Dental Clinic. Root Canal & Esthetic Dentistry Specialist',
  },
  {
    imgSrc: Nimisha,
    name: 'Dr Nimisha N. Barve',
    role: 'MDS,(Prosthodontics & Oral Implantology)',
     description: 'Co-Owner of Perfect Smile Dental Clinic Prosthetic, Esthetic & implant Dentistry Specialist',
  },
  {
    imgSrc: Mrunal,
    name: 'Dr Mrunal Deshpande Hulyalkar',
    role: 'MDS, (Periodontology)',
     description: 'Gum & bone surgery specialist. Specialist in cosmetic gum surgeries',
  },
  {
    imgSrc: Swapnil,
    name: 'Dr Swapnil Sabnis',
    role: 'MDS (Oral and Maxillofacial Surgery)',
     description: 'Specialist in Facial Trauma and Minor oral surgical procedures',
  },
  {
    imgSrc:Niraj,
    name: 'Dr Neeraj Kolge',
    role: 'MDS (Orthodontics & Dentofacial Orthopaedics)',
     description: 'Specialist in Braces, Invisible Braces & Invisalign',
    },
  {
      imgSrc:Krushna,
      name: 'Dr Krishnapriya Nene',
      role: 'MDS Pediatric & Preventive Dentistry',
      description: 'Specialized in proving dental care for children',
  },
];

const Team = () => {
  return (
    <section className="team-section py-5" style={{ backgroundColor: '', color: 'white' }}>
      <div className="container text-center">
      <h6 className="" style={{color:"#ee6401"}}>WELCOME TO THE PERFECT SMILE DENTAL CLINIC</h6>
        <h2 className="text-center mb-5">Our Team</h2>
        {/* <p className="section-subtitle text-dark mb-2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit nullam nunc justo sagittis suscipit ultrices.
        </p> */}

        <div className="row">
          {doctors.map((doctor, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="team-card shadow">
                <div className="image-container">
                  <img src={doctor.imgSrc} alt={doctor.name} className="img-fluid" />
                  <div className="overlay">
                    <div className="social-icons">
                      <a href="#" className="fab fa-facebook-f"></a>
                      <a href="#" className="fab fa-twitter"></a>
                      <a href="#" className="fab fa-linkedin-in"></a>
                    </div>
                  </div>
                </div>
                <h5 className="doctor-name">{doctor.name}</h5>
                <p className="doctor-role">{doctor.role}</p>
                <p className="doctor-description px-3">{doctor.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
