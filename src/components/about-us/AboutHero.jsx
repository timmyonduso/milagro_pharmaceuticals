import DirectionalHero from "../DirectionalHero";
import {aboutPanels} from "../../constants/index.js";

const AboutHero = () => {

  const link = "#aboutSmd";

  return (
    <DirectionalHero panels={aboutPanels} link={link} />
  );
};

export default AboutHero;