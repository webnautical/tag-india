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
import Layout1OurParter from '../components/Services/Layout1OurParter'

export const CorporateAssessment = ({ data }) => {
  if (!data) return null;
  const hero = {
    title: data?.heading1,
    subTitle: data?.sub_heading1,
    image: data?.heading_image,
    buttons: data?.header_button
  };

  // ── Stats ──
  const stats = data?.impact

  // ── Why Choose Us ──
  const whyChooseUs = {
    heading: data?.heading2,
    items: data?.why_choose_us,
  };

  // ── Industries ──
  const industries = {
    heading: data?.heading3,
    subHeading: data?.sub_heading3,
    items: data?.we_serve,
  };

  // ── Our Process ──
  const ourProcess = {
    heading: data?.heading4,
    items: data?.our_process,
  };

  // ── What We Solve ──
  const whatWeSolve = {
    heading: data?.heading5,
    subHeading: data?.sub_heading5,
    items: data?.what_we_solve,
  };

  // ── Partners / Clients ──
  const partners = data?.our_partner

  // ── FAQ ──
  const faq = {
    heading: data?.heading7,
    subHeading: data?.sub_heading7,
    email: data?.faq?.[0]?.faq_mail,
    items: data?.faq,
  };

  // ── Book Demo ──
  const bookDemo = {
    heading: data?.heading8,
    title: data?.personalized_demo?.[0]?.personalized_demo_title,
    description: data?.personalized_demo?.[0]?.personalized_demo_description,
  };

  return (
    <div>
      {hero?.title && <HeroServiceSec data={hero} />}
      {stats?.length && <StatsSection data={stats} />}
      {whyChooseUs?.items?.length && <WhyChooseUsServices data={whyChooseUs} />}
      {industries?.items?.length && <IndustriesSection data={industries} />}
      {ourProcess?.items?.length && <OurProcess data={ourProcess} />}
      {whatWeSolve?.items?.length && <WhatWeSolve data={whatWeSolve} />}
      {partners?.length && <Layout1OurParter data={partners} title={data?.heading6} />}
      {faq?.items?.length && <FAQSection data={faq} />}
      {bookDemo?.heading && <BookDemo data={bookDemo} />}
    </div>
  );
};