import React from 'react'
import HeroSection from '../components/Home/HeroSection'
import TrustBadges from '../components/Home/TrustBadges'
import WhoWeDo from '../components/Home/WhoWeDo'
import ProfessionalServices from '../components/Home/ProfessionalServices'
import WhyChooseUs from '../components/Home/WhyChooseUs'
import ProctoringTools from '../components/Home/ProctoringTools'
import WhatWeResolve from '../components/Home/WhatWeResolve'
import WhyWereBetter from '../components/Home/WhyWereBetter'
import Testimonials from '../components/Home/Testimonials'
import LinkedInFeed from '../components/Home/LinkedInFeed'
import OurClients from '../components/Home/OurClients'

export const Home = () => {
  return (
    <div>
      <HeroSection />
      <TrustBadges />
      <WhoWeDo />
      <ProfessionalServices />
      <WhyChooseUs />
      <ProctoringTools />
      <WhatWeResolve />
      <WhyWereBetter />
      <Testimonials />
      <LinkedInFeed />
      <OurClients />
    </div>
  )
}
