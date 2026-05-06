import { useState } from "react";
import { MdCheckCircle, MdArrowForward } from "react-icons/md";

const expectItems = [
  "Get a personalized demo of Tag",
  "Hear proven customer success stories",
  "Learn about pricing for your use case",
  "Explore Tag's features in real-time",
];

const serviceOptions = [
  "Corporate Assessment",
  "ESG & CSR Consulting",
  "Financial Analysis",
  "Risk Management",
  "Strategic Planning",
  "Performance Reporting",
];

export default function BookDemo() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    service: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // apna submit logic yahan daalo
  };

  return (
    <section className="w-full bg-white overflow-hidden">
      <div className="flex flex-col lg:flex-row min-h-[560px]">

        {/* ── Left — Text ── */}
        <div className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-16">

          {/* Heading */}
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Book Your 30-minute<br />
            Tag Personalized Demo.
          </h2>

          {/* Divider */}
          <div
            className="mb-6"
            style={{ height: "2px", background: "#e5e5e5", width: "100%", maxWidth: "440px" }}
          />

          {/* What to expect */}
          <p
            className="text-xs font-bold tracking-widest mb-4"
            style={{ color: "#6A1B9A" }}
          >
            WHAT TO EXPECT:
          </p>

          <ul className="flex flex-col gap-3">
            {expectItems.map((item, i) => (
              <li key={i} className="flex items-center gap-3">
                <MdCheckCircle size={20} style={{ color: "#6A1B9A", flexShrink: 0 }} />
                <span className="text-gray-700 text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right — Form ── */}
        <div
          className="lg:w-1/2 flex items-center justify-center px-6 py-12 lg:py-16"
          style={{ background: "#e8ecf8" }}
        >
          <div
            className="w-full max-w-[500px] bg-white rounded-2xl p-8"
            style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
          >
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">

              {/* Row 1 — Name + Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 transition-colors"
                  />
                </div>
              </div>

              {/* Row 2 — Company + Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Company name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={form.company}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">
                    Phone number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 transition-colors"
                  />
                </div>
              </div>

              {/* Service Dropdown */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Which type of service are you looking for{" "}
                  <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 appearance-none transition-colors text-gray-500"
                  >
                    <option value="" disabled>Select</option>
                    {serviceOptions.map((opt, i) => (
                      <option key={i} value={opt}>{opt}</option>
                    ))}
                  </select>
                  {/* Custom arrow */}
                  <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Message Textarea */}
              <div>
                <label className="block text-sm text-gray-700 mb-1">
                  Which type of service are you looking for{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-[#6A1B9A] bg-gray-50 resize-none transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg text-white font-semibold text-sm transition-opacity hover:opacity-90 active:opacity-80"
                style={{ background: "#6A1B9A" }}
              >
                Get your personalized demo
                <MdArrowForward size={18} />
              </button>

            </form>
          </div>
        </div>

      </div>
    </section>
  );
}