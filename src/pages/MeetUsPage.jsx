import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MeetUsSection from "../components/meet-us/MeetUsSection.jsx";
import MeetUsHero from "../components/meet-us/MeetUsHero";
import Contact from "../sections/Contact";
import ValuesSection from "../components/meet-us/ValuesSection";
import DifferenceSection from "../components/meet-us/DifferenceSection";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MeetUsPage = () => {
  return (
    <div className="bg-[#f9f6f2] dark:bg-black min-h-screen">

      {/* Hero Section */}
      <MeetUsHero />

      {/* Meet the Team Section */}
      <MeetUsSection />

      {/* Our Values Section */}
      <ValuesSection />

      {/* What Makes Us Different Section */}
      <DifferenceSection />

      {/* Contact CTA */}
      <Contact />

    </div>
  );
};

export default MeetUsPage;