// src/components/OurPartners.jsx

import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";

const OurPartners = ({ data = [] }) => {
  const partnerData = data.reduce((acc, partner) => {
    const type = partner.our_partner_type;
    if (!acc[type]) acc[type] = [];
    acc[type].push(partner);
    return acc;
  }, {});
  const pTabs = Object.keys(partnerData);
  if (!pTabs.length) return null;

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
                  <a
                    key={i}
                    href={p.our_partner_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center p-2 rounded-xl bg-white hover:shadow-md transition-shadow duration-200"
                    style={{ border: "1px solid #e8e8f0", minHeight: 72 }}
                  >
                    <img
                      src={IMG_BASE_URL_PUBLIC()+p.our_partner_logo}
                      alt={`${tab} partner`}
                      className="max-h-10 max-w-full object-contain"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "block";
                      }}
                    />
                    <span
                      className="text-xs font-semibold text-gray-400 text-center leading-tight px-1"
                      style={{ display: "none" }}
                    >
                      {tab} Partner
                    </span>
                  </a>
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