import React from 'react'
import HeroServiceSec from '../components/Services/HeroServiceSec'
import StatsSection from '../components/Services/StatsSection'
import WhyChooseUsServices from '../components/Services/WhyChooseUsServices'
import IndustriesSection from '../components/Services/IndustriesSection'
import OurProcess from '../components/Services/OurProcess'
import WhatWeSolve from '../components/Services/WhatWeSolve'
import OurClients from '../components/Home/OurClients'
import FAQSection from '../components/Services/FAQSection'
import BookDemo from '../components/Services/BookDemo'

export const CorporateAssessment = () => {

  return (
    <div>
      <HeroServiceSec />
      <StatsSection />
      <WhyChooseUsServices />
      <IndustriesSection />
      <OurProcess />
      <WhatWeSolve />
      <OurClients />
      <FAQSection />
      <BookDemo />
    </div>
  )
}
