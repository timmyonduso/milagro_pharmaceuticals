import Contact from "../sections/Contact"
import AboutHero from "../components/AboutPage/AboutHero.jsx";
import OurStory from "../components/AboutPage/OurStory.jsx";
import VisionValues from "../components/AboutPage/VisionValues.jsx";

const AboutPage = () => {
  return (
    <>
      <AboutHero />
    <OurStory />
      <VisionValues />
      <Contact />
    </>
  )
}

export default AboutPage