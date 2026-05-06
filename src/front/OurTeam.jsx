// src/front/OurTeam.jsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdClose, MdChevronRight } from "react-icons/md";
import contactBg from "../assets/img/contact-us.jpg";

// ══════════════════════════════════════════
// TEAM DATA
// ══════════════════════════════════════════
const teamMembers = [
  {
    id: 1,
    name: "Ms Rashmi Sharma",
    role: "Chairperson cum Managing Director",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&q=80",
    bio: "B.Sc. (Home Science), MA (English) & Diploma in Foreign Trade, having 30 years of experience in education, trainings & export business. She had been an exporter of apparel, carpets, food products and handicrafts.",
  },
  {
    id: 2,
    name: "Shri Ribhu Vashishtha",
    role: "Chief Executive Officer",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    bio: "MBA in Operations & HR with 15+ years of experience in skill development, corporate training, and organizational leadership. Has managed large-scale government skill programs across India.",
  },
  {
    id: 3,
    name: "Ms Anjana Jain",
    role: "Chairperson cum Managing Director",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    bio: "M.Com, LLB with 20 years of experience in financial management, compliance, and corporate governance. Expert in regulatory affairs and stakeholder management.",
  },
  {
    id: 4,
    name: "Ms Neha Soni",
    role: "Talent Management Team",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    bio: "MBA in Human Resources with 10 years of experience in talent acquisition, employee engagement, and organizational development. Passionate about building high-performance teams.",
  },
];

// ══════════════════════════════════════════
// OUR TEAM PAGE
// ══════════════════════════════════════════
export const OurTeam = () => {

  // ── Hero refs ──
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  // ── Modal state ──
  const [selectedMember, setSelectedMember] = useState(null);

  // ── GSAP hero ──
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } })
        .from(textRef.current.children, {
          opacity: 0, y: 30, stagger: 0.15, duration: 0.7,
        });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // ── Modal open/close ──
  const openModal = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "";
  };

  // ── Escape key ──
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") closeModal(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {/* ══ BREADCRUMB HERO ══════════════════════════ */}
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 lg:py-24"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(0,0,0,0.45)" }}
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div ref={textRef} className="w-full space-y-4">
            <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
              Our People
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight">
              Our Team
            </h1>
          </div>
        </div>
      </section>

      {/* ══ TEAM SECTION ════════════════════════════ */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">

          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Creative Minds Behind Tag
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
              Every success story at tag is powered by a team that believes in thinking
              differently, working passionately, and delivering consistently.
            </p>
          </div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "2px solid #6A1B9A" }}
              >
                {/* Photo */}
                <div className="relative" style={{ aspectRatio: "3/3.5" }}>
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Info + Button */}
                <div
                  className="px-4 pt-3 pb-4 flex flex-col gap-3"
                  style={{ background: "#6A1B9A" }}
                >
                  <div>
                    <h3 className="text-white font-bold text-base leading-tight">
                      {member.name}
                    </h3>
                    <p className="text-purple-200 text-xs mt-1">
                      {member.role}
                    </p>
                  </div>

                  {/* View Details button */}
                  <button
                    onClick={() => openModal(member)}
                    className="w-full flex items-center justify-center gap-1 py-2 rounded-lg bg-white text-[#6A1B9A] text-sm font-semibold transition-opacity hover:opacity-90"
                  >
                    View Details <MdChevronRight size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ MODAL ═══════════════════════════════════ */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[500px] overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900 font-semibold text-base">
                More About {selectedMember.name.replace(/^(Ms|Mr|Shri)\s/, "")}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="px-6 py-6 flex flex-col items-center">
              {/* Circular Photo */}
              <div
                className="w-32 h-32 rounded-full overflow-hidden mb-4"
                style={{ border: "3px solid #e0d4f0" }}
              >
                <img
                  src={selectedMember.image}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              {/* Name + Role */}
              <h4 className="text-gray-900 font-bold text-lg mb-1">
                {selectedMember.name}
              </h4>
              <p className="text-gray-500 text-sm mb-4">
                {selectedMember.role}
              </p>
              {/* Divider */}
              <div
                className="w-16 mb-5"
                style={{ height: "2px", background: "#6A1B9A", borderRadius: "2px" }}
              />
              {/* Bio */}
              <div
                className="w-full rounded-xl px-6 py-5 text-center"
                style={{ background: "#6A1B9A" }}
              >
                <p className="text-white text-sm leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};