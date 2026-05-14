import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import BreadcrumbHero from "../components/BreadcrumbHero";
import contactBg from "../assets/img/contact-us-bg.jpg";
import { useGetJobsQuery, useSubmitJobMutation } from "../api/TagIndiaAPI";
import PhoneInputPkg from "react-phone-input-2";
const PhoneInput = PhoneInputPkg.default || PhoneInputPkg;

// ========== STYLES ==========
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

// ========== HELPER COMPONENTS ==========
function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );
}

function UploadBox({ label, file, onChange, accept, error }) {
  return (
    <div className="flex-1 min-w-0">
      <label
        className={`flex flex-col items-center justify-center gap-1.5 border rounded-lg px-3 py-3 cursor-pointer hover:border-purple-400 hover:bg-purple-50 transition group text-center ${error ? "border-red-400 bg-red-50" : "border-gray-200"
          }`}
      >
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
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}

// Error Box reusable component
const ErrorBox = ({ message, onRetry }) => (
  <div className="col-span-full my-4">
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm p-4 flex items-start gap-3">
      <svg className="w-5 h-5 text-red-500 shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <div className="flex-1">
        <p className="text-red-800 font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1 text-sm text-red-700 hover:text-red-900 font-medium transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Try again</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

// Skeleton components
const JobCardSkeleton = () => (
  <div className="bg-gray-100 rounded-2xl p-8 shadow-sm animate-pulse">
    <div className="h-6 bg-gray-300 rounded w-3/4 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-1/2 mb-5" />
    <hr className="border-gray-300 mb-6" />
    <div className="space-y-2">
      <div className="h-4 bg-gray-300 rounded w-full" />
      <div className="h-4 bg-gray-300 rounded w-5/6" />
      <div className="h-4 bg-gray-300 rounded w-4/5" />
    </div>
    <div className="mt-6 h-4 bg-gray-300 rounded w-1/3" />
  </div>
);

const FormSkeleton = () => (
  <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 animate-pulse">
    <div className="h-7 bg-gray-300 rounded w-48 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-64 mb-7" />
    <div className="space-y-4">
      {[...Array(8)].map((_, i) => (
        <div key={i}>
          <div className="h-4 bg-gray-200 rounded w-24 mb-1" />
          <div className="h-12 bg-gray-200 rounded-lg w-full" />
        </div>
      ))}
      <div className="flex gap-3">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex-1 h-24 bg-gray-200 rounded-lg" />
        ))}
      </div>
      <div className="h-12 bg-gray-300 rounded-lg w-40" />
    </div>
  </div>
);

// ========== INITIAL STATE ==========
const INITIAL_FORM = {
  name: "", email: "", phone: "", qualification: "", experience: "", sector: "", message: "",
};
const INITIAL_FILES = { resume: null, aadhar: null, photo: null };

// ========== VALIDATION ==========
function validateForm(form, files) {
  const errors = {};
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (!form.name.trim()) errors.name = "Name is required.";
  else if (form.name.trim().length < 2) errors.name = "Name must be at least 2 characters.";

  if (!form.email.trim()) errors.email = "Email is required.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = "Enter a valid email address.";

  if (!form.phone) errors.phone = "Phone number is required.";
  else if (form.phone.length < 8) errors.phone = "Enter a valid phone number.";

  if (!form.qualification.trim()) errors.qualification = "Qualification is required.";

  if (!form.experience.trim()) errors.experience = "Experience is required.";
  else if (!form.experience.match(/^\d+\+?\s*(years?|yrs?)?$/i)) errors.experience = "Enter valid experience (e.g., 4+ years).";

  if (!form.sector) errors.sector = "Please select a sector.";

  if (!form.message.trim()) errors.message = "Message is required.";
  else if (form.message.trim().length < 5) errors.message = "Message must be at least 5 characters.";

  if (!files.resume) {
    errors.resume = "Resume is required.";
  } else {
    const ext = files.resume.name.split(".").pop().toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext)) errors.resume = "Resume must be PDF or DOC/DOCX.";
    else if (files.resume.size > MAX_FILE_SIZE) errors.resume = "Resume file size must be less than 2MB.";
  }

  if (!files.aadhar) {
    errors.aadhar = "Aadhar ID is required.";
  } else {
    const ext = files.aadhar.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext)) errors.aadhar = "Aadhar must be JPG, JPEG or PNG.";
    else if (files.aadhar.size > MAX_FILE_SIZE) errors.aadhar = "Aadhar file size must be less than 2MB.";
  }

  if (!files.photo) {
    errors.photo = "Passport size photo is required.";
  } else {
    const ext = files.photo.name.split(".").pop().toLowerCase();
    if (!["jpg", "jpeg", "png"].includes(ext)) errors.photo = "Photo must be JPG or PNG.";
    else if (files.photo.size > MAX_FILE_SIZE) errors.photo = "Photo size must be less than 2MB.";
  }

  return errors;
}

