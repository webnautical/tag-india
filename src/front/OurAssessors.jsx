// src/front/OurAssessors.jsx
import { useState, useEffect, useRef } from "react";
import { MdKeyboardArrowDown, MdErrorOutline, MdRefresh } from "react-icons/md";
import BreadcrumbHero from '../components/BreadcrumbHero';
import blacklistedassessors from '../assets/img/our-assessors.jpg';
import users from '../assets/img/users.png';
import { useGetSectorsQuery, useGetAssessorsQuery } from "../api/TapAPI";

// Skeleton row component for the assessors table
const SkeletonRow = () => (
  <tr className="animate-pulse">
    <td className="px-4 py-3 text-center">
      <div className="h-4 bg-gray-200 rounded w-6 mx-auto"></div>
    </td>
    <td className="px-4 py-3 text-center">
      <div className="w-10 h-10 bg-gray-200 rounded-full mx-auto"></div>
    </td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-40"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-28"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-32"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-16"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-36"></div></td>
    <td className="px-4 py-3"><div className="h-4 bg-gray-200 rounded w-24"></div></td>
  </tr>
);

// Error message component with retry button
const ErrorBox = ({ message, onRetry, isSectorError = false }) => (
  <div className="col-span-full my-8 mx-4">
    <div className="bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm p-4 flex items-start gap-3">
      <MdErrorOutline className="text-red-500 text-xl flex-shrink-0 mt-0.5" />
      <div className="flex-1">
        <p className="text-red-800 font-medium">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-2 inline-flex items-center gap-1 text-sm text-red-700 hover:text-red-900 font-medium transition-colors"
          >
            <MdRefresh className="text-base" />
            <span>Try again</span>
          </button>
        )}
      </div>
    </div>
  </div>
);

