import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export default function IntroComponent() {
    const sectionRef = useRef(null);
    const heroContentRef = useRef(null);
    const badgeRef = useRef(null);
    const titleRef = useRef(null);
    const descriptionRef = useRef(null);
    const cardsRef = useRef([]);
    const backgroundRef = useRef([]);
    const floatingElementsRef = useRef([]);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Set initial states
            gsap.set([badgeRef.current, titleRef.current, descriptionRef.current], {
                opacity: 0,
                y: 50
            });

            gsap.set(cardsRef.current, {
                opacity: 0,
                y: 100,
                scale: 0.8
            });

            gsap.set(backgroundRef.current, {
                scale: 0,
                opacity: 0
            });

            // Create master timeline
            const tl = gsap.timeline();

            // Animate background elements first
            tl.to(backgroundRef.current, {
                scale: 1,
                opacity: 0.3,
                duration: 2,
                ease: "power2.out",
                stagger: 0.2
            })

                // Hero content entrance
                .to(badgeRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "back.out(1.7)"
                }, "-=1.5")

                .to(titleRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power3.out"
                }, "-=0.5")

                .to(descriptionRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    ease: "power2.out"
                }, "-=0.6")

                // Cards animation with stagger
                .to(cardsRef.current, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.8,
                    ease: "back.out(1.2)",
                    stagger: 0.15
                }, "-=0.4");

            // Floating animations for background elements
            gsap.to(backgroundRef.current[0], {
                x: 30,
                y: -20,
                duration: 4,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            gsap.to(backgroundRef.current[1], {
                x: -25,
                y: 15,
                duration: 3.5,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });

            // Continuous floating elements animation
            floatingElementsRef.current.forEach((el, index) => {
                if (el) {
                    gsap.to(el, {
                        y: -10 - (index * 5),
                        duration: 2 + (index * 0.3),
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: index * 0.2
                    });
                }
            });

            // Hover animations for cards
            cardsRef.current.forEach((card) => {
                if (card) {
                    const cardTl = gsap.timeline({ paused: true });

                    cardTl.to(card, {
                        scale: 1.05,
                        y: -10,
                        duration: 0.3,
                        ease: "power2.out"
                    })
                        .to(card.querySelector('.card-icon'), {
                            scale: 1.2,
                            rotation: 5,
                            duration: 0.3,
                            ease: "back.out(1.7)"
                        }, 0)
                        .to(card.querySelector('.card-glow'), {
                            opacity: 1,
                            scale: 1.1,
                            duration: 0.3
                        }, 0);

                    card.addEventListener('mouseenter', () => cardTl.play());
                    card.addEventListener('mouseleave', () => cardTl.reverse());
                }
            });

            // Gradient text animation
            gsap.to(titleRef.current?.querySelector('.gradient-text'), {
                backgroundPosition: "200% center",
                duration: 3,
                ease: "none",
                repeat: -1
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el, refsArray, index) => {
        if (el && !refsArray.current.includes(el)) {
            refsArray.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-gray-900 text-white relative overflow-hidden min-h-screen flex items-center">
            {/* Enhanced Background elements */}
            <div className="absolute inset-0 z-0">
                <div
                    ref={el => addToRefs(el, backgroundRef, 0)}
                    className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full mix-blend-multiply filter blur-3xl"
                ></div>
                <div
                    ref={el => addToRefs(el, backgroundRef, 1)}
                    className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-500 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl"
                ></div>

                {/* Additional floating elements */}
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 0)}
                    className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-400 rounded-full opacity-60"
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 1)}
                    className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-400 rounded-full opacity-40"
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 2)}
                    className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-cyan-400 rounded-full opacity-50"
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={heroContentRef} className="text-center mb-20">
                    <span
                        ref={badgeRef}
                        className="inline-block bg-gradient-to-r from-blue-600 to-blue-500 text-white text-sm font-semibold px-6 py-3 rounded-full mb-8 shadow-lg backdrop-blur-sm border border-blue-400/30"
                    >
                        ✨ Cutting-Edge Therapies
                    </span>

                    <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
                        <span className="gradient-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-600 text-transparent bg-clip-text bg-[length:200%_100%]">
                            Biohacking Your Wellness Journey
                        </span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="text-xl md:text-2xl text-gray-300 max-w-5xl mx-auto leading-relaxed font-light"
                    >
                        Discover our revolutionary therapies that combine advanced biotechnology with
                        nature's healing intelligence for <span className="text-blue-400 font-medium">cellular-level restoration</span> and
                        <span className="text-cyan-400 font-medium"> performance enhancement</span>.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div
                        ref={el => addToRefs(el, cardsRef, 0)}
                        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
                    >
                        {/* Glow effect */}
                        <div className="card-glow absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl opacity-0 transition-all duration-300"></div>

                        <div className="card-icon text-5xl mb-6 transform transition-all duration-300">🧬</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-300 transition-colors duration-300">
                            Cellular Optimization
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            Therapies designed to work at the <span className="text-blue-400">mitochondrial level</span> for energy production and cellular repair.
                        </p>

                        {/* Subtle animated border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 1)}
                        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
                    >
                        <div className="card-glow absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-2xl opacity-0 transition-all duration-300"></div>

                        <div className="card-icon text-5xl mb-6 transform transition-all duration-300">⚡</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-purple-300 transition-colors duration-300">
                            Rapid Bioavailability
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            Advanced delivery systems ensure <span className="text-purple-400">maximum absorption</span> and immediate therapeutic effects.
                        </p>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 2)}
                        className="group relative bg-gradient-to-br from-gray-800 to-gray-900 p-10 rounded-2xl border border-gray-700 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm"
                    >
                        <div className="card-glow absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-2xl opacity-0 transition-all duration-300"></div>

                        <div className="card-icon text-5xl mb-6 transform transition-all duration-300">🔬</div>
                        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cyan-300 transition-colors duration-300">
                            Science-Backed
                        </h3>
                        <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                            <span className="text-cyan-400">Clinically validated</span> formulations developed by our team of biochemists and physicians.
                        </p>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>
            </div>
        </section>
    );
}