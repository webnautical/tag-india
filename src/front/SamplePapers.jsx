// src/front/SamplePapers.jsx
import BreadcrumbHero from '../components/BreadcrumbHero';
import contactBg from '../assets/img/contact-us.jpg'; // apni image daalo
import SamplePaperList from '../components/SamplePaperList';

export const SamplePapers = () => {
  return (
    <>
<BreadcrumbHero
    label="Resources"
    title="Sample papers"
    bgImage={contactBg}
/>
<SamplePaperList />
    </>
  );
};