// ========== MAIN COMPONENT ==========
export function ApplyAssessor() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [files, setFiles] = useState(INITIAL_FILES);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { data: jobsResponse, isLoading: jobsLoading, isError: jobsError, refetch: refetchJobs } = useGetJobsQuery("assessor");
  const jobsData = jobsResponse?.data || [];
  const [submitJob, { isLoading: loading }] = useSubmitJobMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    if (touched[name]) {
      const newErrors = validateForm(updatedForm, files);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
    if (serverError) setServerError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const newErrors = validateForm(form, files);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handlePhoneChange = (phone) => {
    const updatedForm = { ...form, phone };
    setForm(updatedForm);
    if (touched.phone) {
      const newErrors = validateForm(updatedForm, files);
      setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
    }
    if (serverError) setServerError(null);
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const newErrors = validateForm(form, files);
    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
  };

  const handleFile = (field) => (e) => {
    const file = e.target.files[0];
    const updatedFiles = { ...files, [field]: file };
    setFiles(updatedFiles);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const newErrors = validateForm(form, updatedFiles);
    setErrors((prev) => ({ ...prev, [field]: newErrors[field] }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = async () => {
    setServerError(null);

    const allFields = ["name", "email", "phone", "qualification", "experience", "sector", "message", "resume", "aadhar", "photo"];
    const allTouched = allFields.reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const newErrors = validateForm(form, files);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstKey = Object.keys(newErrors)[0];
      const el = document.getElementById(`field-${firstKey}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    try {
      const formData = new FormData();
      const phoneDigits = form.phone.startsWith("91") ? form.phone.slice(2) : form.phone;

      formData.append("type", "apply_assessor");
      formData.append("name", form.name);
      formData.append("phone", phoneDigits);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("qualification", form.qualification);
      formData.append("total_experience", form.experience);
      formData.append("sector", form.sector);
      formData.append("resume", files.resume);
      formData.append("aadhar_image", files.aadhar);
      formData.append("photo", files.photo);

      const result = await submitJob(formData).unwrap();

      if (result.status) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
        setFiles(INITIAL_FILES);
        setErrors({});
        setTouched({});
        setServerError(null);
        setTimeout(() => setSubmitted(false), 3000);
      } else {
        setServerError(result.message || "Submission failed. Please try again.");
      }
    } catch (error) {
      const serverErrors = error?.data?.errors;
      if (serverErrors && typeof serverErrors === "object") {
        const errorMessages = Object.entries(serverErrors)
          .map(([field, msgs]) => `${field}: ${Array.isArray(msgs) ? msgs[0] : msgs}`)
          .join("\n");
        setServerError(errorMessages);
      } else {
        setServerError(error?.data?.message || "Server error. Please try again later.");
      }
      console.error("Submit error:", error);
    }
  };

  const inputClass = (fieldName) => {
    const hasError = errors[fieldName] && touched[fieldName];
    return `w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition ${hasError
        ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200"
        : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
      }`;
  };

  // Loading skeleton
  if (jobsLoading) {
    return (
      <>
        <BreadcrumbHero label="Join Our Expert Team." title="Apply For Assessor Post" bgImage={contactBg} />
        <style>{phoneOverride}</style>
        <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-6">
                {[...Array(2)].map((_, i) => <JobCardSkeleton key={i} />)}
              </div>
              <FormSkeleton />
            </div>
          </div>
        </div>
      </>
    );
  }

  // Error state for jobs
  if (jobsError) {
    return (
      <>
        <BreadcrumbHero label="Join Our Expert Team." title="Apply For Assessor Post" bgImage={contactBg} />
        <style>{phoneOverride}</style>
        <div className="min-h-screen" style={{ backgroundColor: "#f9fafb" }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-6 col-span-full">
                <ErrorBox message="Failed to load job listings. Please check your connection." onRetry={refetchJobs} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

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

            {/* LEFT: Job Listings */}
            <div className="space-y-6">
              {jobsData.map((job) => (
                <div key={job.id} className="bg-gray-100 rounded-2xl p-8 shadow-sm">
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">
                    {job.title1 || "Job Description"}
                  </h1>
                  {job.title2 && (
                    <p className="text-sm text-gray-500 mb-5">{job.title2}</p>
                  )}
                  <hr className="border-gray-300 mb-6" />

                  <div
                    className="text-sm text-gray-700 leading-7 mb-6"
                    dangerouslySetInnerHTML={{ __html: job.desc || "" }}
                  />

                  {(job.email1 || job.email2) && (
                    <div className="flex items-center gap-4 flex-wrap">
                      {job.email1 && (
                        <p className="text-sm font-semibold" style={{ color: "#7c3aed" }}>
                          {job.email1}
                        </p>
                      )}
                      {job.email2 && (
                        <p className="text-sm font-semibold" style={{ color: "#7c3aed" }}>
                          {job.email2}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* RIGHT: Apply Form */}
            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply For Assessor Post</h2>
              <p className="text-sm text-gray-500 mb-7">
                Join our team as an Assessor and contribute your expertise to deliver accurate and impactful evaluations.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-500 text-sm">
                    Thank you for applying! Our team will review your application and get back to you soon.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Server error box */}
                  {serverError && (
                    <ErrorBox message={serverError} onRetry={() => setServerError(null)} />
                  )}

                  {/* Name */}
                  <div id="field-name">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name <span className="text-red-500">*</span></label>
                    <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="Enter your full name" className={inputClass("name")} />
                    <FieldError msg={touched.name && errors.name} />
                  </div>

                  {/* Email */}
                  <div id="field-email">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Business Email <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="you@company.com" className={inputClass("email")} />
                    <FieldError msg={touched.email && errors.email} />
                  </div>

                  {/* Phone */}
                  <div id="field-phone">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number <span className="text-red-500">*</span></label>
                    <PhoneInput
                      country="in"
                      value={form.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      placeholder="Phone Number"
                      disableDropdown={true}
                      countryCodeEditable={false}
                      inputProps={{ name: "phone" }}
                    />
                    <FieldError msg={touched.phone && errors.phone} />
                  </div>

                  {/* Qualification */}
                  <div id="field-qualification">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Qualification <span className="text-red-500">*</span></label>
                    <input type="text" name="qualification" value={form.qualification} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., B.Tech, MBA, Diploma" className={inputClass("qualification")} />
                    <FieldError msg={touched.qualification && errors.qualification} />
                  </div>

                  {/* Experience */}
                  <div id="field-experience">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Experience <span className="text-red-500">*</span></label>
                    <input type="text" name="experience" value={form.experience} onChange={handleChange} onBlur={handleBlur} placeholder="e.g., 4+ years, 5 Years" className={inputClass("experience")} />
                    <FieldError msg={touched.experience && errors.experience} />
                  </div>

                  {/* Sector dropdown */}
                  <div id="field-sector">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sector <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <select name="sector" value={form.sector} onChange={handleChange} onBlur={handleBlur} className={`${inputClass("sector")} appearance-none bg-white cursor-pointer`}>
                        <option value="" disabled>Select Sector</option>
                        {SECTORS.map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                      <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </div>
                    <FieldError msg={touched.sector && errors.sector} />
                  </div>

                  {/* Documents uploads */}
                  <div id="field-resume">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Documents <span className="text-red-500">*</span> (max 2MB each)</label>
                    <div className="flex gap-3">
                      <UploadBox label="Upload Resume" file={files.resume} onChange={handleFile("resume")} accept=".pdf,.doc,.docx" error={touched.resume && errors.resume} />
                      <UploadBox label="Upload Aadhar" file={files.aadhar} onChange={handleFile("aadhar")} accept=".jpg,.jpeg,.png" error={touched.aadhar && errors.aadhar} />
                      <UploadBox label="Passport Photo" file={files.photo} onChange={handleFile("photo")} accept=".jpg,.jpeg,.png" error={touched.photo && errors.photo} />
                    </div>
                  </div>

                  {/* Message */}
                  <div id="field-message">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Your Message <span className="text-red-500">*</span></label>
                    <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} placeholder="Tell us why you're a great fit..." rows={4} className={`${inputClass("message")} resize-none`} />
                    <FieldError msg={touched.message && errors.message} />
                  </div>

                  {/* Submit button */}
                  <div className="flex justify pt-1">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      disabled={loading}
                      className="flex items-center gap-2 px-7 py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
                      style={{ backgroundColor: "#7c3aed" }}
                    >
                      {loading ? "Submitting..." : (
                        <>
                          Submit Application
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyAssessor;