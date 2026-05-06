// src/front/Downloads.jsx
import BreadcrumbHero from '../components/BreadcrumbHero';
import contactBg from '../assets/img/contact-us.jpg'; // apni image daalo
import SamplePaperList from '../components/SamplePaperList';

export const Downloads = () => {
  return (
    <>
      <BreadcrumbHero
        label="Public Info"
        title="Downloads"
        bgImage={contactBg}
      />
      <SamplePaperList />

    </>
  );
};