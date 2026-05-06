// src/front/BlacklistedAssessors.jsx
import { useState } from "react";
import { MdKeyboardArrowDown, MdPerson } from "react-icons/md";
import BreadcrumbHero from '../components/BreadcrumbHero';
import blacklistedassessors from '../assets/img/blacklisted-assessors.jpg';
import users from '../assets/img/users.png';

const councilData = {
  "Construction Skill Development Council Of India": [
    { id: 1, image: "", name: "Mukesh Sharma " },
    { id: 2, image: "", name: "Rakesh Sharma" },
    { id: 3, image: "", name: "Kiran " },
    { id: 4, image: "", name: "Sumit Sharma " },
    { id: 5, image: "", name: "Sanjay Soni " },
  ],
};

const councils = Object.keys(councilData);

export const BlacklistedAssessors = () => {
  const [selected, setSelected] = useState(councils[0]);
  const [dropOpen, setDropOpen] = useState(false);

  const assessors = councilData[selected] || [];

  return (
    <>
      <BreadcrumbHero
        label="Restricted Profiles"
        title="Blacklisted Assessors"
        bgImage={blacklistedassessors}
      />

      <section
        className="bg-white lg:py-12 py-6 blacklist_section"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Row */}
                 <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:mb-8 mb-4">

            <h2>Blacklisted Assessors List</h2>
          </div>
          {/* ── TABLE ── */}
          <div className="w-full overflow-x-auto table_alls " style={{ border: "1px solid #e8e8f0" }}>
            <table className="w-full border-collapse">
              {/* Head */}
              <thead>
                <tr style={{ background: "#EEE5F4" }}>
                  <th className="text-center" style={{ width: "50px" }}>S.NO</th>
                  <th className="text-center lg:w-[200px]" >Image</th>
                  <th className="text-left">Name</th>
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
                      <td className="text-center" >
                        {assessor.id}
                      </td>
                      <td className="text-center">
                        <img src={users} className="w-10 h-10 rounded-full m-auto" alt="" />
                      </td>
                      <td>
                        {assessor.name}
                      </td>

                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9}>
                      No assessors available for this council.
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>

        </div>

        {/* Outside click to close */}
        {dropOpen && (
          <div className="fixed inset-0 z-40" onClick={() => setDropOpen(false)} />
        )}
      </section>
    </>
  );
};