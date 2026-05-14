// src/front/ImpactAssessment.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

import heroImg from "../assets/img/heroImg.jpg";
import meetingImg from "../assets/img/meetingImg.png"; // meeting photo
import iconEnv from "../assets/img/iconEnv.png";
import iconEdu from "../assets/img/iconEdu.png";
import iconSkill from "../assets/img/iconSkill.png";
import iconBulb from "../assets/img/iconBulb.png";
import dataInsightsImg from "../assets/img/dataInsightsImg.png";
import perfTrackImg from "../assets/img/perfTrackImg.png";
import customReportImg from "../assets/img/customReportImg.png";
import gapAnalysisImg from "../assets/img/gapAnalysisImg.png";
import OurPartners from "../components/Services/OurPartners";
import IndustriesSection from "../components/Services/IndustriesSection";
import FAQSection from "../components/Services/FAQSection";
import BookDemo from "../components/Services/BookDemo";
import { IMG_BASE_URL_PUBLIC } from "../helper/utils";
import { Link } from "react-router-dom";
import HTMLContent from "../components/HTMLContent";
// ── What We Solve ──
const solves = [
  { icon: iconBulb, text: "Ensure secure and fair assessments with proctoring." },
  { icon: iconBulb, text: "Generate results and certificates faster." },
  { icon: iconBulb, text: "Automate exams and evaluations to save time." },
  { icon: iconBulb, text: "Conduct exams in both online and offline modes." },
  { icon: iconBulb, text: "Seamlessly integrate with existing systems for smooth data flow." },
  { icon: iconBulb, text: "Manage all assessments easily in one unified system." },
];

// ── Check icon ──
const Check = ({ color = "#6A1B9A" }) => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const ImpactAssessment = ({ data }) => {
  const s1 = useRef(null);
  const s2 = useRef(null);
  console.log("layout2", data)
  const stats = data?.impact
  const expertise = data?.area_of_expertise
  const whyCards = data?.why_choose_us
  const what_we_solve = data?.what_we_solve
  useEffect(() => {
    [s1, s2].forEach(ref => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".ai"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: "power3.out" }
      );
    });
  }, []);

  const industries = {
    heading: data?.heading3,
    subHeading: data?.sub_heading3,
    items: data?.we_serve,
  };
  const faq = {
    heading: data?.heading7,
    subHeading: data?.sub_heading7,
    email: data?.faq?.[0]?.faq_mail,
    items: data?.faq,
  };

  const bookDemo = {
    heading: data?.heading8,
    title: data?.personalized_demo?.[0]?.personalized_demo_title,
    description: data?.personalized_demo?.[0]?.personalized_demo_description,
  };

  return (
    <>
      {/* ══ 1. HERO ══ */}
      <section className="bg-white pt-14 pb-10" ref={s1}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left */}
            <div className="lg:w-2/5">
              <h1 className="ai text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                {data?.heading1}
              </h1>
              <p className="ai text-gray-500 text-sm leading-relaxed mb-6">
                {data?.sub_heading1}
              </p>
            </div>

            {/* Right — Contact button */}
            <div className="lg:w-3/5 flex justify-end ai">
              <Link to={'/contact'}
                className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full text-xs font-bold text-gray-700 transition-all hover:shadow-lg"
                style={{ border: "2px solid #e0e0e0" }}>
                <span>CONTACT</span>
                <span>US</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </Link>
            </div>
          </div>

          {/* Full width hero image */}
          <div className="mt-8 w-full overflow-hidden rounded-2xl ai">
            <img src={IMG_BASE_URL_PUBLIC() + "" + data?.header_image} alt="Impact Assessment" className="w-full object-cover block" style={{ maxHeight: 320 }} />
          </div>
        </div>
      </section>

      {/* ══ 2. STATS BAR ══ */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`${i < 4 ? "border-r border-gray-100" : ""} pr-4`}>
                <p className="text-2xl font-extrabold text-gray-900 mb-1">{s.impact_count}</p>
                <p className="text-xs font-semibold text-gray-700 mb-1">{s.impact_title}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.impact_description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. AREAS OF EXPERTISE ══ */}
      <section className="bg-white py-14 border-t border-gray-100" ref={s2}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 ai">{data?.heading2}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {expertise.map((ex, i) => (
              <div key={i}
                className="flex items-start gap-4 rounded-2xl p-5 ai"
                style={{ border: "1px solid #e8e8f0", background: "#fff" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f3e8ff" }}>
                  <img src={IMG_BASE_URL_PUBLIC() + ex?.expertise_icon} alt={ex.expertise_title} className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{ex.expertise_title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{ex.expertise_description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 4. WHY CHOOSE US ══ */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
            {data?.heading3}
          </h2>

          <div className="flex flex-col gap-6">
            {whyCards?.map((card, i) => (
              <div key={i}
                className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-6"
                style={{ border: "1px solid #e8e8f0", background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

                {/* Left — text */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{card?.why_choose_us_title}</h3>
                  <HTMLContent data={card?.why_choose_us_description} />
                </div>

                {/* Right — infographic image */}
                <div className="flex-shrink-0 w-full sm:w-64 rounded-xl overflow-hidden"
                  style={{ border: "1px solid #f0f0f0" }}>
                  <img src={IMG_BASE_URL_PUBLIC() + card?.why_choose_us_image} alt={card?.why_choose_us_title} className="w-full object-contain" style={{ maxHeight: 160 }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 5. WHAT WE SOLVE ══ */}
      <section className="py-14" style={{ background: "#f4f4fb" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left — meeting image */}
            <div className="lg:w-2/5 flex-shrink-0">
              <img src={IMG_BASE_URL_PUBLIC() + data?.what_we_solve_image} alt="Team Meeting"
                className="w-full object-cover rounded-2xl"
                style={{ maxHeight: 320 }} />
            </div>

            {/* Right — content */}
            <div className="lg:w-3/5">
              {/* Purple bg heading block */}
              <div
                className="relative rounded-2xl px-8 py-8 mb-6 overflow-hidden"
                style={{
                  // backgroundImage: `url(${purpleBg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  backgroundColor: "#5c0f8b",
                }}
              >
                <h2 className="text-2xl font-extrabold text-white relative z-10">{data?.heading4}</h2>
                <p className="text-purple-200 text-sm mt-1 relative z-10">
                  {data?.sub_heading4}
                </p>
              </div>

              {/* Solve cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {what_we_solve?.map((s, i) => (
                  <div key={i}
                    className="flex items-center gap-3 rounded-xl p-4 bg-white"
                    style={{ border: "1px solid #e8e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <div className="w-8 h-8 flex-shrink-0">
                      <img src={IMG_BASE_URL_PUBLIC() + s?.what_we_solve_icon} alt="" className="w-full h-full object-contain" />
                    </div>
                    <HTMLContent data={s?.what_we_solve_description} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <OurPartners data={data?.our_partner} />

      {industries?.items?.length && <IndustriesSection data={industries} />}
      {faq?.items?.length && <FAQSection data={faq} />}
      {bookDemo?.heading && <BookDemo data={bookDemo} />}
    </>
  );
};