// src/front/Contact.jsx
import BreadcrumbHero from '../components/BreadcrumbHero';
import ContactForm from '../components/Contact/ContactForm';
import EscalationMatrix from '../components/Contact/EscalationMatrix';
import contactBg from '../assets/img/contact-us-bg.jpg'; // apni image daalo

export const Contact = () => {
  return (
    <>
      <BreadcrumbHero
        label="Communication Details"
        title="Contact Us"
        bgImage={contactBg}
      />

      <ContactForm />
      <EscalationMatrix />
    </>
  );
};