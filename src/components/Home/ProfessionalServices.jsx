// src/components/ProfessionalServices.jsx
import { useEffect, useRef, useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import advisoryImg from '../../assets/img/advisory.png';
import consultImg from '../../assets/img/advisory.png';

gsap.registerPlugin(ScrollTrigger);

// ✅ Fix 1 — duplicate tabs hatao, unique id rakho
const TABS = [
    { id: 'advisory', label: 'Advisory / Consulting' },
    { id: 'assessments', label: 'Assessments' },
    { id: 'implementation', label: 'Implementation' },
    { id: 'insights', label: 'Insights / Reports' },
];

const TAB_CONTENT = {
    advisory: {
        image: advisoryImg,
        sections: [
            {
                title: 'ESG Strategy',
                points: [
                    'ESG framework design aligned with global standards (GRI, BRSR, SDGs)',
                    'Sustainability roadmap and policy development',
                    'Risk identification and ESG integration into business operations',
                ],
            },
            {
                title: 'CSR Planning',
                points: [
                    'CSR policy design and compliance planning',
                    'Identification of high-impact social initiatives',
                    'Budget allocation and project structuring',
                    'Alignment with Schedule VII (Companies Act, India)',
                ],
            },
        ],
    },
    assessments: {
        image: consultImg,
        sections: [
            {
                title: 'Online Assessments',
                points: [
                    'AI-powered proctoring with real-time monitoring',
                    'Multi-sector skill and competency assessments',
                    'NCVET-aligned certification programs',
                ],
            },
            {
                title: 'Certification',
                points: [
                    'Industry-recognized digital credentials',
                    'Tamper-proof certificate generation',
                    'Bulk certification with automated workflows',
                    'QR-code based instant verification',
                ],
            },
        ],
    },
    implementation: {
        image: advisoryImg,
        sections: [
            {
                title: 'On-ground Execution',
                points: [
                    'Physical assessment center setup and management',
                    'Trained assessor deployment pan India',
                    'Real-time monitoring and progress reporting',
                ],
            },
            {
                title: 'Technology Integration',
                points: [
                    'LMS and ISMS platform integration',
                    'API-ready white-label assessment solutions',
                    'Custom workflows for enterprise clients',
                    'End-to-end data security and compliance',
                ],
            },
        ],
    },
    insights: {
        image: consultImg,
        sections: [
            {
                title: 'Data Analytics',
                points: [
                    'Comprehensive assessment performance analytics',
                    'Skill gap identification and benchmarking',
                    'Predictive insights for workforce planning',
                ],
            },
            {
                title: 'Reports',
                points: [
                    'Customizable regulatory compliance reports',
                    'Impact measurement and ESG reporting',
                    'Automated dashboards with real-time data',
                    'Exportable formats — PDF, Excel, CSV',
                ],
            },
        ],
    },
};

export default function ProfessionalServices() {
    const [activeTab, setActiveTab] = useState('advisory');
    const [animating, setAnimating] = useState(false);
    const sectionRef = useRef(null);
    const headingRef = useRef(null);
    const tabsRef = useRef(null);      // ✅ scroll container ref
    const indicatorRef = useRef(null);
    const imageRef = useRef(null);
    const contentRef = useRef(null);
    const tabElsRef = useRef([]);

    // ── Initial scroll-in animation ──
    useEffect(() => {
        const ctx = gsap.context(() => {

            gsap.from(headingRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                    toggleActions: 'play none none none',
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                ease: 'power3.out',
            });

            gsap.from(tabElsRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 82%',
                },
                opacity: 0,
                y: 20,
                stagger: 0.1,
                duration: 0.55,
                delay: 0.3,
                ease: 'power2.out',
            });

            gsap.from(imageRef.current, {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                opacity: 0,
                x: -50,
                duration: 0.9,
                delay: 0.5,
                ease: 'power3.out',
            });

            gsap.from(contentRef.current?.querySelectorAll('[data-point]'), {
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 75%',
                },
                opacity: 0,
                x: 40,
                stagger: 0.08,
                duration: 0.6,
                delay: 0.6,
                ease: 'power2.out',
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // ── Tab switch animation ──
    const switchTab = (tabId) => {
        if (tabId === activeTab || animating) return;
        setAnimating(true);

        const tl = gsap.timeline({
            onComplete: () => {
                setActiveTab(tabId);
                setAnimating(false);

                gsap.fromTo(
                    imageRef.current,
                    { opacity: 0, x: -30, scale: 0.97 },
                    { opacity: 1, x: 0, scale: 1, duration: 0.55, ease: 'power3.out' }
                );
                gsap.fromTo(
                    contentRef.current?.querySelectorAll('[data-point]'),
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, stagger: 0.07, duration: 0.45, ease: 'power2.out' }
                );
                gsap.fromTo(
                    contentRef.current?.querySelectorAll('[data-section-title]'),
                    { opacity: 0, y: 12 },
                    { opacity: 1, y: 0, stagger: 0.12, duration: 0.4, ease: 'power2.out' }
                );
            },
        });

        tl.to(imageRef.current, {
            opacity: 0, x: -20, scale: 0.97, duration: 0.3, ease: 'power2.in',
        });
        tl.to(
            contentRef.current?.querySelectorAll('[data-point]'),
            { opacity: 0, x: 20, stagger: 0.04, duration: 0.2, ease: 'power2.in' },
            '<'
        );
    };

    // ── Tab indicator move ──
    useEffect(() => {
        const idx = TABS.findIndex((t) => t.id === activeTab);
        const tabEl = tabElsRef.current[idx];
        if (!tabEl || !indicatorRef.current || !tabsRef.current) return;

        const tabRect = tabEl.getBoundingClientRect();
        const wrapRect = tabsRef.current.getBoundingClientRect();

        gsap.to(indicatorRef.current, {
            left: tabEl.offsetLeft,
            width: tabRect.width,
            duration: 0.4,
            ease: 'power3.inOut',
        });

        // ✅ Fix 2 — active tab visible hone ke liye scroll karo
        const scrollLeft = tabEl.offsetLeft - tabsRef.current.offsetWidth / 2 + tabRect.width / 2;
        tabsRef.current.scrollTo({ left: scrollLeft, behavior: 'smooth' });

    }, [activeTab]);

    // ✅ Fix 3 — next button: sirf tabs container scroll karta hai
    const scrollTabsRight = () => {
        if (!tabsRef.current) return;
        tabsRef.current.scrollBy({ left: 160, behavior: 'smooth' });
    };

    const content = TAB_CONTENT[activeTab];

    return (
        <section ref={sectionRef} className="bg-white py-14 lg:py-14 professional_services">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading */}
                <h2 ref={headingRef}
                    className="text-center text-3xl sm:text-4xl lg:text-[2rem] font-bold text-black mb-10">
                    Our Professional Services
                </h2>

                {/* Tabs row */}
                <div className="flex items-center  mb-12 gap-2  w-full lg:w-[70%] mx-auto">

                    {/* ✅ Scrollable tabs container — alag div */}
                    <div
                        ref={tabsRef}
                        className="tabs-scroll relative flex items-center overflow-x-auto flex-1 sm:gap-8 gap-3"
                    >
                        {TABS.map((tab, i) => (
                            <button
                                key={tab.id}
                                ref={(el) => (tabElsRef.current[i] = el)}
                                onClick={() => switchTab(tab.id)}
                                className={`tab-btn px-4 sm:px-3 py-1 text-sm sm:text-[15px] whitespace-nowrap ${activeTab === tab.id ? 'active' : ''
                                    }`}
                            >
                                {tab.label}
                            </button>
                        ))}

                        {/* Sliding indicator inside scroll container */}
                        <div className="next-btns">

                            <button
                                onClick={scrollTabsRight}
                                className=" w-5 h-5 rounded-full bg-[#6A1B9A] flex items-center justify-center text-white flex-shrink-0"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    {/* ✅ Fix 3 — next button sirf scroll karta hai tabs ko */}

                </div>

                {/* Content */}
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">

                    {/* Left: Image */}
                    <div
                        ref={imageRef}
                        className="w-full lg:w-[48%] "
                    >
                        <img
                            src={content.image}
                            alt={activeTab}
                            className="w-full h-64 sm:h-80 lg:h-[420px] object-cover"
                        />
                    </div>

                    {/* Right: Points */}
                    <div ref={contentRef} className="w-full lg:w-[52%] space-y-6">
                        {content.sections.map((sec) => (
                            <div key={sec.title}>
                                <h3
                                    data-section-title
                                    className="text-xl sm:text-[20px] font-bold text-black mb-2"
                                >
                                    {sec.title}
                                </h3>
                                <ul className="space-y-1">
                                    {sec.points.map((point) => (
                                        <li key={point} data-point className="point-row flex items-start gap-1">
                                            <Check
                                                size={18}
                                                className="check-icon text-[#00BA00] flex-shrink-0 mt-0.5"
                                                strokeWidth={4}
                                            />
                                            <span className="text-[#636363] text-[14px] font-semibold leading-relaxed">
                                                {point}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        <div data-point className="pt-2">
                            <a
                                href="/services"
                                className="explore-btn"
                            >
                                Explore Services
                                <ChevronRight size={16} className="exp-chevron" />
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}