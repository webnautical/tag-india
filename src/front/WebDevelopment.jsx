// src/front/WebDevelopment.jsx
import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

// ── Assets ──
import heroImg from "../assets/img/hero-img.png";
import devImg1 from "../assets/img/dev-img1.jpg";   // dark coding
import devImg2 from "../assets/img/dev-img2.jpg";   // AI robot
import iconWeb from "../assets/img/icon-web.png";
import iconMobile from "../assets/img/icon-mobile.png";
import iconCrm from "../assets/img/icon-crm.png";
import iconApi from "../assets/img/icon-api.png";
import iconUiux from "../assets/img/iconuiux.png";
import iconCode from "../assets/img/icon-code.png";
import IndustriesSection from "../components/Services/IndustriesSection";
import FAQSection from "../components/Services/FAQSection";
import Testimonials from "../components/Home/Testimonials";
import BookDemo from "../components/Services/BookDemo";

// ── Services ──
const services = [
    {
        icon: iconWeb,
        title: "Web Development",
        text: "Build any type of website for your business with modern technologies and cost-effective pricing.",
    },
    {
        icon: iconMobile,
        title: "Mobile App Development",
        text: "Native and cross-platform mobile experiences that users love, built for iOS and Android.",
    },
    {
        icon: iconCrm,
        title: "CRM Solution",
        text: "Custom CRM solutions built to streamline your sales pipeline, automate customer engagement, and deliver actionable insights.",
    },
    {
        icon: iconApi,
        title: "API Development & Integration",
        text: "Connect your systems seamlessly with custom APIs and third-party integrations.",
    },
    {
        icon: iconUiux,
        title: "UI/UX Design",
        text: "Wireframes and prototypes to polished design systems, we create experiences that boost engagement, reduce friction, and turn visitors -",
    },
    {
        icon: iconCode,
        title: "Custom Software Development",
        text: "Tailor-made software solutions designed to solve your unique business challenges.",
    },
];

// ── Why TAG ──
const whyPoints = [
    "Optimized loading speed · Smooth UX",
    "User-friendly layouts · Works on all devices",
    "Data protection · Secure authentication systems",
    "Easily expandable systems · Handles growing traffic",
    "Optimized structure · Better search visibility",
    "Tailored to your needs · Flexible and adaptable solutions",
];


// ── Process steps ──
const processSteps = [
    {
        num: "01",
        title: "Project Analysis",
        img: devImg1,
        desc: "Project analysis involves carefully examining the project to understand its objectives, requirements, and overall feasibility. This stage focuses on identifying the problem, analyzing available resources, estimating time and cost, and recognizing possible risks.",
    },
    { num: "02", title: "Strategy & Planning", img: null, desc: "" },
    { num: "03", title: "UX/UI Designing", img: null, desc: "" },
    { num: "04", title: "Development", img: null, desc: "" },
    { num: "05", title: "Testing & Launch", img: null, desc: "" },
    { num: "06", title: "Support & Maintenance", img: null, desc: "" },
];

// ── Check icon ──
const Check = () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="#6A1B9A" strokeWidth="2.5" style={{ flexShrink: 0 }}>
        <circle cx="12" cy="12" r="10" />
        <polyline points="9 12 11 14 15 10" />
    </svg>
);

