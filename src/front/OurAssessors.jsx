// src/front/OurAssessors.jsx
import { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import BreadcrumbHero from '../components/BreadcrumbHero';
import blacklistedassessors from '../assets/img/our-assessors.jpg';
import users from '../assets/img/users.png';
import { useGetSectorsQuery, useGetAssessorsQuery } from "../api/TapAPI";

export const OurAssessors = () => {
  const { data: sectorsData, isLoading: sectorsLoading, isError: sectorsError } = useGetSectorsQuery();
  const sectors = sectorsData?.data || [];

  const [selectedSectorCode, setSelectedSectorCode] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);

  useEffect(() => {
    if (sectors.length > 0 && !selectedSectorCode) {
      const firstCode = sectors[0].code;
      console.log("Auto-selecting sector code:", firstCode);
      setSelectedSectorCode(firstCode);
    }
  }, [sectors, selectedSectorCode]);

  const {
    data: assessorsData,
    isLoading: assessorsLoading,
    isError: assessorsError,
    isFetching,
    error: assessorsErrorDetail,
  } = useGetAssessorsQuery(selectedSectorCode, {
    skip: !selectedSectorCode,
  });

  // Log the full response every time it changes
  useEffect(() => {
    if (assessorsData) {
      console.log("Assessors API raw response:", assessorsData);
      console.log("Assessors data structure:", JSON.stringify(assessorsData, null, 2));
    }
    if (assessorsError) {
      console.error("Assessors API error:", assessorsErrorDetail);
    }
  }, [assessorsData, assessorsError, assessorsErrorDetail]);

  // Try to extract assessors array from various possible paths
  let assessors = [];
  if (assessorsData) {
    if (Array.isArray(assessorsData)) {
      assessors = assessorsData;
    } else if (assessorsData.data && Array.isArray(assessorsData.data)) {
      assessors = assessorsData.data;
    } else if (assessorsData.assessors && Array.isArray(assessorsData.assessors)) {
      assessors = assessorsData.assessors;
    } else if (assessorsData.items && Array.isArray(assessorsData.items)) {
      assessors = assessorsData.items;
    } else {
      console.warn("Unknown assessors response shape:", assessorsData);
    }
  }

  const getSelectedSectorName = () => {
    const found = sectors.find(s => s.code === selectedSectorCode);
    return found ? found.name : "Select a Sector";
  };

  if (sectorsError) {
    return (
      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="mb-4">Our Assessors</h2>
          <p className="text-red-500">Failed to load sectors. Please refresh.</p>
        </div>
      </section>
    );
  }

  return (
    <>
      <BreadcrumbHero label="Public Info" title="Our Assessors" bgImage={blacklistedassessors} />

      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:mb-8 mb-4">
            <h2>Assessors List</h2>
            <div className="relative">
              <button
                onClick={() => setDropOpen(!dropOpen)}
                className="button_dropdowns hover:border-gray-400 transition-colors"
                disabled={sectorsLoading}
              >
                <span className="truncate">
                  {sectorsLoading ? "Loading sectors..." : getSelectedSectorName()}
                </span>
                <MdKeyboardArrowDown size={20} className="flex-shrink-0 text-[#989898]" />
              </button>
              {dropOpen && !sectorsLoading && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md max-h-80 overflow-auto z-10">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => {
                        setSelectedSectorCode(sector.code);
                        setDropOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50"
                      style={{
                        background: selectedSectorCode === sector.code ? "#f3e8ff" : "",
                        color: selectedSectorCode === sector.code ? "#6A1B9A" : "#636363",
                      }}
                    >
                      {sector.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full overflow-x-auto border border-gray-200 rounded">
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#ede8f8" }}>
                  <th className="text-center"style={{width: "6%"}}>S.NO</th>
                  <th className="text-center" style={{width: "10%"}}>Image</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Email</th>
                  <th className="text-left">Contact</th>
                  <th className="text-left">Aadhar No.</th>
                  <th className="text-left">Experience</th>
                  <th className="text-left">Qualification</th>
                  <th className="text-left">State</th>
                </tr>
              </thead>
              <tbody>
                {!selectedSectorCode ? (
                  <tr><td colSpan={9} className="py-12 text-center">Select a sector</td></tr>
                ) : assessorsLoading || isFetching ? (
                  <tr><td colSpan={9} className="py-12 text-center">Loading assessors...</td></tr>
                ) : assessorsError ? (
                  <tr><td colSpan={9} className="py-12 text-center text-red-500">Error loading assessors</td></tr>
                ) : assessors.length === 0 ? (
                  <tr><td colSpan={9} className="py-12 text-center text-gray-500">No assessors found for {getSelectedSectorName()}</td></tr>
                ) : (
                  assessors.map((assessor, i) => (
                    <tr key={assessor.id || i} className="hover:bg-purple-50">
                      <td className="px-4 py-3 text-center">{i + 1}</td>
                      <td className="px-4 py-3 text-center">
                        <img src={users} className="w-10 h-10 rounded-full mx-auto" alt="" />
                      </td>
                      <td className="text-left">{assessor.name || assessor.FirstName || "—"}</td>
                      <td className="text-left">{assessor.email || assessor.Email || assessor.Email || "—"}</td>
                      <td className="text-left">{assessor.contact || assessor.Contact || "—"}</td>
                      <td className="text-left">{assessor.aadhar || assessor.Aadhar || "—"}</td>
    <td className="px-4 py-3">
      {(() => {
        const exp = assessor.experience || assessor.Experience;
        return exp && exp !== "—" ? `${exp} yr` : "—";
      })()}
    </td>
                      <td className="text-left">{assessor.qualification || assessor.Qualification || "—"}</td>
                      <td className="text-left">{assessor?.state?.name || "—"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};