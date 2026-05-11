// src/front/OurTeam.jsx

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdClose, MdChevronRight } from "react-icons/md";
import contactBg from "../assets/img/contact-us.jpg";
import { useGetTeamQuery } from "../api/TagIndiaAPI";
import { IMG_BASE_URL } from "../helper/utils";

export const OurTeam = () => {
  // 1. Pagination state
  const [page, setPage] = useState(1);

  // 2. API query
  const { data, isLoading, isFetching, isError } = useGetTeamQuery(page);

  // 3. Destructure the paginated response (matching the Laravel paginator format)
  const teamMembers = data?.data?.data || [];
  const currentPage = data?.data?.current_page || 1;
  const lastPage = data?.data?.last_page || 1;

  // 4. Modal state
  const [selectedMember, setSelectedMember] = useState(null);

  // 5. Hero animation refs
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  // 6. Smooth scroll to top on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  // 7. GSAP animation for the hero section
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: "power3.out" } }).from(
        textRef.current.children,
        { opacity: 0, y: 30, stagger: 0.15, duration: 0.7 }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // 8. Modal helpers
  const openModal = (member) => {
    setSelectedMember(member);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedMember(null);
    document.body.style.overflow = "";
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // 9. Helper to build full image URL
  const getImageUrl = (filename) => `${IMG_BASE_URL()}/team/${filename}`;

  // 10. Loading / error states
  if (isError) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:mb-8 mb-4">Our Team</h2>
          <p className="text-red-500">
            Failed to load team data. Please refresh the page.
          </p>
        </div>
      </section>
    );
  }

  if (!teamMembers.length && !isLoading) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="lg:mb-8 mb-4">Our Team</h2>
          <p className="text-gray-400">No team members found.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* ══ HERO SECTION ═════════════════════════ */}
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

      {/* ══ TEAM GRID SECTION ══════════════════════ */}
      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              The Creative Minds Behind Tag
            </h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xl mx-auto">
              Every success story at tag is powered by a team that believes in
              thinking differently, working passionately, and delivering
              consistently.
            </p>
          </div>

          {/* Grid with loading overlay */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
              isFetching ? "opacity-50" : "opacity-100"
            }`}
          >
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="rounded-2xl overflow-hidden flex flex-col"
                style={{ border: "2px solid #6A1B9A" }}
              >
                {/* Photo */}
                <div className="relative" style={{ aspectRatio: "3/4.2" }}>
                  <img
                    src={getImageUrl(member.image)}
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
                    {/* Map API designation to role field */}
                    <p className="text-purple-200 text-xs mt-1">
                      {member.designation}
                    </p>
                  </div>

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

          {/* ══ PAGINATION (same style as Gallery) ══ */}
          {lastPage > 1 && (
            <div className="flex items-center justify-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1 || isFetching}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                ← Prev
              </button>

              {[...Array(lastPage)].map((_, i) => {
                const pageNum = i + 1;
                return (
                  <button
                    key={pageNum}
                    onClick={() => setPage(pageNum)}
                    disabled={isFetching}
                    className={`w-9 h-9 rounded-lg text-sm font-medium border transition-all ${
                      currentPage === pageNum
                        ? "text-white border-transparent"
                        : "hover:bg-gray-100"
                    }`}
                    style={
                      currentPage === pageNum ? { background: "#6A1B9A" } : {}
                    }
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                disabled={currentPage === lastPage || isFetching}
                className="px-4 py-2 rounded-lg text-sm font-medium border transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-100"
              >
                Next →
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ══ MODAL (unchanged) ═══════════════════════ */}
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
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-gray-900 font-semibold text-base">
                More About{" "}
                {selectedMember.name.replace(/^(Ms|Mr|Shri)\s/, "")}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <MdClose size={20} />
              </button>
            </div>

            <div className="px-6 py-6 flex flex-col items-center">
              <div
                className="w-32 h-32 rounded-full overflow-hidden mb-4"
                style={{ border: "3px solid #e0d4f0" }}
              >
                <img
                  src={getImageUrl(selectedMember.image)}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>

              <h4 className="text-gray-900 font-bold text-lg mb-1">
                {selectedMember.name}
              </h4>
              <p className="text-gray-500 text-sm mb-4">
                {selectedMember.designation}
              </p>
              <div
                className="w-16 mb-5"
                style={{ height: "2px", background: "#6A1B9A", borderRadius: "2px" }}
              />
              <div
                className="w-full rounded-xl px-6 py-5 text-center"
                style={{ background: "#6A1B9A" }}
              >
                <p className="text-white text-sm leading-relaxed">
                  {selectedMember.bio || "No additional information available."}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};