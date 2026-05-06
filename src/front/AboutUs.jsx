// src/front/AboutUs.jsx
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
// import OurPartners from "../components/OurPartners";
// import Testimonials from "../components/Home/Testimonials";
// ── Images ──
import aboutImg    from "../assets/img/about.png";
import founderImg  from "../assets/img/founder-img.png";
import purpleDiag  from "../assets/img/purple-diag.png";
import tigerImg    from "../assets/img/tiger-img.png";
import OurPartners from "../components/Services/OurPartners";
import Testimonials from "../components/Home/Testimonials";

// ══ SVG ICONS ══
const GoalIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M38.5539 20.3465C38.4604 19.9377 38.5318 19.5086 38.7527 19.1521C38.9735 18.7956 39.3259 18.5405 39.7335 18.4421C40.1411 18.3437 40.5711 18.4099 40.9303 18.6264C41.2894 18.8428 41.5488 19.1921 41.6521 19.5985C42.0368 21.1923 42.2408 22.8562 42.2408 24.5668C42.2408 36.2224 32.7781 45.6872 21.1204 45.6872C9.46475 45.6872 0 36.2224 0 24.5668C0 12.909 9.46475 3.44641 21.1204 3.44641C22.831 3.44641 24.4949 3.65041 26.0886 4.03504C26.4942 4.13379 26.855 4.38654 27.0883 4.74946C27.3216 5.11238 27.3989 5.55189 27.3071 5.96273C27.2153 6.37358 26.9618 6.73123 26.6032 6.95715C26.2447 7.18308 25.8111 7.25855 25.3406 7.13329C22.7026 6.49579 19.9543 6.46514 17.3028 7.04366C14.6512 7.62217 12.1654 8.79477 10.0327 10.4731C7.89995 12.1515 6.17581 14.2919 4.99011 16.7332C3.80442 19.1744 3.18808 21.8528 3.1875 24.5668C3.1875 34.465 11.2221 42.4997 21.1204 42.4997C31.0187 42.4997 38.5539 35.2654 38.5539 20.3465Z" fill="#6A1B9A"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M29.9715 13.4611C30.5947 12.8379 31.6028 12.8379 32.226 13.4611C32.8492 14.0843 32.8492 15.0925 32.226 15.7157L22.4788 25.461C21.8556 26.0842 20.8474 26.0842 20.2242 25.461C19.601 24.8378 19.601 23.8297 20.2242 23.2065L29.9715 13.4611Z" fill="#6A1B9A"/>
  </svg>
);
const MissionIcon = () => (
  <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M43.9485 3.28469C43.8532 1.5369 42.4631 0.147028 40.7153 0.0516379C37.1886 -0.141034 30.2875 0.0463958 23.6885 3.45958C20.3245 5.19964 16.7667 8.14979 13.9274 11.5536L7.38008 12.1775C6.31944 12.2595 5.37472 12.8154 4.78812 13.7026L0.392068 20.3518C-0.0528301 21.0247 -0.123557 21.8668 0.202748 22.6044C0.529139 23.3421 1.1998 23.8562 1.99687 23.9796L7.42562 24.8205C7.18887 26.2181 7.54705 27.3296 8.32788 28.1103L15.8897 35.6722C16.5371 36.3196 17.4118 36.6765 18.3081 36.6765L19.1796 36.5744L20.0205 42.0032C20.1439 42.8003 20.658 43.471 21.3955 43.7973C22.0215 43.9999 22.8122 43.9998 23.6482 43.6081L30.2974 39.212C31.1847 38.6253 31.7405 37.6806 31.8223 36.62L32.3201 30.1765C35.8502 27.2335 38.8005 23.6757 40.5404 20.3116C43.9538 13.7123 44.1409 6.81114 43.9485 3.28469ZM30.7951 28.0929C28.7126 29.8299 24.8278 31.9955 24.8278 31.9955L12.0041 19.1718C13.195 16.7394 15.9071 13.2051 15.9071 13.2051C18.5347 10.055 21.8026 7.33759 24.8731 5.74947C30.9294 2.61679 37.3104 2.44809 40.575 2.62581C41.3743 3.4252 41.5523 6.68979 38.2505 19.1271C36.6625 22.1975 33.9451 25.4653 30.7951 28.0929Z" fill="#6A1B9A"/>
    <path d="M30.14 20.3021C33.671 20.3021 36.5851 17.388 36.5851 13.8601C36.5851 10.3322 33.671 7.41797 30.14 7.41797C26.609 7.41797 23.6949 10.3322 23.6949 13.8601C23.6949 17.388 26.609 20.3021 30.14 20.3021Z" fill="#6A1B9A"/>
  </svg>
);
const VisionIcon = () => (
  <svg width="46" height="46" viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M45.8019 29.3676C41.7718 21.5094 33.0007 14.375 23 14.375C12.929 14.375 4.18344 21.5964 0.19797 29.3676C0.0678592 29.6213 0 29.9024 0 30.1875C0 30.4727 0.0678592 30.7538 0.19797 31.0075C4.22809 38.8656 12.9992 46 23 46C34.3239 46 42.671 37.1125 45.8019 31.0074C45.932 30.7537 45.9999 30.4726 45.9999 30.1875C45.9999 29.9024 45.932 29.6213 45.8019 29.3676ZM23 42.4062C14.8443 42.4062 7.99838 36.988 3.86719 30.1875C7.95265 23.4622 14.7767 17.9688 23 17.9688C31.188 17.9688 38.0247 23.4254 42.1327 30.1875C37.9825 37.019 31.1092 42.4062 23 42.4062ZM23 21.3604C18.1327 21.3604 14.1728 25.3202 14.1728 30.1875C14.1728 35.0548 18.1327 39.0146 23 39.0146C27.8672 39.0146 31.8271 35.0548 31.8271 30.1875C31.8271 25.3202 27.8672 21.3604 23 21.3604ZM23 35.4209C20.1143 35.4209 17.7666 33.0732 17.7666 30.1875C17.7666 27.3018 20.1143 24.9541 23 24.9541C25.8856 24.9541 28.2333 27.3018 28.2333 30.1875C28.2333 33.0732 25.8856 35.4209 23 35.4209Z" fill="#7329A0"/>
  </svg>
);