export const OurAssessors = () => {
  // Sectors query with refetch
  const { 
    data: sectorsData, 
    isLoading: sectorsLoading, 
    isError: sectorsError, 
    refetch: refetchSectors 
  } = useGetSectorsQuery();
  const sectors = sectorsData?.data || [];

  const [selectedSectorCode, setSelectedSectorCode] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Auto-select first sector when data loads
  useEffect(() => {
    if (sectors.length > 0 && !selectedSectorCode) {
      setSelectedSectorCode(sectors[0].code);
    }
  }, [sectors, selectedSectorCode]);

  // Reset selected sector if it no longer exists in updated sectors list
  useEffect(() => {
    if (selectedSectorCode && sectors.length > 0 && !sectors.some(s => s.code === selectedSectorCode)) {
      setSelectedSectorCode(sectors[0]?.code || null);
    }
  }, [sectors, selectedSectorCode]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Assessors query with refetch
  const {
    data: assessorsData,
    isLoading: assessorsLoading,
    isFetching,
    isError: assessorsError,
    error: assessorsErrorDetail,
    refetch: refetchAssessors,
  } = useGetAssessorsQuery(selectedSectorCode, {
    skip: !selectedSectorCode,
  });

  // Extract assessors array from various possible response shapes
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
    }
  }

  const getSelectedSectorName = () => {
    const found = sectors.find(s => s.code === selectedSectorCode);
    return found ? found.name : "Select a Sector";
  };

  // Determine error message for assessors
  const getAssessorsErrorMessage = () => {
    if (assessorsErrorDetail) {
      if (typeof assessorsErrorDetail === 'string') return assessorsErrorDetail;
      if (assessorsErrorDetail?.data?.message) return assessorsErrorDetail.data.message;
      if (assessorsErrorDetail?.message) return assessorsErrorDetail.message;
      return "Failed to load assessors. Please check your connection.";
    }
    return "Unable to fetch assessors data. Please try again later.";
  };

  // Determine sector error message
  const getSectorsErrorMessage = () => {
    return "Failed to load sectors list. Please refresh the page or try again later.";
  };

  // Loading state for sectors dropdown button
  const isSectorsLoading = sectorsLoading;

  return (
    <>
      <BreadcrumbHero label="Public Info" title="Our Assessors" bgImage={blacklistedassessors} />

      <section className="bg-white lg:py-12 py-6">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:mb-8 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Assessors List</h2>
            
            {/* Sector Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => !isSectorsLoading && setDropOpen(!dropOpen)}
                className="button_dropdowns hover:border-gray-400 transition-colors flex items-center justify-between gap-2 px-4 py-2 border rounded-md bg-white min-w-[200px]"
                disabled={isSectorsLoading}
              >
                <span className={`truncate ${isSectorsLoading ? 'text-gray-400' : 'text-gray-700'}`}>
                  {isSectorsLoading ? "Loading sectors..." : getSelectedSectorName()}
                </span>
                <MdKeyboardArrowDown size={20} className={`flex-shrink-0 text-[#989898] transition-transform ${dropOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {dropOpen && !isSectorsLoading && !sectorsError && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white shadow-lg rounded-md max-h-80 overflow-auto z-10 border border-gray-200">
                  {sectors.map((sector) => (
                    <button
                      key={sector.id}
                      onClick={() => {
                        setSelectedSectorCode(sector.code);
                        setDropOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 hover:bg-purple-50 transition-colors"
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

          {/* Sectors Error Display */}
          {sectorsError && (
            <div className="mb-6">
              <ErrorBox 
                message={getSectorsErrorMessage()} 
                onRetry={refetchSectors}
                isSectorError={true}
              />
            </div>
          )}

          {/* Assessors Table Section */}
          <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
            <table className="w-full border-collapse min-w-[800px]">
              <thead>
                <tr style={{ background: "#ede8f8" }} className="border-b">
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700" style={{width: "6%"}}>S.NO</th>
                  <th className="text-center py-3 px-2 text-sm font-semibold text-gray-700" style={{width: "10%"}}>Image</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Name</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Email</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Contact</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Aadhar No.</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Experience</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">Qualification</th>
                  <th className="text-left py-3 px-2 text-sm font-semibold text-gray-700">State</th>
                </tr>
              </thead>
              <tbody>
                {!selectedSectorCode && !sectorsError ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500 bg-gray-50">
                      Please select a sector to view assessors
                    </td>
                  </tr>
                ) : assessorsLoading || isFetching ? (
                  // Skeleton loading rows
                  Array(5).fill().map((_, idx) => <SkeletonRow key={idx} />)
                ) : assessorsError ? (
                  <tr>
                    <td colSpan={9} className="p-0">
                      <ErrorBox 
                        message={getAssessorsErrorMessage()} 
                        onRetry={refetchAssessors}
                      />
                    </td>
                  </tr>
                ) : assessors.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-12 text-center text-gray-500 bg-gray-50">
                      No assessors found for {getSelectedSectorName()}
                    </td>
                  </tr>
                ) : (
                  assessors.map((assessor, i) => (
                    <tr key={assessor.id || i} className="hover:bg-purple-50 transition-colors border-b">
                      <td className="px-4 py-3 text-center text-gray-600">{i + 1}</td>
                      <td className="px-4 py-3 text-center">
                        <img 
                          src={assessor?.profileImage || users} 
                          className="w-10 h-10 rounded-full object-cover mx-auto border border-gray-200" 
                          alt={`${assessor.name || 'Assessor'}'s profile`}
                          onError={(e) => { e.target.src = users }}
                        />
                      </td>
                      <td className="text-left px-2 py-3 font-medium text-gray-800">{assessor.name || assessor.FirstName || "—"}</td>
                      <td className="text-left px-2 py-3 text-gray-600">{assessor.email || assessor.Email || "—"}</td>
                      <td className="text-left px-2 py-3 text-gray-600">{assessor.contact || assessor.Contact || "—"}</td>
                      <td className="text-left px-2 py-3 text-gray-600">{assessor.aadhar || assessor.Aadhar || "—"}</td>
                      <td className="px-2 py-3 text-gray-600">
                        {(() => {
                          const exp = assessor.experience || assessor.Experience;
                          return exp && exp !== "—" ? `${exp} yr` : "—";
                        })()}
                      </td>
                      <td className="text-left px-2 py-3 text-gray-600">{assessor.qualification || assessor.Qualification || "—"}</td>
                      <td className="text-left px-2 py-3 text-gray-600">{assessor?.state?.name || "—"}</td>
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