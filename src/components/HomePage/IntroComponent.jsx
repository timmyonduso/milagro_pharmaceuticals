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
        // Simple fade-in animations using CSS transitions
        const animateElements = () => {
            setTimeout(() => {
                if (badgeRef.current) {
                    badgeRef.current.style.opacity = '1';
                    badgeRef.current.style.transform = 'translateY(0)';
                }
            }, 100);

            setTimeout(() => {
                if (titleRef.current) {
                    titleRef.current.style.opacity = '1';
                    titleRef.current.style.transform = 'translateY(0)';
                }
            }, 300);

            setTimeout(() => {
                if (descriptionRef.current) {
                    descriptionRef.current.style.opacity = '1';
                    descriptionRef.current.style.transform = 'translateY(0)';
                }
            }, 500);

            setTimeout(() => {
                cardsRef.current.forEach((card, index) => {
                    if (card) {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0) scale(1)';
                        }, index * 150);
                    }
                });
            }, 700);

            setTimeout(() => {
                backgroundRef.current.forEach((bg, index) => {
                    if (bg) {
                        setTimeout(() => {
                            bg.style.opacity = '0.15';
                            bg.style.transform = 'scale(1)';
                        }, index * 200);
                    }
                });
            }, 200);
        };

        animateElements();
    }, []);

    const addToRefs = (el, refsArray, index) => {
        if (el && !refsArray.current.includes(el)) {
            refsArray.current[index] = el;
        }
    };

    return (
        <section ref={sectionRef} className="py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-gray-900 relative overflow-hidden min-h-screen flex items-center">
            {/* Enhanced Background elements */}
            <div className="absolute inset-0 z-0">
                <div
                    ref={el => addToRefs(el, backgroundRef, 0)}
                    className="absolute top-10 left-10 w-80 h-80 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full filter blur-3xl opacity-0 transform scale-0 transition-all duration-2000 ease-out animate-pulse"
                ></div>
                <div
                    ref={el => addToRefs(el, backgroundRef, 1)}
                    className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full filter blur-3xl opacity-0 transform scale-0 transition-all duration-2000 ease-out animate-pulse"
                ></div>

                {/* Additional floating elements */}
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 0)}
                    className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-300 rounded-full opacity-30 animate-bounce"
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 1)}
                    className="absolute top-1/3 left-1/3 w-2 h-2 bg-purple-300 rounded-full opacity-25 animate-pulse"
                ></div>
                <div
                    ref={el => addToRefs(el, floatingElementsRef, 2)}
                    className="absolute bottom-1/3 left-1/4 w-3 h-3 bg-cyan-300 rounded-full opacity-30 animate-bounce"
                    style={{ animationDelay: '0.5s' }}
                ></div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div ref={heroContentRef} className="text-center mb-20">
                    <span
                        ref={badgeRef}
                        className="inline-block bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-semibold px-6 py-3 rounded-full mb-8 shadow-lg backdrop-blur-sm border border-blue-300/30 opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
                    >
                        ✨ Cutting-Edge Therapies
                    </span>

                    <h1 ref={titleRef} className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight opacity-0 transform translate-y-8 transition-all duration-1000 ease-out">
                        <span className="gradient-text bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-transparent bg-clip-text bg-[length:200%_100%] animate-gradient">
                            Biohacking Your Wellness Journey
                        </span>
                    </h1>

                    <p
                        ref={descriptionRef}
                        className="text-xl md:text-2xl text-gray-600 max-w-5xl mx-auto leading-relaxed font-light opacity-0 transform translate-y-8 transition-all duration-800 ease-out"
                    >
                        Discover our revolutionary therapies that combine advanced biotechnology with
                        nature's healing intelligence for <span className="text-blue-600 font-medium">cellular-level restoration</span> and
                        <span className="text-cyan-600 font-medium"> performance enhancement</span>.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div
                        ref={el => addToRefs(el, cardsRef, 0)}
                        className="group relative bg-white/70 backdrop-blur-sm p-10 rounded-2xl border border-gray-200 hover:border-blue-300/50 transition-all duration-500 shadow-lg hover:shadow-xl opacity-0 transform translate-y-8 scale-95"
                        style={{ transitionDuration: '800ms' }}
                    >
                        {/* Glow effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-cyan-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">🧬</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                            Cellular Optimization
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            Therapies designed to work at the <span className="text-blue-600 font-medium">mitochondrial level</span> for energy production and cellular repair.
                        </p>

                        {/* Subtle animated border */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 1)}
                        className="group relative bg-white/70 backdrop-blur-sm p-10 rounded-2xl border border-gray-200 hover:border-purple-300/50 transition-all duration-500 shadow-lg hover:shadow-xl opacity-0 transform translate-y-8 scale-95"
                        style={{ transitionDuration: '800ms' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">⚡</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-purple-700 transition-colors duration-300">
                            Rapid Bioavailability
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            Advanced delivery systems ensure <span className="text-purple-600 font-medium">maximum absorption</span> and immediate therapeutic effects.
                        </p>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>

                    <div
                        ref={el => addToRefs(el, cardsRef, 2)}
                        className="group relative bg-white/70 backdrop-blur-sm p-10 rounded-2xl border border-gray-200 hover:border-cyan-300/50 transition-all duration-500 shadow-lg hover:shadow-xl opacity-0 transform translate-y-8 scale-95"
                        style={{ transitionDuration: '800ms' }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-50/50 to-blue-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                        <div className="text-5xl mb-6 transform transition-all duration-300 group-hover:scale-110">🔬</div>
                        <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-cyan-700 transition-colors duration-300">
                            Science-Backed
                        </h3>
                        <p className="text-gray-600 text-lg leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                            <span className="text-cyan-600 font-medium">Clinically validated</span> formulations developed by our team of biochemists and physicians.
                        </p>

                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-300/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes gradient {
                    0% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                    100% { background-position: 0% 50%; }
                }
                .animate-gradient {
                    animation: gradient 3s ease infinite;
                }
            `}</style>
        </section>
    );
}