export const WebDevelopment = () => {
    const [activeIndustry, setActiveIndustry] = useState("Finance");
    const [activeStep, setActiveStep] = useState(0);
    const heroRef = useRef(null);

    useEffect(() => {
        if (!heroRef.current) return;
        gsap.fromTo(
            heroRef.current.querySelectorAll(".ai"),
            { opacity: 0, y: 28 },
            { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: "power3.out" }
        );
    }, []);

    return (
        <>
            {/* ══ 1. HERO ══ */}
            <section className="bg-white pt-14 pb-10" ref={heroRef}>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-10 items-center">

                        {/* Left */}
                        <div className="lg:w-1/2">
                            <h1 className="ai text-4xl font-extrabold text-gray-900 leading-tight mb-2">
                                Modern Web Development Solutions
                            </h1>
                            <p className="ai text-sm font-semibold mb-4" style={{ color: "#6A1B9A" }}>
                                Build fast, scalable, and user-friendly websites
                            </p>
                            <p className="ai text-gray-500 text-sm leading-relaxed mb-6">
                                We design and develop high-performance websites that combine creativity with functionality,
                                helping businesses grow in the digital world.
                            </p>
                            <div className="ai flex flex-wrap gap-3 mb-6">
                                <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-white text-sm font-semibold"
                                    style={{ background: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                                    </svg>
                                    Contact Us Today
                                </a>
                                <a href="#" className="inline-flex items-center gap-2 px-5 py-3 rounded-lg text-sm font-semibold"
                                    style={{ border: "1.5px solid #6A1B9A", color: "#6A1B9A" }}>
                                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                                        <polyline points="22 6 12 13 2 6" />
                                    </svg>
                                    Get expert consultation
                                </a>
                            </div>
                            <div className="ai flex gap-6">
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                    <span style={{ color: "#6A1B9A" }}>🚀</span> 200+ websites live
                                </span>
                                <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-700">
                                    <span style={{ color: "#f59e0b" }}>⭐</span> 100% satisfaction
                                </span>
                            </div>
                        </div>

                        {/* Right — hero image */}
                        <div className="lg:w-1/2 ai">
                            <img src={heroImg} alt="Web Development" className="w-full object-cover rounded-2xl" style={{ maxHeight: 280 }} />
                        </div>
                    </div>
                </div>
            </section>

            {/* ══ 2. SERVICES ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">Tailored services for growth</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {services.map((svc, i) => (
                            <div key={i} className="rounded-2xl p-6 bg-white transition-shadow hover:shadow-md"
                                style={{ border: "1px solid #e8e8f0" }}>
                                <div className="w-10 h-10 mb-4">
                                    <img src={svc.icon} alt={svc.title} className="w-full h-full object-contain" />
                                </div>
                                <h3 className="text-sm font-bold text-gray-900 mb-2">{svc.title}</h3>
                                <p className="text-gray-500 text-xs leading-relaxed">{svc.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ══ 3. WHY TAG FOR DEVELOPMENT ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-12 items-center">

                        {/* Left — 2 stacked images */}
                        <div className="lg:w-2/5 flex gap-3">
                            <img src={devImg1} alt="Developer" className="w-1/2 object-cover rounded-xl" style={{ maxHeight: 280 }} />
                            <img src={devImg2} alt="AI Robot" className="w-1/2 object-cover rounded-xl mt-8" style={{ maxHeight: 280 }} />
                        </div>

                        {/* Right — checklist */}
                        <div className="lg:w-3/5">
                            <h2 className="text-2xl font-extrabold text-gray-900 mb-6">Why Tag For Development ?</h2>
                            <div className="flex flex-col gap-3">
                                {whyPoints.map((pt, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <Check />
                                        <span className="text-sm text-gray-600">{pt}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <IndustriesSection />

            {/* ══ 5. DEVELOPMENT PROCESS ══ */}
            <section className="bg-white py-14 border-t border-gray-100">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row gap-10 mb-10">
                        <div className="lg:w-2/5">
                            <h2 className="text-3xl font-extrabold text-gray-900 leading-tight">
                                Our Simple &amp; Transparent<br />App Development Process
                            </h2>
                        </div>
                        <div className="lg:w-3/5">
                            <p className="text-gray-500 text-sm leading-relaxed">
                                Our app development process is designed to be simple, clear, and transparent at every stage.
                                We begin by understanding the project requirements and planning the strategy, followed by
                                user-friendly UX/UI design and efficient app development.
                            </p>
                        </div>
                    </div>

                    {/* Step tabs */}
                    <div className="flex flex-wrap gap-0 mb-0">
                        {/* Step cards row */}
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-0 rounded-2xl overflow-hidden"
                            style={{ border: "1px solid #e8e8f0" }}>
                            {processSteps.map((step, i) => (
                                <button
                                    key={i}
                                    onClick={() => setActiveStep(i)}
                                    className="flex flex-col items-center justify-start p-4 text-left transition-all duration-200"
                                    style={{
                                        borderRight: i < 5 ? "1px solid #e8e8f0" : "none",
                                        background: activeStep === i ? "#f3e8ff" : "#fff",
                                        minHeight: 80,
                                    }}
                                >
                                    <span
                                        className="text-lg font-extrabold mb-1"
                                        style={{ color: activeStep === i ? "#6A1B9A" : "#d1d5db" }}
                                    >
                                        {step.num}
                                    </span>
                                    <span
                                        className="text-xs font-semibold text-center leading-snug"
                                        style={{
                                            color: activeStep === i ? "#6A1B9A" : "#6b7280",
                                            writingMode: "vertical-rl",
                                            transform: "rotate(180deg)",
                                        }}
                                    >
                                        {step.title}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Active step detail */}
                    <div className="mt-6 rounded-2xl p-6 bg-white" style={{ border: "1px solid #e8e8f0" }}>
                        <div className="flex flex-col sm:flex-row gap-6 items-start">
                            {processSteps[activeStep].img && (
                                <img src={processSteps[activeStep].img} alt={processSteps[activeStep].title}
                                    className="w-full sm:w-56 object-cover rounded-xl flex-shrink-0" style={{ maxHeight: 180 }} />
                            )}
                            <div>
                                <div className="flex items-center gap-3 mb-3">
                                    <span className="text-4xl font-extrabold" style={{ color: "#ede8f8" }}>
                                        {processSteps[activeStep].num}
                                    </span>
                                    <h3 className="text-lg font-bold text-gray-900">{processSteps[activeStep].title}</h3>
                                </div>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    {processSteps[activeStep].desc ||
                                        `This stage focuses on ${processSteps[activeStep].title.toLowerCase()}, ensuring we deliver quality at every step of the development lifecycle.`
                                    }
                                </p>
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