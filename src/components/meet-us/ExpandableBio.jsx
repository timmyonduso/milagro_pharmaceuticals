import { useRef, useState } from "react";
import { gsap } from "gsap";

const ExpandableBio = ({ bio }) => {
    const [expanded, setExpanded] = useState(false);
    const bioRef = useRef(null);

    // Toggle bio expansion
    const toggleBio = () => {
        setExpanded(!expanded);

        if (!expanded) {
            gsap.to(bioRef.current, {
                height: "auto",
                duration: 0.5,
                ease: "power2.out"
            });
        } else {
            gsap.to(bioRef.current, {
                height: "0",
                duration: 0.5,
                ease: "power2.in"
            });
        }
    };

    return (
        <>
            {/* Read More Toggle */}
            <button
                onClick={toggleBio}
                className="text-[#4D5053] dark:text-white text-sm flex items-center transition-colors mb-4 font-bold"
            >
                {expanded ? "Read Less" : "Read More"}
                <span className={`ml-1 transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
            </button>

            {/* Expandable Bio */}
            <div
                ref={bioRef}
                className="overflow-hidden h-0 text-white/80"
            >
                {bio.map((paragraph, idx) => (
                    <p key={idx} className="mb-3 text-[#4D5053] dark:text-white">{paragraph}</p>
                ))}
            </div>
        </>
    );
};

export default ExpandableBio;