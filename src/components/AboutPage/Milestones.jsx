import React, { useEffect, useRef } from 'react';
import { Building2, MapPin, Globe, Heart, Sparkles, Users, Award, Target } from 'lucide-react';

const Milestones = () => {
    const sectionRef = useRef(null);
    const timelineRef = useRef(null);
    const lineRef = useRef(null);
    const milestonesRef = useRef([]);
    const titleRef = useRef(null);

    // Milestones data with enhanced styling
    const milestones = [
        {
            year: "2022",
            title: "Partnership with Cure Pharmaceutical",
            description: "Strategic alliance formed to advance biofrequency technology and bring innovative healing solutions to market.",
            icon: Building2,
            gradient: "from-blue-500 to-cyan-400",
            bgColor: "bg-blue-50 dark:bg-blue-900/20",
            accentColor: "text-blue-600 dark:text-blue-400",
            glowColor: "shadow-blue-500/25"
        },
        {
            year: "2023",
            title: "First Biofrequency Clinic in Mexico City",
            description: "Opened our flagship clinic, introducing revolutionary frequency-based therapies to the region.",
            icon: MapPin,
            gradient: "from-emerald-500 to-teal-400",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            accentColor: "text-emerald-600 dark:text-emerald-400",
            glowColor: "shadow-emerald-500/25"
        },
        {
            year: "2024",
            title: "Launch of MHC La Condesa and Polanco Clinics",
            description: "Expanded our presence with two premium locations, bringing healing closer to communities across Mexico City.",
            icon: Award,
            gradient: "from-purple-500 to-pink-400",
            bgColor: "bg-purple-50 dark:bg-purple-900/20",
            accentColor: "text-purple-600 dark:text-purple-400",
            glowColor: "shadow-purple-500/25"
        },
        {
            year: "2025",
            title: "Global Nonprofit Initiative Launches",
            description: "Committed to bringing healing frequencies to underserved communities worldwide through our humanitarian mission.",
            icon: Globe,
            gradient: "from-amber-500 to-orange-400",
            bgColor: "bg-amber-50 dark:bg-amber-900/20",
            accentColor: "text-amber-600 dark:text-amber-400",
            glowColor: "shadow-amber-500/25"
        }
    ];

    useEffect(() => {
        const section = sectionRef.current;
        const timeline = timelineRef.current;
        const line = lineRef.current;
        const title = titleRef.current;
        const milestoneElements = milestonesRef.current;

        if (!section || !timeline || !line || !title) return;

        let scrollTriggers = [];
        let animations = [];

        const setupAnimations = () => {
            // Check for reduced motion
            const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobile = window.innerWidth < 768;

            if (prefersReducedMotion) {
                // Simple fade-in for reduced motion
                title.style.opacity = '1';
                milestoneElements.forEach(el => {
                    if (el) el.style.opacity = '1';
                });
                line.style.height = '100%';
                return;
            }

            // For demonstration without GSAP, we'll use CSS animations and scroll events
            let currentMilestone = 0;

            const handleScroll = () => {
                const rect = section.getBoundingClientRect();
                const sectionHeight = section.offsetHeight;
                const windowHeight = window.innerHeight;

                // Calculate scroll progress
                const scrollProgress = Math.max(0, Math.min(1,
                    (windowHeight - rect.top) / (sectionHeight + windowHeight)
                ));

                // Animate timeline line
                line.style.height = `${scrollProgress * 100}%`;

                // Animate milestones based on scroll position
                milestoneElements.forEach((milestone, index) => {
                    if (!milestone) return;

                    const milestoneRect = milestone.getBoundingClientRect();
                    const milestoneCenter = milestoneRect.top + milestoneRect.height / 2;

                    if (milestoneCenter < windowHeight * 0.8) {
                        // Animate in
                        milestone.style.opacity = '1';
                        milestone.style.transform = 'translateY(0) scale(1)';

                        // Add glow to dot
                        const dot = milestone.querySelector('.timeline-dot');
                        if (dot) {
                            dot.style.transform = 'scale(1.2)';
                            dot.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.5)';
                        }

                        // Animate year badge
                        const yearBadge = milestone.querySelector('.year-badge');
                        if (yearBadge) {
                            yearBadge.style.transform = 'scale(1.1)';
                            yearBadge.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.3)';
                        }
                    } else {
                        // Reset animation
                        milestone.style.opacity = '0.3';
                        milestone.style.transform = 'translateY(50px) scale(0.9)';

                        const dot = milestone.querySelector('.timeline-dot');
                        if (dot) {
                            dot.style.transform = 'scale(1)';
                            dot.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }

                        const yearBadge = milestone.querySelector('.year-badge');
                        if (yearBadge) {
                            yearBadge.style.transform = 'scale(1)';
                            yearBadge.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                        }
                    }
                });
            };

            // Initial setup
            title.style.opacity = '0';
            title.style.transform = 'translateY(-30px)';

            milestoneElements.forEach((milestone, index) => {
                if (!milestone) return;
                milestone.style.opacity = '0.3';
                milestone.style.transform = 'translateY(50px) scale(0.9)';
                milestone.style.transition = 'all 0.6s ease';
            });

            line.style.height = '0%';
            line.style.transition = 'height 0.3s ease';

            // Animate title in
            setTimeout(() => {
                title.style.transition = 'all 1s ease';
                title.style.opacity = '1';
                title.style.transform = 'translateY(0)';
            }, 100);

            // Setup scroll listener
            window.addEventListener('scroll', handleScroll);
            handleScroll(); // Initial call

            return () => {
                window.removeEventListener('scroll', handleScroll);
            };
        };

        const cleanup = setupAnimations();

        // Hover effects for milestone cards
        milestoneElements.forEach((milestone, index) => {
            if (!milestone) return;

            const card = milestone.querySelector('.milestone-card');
            const icon = milestone.querySelector('.milestone-icon');
            const dot = milestone.querySelector('.timeline-dot');

            if (!card) return;

            const handleMouseEnter = () => {
                card.style.transform = 'translateY(-8px) scale(1.02)';
                if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
                if (dot) dot.style.transform = 'scale(1.3)';
            };

            const handleMouseLeave = () => {
                card.style.transform = 'translateY(0) scale(1)';
                if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
                if (dot) dot.style.transform = 'scale(1.2)';
            };

            card.addEventListener('mouseenter', handleMouseEnter);
            card.addEventListener('mouseleave', handleMouseLeave);
        });

        return cleanup;
    }, []);

    return (
        <section
            ref={sectionRef}
            className="milestones-section min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 dark:from-slate-900 dark:via-slate-800 dark:to-indigo-900/30 py-20"
        >
            {/* Section Title */}
            <div ref={titleRef} className="text-center mb-20">
                <div className="inline-flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full flex items-center justify-center">
                        <Sparkles className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-500 bg-clip-text text-transparent">
                        Our Journey
                    </h2>
                </div>
                <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto">
                    Milestones that shaped our mission to heal the world through biofrequency innovation
                </p>
            </div>

            {/* Timeline Container */}
            <div ref={timelineRef} className="relative max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-slate-200 dark:bg-slate-700 h-full">
                    <div
                        ref={lineRef}
                        className="w-full bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-400 transition-all duration-300 ease-out"
                        style={{ height: '0%' }}
                    />
                </div>

                {/* Milestones */}
                <div className="space-y-24 md:space-y-32">
                    {milestones.map((milestone, index) => {
                        const IconComponent = milestone.icon;
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={milestone.year}
                                ref={el => milestonesRef.current[index] = el}
                                className={`relative flex items-center ${isEven ? 'flex-row' : 'flex-row-reverse'} gap-8 md:gap-12`}
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-1/2 transform -translate-x-1/2 z-10">
                                    <div className={`
                                        timeline-dot w-6 h-6 md:w-8 md:h-8 rounded-full 
                                        bg-gradient-to-br ${milestone.gradient} 
                                        shadow-lg ${milestone.glowColor}
                                        transition-all duration-300 ease-out
                                        border-4 border-white dark:border-slate-900
                                    `} />
                                </div>

                                {/* Year Badge */}
                                <div className={`
                                    year-badge absolute left-1/2 transform -translate-x-1/2 -translate-y-16 z-20
                                    px-4 py-2 rounded-full bg-gradient-to-r ${milestone.gradient}
                                    shadow-lg transition-all duration-300 ease-out
                                `}>
                                    <span className="text-white font-bold text-sm md:text-base">
                                        {milestone.year}
                                    </span>
                                </div>

                                {/* Content Card */}
                                <div className={`
                                    milestone-card flex-1 max-w-md md:max-w-lg
                                    ${milestone.bgColor} backdrop-blur-sm
                                    rounded-2xl shadow-xl border border-white/20 dark:border-slate-700/30
                                    p-6 md:p-8 transition-all duration-300 ease-out
                                    hover:shadow-2xl cursor-pointer
                                    ${isEven ? 'mr-auto' : 'ml-auto'}
                                `}>
                                    {/* Icon */}
                                    <div className="milestone-icon mb-4 transition-all duration-300 ease-out">
                                        <div className={`
                                            inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20
                                            rounded-2xl bg-gradient-to-br ${milestone.gradient} shadow-lg
                                        `}>
                                            <IconComponent className="w-8 h-8 md:w-10 md:h-10 text-white" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div>
                                        <h3 className={`
                                            text-2xl md:text-3xl font-bold mb-4 ${milestone.accentColor}
                                            transition-all duration-300 ease-out
                                        `}>
                                            {milestone.title}
                                        </h3>
                                        <p className="text-slate-700 dark:text-slate-300 text-lg leading-relaxed">
                                            {milestone.description}
                                        </p>
                                    </div>

                                    {/* Decorative Elements */}
                                    <div className="mt-6 flex items-center gap-2">
                                        <div className={`w-12 h-1 bg-gradient-to-r ${milestone.gradient} rounded-full`} />
                                        <div className={`w-4 h-1 bg-gradient-to-r ${milestone.gradient} rounded-full opacity-60`} />
                                        <div className={`w-2 h-1 bg-gradient-to-r ${milestone.gradient} rounded-full opacity-30`} />
                                    </div>
                                </div>

                                {/* Side Decoration */}
                                <div className={`
                                    hidden lg:block w-32 h-32 rounded-full opacity-10
                                    bg-gradient-to-br ${milestone.gradient} blur-2xl
                                    ${isEven ? 'ml-auto' : 'mr-auto'}
                                `} />
                            </div>
                        );
                    })}
                </div>

                {/* Bottom Decoration */}
                <div className="text-center mt-20 pt-12 border-t border-slate-200 dark:border-slate-700">
                    <div className="inline-flex items-center gap-3 text-slate-600 dark:text-slate-400">
                        <Heart className="w-6 h-6" />
                        <span className="text-lg font-medium">The journey continues...</span>
                        <Heart className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Milestones;