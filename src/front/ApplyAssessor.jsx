import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import BreadcrumbHero from '../components/BreadcrumbHero';
import contactBg from '../assets/img/contact-us-bg.jpg';

// ✅ Vite fix — CommonJS module
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

const phoneOverride = `
  .react-tel-input .form-control {
    width: 100% !important; height: 46px !important;
    border: 1px solid #e5e7eb !important; border-radius: 0.5rem !important;
    font-size: 14px !important; color: #1f2937 !important;
    padding-left: 58px !important; outline: none !important;
    box-shadow: none !important; transition: border-color 0.15s, box-shadow 0.15s !important;
  }
  .react-tel-input .form-control:focus {
    border-color: #a855f7 !important;
    box-shadow: 0 0 0 3px rgba(168,85,247,0.15) !important;
  }
  .react-tel-input .flag-dropdown {
    border: 1px solid #e5e7eb !important; border-right: none !important;
    border-radius: 0.5rem 0 0 0.5rem !important; background: #f9fafb !important; height: 46px !important;
  }
  .react-tel-input .flag-dropdown.open, .react-tel-input .flag-dropdown:hover {
    background: #f3f4f6 !important; border-radius: 0.5rem 0 0 0.5rem !important;
  }
  .react-tel-input .selected-flag {
    border-radius: 0.5rem 0 0 0.5rem !important; padding: 0 8px 0 12px !important;
    height: 46px !important; display: flex !important; align-items: center !important;
  }
  .react-tel-input .selected-flag .arrow { border-top-color: #9ca3af !important; margin-left: 4px !important; }
  .react-tel-input .selected-flag .arrow.up { border-bottom-color: #9ca3af !important; }
  .react-tel-input .country-list {
    border-radius: 0.75rem !important; border: 1px solid #e5e7eb !important;
    box-shadow: 0 10px 40px rgba(0,0,0,0.12) !important; margin-top: 4px !important;
    width: 300px !important; max-height: 260px !important; overflow-y: auto !important; z-index: 9999 !important;
  }
  .react-tel-input .country-list .country {
    padding: 10px 14px !important; font-size: 13px !important; color: #374151 !important;
    display: flex !important; align-items: center !important; gap: 10px !important;
  }
  .react-tel-input .country-list .country:hover { background: #f5f3ff !important; color: #7c3aed !important; }
  .react-tel-input .country-list .country.highlight { background: #f5f3ff !important; color: #7c3aed !important; font-weight: 600 !important; }
  .react-tel-input .country-list .country .dial-code { color: #9ca3af !important; font-size: 12px !important; margin-left: auto !important; }
  .react-tel-input .country-list .search {
    padding: 10px 12px !important; position: sticky !important; top: 0 !important;
    background: white !important; border-bottom: 1px solid #f3f4f6 !important; z-index: 1 !important;
  }
  .react-tel-input .country-list .search-box {
    width: 100% !important; border: 1px solid #e5e7eb !important; border-radius: 0.5rem !important;
    padding: 7px 12px !important; font-size: 13px !important; color: #374151 !important;
    outline: none !important; background: #f9fafb !important;
  }
  .react-tel-input .country-list .search-box:focus {
    border-color: #a855f7 !important; box-shadow: 0 0 0 2px rgba(168,85,247,0.12) !important; background: white !important;
  }
`;

const SECTORS = [
  "Agriculture",
  "Automotive",
  "Beauty & Wellness",
  "Construction",
  "Electronics",
  "Food Processing",
  "Healthcare",
  "IT & ITeS",
  "Leather",
  "Logistics",
  "Media & Entertainment",
  "Mining",
  "Plumbing",
  "Power",
  "Retail",
  "Security",
  "Telecom",
  "Textile & Apparel",
  "Tourism & Hospitality",
  "Other",
];

