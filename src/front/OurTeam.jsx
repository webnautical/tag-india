// src/front/OurTeam.jsx
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { MdClose, MdChevronRight, MdErrorOutline, MdRefresh } from "react-icons/md";
import contactBg from "../assets/img/contact-us.jpg";
import { useGetTeamQuery } from "../api/TagIndiaAPI";
import { IMG_BASE_URL } from "../helper/utils";

// Error box component
const ErrorBox = ({ message, onRetry }) => (
  <div className="col-span-full my-8 mx-4">
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm p-4 flex items-start gap-3">
      <MdErrorOutline className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-800 font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1 text-sm text-red-700 hover:text-red-900 font-medium transition-colors"
          >
            <MdRefresh className="text-base" />
            <span>Try again</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

// Skeleton card component
const SkeletonCard = () => (
  <div className="rounded-2xl overflow-hidden flex flex-col border-2 border-gray-200 animate-pulse">
    <div style={{ aspectRatio: "3/4.2" }} className="bg-gray-200" />
    <div className="px-4 pt-3 pb-4 bg-gray-100">
      <div className="h-5 bg-gray-300 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 rounded w-1/2 mb-4" />
      <div className="h-8 bg-gray-300 rounded w-full" />
    </div>
  </div>
);

// Component to render HTML bio with forced white text
let styleInjected = false;
const injectWhiteTextStyle = () => {
  if (typeof document !== "undefined" && !styleInjected) {
    const style = document.createElement("style");
    style.textContent = `
      .bio-force-white * {
        color: white !important;
      }
    `;
    document.head.appendChild(style);
    styleInjected = true;
  }
};

const BioContent = ({ bio }) => {
  useEffect(() => {
    injectWhiteTextStyle();
  }, []);

  const hasContent = bio && bio.trim() !== "";

  if (!hasContent) {
    return <span className="text-white text-sm leading-relaxed">No additional information available.</span>;
  }

  return (
    <div
      className="bio-force-white text-white text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: bio }}
    />
  );
};

export const OurTeam = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, isError, error, refetch } = useGetTeamQuery(page);

  const teamMembers = data?.data?.data || [];
  const currentPage = data?.data?.current_page || 1;
  const lastPage = data?.data?.last_page || 1;

  const [selectedMember, setSelectedMember] = useState(null);
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  useEffect(() => {
    if (isLoading || isError || !textRef.current) return;
    const ctx = gsap.context(() => {
      if (textRef.current && textRef.current.children) {
        gsap.timeline({ defaults: { ease: "power3.out" } }).from(
          textRef.current.children,
          { opacity: 0, y: 30, stagger: 0.15, duration: 0.7 }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoading, isError]);

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

  const getImageUrl = (filename) => `${IMG_BASE_URL()}/team/${filename}`;

  const getErrorMessage = () => {
    if (error) {
      if (typeof error === "string") return error;
      if (error?.data?.message) return error.data.message;
      if (error?.message) return error.message;
    }
    return "Failed to load team data. Please check your connection and try again.";
  };

  if (isLoading) {
    return (
      <>
        <section className="relative overflow-hidden py-20 lg:py-24 bg-gray-800">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded" />
              <div className="h-12 w-64 bg-gray-300 rounded" />
            </div>
          </div>
        </section>
        <section className="w-full py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12 animate-pulse">
              <div className="h-8 w-64 bg-gray-200 rounded mx-auto mb-4" />
              <div className="h-4 w-96 bg-gray-200 rounded mx-auto" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        </section>
      </>
    );
  }

  if (isError) {
    return (
      <>
        <section
          className="relative overflow-hidden py-20 lg:py-24"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4">
              <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
                Our People
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight">
                Our Team
              </h1>
            </div>
          </div>
        </section>
        <section className="w-full py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <ErrorBox message={getErrorMessage()} onRetry={refetch} />
          </div>
        </section>
      </>
    );
  }

  if (!teamMembers.length) {
    return (
      <>
        <section
          className="relative overflow-hidden py-20 lg:py-24"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4">
              <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
                Our People
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight">
                Our Team
              </h1>
            </div>
          </div>
        </section>
        <section className="w-full py-16 px-4 bg-white">
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-gray-400">No team members found.</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
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
        <div className="absolute inset-0 pointer-events-none" style={{ background: "rgba(0,0,0,0.45)" }} />
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

      <section className="w-full py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
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

          <div className="relative min-h-[400px]">
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
                  <div style={{ aspectRatio: "3/4.2" }}>
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      className="w-full h-full object-cover object-top"
                      loading="lazy"
                    />
                  </div>
                  <div className="px-4 pt-3 pb-4 flex flex-col gap-3" style={{ background: "#6A1B9A" }}>
                    <div>
                      <h3 className="text-white font-bold text-base leading-tight">{member.name}</h3>
                      <p className="text-purple-200 text-xs mt-1">{member.designation}</p>
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

            {isFetching && !isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/30 rounded-2xl">
                <div className="bg-white/80 p-2 rounded-full shadow-md">
                  <div className="w-6 h-6 border-2 border-[#6A1B9A] border-t-transparent rounded-full animate-spin" />
                </div>
              </div>
            )}
          </div>

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
                      currentPage === pageNum ? "text-white border-transparent" : "hover:bg-gray-100"
                    }`}
                    style={currentPage === pageNum ? { background: "#6A1B9A" } : {}}
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

      {/* MODAL with BioContent component */}
      {selectedMember && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center px-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={closeModal}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <div
            className="bg-white rounded-2xl w-full max-w-[500px] overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 id="modal-title" className="text-gray-900 font-semibold text-base">
                More About {selectedMember.name.replace(/^(Ms|Mr|Shri)\s/, "")}
              </h3>
              <button
                onClick={closeModal}
                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close modal"
              >
                <MdClose size={20} />
              </button>
            </div>
            <div className="px-6 py-6 flex flex-col items-center">
              <div className="w-32 h-32 rounded-full overflow-hidden mb-4" style={{ border: "3px solid #e0d4f0" }}>
                <img
                  src={getImageUrl(selectedMember.image)}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <h4 className="text-gray-900 font-bold text-lg mb-1">{selectedMember.name}</h4>
              <p className="text-gray-500 text-sm mb-4">{selectedMember.designation}</p>
              <div className="w-16 mb-5" style={{ height: "2px", background: "#6A1B9A", borderRadius: "2px" }} />
              <div className="w-full rounded-xl px-6 py-5 text-center" style={{ background: "#6A1B9A" }}>
                {/* Use the BioContent component */}
                <BioContent bio={selectedMember.bio} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};