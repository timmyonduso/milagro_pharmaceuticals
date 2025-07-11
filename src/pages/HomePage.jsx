import Hero from '../sections/Hero'
import Contact from "../sections/Contact";
import MissionSection from "../components/HomePage/MissionSection.jsx";
import Products from "../components/HomePage/Products.jsx";
import WhyChooseUs from "../components/HomePage/WhyChooseUs.jsx";
import Testimonials from "../components/HomePage/Testimonials.jsx";
import IntroComponent from "../components/HomePage/IntroComponent.jsx";

const HomePage = () => {
    return (
        <>
            <Hero />
            <MissionSection />
            <IntroComponent />
            <Products />
            <WhyChooseUs />
            <Testimonials />
            <Contact />
        </>
    )
}

export default HomePage