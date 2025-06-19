import Hero from '../sections/Hero'
import Contact from "../sections/Contact";
import MissionSection from "../components/HomePage/MissionSection.jsx";
import Book from "../components/HomePage/Book.jsx";
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
            <Contact />
        </>
    )
}

export default HomePage