import React, { useState, useEffect } from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'
import Marquee from 'react-fast-marquee';
import TestimonialCard from "./TestimonialCard.jsx";

function Testimonials() {
    const [isVisible, setIsVisible] = useState(false);
    const [shaderLoaded, setShaderLoaded] = useState(false);

    // Use intersection observer to detect when component is in viewport
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    // Delay shader loading slightly to prevent initial flicker
                    setTimeout(() => setShaderLoaded(true), 100);
                }
            },
            { threshold: 0.1 }
        );

        const element = document.getElementById('testimonials-section');
        if (element) observer.observe(element);

        return () => observer.disconnect();
    }, []);

    const testimonials = [
        {
            image: "https://images.pexels.com/photos/1674752/pexels-photo-1674752.jpeg?auto=compress&cs=tinysrgb&w=600",
            name: "Jane Mwikali",
            role: "Wellness Coach",
            text: "After introducing Milagro's NRG Xips to my practice, my clients report noticeable improvements in energy and mood. It's non-invasive, fast-acting, and fits perfectly with my holistic health approach.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/1080213/pexels-photo-1080213.jpeg?auto=compress&cs=tinysrgb&w=600",
            name: "John Otieno",
            role: "Retired Athlete",
            text: "I've struggled with joint pain and post-training fatigue for years. The RGNR‑8 therapy gave me new hope. My recovery is faster, and I feel stronger with each session.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/2773977/pexels-photo-2773977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Emily Rodriguez",
            role: "Chronic Pain Patient",
            text: "CBDXTRA has been life-changing. I've tried many CBD oils before, but nothing matches the purity and calming effect of Milagro's formula. I finally sleep through the night.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/810775/pexels-photo-810775.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Michael Chang",
            role: "Health & Fitness Trainer",
            text: "I recommend the Smart X-Radiation Shield to every client who uses phones and wearables daily. It's a no-brainer for anyone living in a high-frequency digital world.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/3775534/pexels-photo-3775534.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Sarah Johnson",
            role: "New Mother",
            text: "Postpartum recovery wasn't easy until I started using Milagro's regenerative support. The difference in my energy, mood, and clarity is incredible. I feel like myself again.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "David Kim",
            role: "Biohacking Enthusiast",
            text: "Milagro's approach to cellular regeneration is years ahead. I've integrated RGNR‑8 and CBDXTRA into my protocol and I've never felt more mentally sharp or physically resilient.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/2292837/pexels-photo-2292837.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Olivia Martinez",
            role: "School Teacher",
            text: "As someone exposed to screens all day, the X-Radiation Shield gave me peace of mind. I no longer experience headaches or fatigue after long teaching hours.",
            verified: true
        },
        {
            image: "https://images.pexels.com/photos/3775087/pexels-photo-3775087.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
            name: "Alex Wong",
            role: "Caregiver",
            text: "Milagro's therapies have made a huge difference in my father's post-stroke recovery. The holistic, drug-free options let us support healing with confidence and compassion.",
            verified: true
        }
    ];

    return (
        <section
            id="testimonials-section"
            className="relative w-full min-h-screen py-16 overflow-hidden"
        >
            {/* Fallback background while shader loads */}
            <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

            {/* Background Shader Gradient - Only render when visible */}
            {isVisible && (
                <div className={`absolute inset-0 transition-opacity duration-1000 ${
                    shaderLoaded ? 'opacity-100' : 'opacity-0'
                }`}>
                    <ShaderGradientCanvas
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            zIndex: 1
                        }}
                        pointerEvents='none'
                    >
                        <ShaderGradient
                            control='query'
                            urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=1.2&cAzimuthAngle=180&cDistance=3.6&cPolarAngle=90&cameraZoom=1&color1=%23F7F9FC&color2=%235C5C5C&color3=%235C5C5C&destination=onCanvas&embedMode=off&envPreset=lobby&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=off&lightType=3d&pixelDensity=1&positionX=-1.4&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.1&rotationX=0&rotationY=10&rotationZ=50&shader=defaults&type=waterPlane&uAmplitude=0&uDensity=1.3&uFrequency=5.5&uSpeed=0.4&uStrength=4&uTime=0&wireframe=false'
                        />
                    </ShaderGradientCanvas>
                </div>
            )}

            {/* Content Layer */}
            <div className="relative z-10 w-full h-full">
                {/* Header with enhanced styling */}
                <div className={`px-5 mb-16 transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    {/* Brand logo with gold accent */}
                    <div className="flex items-center mb-8">
                        <h1 className='text-2xl font-black text-lime-400 mr-3'>Milagro.</h1>
                        <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                        <div className="ml-4 px-3 py-1 bg-yellow-400 bg-opacity-20 border border-yellow-400 border-opacity-30 rounded-full">
                            <span className="text-white-400 text-xs font-medium">Premium Healthcare</span>
                        </div>
                    </div>

                    <div className="text-white font-bold">
                        <h2 className="text-5xl mb-4 leading-tight">
                            Voices of{' '}
                            <span className='text-blue-500 relative'>
                                Healing.
                                {/* Gold underline accent */}
                                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full transform scale-x-0 animate-pulse"></div>
                            </span>
                        </h2>
                        <p className='text-sm font-light max-w-2xl text-gray-300 leading-relaxed'>
                            Real stories from patients, wellness seekers, and professionals who've experienced{' '}
                            <span className="text-lime-400 font-medium">Milagro's</span> life-changing therapies.
                        </p>
                    </div>

                    {/* Trust indicators with gold accents */}
                    <div className="flex items-center mt-6 space-x-6">
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-yellow-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-400">FDA Approved</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-lime-400 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-lime-600 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-400">Clinically Tested</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-blue-700 rounded-full"></div>
                            </div>
                            <span className="text-xs text-gray-400">98% Success Rate</span>
                        </div>
                    </div>
                </div>

                {/* Enhanced Testimonials Marquee */}
                <div className={`w-full transition-all duration-1000 delay-300 ${
                    isVisible ? 'opacity-100' : 'opacity-0'
                }`}>
                    {/* Only render Marquee when component is visible */}
                    {isVisible && (
                        <Marquee
                            gradient={true}
                            gradientColor='rgba(0, 7, 119, 0.24)'
                            speed={30}
                            pauseOnHover={true}
                            autoFill={true}
                            className="py-8"
                        >
                            {testimonials.map((testimonial, index) => (
                                <TestimonialCard key={index} {...testimonial} />
                            ))}
                        </Marquee>
                    )}
                </div>

                {/* Call-to-Action Section with enhanced brand colors */}
                <div className={`px-5 mt-16 text-center transition-all duration-1000 delay-500 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}>
                    <p className="text-gray-300 text-sm mb-6">
                        Ready to start your healing journey?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        {/* Primary CTA with enhanced styling */}
                        <button className="group relative px-8 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border-2 border-transparent hover:border-yellow-400">
                            <span className="relative z-10">Start Your Treatment</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        </button>

                        {/* Secondary CTA with gold accent */}
                        <button className="group relative px-8 py-3 bg-transparent border-2 border-lime-400 text-lime-400 hover:bg-lime-400 hover:text-gray-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105">
                            <span className="relative z-10">Learn More</span>
                            <div className="absolute top-0 right-0 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-x-1 -translate-y-1"></div>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Testimonials