import Hero from '../sections/Hero'
import Contact from "../sections/Contact";
import Experience from "../sections/Experience";
import AboutUsSection from "../components/AboutUsSection";
import AnimatedCounter from "../components/AnimatedCounter";
import Awards from "../components/Awards";
import TitleHeader from '../components/TitleHeader';
import GalleryGrid from '../components/gallery/GalleryGrid';
import MissionSection from "../components/HomePage/MissionSection.jsx";
import Book from "../components/HomePage/Book.jsx";
import Features from "../components/HomePage/Features.jsx";
import PokemonCarousel from "../components/HomePage/PokemonCarousel.jsx";
import WhyChooseUs from "../components/HomePage/WhyChooseUs.jsx";
import Testimonials from "../components/HomePage/Testimonials.jsx";

const HomePage = () => {
    return (
        <>
            <Hero />
            <MissionSection />
            <Book />
            <WhyChooseUs />
            <Testimonials />
            {/*<Features />*/}
            {/*<AboutUsSection />*/}
            {/*<Experience />*/}
            {/*<Awards />*/}
            {/*<Testimonials />*/}
            <Contact />
        </>
    )
}

export default HomePage