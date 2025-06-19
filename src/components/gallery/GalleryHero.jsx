import HorizontalScrollHero from "../EnhancedHorizontalScroll";
import {galleryPanels} from "../../constants/index.js";

const GalleryHero = () => {

  const link = "#grid";

  return (
    <HorizontalScrollHero panels={galleryPanels} link={link}/>
  );
};

export default GalleryHero;