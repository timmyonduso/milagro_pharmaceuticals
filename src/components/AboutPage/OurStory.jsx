import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
    const sectionRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);
    const waveRef = useRef(null);

    // Editable content
    const storyText = "Milagro Pharmaceuticals is a health and wellness company pioneering accessible, non-invasive, frequency-based therapy solutions. Our mission: to harness nature and vibration to restore balance, globally.";
    const titleText = "Everything is Vibration";

    useEffect(() => {
        const section = sectionRef.current;
        const title = titleRef.current;
        const textContainer = textRef.current;
        const wave = waveRef.current;

        if (!section || !textContainer) return;

        // Check for reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        // Split text into individual characters
        const chars = storyText.split('').map((char, index) => {
            const span = document.createElement('span');
            span.textContent = char;
            span.className = `inline-block transition-all duration-300 ${
                char === ' ' ? 'w-2' : ''
            }`;
            span.style.opacity = prefersReducedMotion ? '1' : '0.2';
            span.style.transform = prefersReducedMotion ? 'none' : 'scale(0.8)';
            span.dataset.index = index;
            return span;
        });

        // Clear and populate text container
        textContainer.innerHTML = '';
        chars.forEach(char => textContainer.appendChild(char));

        if (prefersReducedMotion) {
            // Fallback: simple fade-in animation
            gsap.fromTo(textContainer,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
            );
            gsap.fromTo(title,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power2.out", delay: 0.3 }
            );
            return;
        }

        // Create GSAP timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                pin: true,
                start: "top top",
                end: "+=200%",
                scrub: 1,
                anticipatePin: 1,
                onUpdate: (self) => {
                    // Calculate progress
                    const progress = self.progress;
                    const totalChars = chars.length;
                    const activeIndex = Math.floor(progress * totalChars);

                    // Animate characters based on scroll progress
                    chars.forEach((char, index) => {
                        if (index <= activeIndex) {
                            // Active/revealed characters
                            gsap.to(char, {
                                opacity: 1,
                                scale: 1,
                                color: index === activeIndex ? '#0072CE' : '#1f2937',
                                textShadow: index === activeIndex ? '0 0 8px rgba(0, 114, 206, 0.5)' : 'none',
                                duration: 0.3,
                                ease: "power2.out"
                            });
                        } else {
                            // Unrevealed characters
                            gsap.to(char, {
                                opacity: 0.2,
                                scale: 0.9,
                                color: '#9ca3af',
                                textShadow: 'none',
                                duration: 0.2,
                                ease: "power2.out"
                            });
                        }
                    });
                }
            }
        });

        // Title animation
        gsap.fromTo(title,
            {
                opacity: 0,
                y: -20,
                scale: 0.9
            },
            {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 1.5,
                ease: "elastic.out(1, 0.8)",
                scrollTrigger: {
                    trigger: section,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            }
        );

        // Background wave animation
        if (wave) {
            gsap.to(wave, {
                rotation: 360,
                duration: 20,
                repeat: -1,
                ease: "none"
            });

            gsap.to(wave, {
                scale: 1.1,
                duration: 4,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }

        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section
            id="story"
            ref={sectionRef}
            className="relative min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 flex items-center justify-center px-6 py-12 overflow-hidden"
        >
            {/* Background Wave Effect */}
            <div
                ref={waveRef}
                className="absolute inset-0 opacity-5 dark:opacity-10"
                style={{
                    background: `radial-gradient(circle at 50% 50%, 
            rgba(0, 114, 206, 0.1) 0%, 
            rgba(167, 209, 41, 0.05) 30%, 
            transparent 70%)`
                }}
            />

            {/* Additional subtle wave patterns */}
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 dark:bg-blue-900/20 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-green-100 dark:bg-green-900/20 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />

            <div className="relative z-10 max-w-4xl mx-auto text-center">
                {/* Title Badge */}
                <div
                    ref={titleRef}
                    className="inline-flex items-center gap-2 px-6 py-3 mb-12 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border border-blue-200/50 dark:border-blue-700/50 rounded-full shadow-lg"
                >
                    <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-green-400 rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-200 tracking-wide uppercase">
            {titleText}
          </span>
                    <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
                </div>

                {/* Story Text */}
                <div
                    ref={textRef}
                    className="text-2xl md:text-3xl lg:text-4xl leading-relaxed font-light text-slate-800 dark:text-slate-200 tracking-wide"
                    style={{
                        fontFamily: 'system-ui, -apple-system, sans-serif',
                        lineHeight: '1.6'
                    }}
                />

                {/* Progress Indicator */}
                <div className="mt-16 flex justify-center">
                    <div className="w-24 h-1 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-blue-500 to-green-400 rounded-full transform origin-left transition-transform duration-300" />
                    </div>
                </div>

                {/* Scroll Hint */}
                <div className="mt-8 text-sm text-slate-500 dark:text-slate-400 opacity-75">
                    <div className="flex items-center justify-center gap-2">
                        <span>Scroll to reveal our story</span>
                        <div className="w-4 h-6 border-2 border-slate-300 dark:border-slate-600 rounded-full relative">
                            <div className="w-1 h-2 bg-slate-400 dark:bg-slate-500 rounded-full absolute top-1 left-1/2 transform -translate-x-1/2 animate-bounce" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating particles effect */}
            <div className="absolute inset-0 pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-blue-300/30 dark:bg-blue-500/30 rounded-full animate-float"
                        style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 3) * 20}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + i * 0.5}s`
                        }}
                    />
                ))}
            </div>

            <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-10px) rotate(120deg); }
          66% { transform: translateY(5px) rotate(240deg); }
        }
        .animate-float {
          animation: float linear infinite;
        }
      `}</style>
        </section>
    );
};

export default OurStory;