import { useState } from "react";
import {
  MdShoppingCart,
  MdFlight,
  MdFavorite,
  MdFitnessCenter,
  MdTv,
  MdSchool,
  MdRestaurant,
  MdAccountBalance,
  MdFavoriteBorder,
} from "react-icons/md";

const industries = [
  {
    id: "ecommerce",
    label: "Ecommerce",
    icon: <MdShoppingCart size={28} />,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=700&q=80",
    title: "Ecommerce",
    description:
      "We help ecommerce businesses scale with smart digital strategies, seamless user experiences, and data-driven insights that convert visitors into loyal customers.",
  },
  {
    id: "travel",
    label: "Travel",
    icon: <MdFlight size={28} />,
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80",
    title: "Travel",
    description:
      "From booking platforms to destination marketing, we empower travel businesses with technology solutions that deliver seamless journey experiences for every traveler.",
  },
  {
    id: "healthcare",
    label: "Healthcare",
    icon: <MdFavorite size={28} />,
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=700&q=80",
    title: "Healthcare",
    description:
      "We build compliant, secure, and user-friendly healthcare platforms that improve patient outcomes, streamline operations, and support medical professionals.",
  },
  {
    id: "fitness",
    label: "Fitness",
    icon: <MdFitnessCenter size={28} />,
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=700&q=80",
    title: "Fitness",
    description:
      "We create engaging fitness apps and platforms that keep users motivated, track progress, and connect coaches with clients for a better wellness journey.",
  },
  {
    id: "entertainment",
    label: "Entertainment",
    icon: <MdTv size={28} />,
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=80",
    title: "Entertainment",
    description:
      "From streaming platforms to event management systems, we deliver immersive digital experiences that captivate audiences and drive engagement.",
  },
  {
    id: "education",
    label: "Education",
    icon: <MdSchool size={28} />,
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=700&q=80",
    title: "Education",
    description:
      "We design intuitive e-learning platforms, LMS systems, and EdTech solutions that make quality education accessible, engaging, and effective for all learners.",
  },
  {
    id: "restaurant",
    label: "Restaurant",
    icon: <MdRestaurant size={28} />,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&q=80",
    title: "Restaurant",
    description:
      "From online ordering systems to table management tools, we help restaurants deliver exceptional dining experiences both online and in-person.",
  },
  {
    id: "finance",
    label: "Finance",
    icon: <MdAccountBalance size={28} />,
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=700&q=80",
    title: "Finance",
    description:
      "The advantage of online banking is that you can pay bills super-fast, and your account is automatically credited or debited for each deposit and payment, making it easier to stay on track. The banking, finance, and insurance sector has seen huge growth due to the emergence of many private companies.",
  },
  {
    id: "dating",
    label: "Dating",
    icon: <MdFavoriteBorder size={28} />,
    image: "https://images.unsplash.com/photo-1516589091380-5d8e87df6999?w=700&q=80",
    title: "Dating",
    description:
      "We build safe, engaging, and feature-rich dating platforms with smart matching algorithms, real-time chat, and profile verification systems.",
  },
];

export default function IndustriesSection() {
  const [active, setActive] = useState("finance");

  const activeItem = industries.find((ind) => ind.id === active);

  return (
    <section
      className="w-full py-16 px-4"
      style={{ background: "#e8ecf8" }}
    >
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            We Serve All Industries
          </h2>
          <p className="text-gray-500 text-sm">
            We stay on top of our industry by being experts in yours.
          </p>
        </div>

        {/* Body */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* Left — Icon Grid */}
          <div className="grid grid-cols-3 gap-3 lg:w-[340px] flex-shrink-0">
            {industries.map((ind) => {
              const isActive = active === ind.id;
              return (
                <button
                  key={ind.id}
                  onClick={() => setActive(ind.id)}
                  className="flex flex-col items-center gap-2 py-4 px-2 rounded-2xl transition-all duration-200 cursor-pointer"
                  style={{
                    background: isActive ? "#fff" : "#fff",
                    border: isActive
                      ? "2px solid #7c3abf"
                      : "2px solid transparent",
                    boxShadow: isActive
                      ? "0 4px 16px rgba(124,58,191,0.15)"
                      : "0 1px 4px rgba(0,0,0,0.06)",
                    color: isActive ? "#7c3abf" : "#555",
                  }}
                >
                  <span
                    style={{
                      color: isActive ? "#7c3abf" : "#888",
                    }}
                  >
                    {ind.icon}
                  </span>
                  <span
                    className="text-xs font-medium text-center leading-tight"
                    style={{ color: isActive ? "#7c3abf" : "#555" }}
                  >
                    {ind.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right — Image + Content */}
          <div className="flex-1 flex flex-col lg:flex-row gap-6 items-start">

            {/* Image */}
            <div
              className="w-full lg:w-[55%] rounded-2xl overflow-hidden flex-shrink-0"
              style={{ aspectRatio: "4/3" }}
            >
              <img
                key={activeItem.id}
                src={activeItem.image}
                alt={activeItem.title}
                className="w-full h-full object-cover transition-opacity duration-300"
                style={{ animation: "fadeIn 0.35s ease" }}
              />
            </div>

            {/* Text */}
            <div
              className="flex flex-col justify-center"
              key={activeItem.id}
              style={{ animation: "fadeIn 0.35s ease" }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {activeItem.title}
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {activeItem.description}
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Fade animation */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}