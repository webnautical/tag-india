import { IMG_BASE_URL_PUBLIC } from "../../helper/utils";
import HTMLContent from "../HTMLContent";


function FeatureCard({ feature }) {

  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col lg:flex-row"
      style={{ background: "#e8ecf8", minHeight: "280px" }}
    >
      {/* Left — Text */}
      <div className="flex flex-col justify-center px-10 py-12 lg:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {feature?.why_choose_us_title}
        </h3>

        {/* First <p> tag as description */}
        {feature?.why_choose_us_description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
            <HTMLContent data={feature?.why_choose_us_description}/>
          </p>
        )}

      </div>

      {/* Right — Image */}
      {feature?.why_choose_us_image && (
        <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-10">
          <img
            src={`${IMG_BASE_URL_PUBLIC()}${feature.why_choose_us_image}`}
            alt={feature?.why_choose_us_title ?? ''}
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