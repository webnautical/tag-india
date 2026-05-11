import { useState } from "react";
import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";

export default function IndustriesSection({ data }) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!data?.items?.length) return null;

  const activeItem = data.items[activeIndex];
  const displayImage = activeItem?.image
    ? `${IMG_BASE_URL_PUBLIC()}${activeItem.image}`
    : null;

  return (
    <section className="w-full py-16 px-4" style={{ background: "#e8ecf8" }}>
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          {data?.heading && (
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {data.heading}
            </h2>
          )}
          {data?.subHeading && (
            <p className="text-gray-500 text-sm">{data.subHeading}</p>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — Icon Grid */}
          <div className="grid grid-cols-3 gap-3 lg:w-[340px] flex-shrink-0">
            {data.items.map((ind, i) => {
              const isActive = activeIndex === i;
              return (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200 cursor-pointer"
                  style={{
                    background: "#fff",
                    border: isActive ? "2px solid #7c3abf" : "2px solid transparent",
                    boxShadow: isActive
                      ? "0 4px 16px rgba(124,58,191,0.15)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                  }}
                >
                  {ind?.logo && (
                    <img
                      src={`${IMG_BASE_URL_PUBLIC()}${ind.logo}`}
                      alt={ind?.name ?? ''}
                      className="w-7 h-7 object-contain"
                      style={{ filter: isActive ? "none" : "grayscale(40%)" }}
                    />
                  )}
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: isActive ? "#7c3abf" : "#555" }}
                  >
                    {ind?.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right — Image + Content */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">

            {/* Active industry image — per item */}
            {displayImage ? (
              <div
                key={activeIndex}
                className="w-full lg:w-[55%] rounded-2xl overflow-hidden flex-shrink-0"
                style={{ aspectRatio: "4/3", animation: "fadeIn 0.35s ease" }}
              >
                <img
                  src={displayImage}
                  alt={activeItem?.name ?? ''}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              // Placeholder box when no image available
              <div
                className="w-full lg:w-[55%] rounded-2xl flex-shrink-0 flex items-center justify-center bg-white"
                style={{ aspectRatio: "4/3" }}
              >
                <span className="text-gray-300 text-sm">No image</span>
              </div>
            )}

            {/* Active industry name + description */}
            <div
              key={`content-${activeIndex}`}
              className="flex flex-col justify-center"
              style={{ animation: "fadeIn 0.35s ease" }}
            >
              {activeItem?.name && (
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  {activeItem.name}
                </h3>
              )}
              {activeItem?.description && (
                <p className="text-gray-500 text-sm leading-relaxed">
                  {activeItem.description}
                </p>
              )}
            </div>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}