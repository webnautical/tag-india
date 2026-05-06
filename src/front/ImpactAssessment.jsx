// src/front/ImpactAssessment.jsx
import { useRef, useEffect } from "react";
import { gsap } from "gsap";

// ── Assets ──
import heroImg from "../assets/img/heroImg.jpg";
import impactBg from "../assets/img/impactBg.png";
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

// ── Stats ──
const stats = [
  { value: "400+", label: "Unique NGOs impacted", desc: "Empowering businesses through digital transformation and modern technology solutions." },
  { value: "38,000", label: "Direct Beneficiaries", desc: "From websites to enterprise platforms, we've built powerful digital solutions across industries." },
  { value: "7 Million", label: "Indirect Beneficiaries", desc: "Client satisfaction is at the core of what we do — building trust through performance." },
  { value: "1650+", label: "Volunteers Involved", desc: "Client satisfaction is at the core of what we do — building trust through performance." },
  { value: "1650+", label: "Volunteers Involved", desc: "Client satisfaction is at the core of what we do — building trust through performance." },
];

// ── Expertise areas ──
const expertise = [
  { icon: iconEnv, title: "Environment", text: "Promoting sustainable practices for a healthier future." },
  { icon: iconEdu, title: "Education", text: "Empowering minds through accessible and quality learning." },
  { icon: iconSkill, title: "Skill Development", text: "Building skills that create sustainable livelihoods." },
];

// ── Why Choose us cards ──
const whyCards = [
  {
    title: "Data-Driven Insights",
    desc: "Conduct assessments seamlessly with internet or offline mode support.",
    points: ["Real-time data collection and analysis", "Accurate insights for better decision-making"],
    img: dataInsightsImg,
  },
  {
    title: "Performance Tracking",
    desc: "Monitor trainee and program performance with clear dashboards.",
    points: ["Track progress easily", "Detailed performance reports"],
    img: perfTrackImg,
  },
  {
    title: "Custom Reports",
    desc: "Generate quick and customized reports for analysis.",
    points: ["Export in PDF/Excel", "Easy report customization"],
    img: customReportImg,
  },
  {
    title: "Gap Analysis",
    desc: "Identify weak areas and improve performance effectively.",
    points: ["Detect skill gaps", "Improve weak performance"],
    img: gapAnalysisImg,
  },
];

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

export const ImpactAssessment = () => {
  const s1 = useRef(null);
  const s2 = useRef(null);

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

  return (
    <>
      {/* ══ 1. HERO ══ */}
      <section className="bg-white pt-14 pb-10" ref={s1}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-start">

            {/* Left */}
            <div className="lg:w-2/5">
              <h1 className="ai text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-3">
                Impact Assessment &amp;<br />Performance Evaluation
              </h1>
              <p className="ai text-gray-500 text-sm leading-relaxed mb-6">
                Measure outcomes, track progress, and drive meaningful impact with data-driven assessment solutions.
              </p>
            </div>

            {/* Right — Contact button */}
            <div className="lg:w-3/5 flex justify-end ai">
              <a href="#"
                className="inline-flex flex-col items-center justify-center w-20 h-20 rounded-full text-xs font-bold text-gray-700 transition-all hover:shadow-lg"
                style={{ border: "2px solid #e0e0e0" }}>
                <span>CONTACT</span>
                <span>US</span>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" className="mt-1">
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </a>
            </div>
          </div>

          {/* Full width hero image */}
          <div className="mt-8 w-full overflow-hidden rounded-2xl ai">
            <img src={heroImg} alt="Impact Assessment" className="w-full object-cover block" style={{ maxHeight: 320 }} />
          </div>
        </div>
      </section>

      {/* ══ 2. STATS BAR ══ */}
      <section className="bg-white py-10 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((s, i) => (
              <div key={i} className={`${i < 4 ? "border-r border-gray-100" : ""} pr-4`}>
                <p className="text-2xl font-extrabold text-gray-900 mb-1">{s.value}</p>
                <p className="text-xs font-semibold text-gray-700 mb-1">{s.label}</p>
                <p className="text-xs text-gray-400 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. AREAS OF EXPERTISE ══ */}
      <section className="bg-white py-14 border-t border-gray-100" ref={s2}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-8 ai">Areas of expertise</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {expertise.map((ex, i) => (
              <div key={i}
                className="flex items-start gap-4 rounded-2xl p-5 ai"
                style={{ border: "1px solid #e8e8f0", background: "#fff" }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "#f3e8ff" }}>
                  <img src={ex.icon} alt={ex.title} className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{ex.title}</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">{ex.text}</p>
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
            Why Choose Us For Impact Assessment
          </h2>

          <div className="flex flex-col gap-6">
            {whyCards.map((card, i) => (
              <div key={i}
                className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-6"
                style={{ border: "1px solid #e8e8f0", background: "#fff", boxShadow: "0 2px 16px rgba(0,0,0,0.04)" }}>

                {/* Left — text */}
                <div className="flex-1">
                  <h3 className="text-base font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-3">{card.desc}</p>
                  <div className="flex flex-col gap-2">
                    {card.points.map((pt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <Check />
                        <span className="text-sm text-gray-600">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right — infographic image */}
                <div className="flex-shrink-0 w-full sm:w-64 rounded-xl overflow-hidden"
                  style={{ border: "1px solid #f0f0f0" }}>
                  <img src={card.img} alt={card.title} className="w-full object-contain" style={{ maxHeight: 160 }} />
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
              <img src={meetingImg} alt="Team Meeting"
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
                <h2 className="text-2xl font-extrabold text-white relative z-10">What We Solve</h2>
                <p className="text-purple-200 text-sm mt-1 relative z-10">
                  We identify and address key business challenges that hinder growth, efficiency, and compliance—helping you build a stronger, more sustainable organization.
                </p>
              </div>

              {/* Solve cards grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {solves.map((s, i) => (
                  <div key={i}
                    className="flex items-center gap-3 rounded-xl p-4 bg-white"
                    style={{ border: "1px solid #e8e8f0", boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
                    <div className="w-8 h-8 flex-shrink-0">
                      <img src={s.icon} alt="" className="w-full h-full object-contain" />
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">{s.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      <OurPartners />
      <IndustriesSection />
      <FAQSection />
      <BookDemo />


    </>
  );
};