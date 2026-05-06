// src/components/OurPartners.jsx
// Step 1 — top pe import karo
// Step 2 — partnerData mein logo add karo
const partnerData = {
  "Sector Skill Councils": [
    { name: "Partner 1", logo: null },
    { name: "Partner 2", logo: null },
    { name: "ESSCI",     logo: null },
    { name: "FICSI",     logo: null },
    { name: "Partner 5", logo: null },
    { name: "Partner 6", logo: null },
  ],
  "State Skill Missions": [
    { name: "ASDM",      logo: null },
    { name: "Partner 2", logo: null },
    { name: "Partner 3", logo: null },
    { name: "Partner 4", logo: null },
  ],
  "Schemes": [
    { name: "PMKUVA",  logo: null },
    { name: "PMKVY",   logo: null },
    { name: "ESDM",    logo: null },
    { name: "DDU-GKY", logo: null },
  ],
};

const pTabs = Object.keys(partnerData);

const OurPartners = () => {
  return (
    <section className="bg-white py-14 border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-extrabold text-gray-900 text-center mb-10">
          Our partners
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {pTabs.map((tab) => (
            <div key={tab}>
              <div
                className="text-center mb-5 px-6 py-2 rounded-full text-sm font-medium mx-auto"
                style={{ border: "1.5px solid #c084fc", background: "#faf5ff", color: "#6A1B9A", display: "table" }}
              >
                {tab}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {partnerData[tab].map((p, i) => (
                  <div key={i} className="flex items-center justify-center p-2 rounded-xl bg-white"
                    style={{ border: "1px solid #e8e8f0", minHeight: 72 }}>
                    {p.logo ? (
                      <img src={p.logo} alt={p.name} className="max-h-10 max-w-full object-contain" />
                    ) : (
                      <span className="text-xs font-semibold text-gray-400 text-center leading-tight px-1">{p.name}</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurPartners;