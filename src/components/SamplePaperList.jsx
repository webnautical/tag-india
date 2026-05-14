import { useState, useEffect, useMemo } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useGetSamplePaperQuery } from "../api/TagIndiaAPI"; // adjust path to your RTK api slice

// PDF Icon SVG
function PdfIcon() {
  return (
    <svg width="22" height="24" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.93551 16.7742H2.09676C0.938742 16.7742 0 15.8354 0 14.6774C0 13.9826 0.563266 13.4194 1.25805 13.4194H2.93546L2.93551 16.7742Z" fill="#BD4150" />
      <path d="M18.8719 0H3.35577L2.92383 0.838703V25.5938H22.6461L23.4848 25.1613V4.61292L18.8719 0Z" fill="#ECEAEC" />
      <path d="M3.35433 23.9032V0C2.89115 0 2.51562 0.375477 2.51562 0.838703V25.1613C2.51562 25.6245 2.89115 26 3.35433 26H22.6447C23.1078 26 23.4834 25.6245 23.4834 25.1613H4.61238C3.91754 25.1613 3.35433 24.598 3.35433 23.9032ZM23.4834 4.54091C23.4834 4.31849 23.395 4.10516 23.2377 3.94784L19.5353 0.245629C19.378 0.0883566 19.1647 2.03599e-06 18.9423 0L18.8704 0V4.19357C18.8704 4.30479 18.9146 4.41145 18.9933 4.49009C19.0719 4.56874 19.1786 4.61292 19.2898 4.61292H23.4834V4.54091Z" fill="#DAD8DB" />
      <path d="M14.259 15.9355H1.25896C1.1119 15.9355 0.97068 15.9102 0.839461 15.8638L0.435547 16.5377V21.8359C0.435547 22.5307 0.998812 23.094 1.6936 23.094H14.259L15.0977 22.6451V16.7742C15.0977 16.311 14.7222 15.9355 14.259 15.9355Z" fill="#E15F78" />
      <path d="M0.838703 15.8639C0.351203 15.6906 0 15.2244 0 14.6774V22.2258C0 22.9206 0.563266 23.4839 1.25805 23.4839H14.2581C14.7212 23.4839 15.0968 23.1083 15.0968 22.6452H2.09676C1.40197 22.6452 0.838703 22.0819 0.838703 21.3871V15.8639Z" fill="#DB4655" />
      <path d="M11.9687 19.2588H11.1455V18.4639H12.076C12.3078 18.4639 12.4953 18.2761 12.4953 18.0446C12.4953 17.813 12.3077 17.6252 12.076 17.6252H10.7262C10.6711 17.6252 10.6166 17.636 10.5657 17.6571C10.5148 17.6782 10.4686 17.7091 10.4296 17.748C10.3907 17.7869 10.3598 17.8332 10.3387 17.8841C10.3176 17.9349 10.3068 17.9895 10.3068 18.0446V21.3748C10.3068 21.6064 10.4944 21.7942 10.7262 21.7942C10.9579 21.7942 11.1455 21.6064 11.1455 21.3748V20.0975H11.9687C12.2005 20.0975 12.388 19.9098 12.388 19.6782C12.388 19.4466 12.2004 19.2588 11.9687 19.2588ZM4.27735 17.6129H3.34323C3.28807 17.6129 3.23345 17.6238 3.1825 17.645C3.13155 17.6661 3.08528 17.6971 3.04631 17.7362C2.96807 17.8148 2.92414 17.9213 2.92413 18.0323H2.92383V21.3871C2.92383 21.6187 3.11141 21.8065 3.34318 21.8065C3.57495 21.8065 3.76253 21.6187 3.76253 21.3871V20.347C3.95068 20.346 4.15751 20.3451 4.2773 20.3451C5.04064 20.3451 5.6619 19.7322 5.6619 18.9791C5.66195 18.2257 5.0407 17.6129 4.27735 17.6129ZM4.27735 19.5063C4.10713 19.5066 3.93691 19.5072 3.7667 19.5082C3.76588 19.3147 3.76385 18.4516 3.76385 18.4516H4.2774C4.57351 18.4516 4.8233 18.6932 4.8233 18.9791C4.8233 19.2649 4.57346 19.5063 4.27735 19.5063ZM7.79395 17.6625H6.87212C6.81697 17.6625 6.76236 17.6733 6.71141 17.6944C6.66046 17.7155 6.61418 17.7465 6.5752 17.7855C6.53624 17.8245 6.50536 17.8709 6.48435 17.9219C6.46334 17.9729 6.45261 18.0275 6.45277 18.0826L6.45521 19.706C6.45521 20.1587 6.45932 21.339 6.45932 21.339C6.45954 21.3941 6.47061 21.4486 6.4919 21.4995C6.5132 21.5503 6.5443 21.5965 6.58343 21.6353C6.66196 21.7132 6.7681 21.7569 6.87872 21.7569H6.88035C6.88035 21.7569 7.56386 21.7543 7.82838 21.7498C8.81329 21.7323 9.52834 20.8744 9.52834 19.7097C9.52829 18.4852 8.83126 17.6625 7.79395 17.6625ZM7.81361 20.911C7.69361 20.913 7.48596 20.9149 7.2968 20.9159C7.29559 20.532 7.29396 19.9828 7.29396 19.706L7.29234 18.5011H7.794C8.64662 18.5011 8.68963 19.5078 8.68963 19.7096C8.68958 20.3 8.41887 20.9004 7.81361 20.911Z" fill="white" />
      <path d="M8.79331 14.1864C8.46979 14.1864 8.17739 14.0181 7.97182 13.7005C7.66632 13.2292 7.74661 12.6953 8.19176 12.2358C8.64061 11.7722 9.55915 11.3361 10.6645 10.98C11.0093 10.3301 11.3603 9.5694 11.6883 8.72841C11.882 8.23146 12.0384 7.78342 12.1638 7.38271C11.6113 6.36993 11.2829 5.42702 11.3701 4.81475C11.459 4.19349 11.923 3.84376 12.6126 3.88185C12.8174 3.89292 13.3059 3.99981 13.4239 4.75209C13.514 5.32729 13.3625 6.25709 13.0586 7.31369C13.6336 8.28367 14.4219 9.3226 15.193 10.12C16.3586 10.0489 17.3463 10.1339 17.843 10.4336C18.2321 10.6683 18.3848 11.051 18.2517 11.457C18.0339 12.1207 17.5076 12.4247 16.8425 12.2697C16.2827 12.1391 15.589 11.6503 14.8854 10.9718C13.7539 11.0713 12.4221 11.3016 11.2538 11.6452C10.5563 12.8969 9.80239 13.8714 9.1693 14.1135C9.04153 14.1625 8.91539 14.1864 8.79331 14.1864ZM8.6754 13.2447C8.74543 13.3524 8.78392 13.3502 8.80195 13.3481C9.06895 13.3209 9.5137 12.86 10.0215 12.0808C9.68569 12.2248 9.38471 12.3808 9.13162 12.5483C8.49685 12.9687 8.63158 13.1763 8.6754 13.2447ZM16.0633 10.9164C16.4216 11.1965 16.7545 11.3879 17.033 11.4531C17.2505 11.5037 17.3623 11.4779 17.4548 11.1959C17.3312 11.0083 16.8049 10.9182 16.0633 10.9164ZM12.7326 8.33059C12.4519 9.1272 12.1273 9.90765 11.7604 10.6684C12.5463 10.471 13.3747 10.3155 14.1659 10.2169C13.6544 9.63719 13.1601 8.98607 12.7326 8.33059ZM12.5307 4.70344C12.2329 4.70344 12.2174 4.81505 12.2002 4.93297C12.1564 5.24278 12.2653 5.68341 12.4803 6.19143C12.6699 5.28615 12.6314 4.80723 12.5392 4.70344H12.5307Z" fill="#E15F78" />
    </svg>
  );
}

