import { BsBarChartFill } from "react-icons/bs";
import { MdSupportAgent, MdNaturePeople } from "react-icons/md";
import { RiLeafFill } from "react-icons/ri";

const features = [
  {
    title: "Data-Driven Insights",
    description:
      "We provide accurate, analytics-based assessments to help you make informed strategic decisions.",
    points: [
      {
        icon: <BsBarChartFill size={16} className="text-[#5b7cfa]" />,
        text: "AI-powered evaluation",
      },
      {
        icon: <MdSupportAgent size={16} className="text-[#5b7cfa]" />,
        text: "Real-time decision support",
      },
    ],
    image: "/assets/img/data-driven.png",
    imageAlt: "Data Driven Insights",
  },
  {
    title: "ESG & CSR Expertise",
    description:
      "Our team ensures your business aligns with modern sustainability standards and social impact goals.",
    points: [
      {
        icon: <RiLeafFill size={16} className="text-[#5b7cfa]" />,
        text: "ESG performance analysis",
      },
      {
        icon: <MdNaturePeople size={16} className="text-[#5b7cfa]" />,
        text: "CSR impact measurement",
      },
    ],
    image: "/assets/img/esg-csr.png",
    imageAlt: "ESG CSR Expertise",
  },
];

function FeatureCard({ feature }) {
  return (
    <div
      className="rounded-3xl overflow-hidden flex flex-col lg:flex-row"
      style={{ background: "#e8ecf8", minHeight: "280px" }}
    >
      {/* Left — Text */}
      <div className="flex flex-col justify-center px-10 py-12 lg:w-1/2">
        <h3 className="text-2xl font-bold text-gray-900 mb-3">
          {feature.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-sm">
          {feature.description}
        </p>
        <ul className="flex flex-col gap-3">
          {feature.points.map((point, i) => (
            <li key={i} className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center shadow-sm flex-shrink-0">
                {point.icon}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {point.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Right — Image only */}
      <div className="lg:w-1/2 flex items-center justify-center p-6 lg:p-10">
        <img
          src={feature.image}
          alt={feature.imageAlt}
          className="w-full h-auto object-contain max-h-[300px] rounded-2xl"
        />
      </div>
    </div>
  );
}

export default function WhyChooseUsServices() {
  return (
    <section className="w-full py-16 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
          Why Choose Us For Corporate Assessment
        </h2>
        <div className="flex flex-col gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}