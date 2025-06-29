import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import houseImage from '/images/hero.jpg';

gsap.registerPlugin(ScrollTrigger);

export default function MissionSection() {
    const sectionRef = useRef(null);
    const backgroundImageRef = useRef(null);
    const containerRef = useRef(null);
    const titleLine1Ref = useRef(null);
    const titleLine2Ref = useRef(null);
    const profileImagesRef = useRef(null);
    const dividerRef = useRef(null);
    const dividerTextRef = useRef(null);
    const descriptionNumberRef = useRef(null);
    const descriptionTextRef = useRef(null);
    const moreButtonRef = useRef(null);
    const statsRefs = useRef([]);
    const propertyImageRef = useRef(null);
    const rightContentRef = useRef(null);
    const locationTicketRef = useRef(null);
    const locationDescRef = useRef(null);
    const actionButtonRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Create timeline for coordinated animations
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse"
                }
            });

            // Background image animation
            tl.fromTo(backgroundImageRef.current,
                { scale: 1.1 },
                { scale: 1, duration: 1.5, ease: "power2.out" }, 0
            );

            // Container fade in
            tl.fromTo(containerRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.8, ease: "power2.out" }, 0
            );

            // Title animations with stagger
            tl.fromTo(titleLine1Ref.current,
                { y: "100%" },
                { y: "0%", duration: 0.5, ease: "power2.out" }, 0.1
            );

            tl.fromTo(titleLine2Ref.current,
                { y: "100%" },
                { y: "0%", duration: 0.5, ease: "power2.out" }, 0.4
            );

            // Profile images animation
            tl.fromTo(profileImagesRef.current,
                { opacity: 0, scale: 0.8 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.7)" }, 0.6
            );

            // Divider animation
            tl.fromTo(dividerRef.current,
                { opacity: 0, width: "0%" },
                { opacity: 1, width: "100%", duration: 0.8, ease: "power2.out" }, 0.7
            );

            tl.fromTo(dividerTextRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.8
            );

            // Description animations
            tl.fromTo(descriptionNumberRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 0.5, ease: "power2.out" }, 0.8
            );

            tl.fromTo(descriptionTextRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.9
            );

            tl.fromTo(moreButtonRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.9
            );

            // Stats animations with stagger
            statsRefs.current.forEach((statRef, index) => {
                if (statRef) {
                    tl.fromTo(statRef,
                        { opacity: 0, y: 20 },
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
                        1.0 + (index * 0.1)
                    );
                }
            });

            // Property image animation
            tl.fromTo(propertyImageRef.current,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, 1.3
            );

            // Right content animations
            tl.fromTo(rightContentRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: "power2.out" }, 0.3
            );

            tl.fromTo(locationTicketRef.current,
                { opacity: 0, x: -20 },
                { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 1.4
            );

            tl.fromTo(locationDescRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 1.5
            );

            tl.fromTo(actionButtonRef.current,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, 0.9
            );

            // Enhanced hover animations for interactive elements with gold effects
            const hoverElements = [
                { element: moreButtonRef.current, goldEffect: true },
                { element: actionButtonRef.current, goldEffect: true }
            ];

            hoverElements.forEach(({ element, goldEffect }) => {
                if (element) {
                    element.addEventListener('mouseenter', () => {
                        gsap.to(element, {
                            scale: 1.05,
                            duration: 0.3,
                            ease: "power2.out",
                            boxShadow: goldEffect ? "0 10px 25px rgba(255, 212, 0, 0.3)" : "0 10px 25px rgba(0, 0, 0, 0.3)"
                        });
                    });
                    element.addEventListener('mouseleave', () => {
                        gsap.to(element, {
                            scale: 1,
                            duration: 0.3,
                            ease: "power2.out",
                            boxShadow: "0 0 0 rgba(0, 0, 0, 0)"
                        });
                    });
                }
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const stats = [
        { value: "500+", label: "Patients Treated", highlight: true },
        { value: "95%", label: "Success Rate", highlight: false },
        { value: "15+", label: "Natural Therapies", highlight: true }
    ];

    return (
        <div
            id="mission"
            className="h-fit w-screen overflow-hidden relative pt-[50px] md:pt-[50px] pb-[50px] md:pb-[50px] px-10"
            ref={sectionRef}
        >
            <img
                ref={backgroundImageRef}
                src={houseImage}
                alt="Background"
                className="h-full w-full object-center object-cover absolute inset-0 z-0"
            />
            {/* Enhanced background overlay with gold tint */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/10 via-transparent to-blue-900/20 z-0" />

            <div
                ref={containerRef}
                className="h-full w-full bg-transparent z-10 relative rounded-2xl border-[20px] border-white shadow-2xl shadow-yellow-400/10 flex opacity-0"
            >
                {/* Main Content */}
                <div className="w-1/2 h-full flex flex-col bg-gradient-to-br from-white to-yellow-50/30 px-5 py-5 pr-10 overflow-hidden">
                    <div className="flex w-full">
                        <div className="tracking-tight text-6xl font-[500] w-fit flex flex-col mr-2 text-slate-800">
                            <h2 className='h-18 flex items-center overflow-hidden'>
                                <span ref={titleLine1Ref} className="block bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent">
                                    Rediscover
                                </span>
                            </h2>
                            <h2 className='h-18 flex items-center overflow-hidden'>
                                <span ref={titleLine2Ref} className="block bg-gradient-to-r from-yellow-600 to-slate-800 bg-clip-text text-transparent">
                                    Natural Vitality
                                </span>
                            </h2>
                        </div>

                        {/* Enhanced Profile Images with gold borders */}
                        <div
                            ref={profileImagesRef}
                            className="flex w-[80px] h-[80px] flex-wrap gap-1 opacity-0"
                        >
                            <div className="h-14 w-14 rounded-full ring-2 ring-yellow-400/50 ring-offset-2">
                                <img
                                    src="https://images.pexels.com/photos/7821915/pexels-photo-7821915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Profile 1"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                            <div className="h-7 w-7 rounded-full ring-1 ring-yellow-300/40 ring-offset-1">
                                <img
                                    src="https://images.pexels.com/photos/1129615/pexels-photo-1129615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Profile 2"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                            <div className="h-9 w-9 rounded-full ring-1 ring-yellow-400/50 ring-offset-1">
                                <img
                                    src="https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                                    alt="Profile 3"
                                    className="h-full w-full object-cover rounded-full"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Enhanced Divider with gold accent */}
                    <div className="flex mt-5 mb-5 items-center w-full gap-5">
                        <p
                            ref={dividerTextRef}
                            className="text-nowrap text-sm font-bold opacity-0 text-yellow-700"
                        >
                            Welcome to Healing Reimagined
                        </p>
                        <div
                            ref={dividerRef}
                            className="h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 shadow-sm"
                            style={{ width: "0%" }}
                        />
                    </div>

                    {/* Description with gold accent number */}
                    <div className="flex w-full gap-6">
                        <span
                            ref={descriptionNumberRef}
                            className="text-xs font-black text-yellow-600 opacity-0 bg-yellow-100 px-2 py-1 rounded-full"
                        >
                            05
                        </span>
                        <p
                            ref={descriptionTextRef}
                            className="leading-[1.3] text-sm text-slate-700 opacity-0"
                        >
                            At Milagro Pharmaceuticals, we offer advanced, non-invasive therapies designed to activate your body's natural regenerative power. Experience wellness through innovation and holistic care.
                        </p>
                        <button
                            ref={moreButtonRef}
                            className="w-96 h-10 cursor-pointer rounded-full flex items-center justify-center text-slate-900 font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 opacity-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                        >
                            More
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="ml-1"
                            >
                                <path d="M13 5H19V11" />
                                <path d="M19 5L5 19" />
                            </svg>
                        </button>
                    </div>

                    {/* Enhanced Stats with gold highlights */}
                    <div className="flex w-full my-5 items-center justify-between text-slate-800">
                        {stats.map((stat, index) => (
                            <React.Fragment key={stat.label}>
                                <div
                                    ref={el => statsRefs.current[index] = el}
                                    className={`flex gap-0 flex-col opacity-0 ${stat.highlight ? 'bg-yellow-50 p-3 rounded-lg border border-yellow-200/50' : ''}`}
                                >
                                    <p className={`text-2xl font-bold ${stat.highlight ? 'text-yellow-600' : 'text-slate-800'}`}>
                                        {stat.value}
                                    </p>
                                    <span className="text-sm text-slate-600">{stat.label}</span>
                                </div>
                                {index < 2 && <div className="h-7 w-[2px] bg-gradient-to-b from-yellow-400 to-yellow-600" />}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Enhanced Property Image with gold border */}
                    <div
                        ref={propertyImageRef}
                        className="w-[90%] min-h-64 max-h-[50%] mx-auto mt-auto rounded-3xl overflow-hidden opacity-0 ring-4 ring-yellow-400/30 ring-offset-4 shadow-xl shadow-yellow-400/20"
                    >
                        <img
                            src="/images/hero1.jpg"
                            alt="Property"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Right Content */}
                <div
                    ref={rightContentRef}
                    className="w-1/2 h-full relative flex flex-col opacity-0"
                >
                    {/* Enhanced gradient overlay with gold tint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-yellow-900/20 to-transparent z-0" />

                    {/* Enhanced Location Ticket with gold accents */}
                    <div
                        ref={locationTicketRef}
                        className="text-sm text-slate-800 relative z-10 flex bg-gradient-to-r from-white to-yellow-50 w-56 font-medium leading-[1.2] border-[10px] border-white rounded-2xl mt-5 ms-5 opacity-0 shadow-lg shadow-yellow-400/10"
                    >
                        <div>
                            <p className="text-slate-700">Washington Blvd Culver City, Ca</p>
                            <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 mt-3 shadow-md hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="18"
                                    height="18"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M13 5H19V11" />
                                    <path d="M19 5L5 19" />
                                </svg>
                            </div>
                        </div>
                        <img
                            src={houseImage}
                            alt="Location thumbnail"
                            className="w-24 h-20 object-cover rounded-2xl ring-2 ring-yellow-400/50"
                        />
                    </div>

                    {/* Enhanced Location Description */}
                    <p
                        ref={locationDescRef}
                        className="text-white/90 text-sm px-5 mt-auto leading-relaxed z-10 w-1/2 opacity-0 bg-black/20 backdrop-blur-sm rounded-lg p-4"
                    >
                        Visit our facility and embark on a transformative journey to wellness—guided by science, compassion, and <span className="text-yellow-300 font-medium">natural healing</span>.
                    </p>

                    {/* Enhanced Action Button with gold gradient */}
                    <button
                        ref={actionButtonRef}
                        className="z-10 relative cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 my-5 ms-5 px-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm w-fit opacity-0 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 shadow-lg shadow-yellow-400/20"
                    >
                        Book Your Consultation
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="ml-2"
                        >
                            <path d="M13 5H19V11" />
                            <path d="M19 5L5 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}