// ── Data ──
const cards = [
  { icon: <GoalIcon />,    title: "Your Success is Our Goal", text: "We measure our achievements by the success of our clients. With a sharp focus on tangible results and unwavering quality, our mission is to craft digital solutions that leave a lasting impact." },
  { icon: <MissionIcon />, title: "Our Mission",              text: "To provide the best experience in meeting the expectations of our people with standards of quality, ethics and performance. We seek to be the one-stop window fulfilling the diverse needs of our clients. We want to convert our associates into a TAG community of happy people." },
  { icon: <VisionIcon />,  title: "Our Vision",               text: "To be the premier global tech company offering a gamut of services in the people sector." },
];

const stats = [
  { value: "600+", label: "Skills Certified" },
  { value: "600+", label: "Candidates Assessed" },
  { value: "600+", label: "Clients Served" },
];

const values = [
  { title: "Empower women",                  text: "There are more women at our workplaces than men." },
  { title: "Be inclusive.",                  text: "There are more women at our workplaces than men." },
  { title: "Be environmentally sustainable.", text: "There are more women at our workplaces than men." },
  { title: "Be socially responsible.",        text: "There are more women at our workplaces than men." },
  { title: "Embrace the change.",             text: "There are more women at our workplaces than men." },
  { title: "Be the change.",                  text: "There are more women at our workplaces than men." },
  { title: "Optimize and Execute.",           text: "There are more women at our workplaces than men." },
  { title: "Innovate and Grow.",              text: "There are more women at our workplaces than men." },
  { title: "Deliver the best.",               text: "There are more women at our workplaces than men." },
];

