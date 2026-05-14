import { useState } from "react";
import "react-phone-input-2/lib/style.css";
import BreadcrumbHero from "../components/BreadcrumbHero";
import contactBg from "../assets/img/contact-us-bg.jpg";
import { useGetJobsQuery, useSubmitJobMutation } from "../api/TagIndiaAPI";
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
    pointer-events: none !important;
  }
  .react-tel-input .selected-flag {
    border-radius: 0.5rem 0 0 0.5rem !important; padding: 0 8px 0 12px !important;
    height: 46px !important; display: flex !important; align-items: center !important;
  }
  .react-tel-input .selected-flag .arrow { display: none !important; }
`;

const INITIAL_FORM = {
  name: "", email: "", phone: "", qualification: "", experience: "", message: "", resume: null,
};

const INITIAL_ERRORS = {
  name: "", email: "", phone: "", qualification: "", experience: "", message: "", resume: "",
};

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
      <span>⚠</span> {msg}
    </p>
  );
}

function validate(form) {
  const errors = { ...INITIAL_ERRORS };
  let isValid = true;
  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  if (!form.name.trim()) { errors.name = "Name is required."; isValid = false; }
  else if (form.name.trim().length < 2) { errors.name = "Name must be at least 2 characters."; isValid = false; }

  if (!form.email.trim()) { errors.email = "Email is required."; isValid = false; }
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { errors.email = "Enter valid email address."; isValid = false; }

  if (!form.phone.trim()) { errors.phone = "Phone number is required."; isValid = false; }
  else if (form.phone.length < 10) { errors.phone = "Enter valid phone number."; isValid = false; }

  if (!form.qualification.trim()) { errors.qualification = "Qualification is required."; isValid = false; }

  if (!form.experience.trim()) { errors.experience = "Experience is required."; isValid = false; }

  if (!form.message.trim()) { errors.message = "Message is required."; isValid = false; }
  else if (form.message.trim().length < 10) { errors.message = "Message must be at least 10 characters."; isValid = false; }

  if (!form.resume) {
    errors.resume = "Resume is required."; isValid = false;
  } else {
    const ext = form.resume.name.split(".").pop().toLowerCase();
    if (!["pdf", "doc", "docx"].includes(ext)) { errors.resume = "Resume must be PDF or DOC/DOCX."; isValid = false; }
    else if (form.resume.size > MAX_FILE_SIZE) { errors.resume = "File size must be less than 2MB."; isValid = false; }
  }

  return { errors, isValid };
}

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
    <div className="h-7 bg-gray-300 rounded w-40 mb-2" />
    <div className="h-4 bg-gray-300 rounded w-60 mb-7" />
    <div className="space-y-4">
      {[...Array(7)].map((_, i) => (
        <div key={i}>
          <div className="h-12 bg-gray-200 rounded-lg w-full" />
          <div className="h-3 bg-gray-200 rounded w-32 mt-1" />
        </div>
      ))}
      <div className="h-12 bg-gray-300 rounded-lg w-full" />
    </div>
  </div>
);

// Error Box component reusable
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

export function ApplyStaff() {
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState(INITIAL_ERRORS);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { data: jobsResponse, isLoading: jobsLoading, isError: jobsError, refetch: refetchJobs } = useGetJobsQuery("career");
  const jobsData = jobsResponse?.data || [];

  const [submitJob, { isLoading: loading }] = useSubmitJobMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...form, [name]: value };
    setForm(updatedForm);
    if (touched[name]) {
      const { errors: newErrors } = validate(updatedForm);
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
    }
    if (serverError) setServerError(null);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const { errors: newErrors } = validate(form);
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }));
  };

  const handlePhoneChange = (phone) => {
    const updatedForm = { ...form, phone };
    setForm(updatedForm);
    if (touched.phone) {
      const { errors: newErrors } = validate(updatedForm);
      setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
    }
    if (serverError) setServerError(null);
  };

  const handlePhoneBlur = () => {
    setTouched((prev) => ({ ...prev, phone: true }));
    const { errors: newErrors } = validate(form);
    setErrors((prev) => ({ ...prev, phone: newErrors.phone }));
  };

  const handleFile = (e) => {
    const file = e.target.files[0];
    const updatedForm = { ...form, resume: file };
    setForm(updatedForm);
    setTouched((prev) => ({ ...prev, resume: true }));
    const { errors: newErrors } = validate(updatedForm);
    setErrors((prev) => ({ ...prev, resume: newErrors.resume }));
    if (serverError) setServerError(null);
  };

  const handleSubmit = async () => {
    setServerError(null);
    const allTouched = Object.keys(form).reduce((acc, key) => ({ ...acc, [key]: true }), {});
    setTouched(allTouched);

    const { errors: newErrors, isValid } = validate(form);
    setErrors(newErrors);
    if (!isValid) return;

    try {
      const formData = new FormData();
      const phoneDigits = form.phone.startsWith("91") ? form.phone.slice(2) : form.phone;

      formData.append("type", "apply_staff");
      formData.append("name", form.name);
      formData.append("phone", phoneDigits);
      formData.append("email", form.email);
      formData.append("message", form.message);
      formData.append("qualification", form.qualification);
      formData.append("total_experience", form.experience);
      formData.append("resume", form.resume);

      const result = await submitJob(formData).unwrap();

      if (result.status) {
        setSubmitted(true);
        setForm(INITIAL_FORM);
        setErrors(INITIAL_ERRORS);
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

  const inputClass = (field) =>
    `w-full border rounded-lg px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition ${errors[field] && touched[field]
      ? "border-red-400 focus:border-red-400 focus:ring-1 focus:ring-red-200"
      : "border-gray-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
    }`;

  // Loading skeleton
  if (jobsLoading) {
    return (
      <>
        <BreadcrumbHero label="Drive Sustainable Growth." title="Apply For Job" bgImage={contactBg} />
        <style>{phoneOverride}</style>
        <div className="min-h-screen" style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb" }}>
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
        <BreadcrumbHero label="Drive Sustainable Growth." title="Apply For Job" bgImage={contactBg} />
        <style>{phoneOverride}</style>
        <div className="min-h-screen" style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb" }}>
          <div className="max-w-6xl mx-auto px-6 py-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div className="space-y-6 col-span-full">
                <ErrorBox message="Failed to load job listings. Please check your connection." onRetry={refetchJobs} />
              </div>
              <div className="lg:col-span-2 flex justify-center">
                <div className="bg-white rounded-2xl p-8 shadow-sm w-full max-w-md">
                  <ErrorBox message="Unable to fetch job opportunities. Try again later." onRetry={refetchJobs} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <BreadcrumbHero label="Drive Sustainable Growth." title="Apply For Job" bgImage={contactBg} />
      <style>{phoneOverride}</style>

      <div className="min-h-screen" style={{ fontFamily: "'Segoe UI', sans-serif", backgroundColor: "#f9fafb" }}>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-1">Apply For Job</h2>
              <p className="text-sm text-gray-500 mb-7">
                Fill the form below to apply for this opportunity.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
                  <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">Application Submitted!</h3>
                  <p className="text-gray-500 text-sm">Thank you for applying.</p>
                </div>
              ) : (
                <div className="space-y-4">

                  {/* Server error box */}
                  {serverError && (
                    <ErrorBox message={serverError} onRetry={() => setServerError(null)} />
                  )}

                  <div>
                    <input type="text" name="name" value={form.name} onChange={handleChange} onBlur={handleBlur} placeholder="Name *" className={inputClass("name")} />
                    <FieldError msg={touched.name && errors.name} />
                  </div>

                  <div>
                    <input type="email" name="email" value={form.email} onChange={handleChange} onBlur={handleBlur} placeholder="Business Email *" className={inputClass("email")} />
                    <FieldError msg={touched.email && errors.email} />
                  </div>

                  <div>
                    <PhoneInput
                      country="in"
                      onlyCountries={["in"]}
                      disableDropdown={true}
                      countryCodeEditable={false}
                      enableSearch={false}
                      value={form.phone}
                      onChange={handlePhoneChange}
                      onBlur={handlePhoneBlur}
                      inputProps={{ name: "phone" }}
                    />
                    <FieldError msg={touched.phone && errors.phone} />
                  </div>

                  <div>
                    <input type="text" name="qualification" value={form.qualification} onChange={handleChange} onBlur={handleBlur} placeholder="Your Qualification *" className={inputClass("qualification")} />
                    <FieldError msg={touched.qualification && errors.qualification} />
                  </div>

                  <div>
                    <input type="text" name="experience" value={form.experience} onChange={handleChange} onBlur={handleBlur} placeholder="Total Experience *" className={inputClass("experience")} />
                    <FieldError msg={touched.experience && errors.experience} />
                  </div>

                  <div>
                    <textarea name="message" value={form.message} onChange={handleChange} onBlur={handleBlur} placeholder="Your Message *" rows={4} className={`${inputClass("message")} resize-none`} />
                    <FieldError msg={touched.message && errors.message} />
                  </div>

                  <div>
                    <label className={`flex items-center gap-2 text-sm cursor-pointer hover:text-purple-600 transition border rounded-lg px-4 py-3 ${errors.resume && touched.resume ? "border-red-400 bg-red-50 text-red-500" : "border-gray-200 text-gray-500"
                      }`}>
                      <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12V4m0 0L8 8m4-4l4 4" />
                      </svg>
                      <span className="truncate">
                        {form.resume ? form.resume.name : "Upload Resume Here"}
                      </span>
                      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFile} className="hidden" />
                    </label>
                    <FieldError msg={touched.resume && errors.resume} />
                  </div>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    className="w-full py-3 rounded-lg text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 active:scale-95 disabled:opacity-60"
                    style={{ backgroundColor: "#7c3aed" }}
                  >
                    {loading ? "Submitting..." : "Apply Job"}
                  </button>

                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}

export default ApplyStaff;