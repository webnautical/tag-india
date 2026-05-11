import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";

function parsePoints(html = '') {
  const matches = html?.match(/<li>(.*?)<\/li>/gs) ?? [];
  return matches.map(li =>
    li.replace(/<[^>]*>/g, '').trim()
  ).filter(Boolean);
}

function stripHtml(html = '') {
  return html?.replace(/<[^>]*>/g, '').trim() ?? '';
}

function FeatureCard({ feature }) {
  const points = parsePoints(feature?.description ?? '');

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col lg:flex-row"
      style={{ background: "#e8ecf8", minHeight: "280px" }}
    >
      {/* Left — Text */}
      <div className="flex flex-col justify-center px-10 py-12 lg:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {feature?.title}
        </h3>

        {/* First <p> tag as description */}
        {feature?.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
            {stripHtml(feature.description?.match(/<p>(.*?)<\/p>/s)?.[1] ?? '')}
          </p>
        )}

        {/* <li> items as bullet points */}
        {points.length > 0 && (
          <ul className="flex flex-col gap-3">
            {points.map((point, i) => (
              <li key={i} className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: "#5b7cfa" }}
                  />
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right — Image */}
      {feature?.image && (
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-10">
          <img
            src={`${IMG_BASE_URL_PUBLIC()}${feature.image}`}
            alt={feature?.title ?? ''}
            className="w-full h-auto object-contain max-h-[300px] rounded-2xl"
          />
        </div>
      )}
    </div>
  );
}

export default function WhyChooseUsServices({ data }) {
  if (!data?.items?.length) return null;

  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">

        {data?.heading && (
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            {data.heading}
          </h2>
        )}

        <div className="flex flex-col gap-6">
          {data.items.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}