// Skeleton loader rows
function SkeletonRows({ count = 5 }) {
  return Array.from({ length: count }).map((_, i) => (
    <tr key={i} style={{ borderTop: i === 0 ? "none" : undefined }}>
      <td className="text-center">
        <div style={{ height: 14, width: 20, background: "#e8e8f0", borderRadius: 4, margin: "0 auto", animation: "pulse 1.5s ease-in-out infinite" }} />
      </td>
      <td>
        <div style={{ height: 14, width: "60%", background: "#e8e8f0", borderRadius: 4, animation: "pulse 1.5s ease-in-out infinite" }} />
      </td>
    </tr>
  ));
}

export default function SamplePaperList() {
  const { data, isLoading, isError } = useGetSamplePaperQuery();
  const [selected, setSelected] = useState(null);
  const [dropOpen, setDropOpen] = useState(false);

  // Group API data by sector_name
  const councilData = {};
  if (data?.data) {
    data.data.forEach((item) => {
      if (!item.is_active) return;
      const sector = item.sector_name || "Uncategorised";
      if (!councilData[sector]) councilData[sector] = [];
      councilData[sector].push({
        id: item.id,
        title: item.job_role,
        pdf: item.pdf_url,
      });
    });
  }

  const councils = Object.keys(councilData);

  // Auto-select first sector once data arrives
  useEffect(() => {
    if (councils.length > 0 && !selected) {
      setSelected(councils[0]);
    }
  }, [councils.length]);

  const papers = selected ? (councilData[selected] || []) : [];

  return (
    <section className="bg-white lg:py-12 py-6 blacklist_section">
      {/* Pulse animation keyframes */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Top Row — Title + Dropdown ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 lg:mb-8 mb-4">
          <h2>Sample Paper List</h2>

          {/* Dropdown — hidden while loading */}
          {!isLoading && !isError && councils.length > 0 && (
            <div className="relative">
              <button
                onClick={() => setDropOpen((prev) => !prev)}
                className="button_dropdowns hover:border-gray-400 transition-colors"
              >
                <span className="truncate">{selected}</span>
                <MdKeyboardArrowDown
                  size={20}
                  className="flex-shrink-0 text-[#989898]"
                  style={{
                    transition: "transform 0.2s",
                    transform: dropOpen ? "rotate(180deg)" : "rotate(0deg)",
                  }}
                />
              </button>

              {dropOpen && (
                <div className="absolute top-full left-0 right-0 mt-1 button_inner shadow-lg overflow-hidden z-10">
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
          )}
        </div>

        {/* ── Error State ── */}
        {isError && (
          <div
            className="text-center py-10"
            style={{ color: "#e91e63", border: "1px solid #fce4ec", borderRadius: 8, background: "#fff5f7" }}
          >
            <p className="font-medium">Could not load sample papers.</p>
            <p className="text-sm mt-1 text-gray-500">Please try again later.</p>
          </div>
        )}

        {!isError && (
          <div
            className="w-full overflow-x-auto table_alls"
            style={{ border: "1px solid #e8e8f0" }}
          >
            <table className="w-full border-collapse">
              <thead>
                <tr style={{ background: "#ede8f8" }}>
                  <th className="text-center" style={{ width: "50px" }}>S.NO</th>
                  <th className="text-left">Job Role</th>
                </tr>
              </thead>

              <tbody>
                {isLoading ? (
                  <SkeletonRows count={5} />
                ) : papers.length > 0 ? (
                  papers.map((paper, i) => (
                    <tr
                      key={paper.id}
                      className="hover:bg-[#f1e6f94d] transition-colors"
                      style={{ borderTop: i === 0 ? "none" : undefined }}
                    >
                      <td className="text-center">{i + 1}</td>
                      <td>
                        <a
                          href={paper.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 group"
                        >
                          <PdfIcon />
                          <span className="text-sm text-gray-800 group-hover:text-[#6A1B9A] transition-colors">
                            {paper.title}
                          </span>
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={2} className="py-12 text-center">
                      No papers available for this sector.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

      </div>
    </section>
  );
}