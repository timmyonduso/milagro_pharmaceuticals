import React, { useState, useEffect, useRef, Suspense } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TextPlugin } from 'gsap/TextPlugin';
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
    OrbitControls,
    Environment,
    Float,
    Text3D,
    Center,
    MeshDistortMaterial,
    Sparkles,
    Stars,
    Cloud,
    Sky,
    ContactShadows,
    useTexture,
    Sphere,
    Box,
    Torus,
    Cylinder
} from '@react-three/drei';
import * as THREE from 'three';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, TextPlugin, MorphSVGPlugin);

// 3D Floating Elements Component
const FloatingElements = () => {
    const groupRef = useRef();
    const sphereRef = useRef();
    const boxRef = useRef();
    const torusRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
            groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.5;
        }

        if (sphereRef.current) {
            sphereRef.current.rotation.x = state.clock.elapsedTime * 0.3;
            sphereRef.current.rotation.z = state.clock.elapsedTime * 0.2;
        }

        if (boxRef.current) {
            boxRef.current.rotation.y = state.clock.elapsedTime * 0.4;
        }

        if (torusRef.current) {
            torusRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            torusRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });

    return (
        <group ref={groupRef}>
            {/* Floating Sphere */}
            <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
                <Sphere ref={sphereRef} args={[0.8, 32, 32]} position={[-3, 2, 0]}>
                    <MeshDistortMaterial
                        color="#059669"
                        transparent
                        opacity={0.8}
                        distort={0.3}
                        speed={2}
                        roughness={0.1}
                        metalness={0.8}
                    />
                </Sphere>
            </Float>

            {/* Floating Box */}
            <Float speed={2} rotationIntensity={2} floatIntensity={1}>
                <Box ref={boxRef} args={[1, 1, 1]} position={[3, -1, -2]}>
                    <MeshDistortMaterial
                        color="#0d9488"
                        transparent
                        opacity={0.7}
                        distort={0.4}
                        speed={3}
                        roughness={0.2}
                        metalness={0.6}
                    />
                </Box>
            </Float>

            {/* Floating Torus */}
            <Float speed={1.8} rotationIntensity={3} floatIntensity={1.5}>
                <Torus ref={torusRef} args={[0.6, 0.3, 16, 32]} position={[0, -2, 1]}>
                    <MeshDistortMaterial
                        color="#10b981"
                        transparent
                        opacity={0.9}
                        distort={0.2}
                        speed={1.5}
                        roughness={0}
                        metalness={1}
                    />
                </Torus>
            </Float>
        </group>
    );
};

// 3D Scene Component
const Scene3D = ({ mouse }) => {
    const { camera } = useThree();

    useFrame(() => {
        if (mouse.current) {
            camera.position.x = THREE.MathUtils.lerp(camera.position.x, mouse.current.x * 0.5, 0.03);
            camera.position.y = THREE.MathUtils.lerp(camera.position.y, mouse.current.y * 0.5, 0.03);
            camera.lookAt(0, 0, 0);
        }
    });

    return (
        <>
            <ambientLight intensity={0.4} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#059669" />

            <FloatingElements />

            <Environment preset="sunset" />
            <Stars radius={50} depth={50} count={1000} factor={2} saturation={0.5} fade />

            <ContactShadows
                position={[0, -3, 0]}
                opacity={0.3}
                scale={20}
                blur={2}
                far={4.5}
            />
        </>
    );
};

