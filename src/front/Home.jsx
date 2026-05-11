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
import { useGetHomePageQuery } from '../api/TagIndiaAPI'
import HomePageLoading from '../components/Home/HomePageLoading'

export const Home = () => {
  const { data, isLoading } = useGetHomePageQuery();
  const apiData = data?.data ?? {};
  const titles = apiData?.homePageSectionTitle ?? {};

  const heroBanner = apiData?.homePageBanner ?? null;
  const homePageIcons = apiData?.homePageIcons ?? null;
  const whoWeDo = apiData?.whoWeDo ?? null;
  const professionalServices = apiData?.ProfessionalServices ?? null;
  const whyChooseUs = apiData?.ChooseUs ?? null;
  const proctoringTool = apiData?.ProctoringTool ?? null;
  const whatWeResolve = apiData?.WhatWeResolve ?? null;
  const whyWereBetter = apiData?.WhyWeAreBetter ?? null;
  const testimonials = apiData?.Insight ?? null;
  const linkedInFeed = apiData?.PartnerPost ?? null;
  const partners = apiData?.Partner ?? null;
  const clients = apiData?.EsteemedClient ?? null;
  const achievementCounter = apiData?.AchievementCounter ?? null;

  if (isLoading) {
    return (
      <HomePageLoading />
    );
  }

  return (
    <div>
      {heroBanner &&
        <HeroSection data={heroBanner} />
      }
      {homePageIcons &&
        <TrustBadges data={homePageIcons} />
      }
      {whoWeDo &&
        <WhoWeDo data={whoWeDo}  />
      }
      {professionalServices &&
        <ProfessionalServices
          data={professionalServices}
          title={titles?.professional_service_title}
        />
      }
      {whyChooseUs &&
        <WhyChooseUs
          data={whyChooseUs}
          title={titles?.choose_us_title}
        />
      }
      {proctoringTool &&
        <ProctoringTools
          data={proctoringTool}
          title={titles?.proctoring_tool_title}
        />
      }
      {whatWeResolve &&
        <WhatWeResolve
          data={whatWeResolve}
          title={titles?.what_we_resolve_title}
        />
      }
      {whyWereBetter &&
        <WhyWereBetter data={whyWereBetter} achievementCounter={achievementCounter}/>
      }
      {testimonials &&
        <Testimonials
          data={testimonials}
          title={titles?.insight_title}
        />
      }
      {linkedInFeed &&
        <LinkedInFeed data={linkedInFeed} partners={partners} />
      }
      {clients &&
        <OurClients
          data={clients}
          title={titles?.client_title}
        />
      }
    </div>
  )
}