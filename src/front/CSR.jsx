// src/front/CSR.jsx
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// ── Asset imports ──
import esgDiagram from "../assets/img/esg-diagram.png";
import globeMap from "../assets/img/globe-map.gif";
import iconShield from "../assets/img/icon-shield.png";
import iconChecklist from "../assets/img/icon-checklist.png";
import iconPeople from "../assets/img/icon-people.png";
import iconCap from "../assets/img/icon-cap.png";
import iconLayers from "../assets/img/icon-layers.png";
import purpleBg from "../assets/img/purple-bg.png";
import csrHands from "../assets/img/csr-hands.png";
import iconGovernance from "../assets/img/icon-governance.png";
import iconSocial from "../assets/img/icon-social.png";
import FAQSection from "../components/Services/FAQSection";
import BookDemo from "../components/Services/BookDemo";

// ── ESG Cards ──
const esgCards = [
    {
        icon: iconLayers,
        title: "Environmental (E)",
        text: "The environmental aspect (E) of ESG encompasses monitoring and managing a company's impact on vital resources, biodiversity, waste generation, recycling efforts, and energy emissions to promote sustainability and reduce environmental harm.",
    },
    {
        icon: iconSocial,
        title: "Social (S)",
        text: "The social aspect (S) of ESG involves effective employee management, responsible supply chain practices, community engagement and customer relations. These elements address the company's social responsibility and impact on stakeholders.",
    },
    {
        icon: iconGovernance,
        title: "Governance (G)",
        text: "The governance aspect (G) of ESG encompasses factors like board composition, independence, experience, management track record, disclosure practices, shareholder relations, and compliance checks. These elements assess a company's governance structure and its adherence to ethical and legal standards.",
    },
];

// ── Accordion ──
const accordionItems = [
    {
        title: "Impact Assessment of CSR Projects",
        content: "Project Impact Assessment In line with MCA & Companies (CSR Policy) Amendment Rules Requirements",
    },
    {
        title: "CSR Reporting, Disclosure and Communication",
        content: "Comprehensive CSR reporting aligned with global standards and regulatory requirements for transparent communication.",
    },
    {
        title: "Need Assessment and Baseline Study",
        content: "Carry out a Need Assessment Study and identify the Roadmap of your development projects.",
    },
];

// ── 9 Services ──
const services = [
    { num: "1", icon: iconLayers, title: "Impact Assessment of CSR Projects", text: "Project Impact Assessment In line with MCA & Companies (CSR Policy) Amendment Rules Requirements" },
    { num: "2", icon: iconChecklist, title: "Need Assessment Study", text: "Carry out a Need Assessment Study and identify the Roadmap of your development projects." },
    { num: "3", icon: iconShield, title: "CSR Reporting, Disclosure and Communication", text: "Project Impact Assessment In line with MCA & Companies (CSR Policy) Amendment Rules Requirements" },
    { num: "4", icon: iconPeople, title: "CSR Strategy & Policy Development", text: "Use our expertise to develop framework for CSR Strategy & Policy — Align your goals" },
    { num: "5", icon: iconChecklist, title: "Baseline Survey | Assessment Study", text: "Identify the on-ground baseline profile to plan suitable & sustainable social projects." },
    { num: "6", icon: iconPeople, title: "Stakeholder Engagement", text: "Engage your stakeholder through a systematic process & materiality" },
    { num: "7", icon: iconShield, title: "Project Monitoring & Evaluation", text: "Consultivo provides 3rd party monitoring & evaluation of your social projects" },
    { num: "8", icon: iconCap, title: "CSR Capacity Building Programmes", text: "Consultivo Academy offers customised training programs as per your need" },
    { num: "9", icon: iconPeople, title: "Social ROI", text: "SROI enables organisations to consider their impacts of a wide range of societal issues in a quantified financial form." },
];

// ── Locations ──
const locations = ["Pune", "Mumbai", "Andhra Pradesh", "Delhi", "Madhya Pradesh", "Bengaluru", "Telangana", "Uttar Pradesh", "Maharashtra", "Kolkata", "Navi Mumbai"];

// ── Partner data ──
const partnerData = {
    "Sector Skill Councils": [
        { name: "Partner 1", logo: null },
        { name: "Partner 2", logo: null },
        { name: "ESSCI", logo: null },
        { name: "FICSI", logo: null },
        { name: "Partner 5", logo: null },
        { name: "Partner 6", logo: null },
    ],
    "State Skill Missions": [
        { name: "ASDM", logo: null },
        { name: "Partner 2", logo: null },
        { name: "Partner 3", logo: null },
        { name: "Partner 4", logo: null },
    ],
    "Schemes": [
        { name: "PMKUVA", logo: null },
        { name: "PMKVY", logo: null },
        { name: "ESDM", logo: null },
        { name: "DDU-GKY", logo: null },
    ],
};
const pTabs = Object.keys(partnerData);

