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
  console.log("data",data)
  // ── Hero ──
  const hero = {
    title: data?.heading1,
    subTitle: data?.sub_heading1,
    button1Text: data?.header_button1,
    button1Link: data?.header_button1_link,
    button2Text: data?.header_button2,
    button2Link: data?.header_button2_link,
    image: data?.header_banner_image,
  };

  // ── Stats ──
  const stats = [
    { count: data?.ngo_impact_count, title: data?.ngo_title, description: data?.ngo_description },
    { count: data?.beneficiaries_count, title: data?.beneficiaries_title, description: data?.benerificieries_description },
    { count: data?.indirect_beneficieries_count, title: data?.indirect_beneficieries_title, description: data?.indirect_beneficieries_description },
    { count: data?.volunteers_involved_count, title: data?.volunteers_involved_title, description: data?.volunteers_involved_description },
  ].filter(s => s?.title);

  // ── Why Choose Us ──
  const whyChooseUs = {
    heading: data?.heading2,
    items: [
      { title: data?.why_choose_us_title1, description: data?.why_choose_us_description1, image: data?.why_choose_us_image1 },
      { title: data?.why_choose_us_title2, description: data?.why_choose_us_description2, image: data?.why_choose_us_image2 },
      { title: data?.why_choose_us_title3, description: data?.why_choose_us_description3, image: data?.why_choose_us_image3 },
    ].filter(i => i?.title),
  };

  // ── Industries ──
const industries = {
  heading:    data?.heading3,
  subHeading: data?.sub_heading3,
  items: [
    { name: data?.industry_name1, logo: data?.industry_logo1, image: data?.industries_image1, description: data?.industry_description1 },
    { name: data?.industry_name2, logo: data?.industry_logo2, image: data?.industries_image2, description: data?.industry_description2 },
    { name: data?.industry_name3, logo: data?.industry_logo3, image: data?.industries_image3, description: data?.industry_description3 },
    { name: data?.industry_name4, logo: data?.industry_logo4, image: data?.industries_image4, description: data?.industry_description4 },
    { name: data?.industry_name5, logo: data?.industry_logo5, image: data?.industries_image5, description: data?.industry_description5 },
    { name: data?.industry_name6, logo: data?.industry_logo6, image: data?.industries_image6, description: data?.industry_description6 },
    { name: data?.industries_name7, logo: data?.industry_logo7, image: data?.industries_image7, description: data?.industry_description7 },
    { name: data?.industries_name8, logo: data?.industries_logo8, image: data?.industries_image8, description: data?.industry_description8 },
    { name: data?.industries_name9, logo: data?.industries_logo9, image: data?.industries_image9, description: data?.industry_description9 },
  ].filter(i => i?.name),
};

  // ── Our Process ──
  const ourProcess = {
    heading: data?.heading4,
    items: [
      { title: data?.our_process_title1, description: data?.our_process_description1, logo: data?.our_process_logo1 },
      { title: data?.our_process_title2, description: data?.our_process_description2, logo: data?.our_process_logo2 },
      { title: data?.our_process_title3, description: data?.our_process_description3, logo: data?.our_process_logo3 },
      { title: data?.our_process_title4, description: data?.our_process_description4, logo: data?.our_process_logo4 },
    ].filter(i => i?.title),
  };

  // ── What We Solve ──
  const whatWeSolve = {
    heading: data?.heading5,
    subHeading: data?.sub_heading5,
    items: [
      { description: data?.solution_description1, logo: data?.solution_logo1 },
      { description: data?.solution_description2, logo: data?.solution_logo2 },
      { description: data?.solution_description3, logo: data?.solution_logo3 },
      { description: data?.solution_description4, logo: data?.solution_logo4 },
      { description: data?.solution_description5, logo: data?.solution_logo5 },
      { description: data?.solution_description6, logo: data?.solution_logo6 },
    ].filter(i => i?.description),
  };

  // ── Partners / Clients ──
  const partners = [
    { id: 1, image: data?.our_partner_logo1, link: data?.our_partner_logo_link1 },
    { id: 2, image: data?.our_partner_logo2, link: data?.our_partner_logo_link2 },
    { id: 3, image: data?.our_partner_logo3, link: data?.our_partner_logo_link3 },
    { id: 4, image: data?.our_partner_logo4, link: data?.our_partner_logo_link4 },
    { id: 5, image: data?.our_partner_logo5, link: data?.our_partner_logo_link5 },
    { id: 6, image: data?.our_partner_logo6, link: data?.our_partner_logo_link6 },
  ].filter(p => p?.image);

  // ── FAQ ──
  const faq = {
    heading: data?.heading7,
    subHeading: data?.sub_heading7,
    email: data?.faq_mail,
    items: [
      { title: data?.faq_title1, description: data?.faq_description1 },
      { title: data?.faq_title2, description: data?.faq_description2 },
      { title: data?.faq_title3, description: data?.faq_description3 },
      { title: data?.faq_title4, description: data?.faq_description4 },
      { title: data?.faq_title5, description: data?.faq_description5 },
    ].filter(i => i?.title),
  };

  // ── Book Demo ──
  const bookDemo = {
    heading: data?.heading8,
    title: data?.personalized_demo_title,
    description: data?.personalized_demo_description,
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