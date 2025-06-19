import Contact from "../sections/Contact"
import AboutHero from "../components/about-us/AboutHero"
import YouTubeEmbed from "../components/YouTubeEmbed"
import TitleHeader from "../components/TitleHeader"
import DesignerIntro from "../components/about-us/DesignerIntro"
import VisionMission from "../components/about-us/VisionMission"
import CoreValues from "../components/about-us/CoreValues"

const AboutPage = () => {
  return (
    <>
      <AboutHero />
      <DesignerIntro />
        <div className="w-full px-0 py-0">
            <div id="watchStory" className="w-full">
            <TitleHeader
            sub="Our Design Process"
            title="Discover our unique approach to interior design"
          />
          <div className="mt-8">
            <YouTubeEmbed videoId="gkbyH9_Ro8M" />
          </div>
        </div>
      </div>
      <VisionMission />
      <CoreValues />
      {/* <Experience />
      <Testimonials /> */}
      {/* <Explore /> */}
      {/* <Collections /> */}
      <Contact />
    </>
  )
}

export default AboutPage