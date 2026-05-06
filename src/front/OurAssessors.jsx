// src/front/OurAssessors.jsx
import { useState } from "react";
import { MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import BreadcrumbHero from '../components/BreadcrumbHero';
import blacklistedassessors from '../assets/img/our-assessors.jpg';
import users from '../assets/img/users.png';

const councilData = {
  "Construction Skill Development Council Of India": [
    { id: 1, image: "", name: "Priti Jain ", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 2, image: "", name: "Priti Jain", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 3, image: "", name: "Priti Jain ", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 4, image: "", name: "Priti Jain", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 5, image: "", name: "Priti Jain ", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
  ],
  "Apparel Made-Ups & Home Furnishing Sector Skill Council": [
    { id: 1, image: "", name: "Priti Jain ", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 4, image: "", name: "Priti Jain", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
    { id: 5, image: "", name: "Priti Jain ", jobRole: "Assistant Electrician L3", language: "English, Hindi", occupation: "Freelancer", experience: "3 years of experience as Electrical Trainer", qualification: "B.Tech in Electrical Engineering", state: "Rajasthan" },
  ],
};

const councils = Object.keys(councilData);

export const OurAssessors = () => {
  const [selected, setSelected] = useState(councils[0]);
  const [dropOpen, setDropOpen] = useState(false);

  const assessors = councilData[selected] || [];

  return (
    <>
      <BreadcrumbHero
        label="Public Info"
        title="Our Assessors"
        bgImage={blacklistedassessors}
      />

      <section
        className="bg-white lg:py-12 py-6 blacklist_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Top Row */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:mb-8 mb-4">

            <h2>Assessors List</h2>
            {/* Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="button_dropdowns hover:border-gray-400 transition-colors"
              >
                <span className="truncate">{selected}</span>
                <MdKeyboardArrowDown
                  size={20}
                  className="flex-shrink-0 text-[#989898]"
                  style={{ transition: "transform 0.2s", transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>

              {dropOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 button_inner shadow-lg overflow-hidden">
                  {councils.map((council) => (
                    <button
                      key={council}
                      onClick={() => { setSelected(council); setDropOpen(false); }}
                      className="w-full hover:bg-purple-50 transition-colors"
                      style={{
                        background: selected === council ? "#f3e8ff" : "",
                        color: selected === council ? "#6A1B9A" : "#636363",
                      }}
                    >
                      {council}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ── TABLE ── */}
          <div className="w-full overflow-x-auto table_alls " style={{ border: "1px solid #e8e8f0" }}>
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#ede8f8" }}>
                  <th className="text-center" style={{ width: "50px" }} >S.NO</th>
                  <th className="text-center ">Image</th>
                  <th className="text-left">Name</th>
                  <th className="text-left lg:w-[150px] "  >Job Role</th>
                  <th className="text-left">Language</th>
                  <th className="text-left">Occupation</th>
                  <th className="text-left">Experience</th>
                  <th className="text-left">Qualification</th>
                  <th className="text-left">State</th>
                </tr>
              </thead>
              {/* Body */}
              <tbody>
                {assessors.length > 0 ? (
                  assessors.map((assessor, i) => (
                    <tr
                      key={assessor.id}
                      className="hover:bg-[#f1e6f94d] transition-colors"
                      style={{ borderTop: i === 0 ? "none" : "0px solid #f0f0f0" }}
                    >
                      {/* S.NO */}
                      <td >
                        {assessor.id}
                      </td>

                      {/* Image */}
                      <td className="px-4 py-3 align-middle">
                        <img src={users} className="w-10 h-10 rounded-full m-auto" alt="" />
                      </td>

                      {/* Name */}
                      <td >
                        {assessor.name}
                      </td>

                      {/* Job Role */}
                      <td >
                        {assessor.jobRole}
                      </td>

                      {/* Language */}
                      <td>
                        {assessor.language}
                      </td>

                      {/* Occupation */}
                      <td >
                        {assessor.occupation}
                      </td>

                      {/* Experience */}
                      <td style={{ maxWidth: "180px" }}>
                        {assessor.experience}
                      </td>

                      {/* Qualification */}
                      <td style={{ maxWidth: "180px" }}>
                        {assessor.qualification}
                      </td>

                      {/* State */}
                      <td >
                        {assessor.state}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-400 text-sm">
                      No assessors available for this council.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>
      </section>
    </>
  );
};