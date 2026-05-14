// src/front/Faq.jsx
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { MdKeyboardArrowDown, MdErrorOutline, MdRefresh } from 'react-icons/md';
import contactBg from '../assets/img/contact-us.jpg';
import { useGetFaqQuery } from '../api/TagIndiaAPI';

// Error box component (reusable)
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

// Skeleton components
const TabSkeleton = () => (
  <div className="flex flex-wrap items-center gap-2 mb-8 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="h-9 w-24 bg-gray-200 rounded-full" />
    ))}
  </div>
);

const AccordionSkeleton = () => (
  <div className="flex flex-col gap-3 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-2xl bg-white overflow-hidden border border-gray-200">
        <div className="px-6 py-5 flex items-center justify-between">
          <div className="h-5 bg-gray-200 rounded w-3/4" />
          <div className="w-7 h-7 bg-gray-200 rounded-full" />
        </div>
        <div className="px-6 pb-5">
          <div className="h-4 bg-gray-200 rounded w-full mb-2" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </div>
    ))}
  </div>
);

export const Faq = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  const [activeTab, setActiveTab] = useState(null);
  const [tabbedOpen, setTabbedOpen] = useState(null);

  const { data, isLoading, isError, error, refetch } = useGetFaqQuery();

  // Filter categories that have at least one FAQ
  const categories = Array.isArray(data?.data)
    ? data.data.filter((cat) => Array.isArray(cat.faqs) && cat.faqs.length > 0)
    : [];

  // Auto-select first category when data loads
  useEffect(() => {
    if (categories.length > 0 && activeTab === null) {
      setActiveTab(categories[0].id);
    }
  }, [categories, activeTab]);

  // GSAP animation – only run when not loading/error and refs exist
  useEffect(() => {
    if (isLoading || isError || !textRef.current) return;
    const ctx = gsap.context(() => {
      if (textRef.current && textRef.current.children) {
        gsap.timeline({ defaults: { ease: 'power3.out' } }).from(
          textRef.current.children,
          { opacity: 0, y: 30, stagger: 0.15, duration: 0.7 }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [isLoading, isError]);

  const handleTabChange = (id) => {
    setActiveTab(id);
    setTabbedOpen(null);
  };

  const activeFaqs = categories.find((cat) => cat.id === activeTab)?.faqs ?? [];

  // Determine error message
  const getErrorMessage = () => {
    if (error) {
      if (typeof error === 'string') return error;
      if (error?.data?.message) return error.data.message;
      if (error?.message) return error.message;
    }
    return 'Failed to load FAQs. Please check your connection and try again.';
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <>
        {/* Hero skeleton */}
        <section className="relative overflow-hidden py-20 lg:py-24 bg-gray-800">
          <div className="absolute inset-0 bg-black opacity-50" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4 animate-pulse">
              <div className="h-6 w-32 bg-gray-300 rounded" />
              <div className="h-12 w-64 bg-gray-300 rounded" />
            </div>
          </div>
        </section>
        {/* FAQ content skeleton */}
        <section className="w-full py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <TabSkeleton />
            <AccordionSkeleton />
          </div>
        </section>
      </>
    );
  }

  // Error state
  if (isError) {
    return (
      <>
        <section
          className="relative overflow-hidden py-20 lg:py-24"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4">
              <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
                Common Questions
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight capitalize">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
        </section>
        <section className="w-full py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto">
            <ErrorBox message={getErrorMessage()} onRetry={refetch} />
          </div>
        </section>
      </>
    );
  }

  // No data state
  if (!isLoading && !isError && categories.length === 0) {
    return (
      <>
        <section
          className="relative overflow-hidden py-20 lg:py-24"
          style={{
            backgroundImage: `url(${contactBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/45" />
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="w-full space-y-4">
              <span className="inline-block text-[#6A1B9A] font-bold text-sm px-5 py-2 rounded-[10px] bg-white">
                Common Questions
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-[2.4rem] font-bold text-white leading-tight capitalize">
                Frequently Asked Questions
              </h1>
            </div>
          </div>
        </section>
        <section className="w-full py-14 px-4 bg-white">
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-gray-400 text-sm py-10">No FAQs available at the moment.</p>
          </div>
        </section>
      </>
    );
  }

  // Success state
  return (
    <>
      <section
        ref={sectionRef}
        className="relative overflow-hidden py-20 lg:py-24"
        style={{
          backgroundImage: `url(${contactBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      >
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'rgba(0,0,0,0.45)' }} />
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

      <section className="w-full py-14 px-4 bg-white">
        <div className="max-w-3xl mx-auto">
          {/* Tabs */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => handleTabChange(cat.id)}
                className="px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: activeTab === cat.id ? '#6A1B9A' : 'transparent',
                  color: activeTab === cat.id ? '#fff' : '#555',
                }}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Accordion */}
          <div className="flex flex-col gap-3">
            {activeFaqs.map((item, i) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white overflow-hidden"
                style={{ border: '1px solid #ebebeb' }}
              >
                <button
                  className="w-full flex items-center justify-between px-6 py-5 text-left"
                  onClick={() => setTabbedOpen(tabbedOpen === i ? null : i)}
                >
                  <span className="text-gray-800 font-medium text-sm sm:text-[15px] pr-4">
                    {item.question}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      background: tabbedOpen === i ? '#6A1B9A' : '#f5f5f5',
                      color: tabbedOpen === i ? '#fff' : '#555',
                      transform: tabbedOpen === i ? 'rotate(180deg)' : 'rotate(0deg)',
                    }}
                  >
                    <MdKeyboardArrowDown size={20} />
                  </span>
                </button>
                <div
                  style={{
                    maxHeight: tabbedOpen === i ? '300px' : '0',
                    overflow: 'hidden',
                    transition: 'max-height 0.35s ease',
                  }}
                >
                  <div
                    className="px-6 pb-5 text-gray-500 text-sm leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: item.answer }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};