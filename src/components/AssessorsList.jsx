import { useState } from "react";
import { MdKeyboardArrowDown, MdPerson } from "react-icons/md";

// ── Data — Council wise assessors ──
const councilData = {
  "Construction Skill Development Council Of India": [
    {
      id: 1,
      image: "",
      name: "Priti Jain",
      jobRole: "Assistant Electrician L3",
      language: "English, Hindi",
      occupation: "Freelancer",
      experience: "3 years of experience as Electrical Trainer",
      qualification: "B.Tech in Electrical Engineering",
      state: "Rajasthan",
    },
    {
      id: 2,
      image: "",
      name: "Priti Jain",
      jobRole: "Assistant Electrician L3",
      language: "English, Hindi",
      occupation: "Freelancer",
      experience: "3 years of experience as Electrical Trainer",
      qualification: "B.Tech in Electrical Engineering",
      state: "Rajasthan",
    },
    {
      id: 3,
      image: "",
      name: "Priti Jain",
      jobRole: "Assistant Electrician L3",
      language: "English, Hindi",
      occupation: "Freelancer",
      experience: "3 years of experience as Electrical Trainer",
      qualification: "B.Tech in Electrical Engineering",
      state: "Rajasthan",
    },
  ],
  "Apparel Made-Ups & Home Furnishing Sector Skill Council": [
    {
      id: 1,
      image: "",
      name: "Rahul Sharma",
      jobRole: "Sewing Machine Operator L2",
      language: "Hindi",
      occupation: "Employee",
      experience: "5 years in Garment Industry",
      qualification: "Diploma in Fashion Technology",
      state: "Gujarat",
    },
  ],
};

const councils = Object.keys(councilData);

// Avatar placeholder
function Avatar({ src, name }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        className="w-10 h-10 rounded-full object-cover"
        style={{ border: "2px solid #e0d4f0" }}
      />
    );
  }
  return (
    <div
      className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
      style={{ background: "#e0e0e0" }}
    >
      <MdPerson size={24} color="#9e9e9e" />
    </div>
  );
}

export default function AssessorsList() {
  const [selected, setSelected] = useState(councils[0]);
  const [dropOpen, setDropOpen] = useState(false);

  const assessors = councilData[selected] || [];

  const columns = [
    { key: "id",            label: "S.NO",          width: "60px" },
    { key: "image",         label: "Image",         width: "70px" },
    { key: "name",          label: "Name",          width: "110px" },
    { key: "jobRole",       label: "Job Role",      width: "130px" },
    { key: "language",      label: "Language",      width: "120px" },
    { key: "occupation",    label: "Occupation",    width: "110px" },
    { key: "experience",    label: "Exprience",     width: "160px" },
    { key: "qualification", label: "Qualification", width: "160px" },
    { key: "state",         label: "State",         width: "100px" },
  ];

  return (
    <section className="w-full py-12 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {/* ── Top Row ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Assessors List</h2>

          {/* Dropdown */}
          <div className="relative min-w-[300px]">
            <button
              onClick={() => setDropOpen(!dropOpen)}
              className="w-full flex items-center justify-between gap-3 border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-700 bg-white hover:border-gray-400 transition-colors"
            >
              <span className="truncate">{selected}</span>
              <MdKeyboardArrowDown
                size={20}
                className="flex-shrink-0 text-gray-400"
                style={{
                  transition: "transform 0.2s",
                  transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>

            {dropOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-hidden">
                {councils.map((council) => (
                  <button
                    key={council}
                    onClick={() => { setSelected(council); setDropOpen(false); }}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-purple-50 transition-colors"
                    style={{
                      background: selected === council ? "#f3e8ff" : "",
                      color: selected === council ? "#6A1B9A" : "#374151",
                      fontWeight: selected === council ? "500" : "400",
                    }}
                  >
                    {council}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ── Table ── */}
        <div
          className="rounded-xl overflow-hidden overflow-x-auto"
          style={{ border: "1px solid #e8e8f0" }}
        >
          {/* Header */}
          <div
            className="flex items-center min-w-max"
            style={{ background: "#ede8f8", padding: "14px 20px" }}
          >
            {columns.map((col) => (
              <div
                key={col.key}
                className="text-sm font-semibold text-[#6A1B9A] flex-shrink-0"
                style={{ width: col.width, minWidth: col.width }}
              >
                {col.label}
              </div>
            ))}
          </div>

          {/* Rows */}
          {assessors.length > 0 ? (
            assessors.map((assessor, i) => (
              <div
                key={assessor.id}
                className="flex items-start min-w-max hover:bg-gray-50 transition-colors"
                style={{
                  padding: "16px 20px",
                  borderTop: i === 0 ? "none" : "1px solid #f0f0f0",
                }}
              >
                {/* S.NO */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 pt-2"
                  style={{ width: "60px", minWidth: "60px" }}
                >
                  {assessor.id}
                </div>

                {/* Image */}
                <div
                  className="flex-shrink-0 pt-1"
                  style={{ width: "70px", minWidth: "70px" }}
                >
                  <Avatar src={assessor.image} name={assessor.name} />
                </div>

                {/* Name */}
                <div
                  className="text-sm text-gray-800 font-medium flex-shrink-0 pt-2"
                  style={{ width: "110px", minWidth: "110px" }}
                >
                  {assessor.name}
                </div>

                {/* Job Role */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 leading-snug pr-2"
                  style={{ width: "130px", minWidth: "130px" }}
                >
                  {assessor.jobRole}
                </div>

                {/* Language */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 pt-2"
                  style={{ width: "120px", minWidth: "120px" }}
                >
                  {assessor.language}
                </div>

                {/* Occupation */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 pt-2"
                  style={{ width: "110px", minWidth: "110px" }}
                >
                  {assessor.occupation}
                </div>

                {/* Experience */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 leading-snug pr-2"
                  style={{ width: "160px", minWidth: "160px" }}
                >
                  {assessor.experience}
                </div>

                {/* Qualification */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 leading-snug pr-2"
                  style={{ width: "160px", minWidth: "160px" }}
                >
                  {assessor.qualification}
                </div>

                {/* State */}
                <div
                  className="text-sm text-gray-600 flex-shrink-0 pt-2"
                  style={{ width: "100px", minWidth: "100px" }}
                >
                  {assessor.state}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-gray-400 text-sm">
              No assessors available for this council.
            </div>
          )}
        </div>

      </div>

      {/* Outside click to close */}
      {dropOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
      )}
    </section>
  );
}