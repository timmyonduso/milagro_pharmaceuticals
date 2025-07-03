import { useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollHero = ({ panels, link }) => {
    const sectionRef = useRef(null);
    const triggerRef = useRef(null);
    const panelsRef = useRef([]);

    // Initialize refs with proper length based on panels
    useEffect(() => {
        panelsRef.current = panelsRef.current.slice(0, panels.length);
    }, [panels.length]);

    useEffect(() => {
        if (!sectionRef.current || panels.length === 0) return;

        // Create a container for horizontal scrolling
        const sections = panelsRef.current;

        // Get the width of the first section to calculate total width
        const sectionWidth = sections[0].offsetWidth;

        // GSAP animation for horizontal scrolling
        const horizontalScrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: triggerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                end: () => "+=" + sectionWidth * (sections.length - 1),
                invalidateOnRefresh: true
            }
        });

        // For each panel, create entrance animations
        sections.forEach((panel, i) => {
            const elements = panel.querySelectorAll('.animate-in');

            // Create timeline for each panel's content
            gsap.timeline({
                scrollTrigger: {
                    trigger: panel,
                    containerAnimation: horizontalScrollTween,
                    start: "left center",
                    toggleActions: "play none none reverse"
                }
            })
                .fromTo(elements,
                    {
                        y: 50,
                        opacity: 0
                    },
                    {
                        y: 0,
                        opacity: 1,
                        stagger: 0.2,
                        duration: 0.8,
                        ease: "power2.out"
                    }
                );
        });

        // Clean up ScrollTrigger on component unmount
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [panels.length]);

    const handleScroll = (e) => {
        e.preventDefault();
        const targetId = link.replace('#', '');
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={triggerRef}
            className="w-full h-screen overflow-hidden relative bg-black"
        >
            {/* Scroll indicator */}
            <a href={link} onClick={handleScroll}>
                <div className="cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 flex flex-col items-center gap-2 text-white animate-bounce">
                    <span className="text-sm font-medium">Scroll Down</span>
                    <ChevronDown size={24} />
                </div>
            </a>
            {/* Horizontal panels container */}
            <div
                ref={sectionRef}
                className="w-full h-screen flex flex-nowrap"
            >
                {panels.map((panel, index) => (
                    <div
                        key={panel.id || index}
                        ref={el => panelsRef.current[index] = el}
                        className="w-full h-screen flex-shrink-0 bg-cover bg-center relative"
                        style={{ backgroundImage: `url(${panel.image})` }}
                    >
                        {/* Dark overlay */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-20"></div>

                        {/* Panel content */}
                        <div className="absolute inset-0 flex items-center justify-center z-30 px-4">
                            <div className="flex flex-col gap-2 items-center max-w-3xl mx-auto">
                                <h2 className="text-white lg:text-[60px] text-[40px] font-semibold z-50 text-center animate-in">
                                    {panel.heading}
                                </h2>
                                <p className="text-gray-300 text-[18px] z-50 text-center font-medium animate-in">
                                    {panel.subheading}
                                </p>
                                <p className="text-gray-300 text-[15px] z-50 text-center mt-2 animate-in">
                                    {panel.description}
                                </p>
                                <a
                                    href={panel.ctaLink}
                                    className="z-50 w-fit mx-auto animate-in"
                                >
                                    <button onClick={handleScroll} className="cursor-pointer text-[#333] dark:text-black rounded-full bg-white font-medium px-5 py-3 mt-5 hover:bg-white/90 transition">
                                        {panel.ctaText}
                                    </button>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default HorizontalScrollHero;