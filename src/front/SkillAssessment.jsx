// src/front/SkillAssessment.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// ── Asset imports ──
import softSkillsImg from "../assets/img/soft-skillsimg.png";
import offlineImg from "../assets/img/offline-img.png";
import verificationImg from "../assets/img/verification-img.png";
import batchImg from "../assets/img/batch-img.png";
import langImg from "../assets/img/lang-img.png";
import iconGrowth from "../assets/img/icon-growth.png";
import iconDoc from "../assets/img/icon-doc.png";
import iconBalance from "../assets/img/icon-balance.png";
import iconLeaf from "../assets/img/icon-leaf.png";
import iconChart from "../assets/img/icon-chart.png";
import iconBar from "../assets/img/icon-bar.png";
import iconTeam from "../assets/img/icon-team.png";
import iconGroup from "../assets/img/icon-group.png";
import iconFolder from "../assets/img/icon-folder.png";
import Testimonials from "../components/Home/Testimonials";
import BookDemo from "../components/Services/BookDemo";
import FAQSection from "../components/Services/FAQSection";
import OurPartners from "../components/Services/OurPartners";

// ── Why Choose Us cards ──
const whyCards = [
  {
    title: "Online & Offline Exam System",
    desc: "Conduct assessments seamlessly with internet or offline mode support.",
    points: ["Real-time online exams", "Offline sync capability"],
    img: offlineImg,
    imgAlt: "Online Offline Mode",
  },
  {
    title: "AI-Based Proctoring",
    desc: "Ensure exam integrity with advanced monitoring technology.",
    points: ["Camera & screen monitoring", "Anti-cheat detection system"],
    img: verificationImg,
    imgAlt: "AI Proctoring",
  },
  {
    title: "Batch Management System",
    desc: "Efficiently manage trainees, assessors, and schedules.",
    points: ["Bulk trainee enrollment", "Real-time batch tracking"],
    img: batchImg,
    imgAlt: "Batch Management",
  },
  {
    title: "Multi-Language Support",
    desc: "Accessible for diverse users across India.",
    points: ["English, Hindi & Indian regional languages support", "User-friendly interface"],
    img: langImg,
    imgAlt: "Multi Language",
  },
];

// ── Stats ──
const stats = [
  { icon: iconGroup, value: "1.9 M+", label: "Candidates Assessed" },
  { icon: iconTeam, value: "600+", label: "Skills Certified" },
  { icon: iconGroup, value: "600+", label: "Clients Served" },
  { icon: iconFolder, value: "625+", label: "Subject Matter Experts" },
];

// ── What We Solve cards ──
const solvesCards = [
  { icon: iconBar, text: "Ensure secure and fair assessments with proctoring." },
  { icon: iconGrowth, text: "Generate results and certificates faster." },
  { icon: iconLeaf, text: "Automate exams and evaluations to save time." },
  { icon: iconBalance, text: "Conduct exams in both online and offline modes." },
  { icon: iconGrowth, text: "Generate results and certificates faster." },
  { icon: iconDoc, text: "Manage all assessments easily in one unified system." },
];

// ── Check icon ──
const CheckIcon = ({ color = "#6A1B9A" }) => (
  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke={color} strokeWidth="2.5" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
);

export const SkillAssessment = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);

  useEffect(() => {
    [heroRef, statsRef].forEach(ref => {
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
      <section className="bg-white pt-14 pb-10" ref={heroRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-10 items-center">

            {/* Left */}
            <div className="lg:w-1/2">
              <h1 className="ai text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                Advanced Skill Assessment Platform for Scalable Workforce Evaluation
              </h1>
              <p className="ai text-gray-500 text-sm leading-relaxed mb-6">
                Streamline skill assessment, certification, and performance tracking with our AI-powered
                digital platform designed for India's skill ecosystem.
              </p>
              <div className="ai flex flex-wrap gap-3">
                <a href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-semibold"
                  style={{ background: "#6A1B9A" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  Contact Us Today
                </a>
                <a href="#"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
                  style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}>
                  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22 6 12 13 2 6" />
                  </svg>
                  Get expert consultation
                </a>
              </div>
            </div>

            {/* Right — illustration */}
            <div className="lg:w-1/2 flex justify-center ai">
              <img src={softSkillsImg} alt="Skill Assessment Platform" className="w-full max-w-md object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. WHY CHOOSE US ══ */}
      <section className="bg-white py-14 border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
            Why Choose Us For Skill Assessment
          </h2>

          <div className="flex flex-col gap-6">
            {whyCards.map((card, i) => (
              <div
                key={i}
                className="flex flex-col sm:flex-row items-center gap-6 rounded-2xl p-6 bg-white"
                style={{ border: "1px solid #e8e8f0", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}
              >
                {/* Left text */}
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <div className="flex flex-col gap-2">
                    {card.points.map((pt, j) => (
                      <div key={j} className="flex items-center gap-2">
                        <CheckIcon />
                        <span className="text-sm text-gray-600">{pt}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right image */}
                <div className="flex-shrink-0 w-full sm:w-56">
                  <img
                    src={card.img}
                    alt={card.imgAlt}
                    className="w-full object-contain rounded-xl"
                    style={{ maxHeight: 180 }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ 3. PERFORMANCE METRICS ══ */}
      <section className="bg-white py-14 border-t border-gray-100" ref={statsRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-center">

            {/* Left — heading */}
            <div className="lg:w-2/5 ai">
              <h2 className="text-3xl font-extrabold text-gray-900 leading-tight mb-4">
                Performance metrics that speak for us
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                Every number here reflects our journey helping tech companies grow smarter and faster.
              </p>
            </div>

            {/* Right — stats grid */}
            <div className="lg:w-3/5 grid grid-cols-2 gap-5">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex items-start gap-4 rounded-2xl p-5 ai"
                  style={{ border: "1px solid #e8e8f0", background: "#fafafa" }}
                >
                  <div className="flex-shrink-0 w-10 h-10">
                    <img src={stat.icon} alt={stat.label} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 4. WHAT WE SOLVE ══ */}
      <section className="py-14" style={{ background: "#f4f4fb" }}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — heading */}
            <div className="lg:w-1/3">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-3">What We Solve</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                We identify and address key business challenges that hinder growth, efficiency, and
                compliance — helping you build a stronger, more sustainable organization.
              </p>
            </div>

            {/* Right — 2-col cards */}
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {solvesCards.map((s, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl p-4 bg-white"
                  style={{ border: "1px solid #e8e8f0", boxShadow: "0 1px 8px rgba(0,0,0,0.04)" }}
                >
                  <div className="w-9 h-9 flex-shrink-0">
                    <img src={s.icon} alt="" className="w-full h-full object-contain" />
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      <OurPartners />
      <Testimonials />
      <FAQSection />
      <BookDemo />
    </>
  );
};