// ══ COMPONENT ══
export const CSR = () => {
    const [openAccordion, setOpenAccordion] = useState(0);
    const [activeTab, setActiveTab] = useState(pTabs[0]);
    const heroRef = useRef(null);

    useEffect(() => {
        if (!heroRef.current) return;
        gsap.fromTo(
            heroRef.current.querySelectorAll(".ai"),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, stagger: 0.14, duration: 0.7, ease: "power3.out" }
        );
    }, []);

    return (
        <>
            {/* ══ 1. HERO — heading + ESG diagram ══ */}
            <section className="bg-white pt-14 pb-10" ref={heroRef}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">

                        {/* Left */}
                        <div className="lg:w-1/2">
                            <h1 className="ai text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                                Create value through transparent and impactful ESG reporting
                            </h1>
                            <p className="ai text-gray-500 text-sm leading-relaxed mb-6">
                                CSR is more than compliance — it's about building a sustainable future while
                                strengthening your brand. Our CSR consulting helps you design, implement, and
                                manage high-impact initiatives.
                            </p>
                            <a
                                href="#"
                                className="ai inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-semibold transition-opacity hover:opacity-90"
                                style={{ background: "#6A1B9A" }}
                            >
                                Start Your CSR Journey
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <polyline points="9 18 15 12 9 6" />
                                </svg>
                            </a>
                        </div>

                        {/* Right — ESG diagram */}
                        <div className="lg:w-1/2 flex justify-center ai">
                            <img src={esgDiagram} alt="ESG Diagram" className="w-full max-w-md object-contain" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. UNDERSTANDING ESG ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Understanding ESG?</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {esgCards.map((card, i) => (
                            <div
                                key={i}
                                className="rounded-2xl p-6 bg-white"
                                style={{ border: "1px solid #e8e8f0", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
                            >
                                <div className="w-10 h-10 mb-4">
                                    <img src={card.icon} alt={card.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-2">{card.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{card.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. FEATURED SOLUTIONS ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-start">

                        {/* Left — image */}
                        <div className="lg:w-2/5">
                            <img
                                src={csrHands}
                                alt="CSR Hands"
                                className="w-full object-cover rounded-2xl"
                                style={{ maxHeight: 320 }}
                            />
                        </div>

                        {/* Right — accordion */}
                        <div className="lg:w-3/5">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Featured solutions</h2>
                            <div className="flex flex-col">
                                {accordionItems.map((item, i) => (
                                    <div key={i} className="border-b border-gray-100">
                                        <button
                                            onClick={() => setOpenAccordion(openAccordion === i ? -1 : i)}
                                            className="w-full flex items-center justify-between py-4 text-left gap-4"
                                        >
                                            <span className="text-sm font-semibold text-gray-800">{item.title}</span>
                                            <svg
                                                viewBox="0 0 24 24" width="16" height="16"
                                                fill="none" stroke="#6A1B9A" strokeWidth="2.5"
                                                style={{
                                                    transform: openAccordion === i ? "rotate(180deg)" : "rotate(0deg)",
                                                    transition: "transform 0.2s",
                                                    flexShrink: 0,
                                                }}
                                            >
                                                <polyline points="6 9 12 15 18 9" />
                                            </svg>
                                        </button>
                                        {openAccordion === i && (
                                            <div className="pb-4 pl-1">
                                                <div className="flex items-start gap-2">
                                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="#6A1B9A" strokeWidth="2"
                                                        style={{ marginTop: 2, flexShrink: 0 }}>
                                                        <circle cx="12" cy="12" r="10" />
                                                        <polyline points="9 12 11 14 15 10" />
                                                    </svg>
                                                    <p className="text-gray-500 text-xs leading-relaxed">{item.content}</p>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 4. OUR ROLE — Purple BG section ══ */}
            <section
                className="relative py-16 overflow-hidden"
                style={{
                    backgroundImage: `url(${purpleBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "right center",
                    backgroundColor: "#5c0f8b",
                }}
            >
                <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-2xl p-8 lg:p-10 max-w-2xl">
                        <h2 className="text-2xl font-extrabold text-gray-900 mb-4">Our Role as ESG Consultants</h2>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            Investors are increasingly aligned to understand a company's long-term value creation plan and receive
                            credible, standardised information.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            They are urging companies to build ESG considerations into their long-term strategy. In brief: they are
                            keen to know how an organisation manages its ESG risks.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-3">
                            As one of the leading ESG consultants, we support investors and organisations with end to end ESG solutions.
                        </p>
                        <p className="text-sm font-medium leading-relaxed mb-3" style={{ color: "#6A1B9A" }}>
                            A strong ESG proposition helps companies to reduce cost and, at the same time, add to their top-line growth.
                        </p>
                        <p className="text-gray-500 text-sm leading-relaxed mb-6">
                            Being thoughtful and transparent about ESG risk enhances the long-term value of companies.
                        </p>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold"
                                style={{ background: "#6A1B9A" }}
                            >
                                <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                </svg>
                                Contact Us Today
                            </a>
                            <a
                                href="#"
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold"
                                style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}
                            >
                                Get expert consultation
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 5. 9 SERVICES ══ */}
            <section className="bg-white py-14">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
                        Get your independent CSR report by Consultivo
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                        {services.map((svc, i) => (
                            <div key={i} className="flex flex-col gap-3">
                                <div className="flex items-center gap-3">
                                    {/* Icon circle */}
                                    <div
                                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                                        style={{ background: "#f3e8ff" }}
                                    >
                                        <img src={svc.icon} alt={svc.title} className="w-6 h-6 object-contain" />
                                    </div>
                                    {/* Large number */}
                                    <span className="font-extrabold text-5xl leading-none select-none" style={{ color: "#ede8f8" }}>
                                        {svc.num}
                                    </span>
                                </div>
                                <h3 className="text-sm font-bold text-gray-900">{svc.title}</h3>
                                <p className="text-gray-400 text-xs leading-relaxed">{svc.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 6. OUR LOCATIONS ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Left — globe image */}
                        <div className="lg:w-2/5 flex justify-center">
                            <img src={globeMap} alt="Our Locations" className="w-full max-w-xs object-contain" />
                        </div>

                        {/* Right — location pills */}
                        <div className="lg:w-3/5">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Our Locations</h2>
                            <div className="flex flex-wrap gap-3">
                                {locations.map((loc, i) => (
                                    <span
                                        key={i}
                                        className="px-4 py-2 rounded-full text-sm font-medium"
                                        style={{ background: "#f3e8ff", color: "#6A1B9A" }}
                                    >
                                        {loc}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* ══ 8. WE'D LIKE TO ASSIST YOU ══ */}
            <section className="py-14 px-4 border-t border-gray-100">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-8">We'd Like To Assist You</h2>

                    <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8e8f0" }}>
                        {/* Purple header */}
                        <div className="px-8 py-6" style={{ background: "#6A1B9A" }}>
                            <p className="text-purple-200 text-xs mb-1">Senior Vice President</p>
                            <h3 className="text-white font-extrabold text-xl mb-2">Anjana Jain</h3>
                            <div className="flex flex-wrap gap-4">
                                <span className="flex items-center gap-1.5 text-purple-200 text-xs">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 7H4a2 2 0 00-2 2v6a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z" />
                                        <polyline points="20 7 12 13 4 7" />
                                    </svg>
                                    TAG Group (India)
                                </span>
                                <span className="flex items-center gap-1.5 text-purple-200 text-xs">
                                    <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Expertise: CSR, ESG
                                </span>
                            </div>
                        </div>

                        {/* White body */}
                        <div className="bg-white px-8 py-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                                <div>
                                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Email Address</p>
                                    <a href="mailto:csq@tagindia.co.in" className="text-sm font-semibold text-gray-800 hover:text-[#6A1B9A]">
                                        csq@tagindia.co.in
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Phone Number</p>
                                    <a href="tel:+912240557688" className="text-sm font-semibold text-gray-800 hover:text-[#6A1B9A]">
                                        +91 22 4055 7688
                                    </a>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Corporate Address</p>
                                    <p className="text-sm font-semibold text-gray-800">TAG House, Andheri East, Mumbai</p>
                                </div>
                                <div>
                                    <p className="text-gray-400 text-xs mb-1 uppercase tracking-wide">Website</p>
                                    <a href="#" className="text-sm font-semibold" style={{ color: "#6A1B9A" }}>tagindia.co.in</a>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-wrap gap-3">
                                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
                                    style={{ background: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    Save vCard
                                </a>
                                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                                    style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" />
                                        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                    </svg>
                                    Copy All
                                </a>
                                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                                    style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22 6 12 13 2 6" />
                                    </svg>
                                    Send Email
                                </a>
                                <a href="#" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold"
                                    style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                    Directions
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <FAQSection />
            <BookDemo />
        </>
    );
};