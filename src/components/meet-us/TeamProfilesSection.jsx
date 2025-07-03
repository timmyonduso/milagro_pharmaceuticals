import { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import ProfileCard from "./ProfileCard";
import { profiles } from "./profilesData.jsx";

const TeamProfilesSection = () => {
    const sharonRef = useRef(null);
    const brittanyRef = useRef(null);

    // Setup GSAP animations for profile cards
    useGSAP(() => {
        // Sharon's card animation
        gsap.fromTo(
            sharonRef.current,
            { x: -50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: sharonRef.current,
                    start: "top bottom-=100"
                }
            }
        );

        // Brittany's card animation
        gsap.fromTo(
            brittanyRef.current,
            { x: 50, opacity: 0 },
            {
                x: 0,
                opacity: 1,
                duration: 1,
                delay: 0.3,
                scrollTrigger: {
                    trigger: brittanyRef.current,
                    start: "top bottom-=100"
                }
            }
        );
    }, []);

    return (
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
            {/* Sharon's Profile */}
            <div ref={sharonRef} className="flex-1">
                <ProfileCard person={profiles[0]} isLeft={true} index={0} />
            </div>

            {/* Brittany's Profile */}
            <div ref={brittanyRef} className="flex-1">
                <ProfileCard person={profiles[1]} isLeft={false} index={1} />
            </div>
        </div>
    );
};

export default TeamProfilesSection;