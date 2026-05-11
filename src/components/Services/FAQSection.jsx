import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function stripHtml(html = '') {
  return html?.replace(/<[^>]*>/g, '').trim() ?? '';
}

function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <div
      className="bg-gray-50 rounded-2xl overflow-hidden transition-all duration-300"
      style={{ border: "1px solid #ebebeb" }}
    >
      <button
        className="w-full flex items-center justify-between px-6 py-5 text-left"
        onClick={() => onToggle(index)}
      >
        <span className="text-gray-800 font-medium text-sm sm:text-base pr-4">
          {faq?.title}
        </span>
        <span
          className="flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full transition-all duration-300"
          style={{
            background: isOpen ? "#6A1B9A" : "transparent",
            color: isOpen ? "#fff" : "#6A1B9A",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <MdKeyboardArrowDown size={20} />
        </span>
      </button>

      <div
        style={{
          maxHeight: isOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
          {stripHtml(faq?.description)}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection({ data }) {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  if (!data?.items?.length) return null;

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* Left */}
          <div className="lg:w-[340px] flex-shrink-0 pt-2">

            {/* Icon */}
            <div className="mb-5">
              <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="22" r="16" stroke="#6A1B9A" strokeWidth="2.5" fill="none" />
                <path d="M20 14c-3.5 0-6 2.5-6 5.5 0 1.5.6 2.8 1.5 3.7" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="28" r="1.2" fill="#6A1B9A" />
                <path d="M20 24v-2.5" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" />
                <circle cx="34" cy="34" r="12" stroke="#6A1B9A" strokeWidth="2" fill="none" />
                <text x="29" y="39" fill="#6A1B9A" fontSize="13" fontWeight="bold">?</text>
              </svg>
            </div>

            {/* Heading */}
            {data?.heading && (
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
                {data.heading}
              </h2>
            )}

            {/* Subtext */}
            {data?.subHeading && (
              <p className="text-gray-400 text-sm leading-relaxed mb-4">
                {data.subHeading}
              </p>
            )}

            {/* Email */}
            {data?.email && (
              <p className="text-gray-600 text-sm">
                {data.email.includes('@') ? (
                  <>
                    write to us at{" "}
                    <a
                      href={`mailto:${data.email.replace(/^write to us at\s*/i, '').trim()}`}
                      className="text-[#6A1B9A] font-medium hover:underline"
                    >
                      {data.email.replace(/^write to us at\s*/i, '').trim()}
                    </a>
                  </>
                ) : (
                  data.email
                )}
              </p>
            )}
          </div>

          {/* Right — Accordion */}
          <div className="flex-1 flex flex-col gap-3">
            {data.items.map((faq, i) => (
              <FAQItem
                key={i}
                faq={faq}
                index={i}
                isOpen={openIndex === i}
                onToggle={handleToggle}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}