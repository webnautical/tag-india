import { useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

const faqs = [
  {
    question: "What is Corporate Assessment?",
    answer:
      "Corporate assessment is a comprehensive evaluation of a company's performance, operations, financial health, and compliance. It helps identify strengths, weaknesses, risks, and opportunities to drive strategic decisions.",
  },
  {
    question: "Why is Corporate Assessment important?",
    answer:
      "It enables businesses to make data-driven decisions, improve operational efficiency, manage risks proactively, and align with ESG and CSR standards — all of which contribute to sustainable growth.",
  },
  {
    question: "How long does a corporate assessment take?",
    answer:
      "The duration depends on the scope and size of the organization. Typically, a standard corporate assessment takes between 2 to 6 weeks, from initial consultation to final reporting.",
  },
  {
    question: "What areas do you cover in the assessment?",
    answer:
      "We cover financial performance, operational efficiency, ESG compliance, CSR initiatives, governance structure, risk management, and strategic planning — providing a 360° view of your organization.",
  },
  {
    question: "Do you provide customized assessment reports?",
    answer:
      "Yes, every assessment report is tailored to the specific needs, industry, and goals of the client. We ensure that insights are actionable and relevant to your unique business context.",
  },
];

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
          {faq.question}
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

      {/* Answer */}
      <div
        style={{
          maxHeight: isOpen ? "300px" : "0",
          overflow: "hidden",
          transition: "max-height 0.35s ease",
        }}
      >
        <p className="px-6 pb-5 text-gray-500 text-sm leading-relaxed">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 items-start">

          {/* ── Left ── */}
          <div className="lg:w-[340px] flex-shrink-0 pt-2">

            {/* Icon */}
            <div className="mb-5">
              <svg
                width="54"
                height="54"
                viewBox="0 0 54 54"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="20" cy="22" r="16" stroke="#6A1B9A" strokeWidth="2.5" fill="none" />
                <path d="M20 14c-3.5 0-6 2.5-6 5.5 0 1.5.6 2.8 1.5 3.7" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" />
                <circle cx="20" cy="28" r="1.2" fill="#6A1B9A" />
                <path d="M20 24v-2.5" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" />
                {/* Second bubble */}
                <circle cx="34" cy="34" r="12" stroke="#6A1B9A" strokeWidth="2" fill="none" />
                <text x="29" y="39" fill="#6A1B9A" fontSize="13" fontWeight="bold">?</text>
              </svg>
            </div>

            {/* Heading */}
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-snug mb-3">
              Get answers to some{" "}
              <span className="block">Frequently Asked Questions</span>
            </h2>

            {/* Subtext */}
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              If you cannot find answer what you were looking for in our FAQs.
            </p>

            {/* Email */}
            <p className="text-gray-600 text-sm">
              write to us at{" "}
              <a
                href="mailto:info@tagindia.co.in"
                className="text-[#6A1B9A] font-medium hover:underline"
              >
                info@tagindia.co.in
              </a>
            </p>
          </div>

          {/* ── Right — Accordion ── */}
          <div className="flex-1 flex flex-col gap-3">
            {faqs.map((faq, i) => (
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