// ✅ Green check icon — same as screenshot
function CheckIcon() {
  return (
    <svg
      className="w-5 h-5 shrink-0 mt-0.5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="12" fill="#d1fae5" />
      <path
        d="M7 12.5l3.5 3.5 6.5-7"
        stroke="#10b981"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// ✅ Upload box component
function UploadBox({ label, file, onChange, accept = ".pdf,.doc,.docx,.jpg,.png" }) {
  return (
    <label className="flex flex-col items-center justify-center gap-1.5 border border-gray-200 rounded-lg px-3 py-3 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition group text-center flex-1 min-w-0">
      <svg
        className="w-4 h-4 text-gray-400 group-hover:text-purple-500 transition"
        fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round"
          d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
      </svg>
      <span className="text-xs text-gray-500 group-hover:text-purple-600 transition truncate w-full">
        {file ? file.name : label}
      </span>
      <input type="file" accept={accept} onChange={onChange} className="hidden" />
    </label>
  );
}

export function ApplyAssessor() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    experience: "",
    sector: "",
    message: "",
  });
  const [files, setFiles] = useState({
    resume: null,
    aadhar: null,
    photo: null,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    if (file) setFiles({ ...files, [field]: file });
  };

  const handleSubmit = () => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <BreadcrumbHero
        label="Join Our Expert Team."
        title="Apply For Assessor Post"
        bgImage={contactBg}
      />
      <style>{phoneOverride}</style>

      <div
        className="min-h-screen"
        style={{
          fontFamily: "'Segoe UI', sans-serif",
          backgroundImage: "radial-gradient(circle, #d1d5db 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundColor: "#f9fafb",
        }}
      >
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

            {/* ── LEFT: Job Description Card ── */}
            <div className="bg-gray-100 rounded-2xl p-8 shadow-sm">
              <h1 className="text-2xl font-bold text-gray-900 mb-1">Job Description</h1>
              <p className="text-sm text-gray-500 mb-5">Work Experience Required 4+ Years</p>
              <hr className="border-gray-300 mb-6" />

              {/* Key Responsibilities */}
              <h2 className="text-base font-bold text-gray-900 mb-4">Key Responsibilities</h2>
              <ul className="space-y-3 mb-7">
                {[
                  "Conduct theory, practical and viva exam of trainees",
                  "Collect all relevant documents as per checklist",
                  "Prepare results of assessed candidates",
                  "Ensure assessment is carried out per set standards",
                  "Check identity of all trainees",
                  "Upload results on various portals",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Eligibility */}
              <h2 className="text-base font-bold text-gray-900 mb-4">Eligibility Criteria</h2>
              <ul className="space-y-3 mb-7">
                {["Graduation/Diploma in relevant field"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-sm text-gray-700 leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Freelance note */}
              <div className="bg-white rounded-xl px-5 py-3 text-center border border-gray-200">
                <p className="text-sm font-semibold" style={{ color: "#7c3aed" }}>
                  This Role is totally on a Freelance mode.
                </p>
              </div>
            </div>

            {/* ── RIGHT: Apply Form ── */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply For Assessor Post</h2>
              <p className="text-sm text-gray-500 mb-7">
                Join our team as an Assessor and contribute your expertise to deliver accurate and impactful evaluations.
              </p>

              <div className="space-y-4">

                {/* Name */}
                <input
                  type="text" name="name" value={form.name} onChange={handleChange}
                  placeholder="Name *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Email */}
                <input
                  type="email" name="email" value={form.email} onChange={handleChange}
                  placeholder="Business Email *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Phone */}
                <PhoneInput
                  country="in"
                  value={form.phone}
                  onChange={(phone) => setForm({ ...form, phone })}
                  placeholder="Phone Number"
                  enableSearch
                  searchPlaceholder="Search country..."
                  disableSearchIcon
                  preferredCountries={["in", "us", "gb", "ae", "sg", "au"]}
                  inputProps={{ name: "phone", required: true }}
                />

                {/* Qualification */}
                <input
                  type="text" name="qualification" value={form.qualification} onChange={handleChange}
                  placeholder="Your Qualification *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Experience */}
                <input
                  type="text" name="experience" value={form.experience} onChange={handleChange}
                  placeholder="Total Experience *"
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition"
                />

                {/* Sector Dropdown */}
                <div className="relative">
                  <select
                    name="sector"
                    value={form.sector}
                    onChange={handleChange}
                    className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-700 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition appearance-none bg-white cursor-pointer"
                  >
                    <option value="" disabled>Select Sector</option>
                    {SECTORS.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  {/* Custom arrow */}
                  <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>

                {/* Upload row — 3 boxes */}
                <div className="flex gap-3">
                  <UploadBox
                    label="Upload Resume Here"
                    file={files.resume}
                    onChange={handleFile("resume")}
                    accept=".pdf,.doc,.docx"
                  />
                  <UploadBox
                    label="Upload Aadhar Id"
                    file={files.aadhar}
                    onChange={handleFile("aadhar")}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <UploadBox
                    label="Upload Passport size Photo"
                    file={files.photo}
                    onChange={handleFile("photo")}
                    accept=".jpg,.jpeg,.png"
                  />
                </div>

                {/* Message */}
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Your Message" rows={4}
                  className="w-full border border-gray-200 rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-200 transition resize-none"
                />

                {/* Submit button — right aligned */}
                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95"
                    style={{ backgroundColor: submitted ? "#16a34a" : "#7c3aed" }}
                  >
                    {submitted ? "Submitted ✓" : (
                      <>
                        Submit
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>

                {submitted && (
                  <p className="text-sm text-green-600 font-medium text-center">
                    Application submitted successfully!
                  </p>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyAssessor;