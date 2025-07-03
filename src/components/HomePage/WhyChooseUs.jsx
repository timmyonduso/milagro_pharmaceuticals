import React, { useEffect, useRef } from 'react';
import { Shield, Percent, Headphones } from 'lucide-react';

const WhyChooseUs = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // GSAP Animation Setup
        const gsap = window.gsap;
        if (!gsap) {
            // Load GSAP if not available
            const script = document.createElement('script');
            script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
            script.onload = () => {
                initAnimations();
            };
            document.head.appendChild(script);
        } else {
            initAnimations();
        }

        function initAnimations() {
            const gsap = window.gsap;

            // Set initial states
            gsap.set(titleRef.current, { y: 50, opacity: 0 });
            gsap.set(subtitleRef.current, { y: 30, opacity: 0 });
            gsap.set(cardsRef.current, { y: 80, opacity: 0, scale: 0.9 });

            // Create timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            });

            tl.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out'
            })
                .to(subtitleRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out'
                }, '-=0.4')
                .to(cardsRef.current, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.7,
                    stagger: 0.2,
                    ease: 'back.out(1.7)'
                }, '-=0.3');

            // Floating animation for cards
            cardsRef.current.forEach((card, index) => {
                if (card) {
                    gsap.to(card, {
                        y: -10,
                        duration: 2 + index * 0.5,
                        repeat: -1,
                        yoyo: true,
                        ease: 'power2.inOut',
                        delay: index * 0.3
                    });
                }
            });
        }

        // Load ScrollTrigger plugin
        if (!window.ScrollTrigger) {
            const scrollScript = document.createElement('script');
            scrollScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js';
            scrollScript.onload = () => {
                window.gsap.registerPlugin(window.ScrollTrigger);
                initAnimations();
            };
            document.head.appendChild(scrollScript);
        }
    }, []);

    const features = [
        {
            icon: Shield,
            title: "Honesty & Transparency",
            description: "Our open communication policy ensures that every customer has insight into our processes and innovations, fostering a reliable environment for healthcare advancement.",
            gradient: "from-blue-500 to-cyan-400",
            shadowColor: "shadow-blue-500/20"
        },
        {
            icon: Percent,
            title: "Extra Discount",
            description: "Milagro Pharmaceuticals offers additional discounts to ensure our cutting-edge treatments are accessible to more patients, helping them start their journey toward better health without financial burden.",
            gradient: "from-green-500 to-emerald-400",
            shadowColor: "shadow-green-500/20"
        },
        {
            icon: Headphones,
            title: "24/7 Premium Support",
            description: "Milagro Pharmaceuticals provides round-the-clock premium support to ensure you have continuous access to the assistance and information you need, whenever you need it.",
            gradient: "from-purple-500 to-violet-400",
            shadowColor: "shadow-purple-500/20"
        }
    ];

    return (
        <section
            ref={sectionRef}
            className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50/30 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
        >
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/10 to-emerald-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-purple-400/5 to-violet-400/5 rounded-full blur-3xl animate-pulse delay-2000"></div>
            </div>

            <div className="relative max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h2
                        ref={titleRef}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-800 via-blue-600 to-slate-800 dark:from-white dark:via-blue-300 dark:to-white mb-6"
                    >
                        Why Choose Us
                    </h2>
                    <p
                        ref={subtitleRef}
                        className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 font-light max-w-2xl mx-auto"
                    >
                        Best services available for the best customers
                    </p>
                </div>

                {/* Feature Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={index}
                                ref={el => cardsRef.current[index] = el}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className={`
                  relative p-8 rounded-3xl backdrop-blur-lg 
                  bg-white/70 dark:bg-slate-800/70 
                  border border-white/20 dark:border-slate-700/50
                  shadow-2xl ${feature.shadowColor} dark:shadow-slate-900/50
                  hover:shadow-3xl hover:shadow-blue-500/30 dark:hover:shadow-blue-400/20
                  transition-all duration-500 ease-out
                  hover:-translate-y-2 hover:scale-105
                  before:absolute before:inset-0 before:rounded-3xl 
                  before:bg-gradient-to-br before:from-white/10 before:to-transparent 
                  before:opacity-0 hover:before:opacity-100 before:transition-opacity before:duration-300
                  overflow-hidden
                `}>

                                    {/* Animated Border */}
                                    <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${feature.gradient} p-[2px]`}>
                                            <div className="w-full h-full rounded-3xl bg-white/90 dark:bg-slate-800/90"></div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="relative z-10">
                                        {/* Icon Container */}
                                        <div className={`
                      w-16 h-16 mb-6 rounded-2xl 
                      bg-gradient-to-br ${feature.gradient}
                      flex items-center justify-center
                      shadow-lg group-hover:shadow-xl
                      transform group-hover:rotate-6 transition-all duration-300
                    `}>
                                            <IconComponent className="w-8 h-8 text-white" />
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                                            {feature.title}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg">
                                            {feature.description}
                                        </p>
                                    </div>

                                    {/* Subtle Glow Effect */}
                                    <div className={`
                    absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 
                    bg-gradient-to-br ${feature.gradient} 
                    transition-opacity duration-500 blur-xl
                  `}></div>
                                </div>

                                {/* Floating Particles */}
                                <div className="absolute -top-2 -right-2 w-4 h-4 bg-blue-400/30 rounded-full animate-ping opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-green-400/30 rounded-full animate-ping delay-300 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Accent */}
                <div className="mt-20 flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-green-500 rounded-full"></div>
                </div>
            </div>
        </section>
    );
};

export default WhyChooseUs;