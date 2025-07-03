import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Lightbulb, Heart, Users, Leaf } from 'lucide-react';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const VisionValues = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef(null);
    const titleRef = useRef(null);
    const cardsRef = useRef([]);

    // Values data with enhanced styling for horizontal scroll
    const values = [
        {
            id: 1,
            title: "Innovation",
            description: "Blending ancient wisdom with modern science to create breakthrough frequency-based therapies",
            icon: Lightbulb,
            gradient: "from-blue-500 to-cyan-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            accentColor: "text-blue-600 dark:text-blue-400"
        },
        {
            id: 2,
            title: "Integrity",
            description: "Transparent, ethical, and human-first approach in everything we do",
            icon: Heart,
            gradient: "from-red-500 to-pink-400",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            accentColor: "text-red-600 dark:text-red-400"
        },
        {
            id: 3,
            title: "Access",
            description: "Bringing wellness and healing to underserved communities worldwide",
            icon: Users,
            gradient: "from-green-500 to-emerald-400",
            bgColor: "bg-green-50 dark:bg-green-900/20",
            accentColor: "text-green-600 dark:text-green-400"
        },
        {
            id: 4,
            title: "Sustainability",
            description: "Responsible sourcing and eco-conscious practices for a better tomorrow",
            icon: Leaf,
            gradient: "from-emerald-600 to-teal-400",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            accentColor: "text-emerald-600 dark:text-emerald-400"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const slider = sliderRef.current;
        const title = titleRef.current;
        const cards = cardsRef.current;

        if (!section || !slider || !title) return;

        // Check for reduced motion and mobile
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const isMobile = window.innerWidth < 768;

        if (prefersReducedMotion || isMobile) {
            // Simple animations for reduced motion or mobile
            gsap.fromTo(title,
                { opacity: 0, y: -20 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
            );

            gsap.fromTo(cards,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out",
                    stagger: 0.1,
                    scrollTrigger: {
                        trigger: section,
                        start: "top 70%",
                        toggleActions: "play none none reverse"
                    }
                }
            );
            return;
        }

        // Calculate scroll amount for horizontal scrolling
        const scrollAmount = slider.scrollWidth - window.innerWidth;

        // Main horizontal scroll timeline
        const mainTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollAmount + 1500}px`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true
            },
        });

        // Horizontal scroll animation
        mainTl.to(slider, {
            x: `-${scrollAmount}px`,
            ease: "power1.inOut",
        });

        // Title parallax effect during scroll
        const titleTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top top",
                end: `+=${scrollAmount + 1500}px`,
                scrub: 1,
            },
        });

        titleTl
            .to(title.querySelector('.main-title'), {
                xPercent: -20,
                ease: "power1.inOut",
            })
            .to(title.querySelector('.sub-title'), {
                xPercent: -10,
                ease: "power1.inOut",
            }, "<");

        // Initial entrance animations
        gsap.fromTo(title,
            { opacity: 0, y: -30 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "back.out(1.7)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Cards entrance with stagger
        gsap.fromTo(cards,
            {
                opacity: 0,
                y: 100,
                scale: 0.8,
                rotationY: -15
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                rotationY: 0,
                duration: 1.2,
                ease: "back.out(1.7)",
                stagger: 0.2,
                scrollTrigger: {
                    trigger: section,
                    start: "top 60%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Individual card hover animations
        cards.forEach((card, index) => {
            if (!card) return;

            const iconElement = card.querySelector('.card-icon');
            const contentElement = card.querySelector('.card-content');

            const handleMouseEnter = () => {
                gsap.to(card, {
                    y: -12,
                    scale: 1.03,
                    rotationY: 2,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(iconElement, {
                    scale: 1.15,
                    rotation: 8,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });

                gsap.to(contentElement, {
                    y: -4,
                    duration: 0.4,
                    ease: "power2.out"
                });
            };

            const handleMouseLeave = () => {
                gsap.to(card, {
                    y: 0,
                    scale: 1,
                    rotationY: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });

                gsap.to(iconElement, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.4,
                    ease: "back.out(1.7)"
                });

                gsap.to(contentElement, {
                    y: 0,
                    duration: 0.4,
                    ease: "power2.out"
                });
            };

            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        // Cleanup
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            ref={sectionRef}
            className="vision-values-section min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
        >
            {/* Fixed Title Section */}
            <div
                ref={titleRef}
                className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-start z-10 px-6 md:px-12 lg:px-20"
            >
                <div className="max-w-2xl">
                    <div className="main-title overflow-hidden mb-4">
                        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-slate-800 dark:text-white leading-none">
                            Our
                        </h1>
                    </div>
                    <div className="sub-title overflow-hidden mb-6">
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-light bg-gradient-to-r from-blue-600 to-green-500 bg-clip-text text-transparent">
                            Values
                        </h2>
                    </div>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-400 rounded-full"></div>
                </div>
            </div>

            {/* Horizontal Scrolling Cards */}
            <div
                ref={sliderRef}
                className="values-slider h-screen flex items-center pl-6 md:pl-12 lg:pl-20"
            >
                <div className="flex items-center gap-6 md:gap-8 lg:gap-12 flex-nowrap">
                    {/* Spacer for title */}
                    <div className="w-[80vw] md:w-[500px] lg:w-[600px] flex-none"></div>

                    {values.map((value, index) => {
                        const IconComponent = value.icon;

                        return (
                            <div
                                key={value.id}
                                ref={el => cardsRef.current[index] = el}
                                className={`
                  group relative flex-none w-[75vw] sm:w-[65vw] md:w-[50vw] lg:w-[35vw] xl:w-[28vw]
                  h-[65vh] sm:h-[70vh] md:h-[75vh]
                  ${value.bgColor} backdrop-blur-sm
                  rounded-3xl shadow-2xl border border-white/20 dark:border-slate-700/30
                  transition-all duration-300 cursor-pointer overflow-hidden
                  hover:shadow-3xl
                `}
                            >
                                {/* Background gradient overlay */}
                                <div className={`
                  absolute inset-0 bg-gradient-to-br ${value.gradient} opacity-0 
                  group-hover:opacity-10 dark:group-hover:opacity-20
                  transition-opacity duration-500
                `} />

                                {/* Card content */}
                                <div className="relative z-10 p-6 sm:p-8 md:p-10 h-full flex flex-col">
                                    {/* Icon */}
                                    <div className="card-icon mb-6 sm:mb-8">
                                        <div className={`
                      inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 
                      rounded-2xl bg-gradient-to-br ${value.gradient} shadow-xl
                      group-hover:shadow-2xl transition-all duration-300
                    `}>
                                            <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="card-content flex-1 flex flex-col justify-center">
                                        <h3 className={`
                      text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 ${value.accentColor}
                      group-hover:scale-105 transition-transform duration-300
                    `}>
                                            {value.title}
                                        </h3>
                                        <p className="text-base sm:text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed">
                                            {value.description}
                                        </p>
                                    </div>

                                    {/* Bottom accent */}
                                    <div className="mt-6 sm:mt-8">
                                        <div className={`w-16 h-1 bg-gradient-to-r ${value.gradient} rounded-full`} />
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className={`
                  absolute inset-0 rounded-3xl bg-gradient-to-br ${value.gradient} 
                  opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10
                  transition-opacity duration-500 blur-2xl
                `} />
                            </div>
                        );
                    })}

                    {/* End spacer */}
                    <div className="w-[80vw] flex-none"></div>
                </div>
            </div>
        </section>
    );
};

export default VisionValues;