// ══ COMPONENT ══
export const AboutUs = () => {
    const topRef    = useRef(null);
  const bottomRef = useRef(null);
  const s1 = useRef(null);
  const s2 = useRef(null);
  const s3 = useRef(null);

  useEffect(() => {
    [s1, s2, s3].forEach((ref) => {
      if (!ref.current) return;
      gsap.fromTo(
        ref.current.querySelectorAll(".ai"),
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.65, ease: "power3.out" }
      );
    });
  }, []);

  return (
    <>
  {/* ══ SECTION 1 — Top: Left heading + Right text + Full image ══ */}
      <section className="bg-white pt-14 pb-0" ref={topRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Row: heading left + text right */}
          <div className="flex flex-col lg:flex-row gap-10 mb-10">

            {/* Left — Heading */}
            <div className="lg:w-2/5 anim-item">
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight"
               
              >
                Empowering Digital Innovation
                <span className="block text-[#6A1B9A]">&amp; Skill Development</span>
              </h2>
            </div>

            {/* Right — Description */}
            <div className="lg:w-3/5 anim-item">
              <p className="text-gray-500 text-sm leading-relaxed">
                We are a technology-driven company focused on delivering innovative digital solutions,
                including skill assessment platforms, web development, and impact-driven systems that
                help organizations grow and succeed.
              </p>
            </div>
          </div>

          {/* Full width image */}
          <div
            className="w-full overflow-hidden anim-item"
            style={{ borderRadius: "16px", maxHeight: "360px" }}
          >
            <img
              src={aboutImg}
              alt="Digital Innovation"
              className="w-full h-full object-cover"
              style={{ maxHeight: "360px" }}
            />
          </div>
        </div>
      </section>

      {/* ══ SECTION 2 — Bottom: Left text block + Right cards ══ */}
      <section className="bg-white py-14" ref={bottomRef}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — Heading + description */}
            <div className="lg:w-2/5 anim-item">
              <h2
                className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-5"
               
              >
                Empowering Digital Innovation
                <span className="block text-[#6A1B9A]">&amp; Skill Development</span>
              </h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                TAG Assessors Guild Pvt. Ltd (TAG), is an ISO 9001-2015 certified nationally
                accredited Assessment Body for carrying out assessments pan India in many sectors
                &amp; skill sets. TAG has made a tremendous contribution to Skill India Mission. TAG
                has a transparent assessment system using industry vetted skill question banks and
                processes as per laid down occupational standards &amp; employability skills.
              </p>
            </div>

            {/* Right — Cards */}
            <div className="lg:w-3/5 flex flex-col gap-8">
              {cards.map((card, i) => (
                <div key={i} className="flex items-start gap-5 anim-item">
                  {/* Icon circle */}
                  <div
                    className="flex-shrink-0  flex items-center justify-center"
                  >
                    {card.icon}
                  </div>

                  {/* Text */}
                  <div>
                    <h3 className="text-base font-bold text-gray-900 mb-1">
                      {card.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
      {/* ══ 1. HEADING + HERO IMAGE + STATS BAR ══ */}
      <section className="bg-white pt-14 pb-0" ref={s1}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        

          {/* Hero image + Stats overlay */}
          <div className="relative w-full overflow-hidden rounded-2xl ai">
            <img src={aboutImg} alt="Team" className="w-full object-cover block" style={{ maxHeight: 380 }} />
            {/* Stats bar — bottom overlay */}
            <div
              className="flex flex-col sm:flex-row"
              style={{ background: "rgba(106,27,154,0.95)" }}
            >
              <div className="px-8 py-6 flex-1">
                <p className="text-white font-bold text-xl leading-snug">
                  Our Numbers Speak<br />for Themselves
                </p>
              </div>
              {stats.map((s, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center justify-center px-8 py-6 flex-1"
                  style={{ borderLeft: "1px solid rgba(255,255,255,0.25)" }}
                >
                  <span className="text-white font-extrabold text-3xl">{s.value}</span>
                  <span className="text-xs mt-1" style={{ color: "#d8b4fe" }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ 2. ABOUT FOUNDER ══ */}
      <section className="bg-white py-16" ref={s2}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-12 items-start">

            {/* Left — text */}
            <div className="lg:w-3/5 ai">
              <h2 className="text-2xl font-extrabold text-gray-900 mb-5">About Our Founder</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-3">
                Dr Srikrishna Sharma was born on 18th October, 1962 into a rural family of a school teacher and farmer.
                He excelled in studies from an early age and displayed indomitable hard work, commitment and desire to
                reach for the stars since a very young age. He wanted to provide his family with a good standard of
                living and make the life of his parents comfortable in their old age. He did succeed in doing just that.
              </p>
              <p className="text-gray-500 text-sm leading-relaxed">
                He completed M.Sc (Physics), MBA and PhD in his academic journey. He was an IIM Calcutta alumnus having
                more than 30 years experience in Apparel, Textile industry, Infrastructure Development, Skill Development
                &amp; IT industry.{" "}
                <a href="#" className="font-semibold underline text-[#6A1B9A]">Read More...</a>
              </p>
            </div>

            {/* Right — founder photo with purple diagonal accent */}
            <div className="lg:w-2/5 ai flex justify-center lg:justify-end">
              <div className="relative" style={{ width: 280 }}>
                {/* Purple diagonal decoration behind */}
                <img
                  src={purpleDiag}
                  alt=""
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{ width: 180, bottom: -20, right: -30, zIndex: 0, opacity: 0.85 }}
                />
                {/* Founder photo */}
                <div className="relative z-10" style={{ borderRadius: 14, overflow: "hidden" }}>
                  <img
                    src={founderImg}
                    alt="Dr. Srikrishna Sharma"
                    className="w-full object-cover block"
                    style={{ borderRadius: "12px 12px 0 0", height: 300 }}
                  />
                  {/* Name strip */}
                  <div
                    className="px-4 py-3 text-center"
                    style={{ background: "rgba(106,27,154,0.92)", borderRadius: "0 0 12px 12px" }}
                  >
                    <p className="text-white font-bold text-sm">Dr. Srikrishna Sharma</p>
                    <p className="text-xs" style={{ color: "#d8b4fe" }}>( 1962-2021 )</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    

      {/* ══ 4. OUR VALUES ══ */}
      <section className="py-14 border-t border-gray-100" style={{ background: "#f4f4fb" }} ref={s3}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-10 ai">Our Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
            {values.map((v, i) => (
              <div key={i} className="ai">
                {/* Purple + blue gradient top line */}
                <div className="w-full h-[3px] mb-4 rounded-full" style={{ background: "linear-gradient(to right, #6A1B9A, #60a5fa)" }} />
                <h4 className="text-sm font-bold text-gray-900 mb-1">{v.title}</h4>
                <p className="text-gray-400 text-xs leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
<OurPartners />
      {/* ══ 5. OUR PARTNERS ══ */}

      {/* ══ 6. THE FORMIDABLE TIGER ══ */}
      <section className="py-14 px-4">
        <div className="max-w-6xl mx-auto">
          <div
            className="flex flex-col sm:flex-row items-center gap-8 rounded-2xl px-8 py-10"
            style={{ background: "#ede8f8" }}
          >
            {/* Tiger image */}
            <div className="flex-shrink-0" style={{ width: 180, height: 180 }}>
              <img src={tigerImg} alt="TAG Tiger Mascot" className="w-full h-full object-contain" />
            </div>
            {/* Text */}
            <div>
              <h3 className="text-xl font-extrabold text-gray-900 mb-3">The Formidable Tiger</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                The formidable TIGER, the national animal of the great Republic of India is our company mascot.
                The tiger's qualities of grace, strength, agility and enormous power are the reason why it was
                chosen as the national animal of India. For TAG, in addition to the aforementioned qualities,
                this mascot signifies our commitment towards the nation and its interests, towards quality in
                our work and ethics across the broader ecosystem. The tiger being the keystone species is crucial
                for the integrity of the ecosystems in which they live. In short, when tigers thrive, the whole
                ecosystem thrives.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Testimonials />
    </>
  );
};