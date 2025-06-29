import { useEffect, useRef } from 'react';

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
        // Note: GSAP animations would work here if GSAP was available
        // For now, we'll use CSS transitions and animations

        // Simple entrance animations using CSS
        const animateEntrance = () => {
            setTimeout(() => {
                if (badgeRef.current) badgeRef.current.style.transform = 'translateY(0)';
                if (badgeRef.current) badgeRef.current.style.opacity = '1';
            }, 100);

            setTimeout(() => {
                if (titleRef.current) titleRef.current.style.transform = 'translateY(0)';
                if (titleRef.current) titleRef.current.style.opacity = '1';
            }, 300);

            setTimeout(() => {
                if (descriptionRef.current) descriptionRef.current.style.transform = 'translateY(0)';
                if (descriptionRef.current) descriptionRef.current.style.opacity = '1';
            }, 500);

            cardsRef.current.forEach((card, index) => {
                if (card) {
                    setTimeout(() => {
                        card.style.transform = 'translateY(0) scale(1)';
                        card.style.opacity = '1';
                    }, 700 + (index * 150));
                }
            });
        };

        animateEntrance();

        return () => {
            // Cleanup if needed
        };
    }, []);

    const addToRefs = (el, refsArray, index) => {
        if (el && !refsArray.current.includes(el)) {
            refsArray.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-gray-900 relative overflow-hidden min-h-screen flex items-center">
            {/* Enhanced Background elements with gold accents */}
            <div className="absolute inset-0 z-0">
                <div
                    ref={el => addToRefs(el, backgroundRef, 0)}
                    className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-yellow-100/40 via-amber-100/30 to-blue-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                ></div>
                <div
                    ref={el => addToRefs(el, backgroundRef, 1)}
                    className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-amber-100/30 via-yellow-100/20 to-cyan-100/40 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                ></div>

                {/* Additional floating elements with gold tones */}
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 0)}
                    className="absolute top-1/4 right-1/4 w-4 h-4 bg-gradient-to-r from-yellow-300 to-amber-300 rounded-full opacity-60 animate-bounce"
                    style={{ animationDelay: '0.5s', animationDuration: '3s' }}
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 1)}
                    className="absolute top-1/3 left-1/3 w-2 h-2 bg-gradient-to-r from-amber-200 to-yellow-200 rounded-full opacity-40 animate-bounce"
                    style={{ animationDelay: '1.5s', animationDuration: '4s' }}
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 2)}
                    className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-gradient-to-r from-yellow-200 to-amber-200 rounded-full opacity-50 animate-bounce"
                    style={{ animationDelay: '2s', animationDuration: '3.5s' }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={heroContentRef} className="text-center mb-20">
                    <span
                        ref={badgeRef}
                        className="inline-block bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-100 text-amber-800 text-sm font-semibold px-8 py-4 rounded-full mb-8 shadow-lg backdrop-blur-sm border-2 border-yellow-200/60 ring-4 ring-yellow-100/30 transition-all duration-500 hover:shadow-xl hover:ring-yellow-200/50 hover:scale-105"
                        style={{ transform: 'translateY(50px)', opacity: '0', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                        ✨ <span className="text-yellow-600 font-bold">Premium</span> Cutting-Edge Therapies
                    </span>

                    <h1
                        ref={titleRef}
                        className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight"
                        style={{ transform: 'translateY(50px)', opacity: '0', transition: 'all 1s ease-out' }}
                    >
                        <span className="bg-gradient-to-r from-blue-600 via-amber-500 to-cyan-600 text-transparent bg-clip-text bg-[length:200%_100%] animate-pulse">
                            Biohacking Your Wellness Journey
                        </span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="text-xl md:text-2xl text-gray-700 max-w-5xl mx-auto leading-relaxed font-light mb-12"
                        style={{ transform: 'translateY(50px)', opacity: '0', transition: 'all 0.8s ease-out' }}
                    >
                        Discover our revolutionary therapies that combine advanced biotechnology with
                        nature's healing intelligence for <span className="text-blue-600 font-medium">cellular-level restoration</span> and
                        <span className="text-amber-600 font-bold bg-gradient-to-r from-yellow-100 to-amber-100 px-2 py-1 rounded-lg"> performance enhancement</span>.
                    </p>

                    {/* Premium CTA Button */}
                    <div className="mb-16">
                        <button className="group relative inline-flex items-center justify-center px-12 py-4 text-lg font-bold text-gray-900 bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-400 rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ring-4 ring-yellow-200/30 hover:ring-yellow-300/50 focus:ring-yellow-400/60 focus:outline-none">
                            <span className="relative z-10">Discover Premium Therapies</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div
                        ref={el => addToRefs(el, cardsRef, 0)}
                        className="group relative bg-gradient-to-br from-white via-slate-50 to-yellow-50/30 p-10 rounded-2xl border-2 border-gray-200 hover:border-yellow-300 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-yellow-200/20 transform hover:scale-105"
                        style={{ transform: 'translateY(100px) scale(0.8)', opacity: '0', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                        {/* Premium gold accent */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-xs font-bold">★</span>
                        </div>

                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 via-amber-100/30 to-blue-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="relative z-10">
                            <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">🧬</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                                Cellular Optimization
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                Therapies designed to work at the <span className="text-blue-600 font-medium">mitochondrial level</span> for energy production and <span className="text-amber-600 font-bold bg-yellow-100 px-1 rounded">cellular repair</span>.
                            </p>
                        </div>

                        {/* Trust indicator */}
                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            PREMIUM
                        </div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 1)}
                        className="group relative bg-gradient-to-br from-white via-slate-50 to-amber-50/30 p-10 rounded-2xl border-2 border-gray-200 hover:border-amber-300 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-amber-200/20 transform hover:scale-105"
                        style={{ transform: 'translateY(100px) scale(0.8)', opacity: '0', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-xs font-bold">⚡</span>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-yellow-100/30 to-blue-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="relative z-10">
                            <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">⚡</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                                Rapid Bioavailability
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                Advanced delivery systems ensure <span className="text-purple-600 font-medium">maximum absorption</span> and <span className="text-yellow-600 font-bold bg-amber-100 px-1 rounded">immediate therapeutic effects</span>.
                            </p>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-amber-400 to-yellow-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            FAST-ACTING
                        </div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 2)}
                        className="group relative bg-gradient-to-br from-white via-slate-50 to-yellow-50/30 p-10 rounded-2xl border-2 border-gray-200 hover:border-yellow-300 transition-all duration-500 shadow-lg hover:shadow-2xl hover:shadow-yellow-200/20 transform hover:scale-105"
                        style={{ transform: 'translateY(100px) scale(0.8)', opacity: '0', transition: 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
                    >
                        <div className="absolute top-4 right-4 w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <span className="text-white text-xs font-bold">🔬</span>
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-yellow-100/20 via-amber-100/30 to-cyan-100/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="relative z-10">
                            <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">🔬</div>
                            <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-amber-700 transition-colors duration-300">
                                Science-Backed
                            </h3>
                            <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                                <span className="text-cyan-600 font-medium">Clinically validated</span> formulations developed by our team of <span className="text-amber-600 font-bold bg-yellow-100 px-1 rounded">world-class biochemists</span> and physicians.
                            </p>
                        </div>

                        <div className="absolute bottom-4 left-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            VALIDATED
                        </div>
                    </div>
                </div>

                {/* Trust indicators section */}
                <div className="mt-20 text-center">
                    <div className="inline-flex items-center space-x-8 bg-gradient-to-r from-yellow-50 via-amber-50 to-yellow-50 px-12 py-6 rounded-2xl border border-yellow-200/50 shadow-lg">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">✓</span>
                            </div>
                            <span className="text-gray-700 font-medium">FDA Compliant</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">★</span>
                            </div>
                            <span className="text-gray-700 font-medium">Premium Grade</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full flex items-center justify-center">
                                <span className="text-white text-sm font-bold">🔒</span>
                            </div>
                            <span className="text-gray-700 font-medium">Lab Tested</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}