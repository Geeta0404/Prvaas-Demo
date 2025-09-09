import React from 'react'
// import Hero from './Hero'
// import Testimonials from './TestimonialSection'
import HomeAboutSection from './HomeAboutSection'
// import ConsultationBanner from './ConsultationBanner'
// import Team from './Team'
// import TreatmentSection from './TreatmentSection'
import HomeBanner from './HomeBanner'
import FavoriteTours from './FavoriteTours'
// import TourTypesSlider from './TourTypesSlider'
import CategoryActivities from './CategoryActivities'
import InquiryForm from './InquiryForm'



export default function Home() {
  
  return (
  <>
  {/* <Hero /> */}
  {/* <Header /> */}
  <HomeBanner />
  <InquiryForm />
   <HomeAboutSection />
   <FavoriteTours />
   {/* <TourTypesSlider /> */}
    <CategoryActivities />
   {/* <ConsultationBanner />
   <TreatmentSection showAll={false} />
  <Testimonials />
   <Team /> */}
  </>
  )
}