const ProductsHero = () => {
    const [email, setEmail] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);
    const heroRef = useRef(null);
    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const ctaRef = useRef(null);
    const mainImageRef = useRef(null);
    const floatingElementsRef = useRef([]);
    const backgroundRef = useRef(null);
    const scrollIndicatorRef = useRef(null);
    const linesRef = useRef(null);
    const canvasRef = useRef(null);
    const mouse = useRef({ x: 0, y: 0 });

    useEffect(() => {
        // Set initial states
        gsap.set([titleRef.current, subtitleRef.current, ctaRef.current], {
            opacity: 0,
            y: 100,
            rotationX: 15
        });

        gsap.set(mainImageRef.current, {
            opacity: 0,
            scale: 0.8,
            rotation: -10
        });

        gsap.set(floatingElementsRef.current, {
            opacity: 0,
            scale: 0,
            rotation: 180
        });

        gsap.set(scrollIndicatorRef.current, {
            opacity: 0,
            y: 30
        });

        gsap.set(canvasRef.current, {
            opacity: 0,
            scale: 0.8
        });

        // Hero entrance animations
        const heroTimeline = gsap.timeline({
            onComplete: () => setIsLoaded(true)
        });

        heroTimeline
            .to(titleRef.current, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1.2,
                ease: "power3.out"
            })
            .to(subtitleRef.current, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .to(ctaRef.current, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.6")
            .to(canvasRef.current, {
                opacity: 1,
                scale: 1,
                duration: 1.5,
                ease: "power3.out"
            }, "-=1")
            .to(mainImageRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 1.5,
                ease: "power3.out"
            }, "-=1.2")
            .to(floatingElementsRef.current, {
                opacity: 1,
                scale: 1,
                rotation: 0,
                duration: 0.8,
                ease: "back.out(1.7)",
                stagger: 0.1
            }, "-=0.8")
            .to(scrollIndicatorRef.current, {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out"
            }, "-=0.3");

        // Floating elements continuous animation
        floatingElementsRef.current.forEach((element, index) => {
            if (element) {
                gsap.to(element, {
                    y: Math.sin(index) * 20,
                    x: Math.cos(index) * 15,
                    rotation: 360,
                    duration: 4 + index * 0.5,
                    ease: "none",
                    repeat: -1,
                    yoyo: true
                });
            }
        });

        // Scroll-triggered animations
        gsap.to(backgroundRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            y: -100,
            opacity: 0.5,
            ease: "none"
        });

        gsap.to([titleRef.current, subtitleRef.current, ctaRef.current], {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5
            },
            y: -50,
            // Remove the opacity change
            ease: "none"
        });

        gsap.to(canvasRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            scale: 0.8,
            rotationY: 10,
            ease: "none"
        });

        gsap.to(mainImageRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 1
            },
            rotationY: 15,
            rotationX: 5,
            scale: 0.9,
            ease: "none"
        });

        floatingElementsRef.current.forEach((element, index) => {
            if (element) {
                gsap.to(element, {
                    scrollTrigger: {
                        trigger: heroRef.current,
                        start: "top top",
                        end: "bottom top",
                        scrub: 1 + index * 0.1
                    },
                    y: -200 - index * 50,
                    x: (index % 2 === 0 ? 1 : -1) * (100 + index * 20),
                    rotation: 360 + index * 90,
                    scale: 0.3,
                    ease: "none"
                });
            }
        });

        if (linesRef.current) {
            gsap.to(linesRef.current, {
                scrollTrigger: {
                    trigger: heroRef.current,
                    start: "top top",
                    end: "bottom top",
                    scrub: 2
                },
                attr: { d: "M60,60 Q200,200 340,80 M60,200 Q200,50 340,200 M60,340 Q200,180 340,320" },
                ease: "none"
            });
        }

        gsap.to(scrollIndicatorRef.current, {
            scrollTrigger: {
                trigger: heroRef.current,
                start: "top top",
                end: "top -100",
                scrub: 1
            },
            opacity: 0,
            y: -20,
            ease: "none"
        });

        // Enhanced mouse movement parallax
        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const { innerWidth, innerHeight } = window;
            const xPos = (clientX / innerWidth - 0.5) * 2;
            const yPos = (clientY / innerHeight - 0.5) * 2;

            mouse.current = { x: xPos, y: yPos };

            gsap.to(floatingElementsRef.current, {
                duration: 1,
                x: xPos * 30,
                y: yPos * 30,
                ease: "power2.out",
                stagger: 0.02
            });

            gsap.to(mainImageRef.current, {
                duration: 1,
                rotationY: xPos * 5,
                rotationX: -yPos * 5,
                ease: "power2.out"
            });

            gsap.to(canvasRef.current, {
                duration: 1.5,
                rotationY: xPos * 2,
                rotationX: -yPos * 2,
                ease: "power2.out"
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    const handleSubmit = () => {
        console.log('Sample request for:', email);
        gsap.to(ctaRef.current, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut"
        });
    };

    return (
        <div
            ref={heroRef}
            className="relative min-h-screen pt-[80px] md:pt-[80px] bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50 overflow-hidden"
            style={{ perspective: '1000px' }}
        >
            {/* 3D Background Canvas */}
            <div ref={canvasRef} className="absolute inset-0 z-0">
                <Canvas
                    camera={{ position: [0, 0, 8], fov: 60 }}
                    style={{ background: 'transparent' }}
                >
                    <Suspense fallback={null}>
                        <Scene3D mouse={mouse} />
                    </Suspense>
                </Canvas>
            </div>

            {/* Animated background elements */}
            <div ref={backgroundRef} className="absolute inset-0 z-5">
                {/* Enhanced floating particles */}
                <div className="absolute inset-0">
                    {[...Array(30)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full opacity-40"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                animationDuration: `${3 + Math.random() * 4}s`,
                                animation: `float ${3 + Math.random() * 4}s ease-in-out infinite alternate`
                            }}
                        />
                    ))}
                </div>

                {/* Floating dots grid */}
                <div className="absolute top-20 left-16 opacity-20">
                    <div className="grid grid-cols-4 gap-3">
                        {[...Array(16)].map((_, i) => (
                            <div
                                key={i}
                                className="w-2 h-2 bg-emerald-400 rounded-full"
                                style={{
                                    animationDelay: `${i * 0.1}s`,
                                    animationDuration: '3s',
                                    animation: `pulse ${3 + i * 0.1}s ease-in-out infinite alternate`
                                }}
                            />
                        ))}
                    </div>
                </div>

                {/* Enhanced geometric shapes */}
                <div className="absolute top-32 right-20 w-32 h-32 border-2 border-emerald-400 rounded-full opacity-20 animate-spin-slow" />
                <div className="absolute bottom-40 left-10 w-20 h-20 border-2 border-teal-400 rotate-45 opacity-20 animate-bounce" />
                <div className="absolute top-1/2 right-1/4 w-16 h-16 border border-emerald-300 opacity-15 animate-pulse" />
            </div>

            {/* Main content container */}
            <div className="relative z-10 h-screen flex items-center">
                <div className="max-w-7xl mx-auto px-8 w-full">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        {/* Left Section - Text Content */}
                        <div className="space-y-8">
                            <div className="space-y-6">
                                <h1
                                    ref={titleRef}
                                    className="text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight tracking-tight"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    Therapies
                                    <br />
                                    <span className="text-slate-300">that help you</span>
                                    <br />
                                    <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                        stay focused
                                    </span>
                                </h1>

                                <p
                                    ref={subtitleRef}
                                    className="text-lg lg:text-xl text-slate-300 leading-relaxed max-w-md font-light"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    Milagro's products are non-invasive, scientifically backed, and designed to awaken your body's healing power.
                                </p>
                            </div>

                            {/* Email CTA */}
                            <div ref={ctaRef} style={{ transformStyle: 'preserve-3d' }}>
                                <div className="flex items-center bg-white/10 backdrop-blur-lg rounded-full shadow-2xl p-2 max-w-md border border-white/20">
                                    <div className="flex-1 px-4">
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="samantha@email.com"
                                            className="w-full py-3 text-white bg-transparent border-0 focus:outline-none focus:ring-0 placeholder-slate-400"
                                        />
                                    </div>
                                    <button
                                        onClick={handleSubmit}
                                        className="px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 whitespace-nowrap"
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Hero Image with Floating Elements */}
                        <div className="relative flex justify-center lg:justify-end">
                            <div className="relative">
                                {/* Main hero image */}
                                <div
                                    ref={mainImageRef}
                                    className="relative w-80 h-80 lg:w-96 lg:h-96 xl:w-[420px] xl:h-[420px]"
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl ring-4 ring-emerald-400/30">
                                        <img
                                            src="/images/contact.jpg"
                                            alt="Person listening to focus music"
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
                                    </div>

                                    {/* Floating circular elements */}
                                    <div className="absolute inset-0">
                                        {[
                                            { src: "/images/contact.jpg", pos: "-top-8 -left-8", size: "w-16 h-16" },
                                            { src: "/images/contact.jpg", pos: "-top-4 -right-12", size: "w-20 h-20" },
                                            { src: "/images/contact.jpg", pos: "top-1/2 -left-12 -translate-y-1/2", size: "w-12 h-12" },
                                            { src: "/images/contact.jpg", pos: "-bottom-6 -right-8", size: "w-14 h-14" },
                                            { src: "/images/contact.jpg", pos: "-bottom-8 -left-4", size: "w-10 h-10" }
                                        ].map((item, index) => (
                                            <div
                                                key={index}
                                                ref={el => floatingElementsRef.current[index] = el}
                                                className={`absolute ${item.pos} ${item.size} rounded-full overflow-hidden shadow-xl ring-2 ring-emerald-400/50 hover:shadow-2xl transition-all duration-300 hover:scale-110 cursor-pointer backdrop-blur-sm`}
                                                style={{ transformStyle: 'preserve-3d' }}
                                            >
                                                <img
                                                    src={item.src}
                                                    alt={`Nature ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-emerald-600/40 to-transparent" />
                                            </div>
                                        ))}
                                    </div>

                                    {/* Enhanced curved connecting lines */}
                                    <svg
                                        className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
                                        viewBox="0 0 400 400"
                                    >
                                        <path
                                            ref={linesRef}
                                            d="M60,60 Q200,100 340,80 M60,200 Q200,150 340,200 M60,340 Q200,280 340,320"
                                            fill="none"
                                            stroke="url(#lineGradient)"
                                            strokeWidth="2"
                                            strokeDasharray="6,4"
                                        />
                                        <defs>
                                            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity="0.6"/>
                                                <stop offset="50%" stopColor="#0d9488" stopOpacity="0.8"/>
                                                <stop offset="100%" stopColor="#10b981" stopOpacity="0.6"/>
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced scroll indicator */}
            <div ref={scrollIndicatorRef} className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
                <div className="flex flex-col items-center space-y-2 text-slate-400 hover:text-emerald-400 transition-all duration-300 cursor-pointer group">
                    <div className="w-6 h-10 border-2 border-emerald-400/50 rounded-full flex justify-center group-hover:border-emerald-400 transition-all duration-300 backdrop-blur-sm">
                        <div className="w-1 h-2 bg-emerald-400 rounded-full mt-2 animate-bounce"></div>
                    </div>
                    <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0% { transform: translateY(0px); }
                    100% { transform: translateY(-20px); }
                }
                
                @keyframes pulse {
                    0% { opacity: 0.4; transform: scale(1); }
                    100% { opacity: 0.8; transform: scale(1.1); }
                }
                
                .animate-spin-slow {
                    animation: spin 8s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default ProductsHero;