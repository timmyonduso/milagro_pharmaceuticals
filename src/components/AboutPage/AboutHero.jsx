import React, { useEffect, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const AboutHero = () => {
    const heroRef = useRef(null);
    const leftPanelRef = useRef(null);
    const rightPanelRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const imageRef = useRef(null);
    const moleculesRef = useRef(null);
    const gradientRef = useRef(null);

    useEffect(() => {
        // Create GSAP-style animation system
        const tl = {
            set: (target, props) => {
                const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target.current];
                elements.forEach(el => {
                    if (el) {
                        Object.keys(props).forEach(key => {
                            if (key === 'opacity') el.style.opacity = props[key];
                            if (key === 'x') el.style.transform = `translateX(${props[key]}px)`;
                            if (key === 'y') el.style.transform = `translateY(${props[key]}px)`;
                            if (key === 'scale') el.style.transform = `${el.style.transform} scale(${props[key]})`;
                        });
                    }
                });
            },
            to: (target, props) => {
                const elements = typeof target === 'string' ? document.querySelectorAll(target) : [target.current];
                elements.forEach(el => {
                    if (el) {
                        el.style.transition = `all ${props.duration || 1}s ${props.ease || 'cubic-bezier(0.4, 0, 0.2, 1)'}`;
                        setTimeout(() => {
                            if (props.opacity !== undefined) el.style.opacity = props.opacity;
                            if (props.x !== undefined) el.style.transform = `translateX(${props.x}px)`;
                            if (props.y !== undefined) el.style.transform = `translateY(${props.y}px)`;
                            if (props.scale !== undefined) el.style.transform = `${el.style.transform} scale(${props.scale})`;
                        }, (props.delay || 0) * 1000);
                    }
                });
            }
        };

        // Initial states for split-screen entrance
        tl.set(leftPanelRef, { opacity: 0, x: -60 });
        tl.set(rightPanelRef, { opacity: 0, x: 60 });
        tl.set(titleRef, { opacity: 0, y: 80 });
        tl.set(subtitleRef, { opacity: 0, y: 60 });
        tl.set(ctaRef, { opacity: 0, y: 40 });
        tl.set(imageRef, { opacity: 0, scale: 0.9 });
        tl.set('.molecule', { opacity: 0, scale: 0.8 });

        // Sophisticated entrance sequence
        setTimeout(() => {
            tl.to(leftPanelRef, { opacity: 1, x: 0, duration: 1.4, delay: 0.2 });
            tl.to(rightPanelRef, { opacity: 1, x: 0, duration: 1.4, delay: 0.3 });
            tl.to(titleRef, { opacity: 1, y: 0, duration: 1.2, delay: 0.6 });
            tl.to(subtitleRef, { opacity: 1, y: 0, duration: 1, delay: 0.8 });
            tl.to(imageRef, { opacity: 1, scale: 1, duration: 1.6, delay: 0.7 });
            tl.to(ctaRef, { opacity: 1, y: 0, duration: 0.8, delay: 1.2 });
            tl.to('.molecule', { opacity: 1, scale: 1, duration: 1.5, delay: 1.4 });
        }, 100);

        // Continuous floating animations
        const animateMolecules = () => {
            const molecules = document.querySelectorAll('.molecule');
            molecules.forEach((mol, i) => {
                const randomDelay = Math.random() * 2000;
                const randomDuration = 4000 + Math.random() * 2000;

                setTimeout(() => {
                    const animate = () => {
                        mol.style.transition = `transform ${randomDuration}ms ease-in-out`;
                        mol.style.transform = `translate(${Math.random() * 50 - 25}px, ${Math.random() * 50 - 25}px) scale(${0.7 + Math.random() * 0.6})`;

                        setTimeout(() => {
                            mol.style.transform = `translate(0px, 0px) scale(1)`;
                            setTimeout(animate, randomDuration);
                        }, randomDuration);
                    };
                    animate();
                }, randomDelay);
            });
        };

        setTimeout(animateMolecules, 1800);

        // Parallax scroll effects
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const heroHeight = heroRef.current?.offsetHeight || 0;

            if (scrollY < heroHeight) {
                if (gradientRef.current) {
                    const parallaxSpeed = scrollY * 0.3;
                    gradientRef.current.style.transform = `translateY(${parallaxSpeed}px)`;
                }

                if (leftPanelRef.current) {
                    const leftParallax = scrollY * 0.15;
                    leftPanelRef.current.style.transform = `translateY(${leftParallax}px)`;
                }

                if (rightPanelRef.current) {
                    const rightParallax = scrollY * 0.25;
                    rightPanelRef.current.style.transform = `translateY(${rightParallax}px)`;
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToStory = () => {
        const storySection = document.getElementById('story');
        if (storySection) {
            storySection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen pt-[80px] md:pt-[80px] px-10 bg-gradient-to-br from-white via-slate-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 overflow-hidden"
        >
            {/* Top gradient for navbar contrast */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-slate-900/70 via-slate-900/30 to-transparent dark:from-slate-900/90 dark:via-slate-900/50 dark:to-transparent z-5" />

            {/* Animated Background Gradient */}
            <div
                ref={gradientRef}
                className="absolute inset-0 bg-gradient-to-br from-blue-600/8 via-transparent to-green-400/8 dark:from-blue-400/15 dark:to-green-300/15"
            />

            {/* Floating Molecules - Left Side */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`left-${i}`}
                        className={`molecule absolute w-2 h-2 rounded-full ${
                            i % 3 === 0 ? 'bg-blue-400/25' : i % 3 === 1 ? 'bg-green-400/25' : 'bg-blue-300/20'
                        }`}
                        style={{
                            left: `${5 + (i * 8) % 40}%`,
                            top: `${20 + (i * 15) % 60}%`,
                        }}
                    />
                ))}

                {/* Molecular connections - Left */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={`line-left-${i}`}
                        className="molecule absolute h-px bg-gradient-to-r from-blue-300/20 via-blue-400/30 to-transparent"
                        style={{
                            left: `${8 + i * 12}%`,
                            top: `${30 + i * 20}%`,
                            width: `${80 + i * 20}px`,
                            transform: `rotate(${i * 35}deg)`
                        }}
                    />
                ))}
            </div>

            {/* Floating Molecules - Right Side */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={`right-${i}`}
                        className={`molecule absolute w-2 h-2 rounded-full ${
                            i % 3 === 0 ? 'bg-green-400/25' : i % 3 === 1 ? 'bg-blue-400/25' : 'bg-green-300/20'
                        }`}
                        style={{
                            right: `${5 + (i * 8) % 40}%`,
                            top: `${25 + (i * 12) % 55}%`,
                        }}
                    />
                ))}

                {/* Molecular connections - Right */}
                {[...Array(3)].map((_, i) => (
                    <div
                        key={`line-right-${i}`}
                        className="molecule absolute h-px bg-gradient-to-l from-green-300/20 via-green-400/30 to-transparent"
                        style={{
                            right: `${8 + i * 12}%`,
                            top: `${35 + i * 18}%`,
                            width: `${70 + i * 25}px`,
                            transform: `rotate(${-i * 30}deg)`
                        }}
                    />
                ))}
            </div>

            {/* Main Split Screen Content */}
            <div className="relative z-10 min-h-screen flex items-center">
                <div className="w-full max-w-7xl mx-auto px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                        {/* Left Panel - Content */}
                        <div ref={leftPanelRef} className="space-y-12 lg:pr-8">
                            {/* Main Heading */}
                            <div className="space-y-6">
                                <h1
                                    ref={titleRef}
                                    className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.9] tracking-tight text-slate-900 dark:text-white drop-shadow-sm"
                                >
                                    Healing
                                    <br />
                                    Through
                                    <br />
                                    <span className="bg-gradient-to-r from-blue-700 to-green-600 dark:from-blue-400 dark:to-green-400 bg-clip-text text-transparent font-medium">
                    Innovation
                  </span>
                                </h1>

                                {/* Subheading */}
                                <p
                                    ref={subtitleRef}
                                    className="text-xl md:text-2xl font-light text-slate-700 dark:text-slate-300 leading-relaxed drop-shadow-sm max-w-lg"
                                >
                                    Where quantum frequency meets regenerative science.
                                </p>
                            </div>

                            {/* CTA Scroll Indicator */}
                            <div ref={ctaRef} className="pt-8">
                                <button
                                    onClick={scrollToStory}
                                    className="group flex items-center space-x-4 transition-all duration-500 hover:scale-105"
                                    aria-label="Scroll to story section"
                                >
                                    <div className="p-4 rounded-full border-2 border-slate-300 dark:border-slate-700 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/20 transition-all duration-300 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm">
                                        <ChevronDown className="w-6 h-6 text-slate-500 dark:text-slate-500 group-hover:text-blue-700 dark:group-hover:text-blue-400 animate-bounce" />
                                    </div>
                                    <div className="flex flex-col items-start">
                    <span className="text-lg font-medium text-slate-600 dark:text-slate-400 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors duration-300 drop-shadow-sm">
                      Discover Our Story
                    </span>
                                        <span className="text-sm text-slate-500 dark:text-slate-500 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors duration-300">
                      Scroll to explore
                    </span>
                                    </div>
                                </button>
                            </div>
                        </div>

                        {/* Right Panel - Visual */}
                        <div ref={rightPanelRef} className="relative lg:pl-8">
                            {/* Hero Image Container */}
                            <div ref={imageRef} className="relative">
                                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-50/80 to-green-50/80 dark:from-blue-900/30 dark:to-green-900/30 p-6 backdrop-blur-sm border border-white/30 dark:border-slate-700/40">

                                    {/* Main Image */}
                                    <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-blue-100 via-white to-green-100 dark:from-slate-800 dark:via-slate-700 dark:to-slate-800">
                                        <img
                                            src="/images/aboutHero.png"
                                            alt="Advanced medical technology and healing innovation at Milagro Pharmaceuticals"
                                            className="w-full h-full object-cover"
                                            loading="eager"
                                        />

                                        {/* Gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />

                                        {/* Floating elements over image */}
                                        <div className="absolute top-6 right-6 w-4 h-4 rounded-full bg-blue-400/70 animate-pulse" />
                                        <div className="absolute bottom-8 left-8 w-3 h-3 rounded-full bg-green-400/70 animate-pulse" style={{ animationDelay: '1s' }} />
                                        <div className="absolute top-1/3 left-6 w-2 h-2 rounded-full bg-blue-300/70 animate-pulse" style={{ animationDelay: '2s' }} />
                                        <div className="absolute bottom-1/3 right-8 w-2.5 h-2.5 rounded-full bg-green-300/70 animate-pulse" style={{ animationDelay: '3s' }} />
                                    </div>

                                    {/* Glass morphism effect */}
                                    {/*<div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm pointer-events-none" />*/}
                                </div>

                                {/* Floating accent elements around image */}
                                <div className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-400/30 to-blue-600/30 backdrop-blur-sm border border-white/20" />
                                <div className="absolute -bottom-6 -left-6 w-12 h-12 rounded-full bg-gradient-to-br from-green-400/20 to-green-600/20 backdrop-blur-sm border border-white/20" />
                                <div className="absolute top-1/4 -right-8 w-6 h-6 rounded-full bg-gradient-to-br from-blue-300/40 to-blue-500/40 backdrop-blur-sm border border-white/20" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle grid overlay */}
            <div className="absolute inset-0 bg-grid-slate-100/[0.02] dark:bg-grid-slate-700/[0.05] pointer-events-none" />
        </div>
    );
};

export default AboutHero;