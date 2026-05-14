// src/front/AboutUs.jsx
import { useLayoutEffect, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Testimonials from "../components/Home/Testimonials";
import { useGetAboutUsQuery } from "../api/TagIndiaAPI";

// Register ScrollTrigger (only once)
gsap.registerPlugin(ScrollTrigger);

// Helper to render HTML safely
const RichText = ({ html, className = "" }) => {
  if (!html) return null;
  return <div className={className} dangerouslySetInnerHTML={{ __html: html }} />;
};

// Loading Skeleton
const LoadingSkeleton = () => (
  <div className="animate-pulse">
    <div className="bg-gray-200 h-96 w-full rounded-2xl mb-8"></div>
    <div className="max-w-6xl mx-auto px-4 space-y-6">
      <div className="h-8 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-full"></div>
      <div className="h-4 bg-gray-200 rounded w-5/6"></div>
    </div>
  </div>
);

export const AboutUs = () => {
  const { data: apiData, isLoading, error } = useGetAboutUsQuery();
  
  // Refs for sections
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const numbersRef = useRef(null);
  const founderRef = useRef(null);
  const valuesRef = useRef(null);
  const partnersRef = useRef(null);
  const tigerRef = useRef(null);
  
  const sectionRefs = [heroRef, missionRef, numbersRef, founderRef, valuesRef, partnersRef, tigerRef];

  // Animation + cleanup
  useLayoutEffect(() => {
    if (isLoading || error) return;

    // Small delay to ensure all conditional content has rendered
    const timer = setTimeout(() => {
      // Create a GSAP context for automatic cleanup
      const ctx = gsap.context(() => {
        sectionRefs.forEach(ref => {
          if (ref.current) {
            const elements = ref.current.querySelectorAll('.ai');
            if (elements.length) {
              gsap.fromTo(elements,
                { opacity: 0, y: 28 },
                { 
                  opacity: 1, 
                  y: 0, 
                  stagger: 0.08, 
                  duration: 0.65, 
                  ease: "power3.out",
                  overwrite: true 
                }
              );
            }
          }
        });
      });

      // Return cleanup function
      return () => {
        ctx.revert(); // Reverts all GSAP animations inside this context
        ScrollTrigger.getAll().forEach(trigger => trigger.kill()); // Kill any lingering ScrollTriggers
      };
    }, 100);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [isLoading, error, apiData, sectionRefs]);

  // Extra safety: kill ScrollTriggers on full unmount
  useEffect(() => {
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  if (isLoading) return <LoadingSkeleton />;
  if (error) {
    console.error("Failed to load about us data:", error);
    return (
      <div className="text-center py-20 text-red-600">
        Failed to load content. Please try again later.
      </div>
    );
  }

  const data = apiData?.data;
  if (!data) return null;

  // Destructure API data with fallbacks
  const { hero, mission, numbers, founder, values, partners, tiger } = data;

  const heroHeading = hero?.heading || "Empowering Digital Innovation";
  const heroSubHeading = hero?.sub_heading || "& Skill Development";
  const heroDescription = hero?.description || "";
  const heroImage = hero?.image_url || "";

  const missionHeading = mission?.heading || "Empowering Digital Innovation";
  const missionSubHeading = mission?.sub_heading || "& Skill Development";
  const missionDescription = mission?.description || "";

  const goalCard = {
    icon: mission?.goal_icon_url,
    title: mission?.goal_title || "Your Success is Our Goal",
    desc: mission?.goal_desc || "",
  };
  const missionCard = {
    icon: mission?.mission_card_icon_url,
    title: mission?.mission_card_title || "Our Mission",
    desc: mission?.mission_card_desc || "",
  };
  const visionCard = {
    icon: mission?.vision_icon_url,
    title: mission?.vision_title || "Our Vision",
    desc: mission?.vision_desc || "",
  };
  const missionCards = [goalCard, missionCard, visionCard];

  const numbersTitle = numbers?.title || "Our Numbers Speak for Themselves";
  const numbersImage = numbers?.image_url || "";
  const statsList = numbers?.stats || [];

  const founderName = founder?.name || "Dr. Srikrishna Sharma";
  const founderYear = founder?.year || "( 1962-2021 )";
  const founderDesc = founder?.description || "";
  const founderImage = founder?.image_url || "";

  const valuesList = values?.items || [];

  const tigerTitle = tiger?.title || "The Formidable Tiger";
  const tigerDesc = tiger?.description || "";
  const tigerImage = tiger?.image_url || "";

  const schemes = partners?.schemes?.items || [];
  const stateSkillMissions = partners?.state_skill_missions?.items || [];
  const sectorSkillCouncils = partners?.sector_skill_councils?.items || [];

  const hasPartners = schemes.length > 0 || stateSkillMissions.length > 0 || sectorSkillCouncils.length > 0;

  return (
    <>
      {/* HERO SECTION */}
      <section className="bg-white pt-14 pb-0" ref={heroRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 mb-10">
            <div className="lg:w-2/5 ai">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
                {heroHeading}
                <span className="block text-[#6A1B9A]">{heroSubHeading}</span>
              </h2>
            </div>
            <div className="lg:w-3/5 ai">
              <RichText html={heroDescription} className="text-gray-500 text-sm leading-relaxed" />
            </div>
          </div>
          {heroImage && (
            <div className="w-full overflow-hidden ai rounded-2xl" style={{ maxHeight: "360px" }}>
              <img src={heroImage} alt={heroHeading} className="w-full h-full object-cover" style={{ maxHeight: "360px" }} />
            </div>
          )}
        </div>
      </section>

      {/* MISSION SECTION */}
      <section className="bg-white py-14" ref={missionRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-2/5 ai">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5">
                {missionHeading}
                <span className="block text-[#6A1B9A]">{missionSubHeading}</span>
              </h2>
              <RichText html={missionDescription} className="text-gray-500 text-sm leading-relaxed" />
            </div>
            <div className="lg:w-3/5 flex flex-col gap-8">
              {missionCards.map((card, idx) => (
                <div key={idx} className="flex items-start gap-5 ai">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12">
                    {card.icon ? (
                      <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                    ) : (
                      <div className="w-10 h-10 bg-purple-100 rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">{card.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NUMBERS SECTION - only if stats exist */}
      {statsList.length > 0 && (
        <section className="bg-white pt-0 pb-14" ref={numbersRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative w-full overflow-hidden rounded-2xl ai">
              {numbersImage && (
                <img src={numbersImage} alt="Stats background" className="w-full object-cover block" style={{ maxHeight: 380 }} />
              )}
              <div className="flex flex-col sm:flex-row" style={{ background: "rgba(106,27,154,0.95)" }}>
                <div className="px-8 py-6 flex-1">
                  <p className="text-white font-bold text-xl leading-snug">{numbersTitle}</p>
                </div>
                {statsList.map((stat, i) => (
                  <div key={i} className="flex flex-col items-center justify-center px-8 py-6 flex-1" style={{ borderLeft: "1px solid rgba(255,255,255,0.25)" }}>
                    <span className="text-white font-extrabold text-3xl">{stat.value}</span>
                    <span className="text-xs mt-1" style={{ color: "#d8b4fe" }}>{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* FOUNDER SECTION */}
      <section className="bg-white py-16" ref={founderRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="lg:w-3/5 ai">
              <RichText html={founderDesc} className="text-gray-500 text-sm leading-relaxed" />
              {founderDesc && !founderDesc.includes("About Our Founder") && (
                <p className="text-gray-500 text-sm leading-relaxed mt-3">
                  <a href="#" className="font-semibold underline text-[#6A1B9A]">Read More...</a>
                </p>
              )}
            </div>
            <div className="lg:w-2/5 ai flex justify-center lg:justify-end">
              <div className="relative" style={{ width: 280 }}>
                <div className="absolute pointer-events-none" style={{ width: 180, bottom: -20, right: -30, zIndex: 0, opacity: 0.85 }}>
                  <svg width="180" height="180" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 0 L100 100 M0 100 L100 0" stroke="#6A1B9A" strokeWidth="8" opacity="0.3" />
                  </svg>
                </div>
                <div className="relative z-10 rounded-xl overflow-hidden shadow-lg">
                  {founderImage ? (
                    <img src={founderImage} alt={founderName} className="w-full object-cover block" style={{ height: 300 }} />
                  ) : (
                    <div className="w-full h-72 bg-gray-200"></div>
                  )}
                  <div className="px-4 py-3 text-center" style={{ background: "rgba(106,27,154,0.92)" }}>
                    <p className="text-white font-bold text-sm">{founderName}</p>
                    <p className="text-xs" style={{ color: "#d8b4fe" }}>{founderYear}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* VALUES SECTION */}
      {valuesList.length > 0 && (
        <section className="py-14 border-t border-gray-100" style={{ background: "#f4f4fb" }} ref={valuesRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-10 ai">Our Values</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
              {valuesList.map((value, i) => (
                <div key={i} className="ai">
                  <div className="w-full h-[3px] mb-4 rounded-full" style={{ background: "linear-gradient(to right, #6A1B9A, #60a5fa)" }} />
                  <h4 className="text-sm font-bold text-gray-900 mb-1">{value.title}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* PARTNERS SECTION - only if any partners exist */}
      {hasPartners && (
        <section className="py-14 bg-white" ref={partnersRef}>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-extrabold text-gray-900 mb-10 text-center ai">Our Partners</h2>
            
            {schemes.length > 0 && (
              <div className="mb-10 ai">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">Schemes</h3>
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  {schemes.map((partner, idx) => (
                    <div key={`scheme-${idx}`} className="w-32 h-20 flex items-center justify-center p-2 bg-gray-50 rounded-lg shadow-sm">
                      {partner.icon_url ? (
                        <img src={partner.icon_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs text-gray-500">{partner.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {stateSkillMissions.length > 0 && (
              <div className="mb-10 ai">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">State Skill Missions</h3>
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  {stateSkillMissions.map((partner, idx) => (
                    <div key={`ssm-${idx}`} className="w-32 h-20 flex items-center justify-center p-2 bg-gray-50 rounded-lg shadow-sm">
                      {partner.icon_url ? (
                        <img src={partner.icon_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs text-gray-500">{partner.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {sectorSkillCouncils.length > 0 && (
              <div className="ai">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 border-l-4 border-purple-600 pl-3">Sector Skill Councils</h3>
                <div className="flex flex-wrap gap-6 justify-center items-center">
                  {sectorSkillCouncils.map((partner, idx) => (
                    <div key={`ssc-${idx}`} className="w-32 h-20 flex items-center justify-center p-2 bg-gray-50 rounded-lg shadow-sm">
                      {partner.icon_url ? (
                        <img src={partner.icon_url} alt={partner.name} className="max-w-full max-h-full object-contain" />
                      ) : (
                        <span className="text-xs text-gray-500">{partner.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* TIGER SECTION */}
      <section className="py-14 px-4" ref={tigerRef}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center gap-8 rounded-2xl px-8 py-10 ai" style={{ background: "#ede8f8" }}>
            {tigerImage && (
              <div className="flex-shrink-0" style={{ width: 180, height: 180 }}>
                <img src={tigerImage} alt="TAG Tiger Mascot" className="w-full h-full object-contain" />
              </div>
            )}
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">{tigerTitle}</h3>
              <RichText html={tigerDesc} className="text-gray-500 text-sm leading-relaxed" />
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <Testimonials />
    </>
  );
};