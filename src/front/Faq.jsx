// src/front/Faq.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MdKeyboardArrowDown } from 'react-icons/md';
import contactBg from '../assets/img/contact-us.jpg';

// ══════════════════════════════════════════
// TABBED FAQ DATA
// ══════════════════════════════════════════
const faqData = {
  "Skill FAQs": [
    {
      q: 'What is "SKILL INDIA MISSION"?',
      a: "Skill India Mission is a government initiative launched in 2015 to train over 400 million people in India in different skills by 2022.",
    },
    {
      q: "What is PMKVY?",
      a: "Pradhan Mantri Kaushal Vikas Yojana (PMKVY) is the flagship scheme of the Ministry of Skill Development & Entrepreneurship (MSDE).",
    },
    {
      q: "What is NSDC?",
      a: "National Skill Development Corporation (NSDC) is a one-of-its-kind, Public Private Partnership in India.",
    },
    {
      q: 'What is a "Sector Skill Council (SSC)"?',
      a: "Sector Skill Councils (SSCs) are autonomous industry-led bodies set up by NSDC to create occupational standards and qualification bodies.",
    },
    {
      q: "Apart from PMKVY, what other skill development schemes exist?",
      a: "Apart from PMKVY, there are several other schemes like Jan Shikshan Sansthan (JSS), NAPS, SANKALP, etc.",
    },
  ],
  "TOA FAQs": [
    {
      q: "What is TOA (Training of Assessors)?",
      a: "TOA is a program designed to train assessors who will evaluate candidates for various skill certifications.",
    },
    {
      q: "Who can become an assessor?",
      a: "Any subject matter expert with relevant industry experience and educational qualifications can apply after completing the TOA program.",
    },
  ],
  "Impact Assessment": [
    {
      q: "What is Impact Assessment?",
      a: "Impact Assessment is a systematic evaluation of the changes brought about by a project or program, measuring outcomes on the target population.",
    },
    {
      q: "How is impact measured?",
      a: "Impact is measured through pre and post assessments, surveys, interviews, and data analysis comparing baseline metrics with post-intervention outcomes.",
    },
  ],
  "CSR": [
    {
      q: "What is CSR?",
      a: "Corporate Social Responsibility (CSR) is a business model that helps a company be socially accountable to itself, its stakeholders, and the public.",
    },
    {
      q: "Is CSR mandatory in India?",
      a: "Yes, as per Section 135 of the Companies Act 2013, companies meeting certain criteria must spend 2% of average net profits on CSR activities.",
    },
  ],
  "ESG": [
    {
      q: "What does ESG stand for?",
      a: "ESG stands for Environmental, Social, and Governance — three central factors in measuring sustainability and societal impact of a company.",
    },
    {
      q: "Why is ESG important?",
      a: "ESG criteria help investors evaluate companies beyond financial metrics, ensuring environmental impact and governance practices are considered.",
    },
  ],
  "Software Development": [
    {
      q: "What software development services do you offer?",
      a: "We offer end-to-end software development including web apps, mobile apps, enterprise solutions, API development, and custom software.",
    },
    {
      q: "What technologies do you use?",
      a: "We work with React, Node.js, Python, Flutter, Laravel, and cloud platforms like AWS and Google Cloud.",
    },
  ],
};

const tabs = Object.keys(faqData);

// ══════════════════════════════════════════
// FAQ PAGE
// ══════════════════════════════════════════
export const Faq = () => {

  // ── BreadcrumbHero refs ──
  const sectionRef = useRef(null);
  const textRef    = useRef(null);

  // ── Tabbed FAQ state ──
  const [activeTab,     setActiveTab]     = useState(tabs[0]);
  const [tabbedOpen,    setTabbedOpen]    = useState(null);


  // ── GSAP hero animation ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .from(textRef.current.children, {
          opacity: 0, y: 30, stagger: 0.15, duration: 0.7,
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setTabbedOpen(null);
  };

  return (
    <>
      {/* ══ BREADCRUMB HERO ══════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 lg:py-24"
        style={{
          backgroundImage:    `url(${contactBg})`,
          backgroundSize:     'cover',
          backgroundPosition: 'center',
          backgroundRepeat:   'no-repeat',
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.45)' }}
        />

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={textRef} className="w-full space-y-4">
            <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
              Common Questions
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight capitalize">
              Frequently Asked Questions
            </h1>
          </div>
        </div>
      </section>

      {/* ══ TABBED FAQ ═══════════════════════════════ */}
      <section className="w-full py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">

          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => handleTabChange(tab)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeTab === tab ? '#6A1B9A' : 'transparent',
                  color:      activeTab === tab ? '#fff'    : '#555',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {faqData[activeTab].map((item, i) => (
              <div
                key={i}
                className="rounded-2xl bg-white overflow-hidden"
                style={{ border: '1px solid #ebebeb' }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setTabbedOpen(tabbedOpen === i ? null : i)}
                >
                  <span className="text-gray-800 font-medium text-sm sm:text-[15px] pr-4">
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: tabbedOpen === i ? '#6A1B9A' : '#f5f5f5',
                      color:      tabbedOpen === i ? '#fff'    : '#555',
                      transform:  tabbedOpen === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <MdKeyboardArrowDown size={20} />
                  </span>
                </button>
                <div style={{
                  maxHeight:  tabbedOpen === i ? '300px' : '0',
                  overflow:   'hidden',
                  transition: 'max-height 0.35s ease',
                }}>
                  <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
                    {item.a}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    
    </>
  );
};