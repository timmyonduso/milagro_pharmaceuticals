import { useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { designerIntro } from "../../assets";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const DesignerIntro = () => {
    const sectionRef = useRef(null);

    // Animation effect when component is mounted
    useEffect(() => {
        // Only run on client-side
        if (typeof window !== "undefined" && sectionRef.current) {
            const textElements = sectionRef.current.querySelectorAll('.animate-in');

            gsap.fromTo(
                textElements,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                        toggleActions: "restart pause restart pause",
                        once: false, // ensures it can repeat
                        markers: false,
                    },
                }
            );
        }
    }, []);

    return (
        <section id="aboutSmd" ref={sectionRef} className="py-16 md:py-24 bg-[#F4F0EC]">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
                    <div className="w-full md:w-2/5 order-2 md:order-1">
                        <img
                            src={designerIntro}
                            alt="Sharon Mann, Interior Designer"
                            className="rounded-2xl shadow-xl w-full object-cover h-[500px]"
                        />
                    </div>

                    <div className="w-full md:w-3/5 order-1 md:order-2">
                        <h4 className="text-[#C5A678] font-semibold mb-2 animate-in">ABOUT SHARON MANN</h4>
                        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4D5053] animate-in">Where Luxury Meets Expertise</h2>

                        <div className="space-y-4 text-[#4D5053]">
                            <p className="animate-in">
                                Sharon Mann Design is more than just an interior design firm; it's a culmination of over 30 years
                                of passion, experience, and meticulous attention to detail. Led by the visionary Sharon Mann,
                                a renowned interior designer with an innate talent for transforming spaces into exquisite
                                expressions of comfort and luxury.
                            </p>

                            <p className="animate-in">
                                Sharon's journey began with a deep love for creating magical environments, whether it be through
                                captivating holiday decor, unforgettable social events, or breathtaking residential and commercial
                                interiors. Her extensive experience has honed her skills in curating sophisticated and timeless spaces,
                                seamlessly blending diverse textures, patterns, and colors to achieve visual harmony and unparalleled functionality.
                            </p>

                            <p className="animate-in">
                                Sharon Mann Design is not merely about aesthetics; it's about crafting spaces that resonate with your soul,
                                reflecting your individuality and enhancing your lifestyle. Embark on a journey of exceptional design and
                                discover the transformative power of Sharon Mann Design.
                            </p>
                        </div>

                        <div className="mt-8 animate-in flex items-center">
                            <a href="#watchStory" className="flex items-center group">
                                <div className="w-12 h-12 rounded-full bg-[#C5A678] flex items-center justify-center mr-4 group-hover:bg-[#cd7c2e] transition-all">
                                    <Play className="text-white w-5 h-5 ml-1" />
                                </div>
                                <span className="text-[#4D5053] font-medium group-hover:text-[#C5A678] transition-all">Watch Our Story</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DesignerIntro;