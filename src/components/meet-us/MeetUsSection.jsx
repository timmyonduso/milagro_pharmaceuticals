import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import TeamProfilesSection from "./TeamProfilesSection";
import LegacySection from "./LegacySection";
import TitleHeader from "../TitleHeader.jsx";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const MeetUsSection = () => {
    const sectionRef = useRef(null);

    // Setup GSAP animations for the main section
    useGSAP(() => {
        // Section fade in
        gsap.fromTo(
            sectionRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1.5 }
        );
    }, []);

    return (
        <section
            id="meet-us"
            ref={sectionRef}
            className="w-full pt-8 md:pt-12 pb-24 bg-gradient-to-b from-[#f9f6f2] to-[#f4f0ec] dark:bg-gradient-to-b dark:from-black dark:to-black text-[#4D5053] dark:text-white"
        >
            <div className="container mx-auto px-4">
                {/* Section Header */}
                <TitleHeader
                    title="Meet the Visionaries"
                    sub="💡 The Creative Force Behind Sharon Mann Design"
                />

                {/* Team Profile Section */}
                <TeamProfilesSection />

                {/* Mother-Daughter Partnership Highlight */}
                <LegacySection />
            </div>
        </section>
    );
};

export default MeetUsSection;