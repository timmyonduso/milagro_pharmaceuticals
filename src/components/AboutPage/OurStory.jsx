"use client"

import { useEffect, useRef } from "react"
import { Heart, Zap, Users, Globe, Sparkles } from "lucide-react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { SplitText } from "gsap/SplitText"

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

const OurStory = () => {
    const sectionRef = useRef(null)
    const contentRef = useRef(null)
    const iconRefs = useRef([])
    const splitTextRefs = useRef({})
    const animationRefs = useRef([])

    useEffect(() => {
        // Clear any previous animations
        animationRefs.current.forEach((anim) => anim.kill())
        animationRefs.current = []
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

        // Initialize animations
        const initAnimations = () => {
            // Split text elements
            const titleElement = document.querySelector(".story-title")
            const subtitleElement = document.querySelector(".story-subtitle")
            const paragraphs = [
                document.querySelector(".story-paragraph-1"),
                document.querySelector(".story-paragraph-2"),
                document.querySelector(".story-paragraph-3"),
                document.querySelector(".story-paragraph-4"),
            ]

            // Split title with enhanced animation
            if (titleElement) {
                const splitTitle = new SplitText(titleElement, { type: "words,chars" })
                splitTextRefs.current.title = splitTitle

                gsap.set(splitTitle.chars, {
                    opacity: 0,
                    y: 100,
                    rotationX: -90,
                    transformOrigin: "50% 50% -50px",
                    color: "#64748b",
                })
            }

            // Split subtitle
            if (subtitleElement) {
                const splitSubtitle = new SplitText(subtitleElement, { type: "words" })
                splitTextRefs.current.subtitle = splitSubtitle

                gsap.set(splitSubtitle.words, {
                    opacity: 0,
                    y: 30,
                    scale: 0.8,
                })
            }

            // Split paragraphs with enhanced setup
            paragraphs.forEach((para, index) => {
                if (para) {
                    const splitPara = new SplitText(para, { type: "words,lines" })
                    splitTextRefs.current[`p${index + 1}`] = splitPara

                    gsap.set(splitPara.words, {
                        opacity: 0,
                        y: 20,
                        rotationX: -15,
                        transformOrigin: "50% 100%",
                    })
                }
            })

            // Enhanced title reveal animation
            const titleAnim = gsap.timeline({
                scrollTrigger: {
                    trigger: ".story-title",
                    start: "top 85%",
                    end: "top 50%",
                    scrub: 1,
                    onComplete: () => {
                        gsap.to(splitTextRefs.current.title?.chars || [], {
                            color: "#ffffff",
                            duration: 0.5,
                            stagger: 0.02,
                        })
                    },
                },
            })

            titleAnim.to(splitTextRefs.current.title?.chars || [], {
                opacity: 1,
                y: 0,
                rotationX: 0,
                color: "#06b6d4",
                ease: "back.out(1.7)",
                stagger: 0.04,
                duration: 1.2,
            })

            animationRefs.current.push(titleAnim)

            // Subtitle animation
            const subtitleAnim = gsap.to(splitTextRefs.current.subtitle?.words || [], {
                opacity: 1,
                y: 0,
                scale: 1,
                color: "#22d3ee",
                ease: "elastic.out(1, 0.5)",
                stagger: 0.08,
                duration: 1,
                scrollTrigger: {
                    trigger: ".story-subtitle",
                    start: "top 80%",
                    end: "top 60%",
                    scrub: 1.2,
                },
            })

            animationRefs.current.push(subtitleAnim)

            // Enhanced paragraph animations
            const paraAnimations = [
                // Paragraph 1 - Foundation story
                gsap.to(splitTextRefs.current.p1?.words || [], {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    color: "#f1f5f9",
                    ease: "power3.out",
                    stagger: 0.03,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: ".story-paragraph-1",
                        start: "top 85%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                }),

                // Paragraph 2 - Therapies
                gsap.to(splitTextRefs.current.p2?.words || [], {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    color: "#a7f3d0",
                    ease: "power2.out",
                    stagger: 0.025,
                    duration: 0.9,
                    scrollTrigger: {
                        trigger: ".story-paragraph-2",
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                }),

                // Paragraph 3 - Growth
                gsap.to(splitTextRefs.current.p3?.words || [], {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    color: "#bfdbfe",
                    ease: "power2.out",
                    stagger: 0.02,
                    duration: 1,
                    scrollTrigger: {
                        trigger: ".story-paragraph-3",
                        start: "top 80%",
                        end: "top 60%",
                        scrub: 1.5,
                    },
                }),

                // Paragraph 4 - Mission
                gsap.to(splitTextRefs.current.p4?.words || [], {
                    opacity: 1,
                    y: 0,
                    rotationX: 0,
                    color: "#ffffff",
                    ease: "power3.out",
                    stagger: 0.04,
                    duration: 1.2,
                    scrollTrigger: {
                        trigger: ".story-paragraph-4",
                        start: "top 85%",
                        end: "top 65%",
                        scrub: 1.5,
                    },
                }),
            ]

            animationRefs.current.push(...paraAnimations)

            // Enhanced visual elements animation
            const visualTl = gsap.timeline({
                scrollTrigger: {
                    trigger: ".visual-container",
                    start: "top 80%",
                    end: "top 30%",
                    scrub: 1,
                },
            })

            visualTl
                .fromTo(
                    ".healing-circle",
                    {
                        scale: 0.6,
                        opacity: 0,
                        rotation: -45,
                        filter: "blur(10px)",
                    },
                    {
                        scale: 1,
                        opacity: 1,
                        rotation: 0,
                        filter: "blur(0px)",
                        ease: "elastic.out(1, 0.6)",
                        duration: 2,
                    },
                )
                .fromTo(
                    ".floating-icon",
                    {
                        y: 60,
                        opacity: 0,
                        scale: 0.5,
                        rotation: 180,
                    },
                    {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        rotation: 0,
                        stagger: 0.2,
                        ease: "back.out(2)",
                        duration: 1.5,
                    },
                    "-=1.5",
                )
                .fromTo(".energy-ring", { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.1, duration: 1 }, "-=1")

            animationRefs.current.push(visualTl)

            // Enhanced background parallax
            const bgAnim1 = gsap.to(".bg-decoration-1", {
                x: -120,
                y: -60,
                rotate: 20,
                scale: 1.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            })

            const bgAnim2 = gsap.to(".bg-decoration-2", {
                x: 120,
                y: 60,
                rotate: -20,
                scale: 1.1,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 2,
                },
            })

            const bgAnim3 = gsap.to(".bg-decoration-3", {
                rotate: 360,
                scale: 1.2,
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 3,
                },
            })

            animationRefs.current.push(bgAnim1, bgAnim2, bgAnim3)

            // Enhanced highlight line animation
            const highlightAnim = gsap.fromTo(
                ".highlight-line",
                { scaleX: 0, transformOrigin: "left center" },
                {
                    scaleX: 1,
                    ease: "power2.inOut",
                    duration: 1.5,
                    scrollTrigger: {
                        trigger: ".story-content",
                        start: "top 75%",
                        end: "top 55%",
                        scrub: 1,
                    },
                },
            )

            animationRefs.current.push(highlightAnim)

            // Continuous energy rings rotation
            const ringsAnim = gsap.to(".energy-ring", {
                rotation: 360,
                ease: "none",
                duration: 40,
                repeat: -1,
                stagger: {
                    each: 0.5,
                    from: "start",
                },
            })

            animationRefs.current.push(ringsAnim)

            // Floating particles animation
            gsap.to(".floating-particle", {
                y: -20,
                x: 10,
                opacity: 0.8,
                ease: "sine.inOut",
                duration: 3,
                repeat: -1,
                yoyo: true,
                stagger: {
                    each: 0.2,
                    from: "random",
                },
            })

            // Sparkle effect
            gsap.to(".sparkle", {
                scale: 1.5,
                opacity: 0,
                rotation: 180,
                ease: "power2.out",
                duration: 2,
                repeat: -1,
                stagger: {
                    each: 0.3,
                    from: "random",
                },
            })
        }

        initAnimations()

        return () => {
            // Cleanup
            animationRefs.current.forEach((anim) => anim.kill())
            ScrollTrigger.getAll().forEach((trigger) => trigger.kill())

            Object.values(splitTextRefs.current).forEach((splitText) => {
                if (splitText && splitText.revert) splitText.revert()
            })
        }
    }, [])

    const addToRefs = (el) => {
        if (el && !iconRefs.current.includes(el)) {
            iconRefs.current.push(el)
        }
    }

    return (
        <section
            id="story"
            ref={sectionRef}
            className="relative py-40 px-6 bg-gradient-to-br from-slate-950 via-blue-950/95 to-emerald-950/90 overflow-hidden"
        >
            {/* Enhanced background decorations */}
            <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="bg-decoration-1 absolute top-20 left-20 w-[28rem] h-[28rem] bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full mix-blend-screen filter blur-[120px]"></div>
                <div className="bg-decoration-2 absolute bottom-20 right-20 w-[36rem] h-[36rem] bg-gradient-to-br from-emerald-400 to-teal-500 rounded-full mix-blend-screen filter blur-[140px]"></div>
                <div className="bg-decoration-3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[44rem] h-[44rem] bg-gradient-to-br from-indigo-400 to-purple-500 rounded-full mix-blend-screen filter blur-[160px] opacity-30"></div>
            </div>

            {/* Enhanced particle effect overlay */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
                {[...Array(40)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle absolute w-1.5 h-1.5 bg-gradient-to-r from-cyan-300 to-blue-400 rounded-full"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                        }}
                    />
                ))}

                {/* Sparkle effects */}
                {[...Array(15)].map((_, i) => (
                    <Sparkles
                        key={`sparkle-${i}`}
                        className="sparkle absolute w-4 h-4 text-cyan-300"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 2}s`,
                        }}
                    />
                ))}
            </div>

            <div className="relative max-w-7xl mx-auto">
                <div ref={contentRef} className="story-content grid lg:grid-cols-2 gap-20 items-center">
                    {/* Enhanced Text Content */}
                    <div className="space-y-16">
                        <div className="space-y-10">
                            <div className="space-y-4">
                                <h2 className="story-title text-6xl lg:text-7xl font-black text-white leading-[0.9] tracking-tight">
                                    Our Story
                                </h2>
                                <p className="story-subtitle text-xl lg:text-2xl font-medium text-cyan-300 leading-relaxed">
                                    Pioneering the future of natural healing
                                </p>
                            </div>

                            <div className="relative h-2">
                                <div className="absolute top-0 left-0 w-full h-full bg-white/5 rounded-full"></div>
                                <div className="highlight-line absolute top-0 left-0 w-0 h-full bg-gradient-to-r from-cyan-400 via-emerald-400 via-blue-400 to-purple-400 rounded-full origin-left scale-x-0 shadow-lg shadow-cyan-400/50"></div>
                            </div>
                        </div>

                        <div className="space-y-10 text-lg lg:text-xl leading-relaxed">
                            <p className="story-paragraph-1 text-slate-300 font-light">
                                Milagro Pharmaceuticals was founded on the revolutionary belief that wellness should be natural,
                                ethical, and universally accessible. Our journey began with a profound understanding: the human body
                                possesses an extraordinary, innate capacity for healing when provided with the right conditions and
                                cellular signals.
                            </p>

                            <p className="story-paragraph-2 text-slate-300 font-light">
                                Our groundbreaking non-invasive therapies—deeply rooted in frequency medicine, cellular memory
                                restoration, and advanced regenerative biology—represent the next quantum leap in global healthcare
                                evolution. We masterfully bridge the sacred gap between ancient healing wisdom and cutting-edge
                                scientific innovation.
                            </p>

                            <p className="story-paragraph-3 text-slate-300 font-light">
                                From our pioneering flagship clinic in Mexico City to our rapidly expanding network of international
                                nonprofit partnerships, including our transformative collaboration with Cure Pharmaceutical, we're
                                architecting a future where every human body can unlock its natural healing potential.
                            </p>

                            <p className="story-paragraph-4 text-white font-semibold text-2xl lg:text-3xl leading-normal bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
                                Together, we're not merely treating symptoms—we're awakening the body's own miraculous potential for
                                complete renewal and extraordinary vitality.
                            </p>
                        </div>
                    </div>

                    {/* Enhanced Visual Elements */}
                    <div className="visual-container relative h-full min-h-[600px] lg:min-h-[700px] flex items-center justify-center">
                        {/* Central healing symbol with enhanced design */}
                        <div className="healing-circle relative mx-auto w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full bg-gradient-to-br from-cyan-500/25 via-blue-500/15 to-emerald-500/25 backdrop-blur-xl border-2 border-white/20 shadow-2xl shadow-cyan-400/20 flex items-center justify-center">
                            <div className="w-[85%] h-[85%] rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-400/15 to-emerald-400/20 flex items-center justify-center shadow-inner backdrop-blur-lg border border-white/10">
                                <div className="w-3/4 h-3/4 rounded-full bg-gradient-to-br from-cyan-500 via-blue-500 to-emerald-500 flex items-center justify-center shadow-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-60"></div>
                                    <div className="absolute inset-0 bg-gradient-to-tl from-cyan-300/20 to-transparent"></div>
                                    <Heart
                                        className="w-20 h-20 lg:w-24 lg:h-24 text-white relative z-10 drop-shadow-lg"
                                        strokeWidth={1.5}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Enhanced floating icons */}
                        <div className="absolute inset-0">
                            <div
                                ref={addToRefs}
                                className="floating-icon absolute top-16 left-16 w-20 h-20 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/20 opacity-0"
                            >
                                <Zap className="w-10 h-10 text-cyan-300 drop-shadow-lg" strokeWidth={1.5} />
                            </div>

                            <div
                                ref={addToRefs}
                                className="floating-icon absolute top-16 right-16 w-20 h-20 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/20 opacity-0"
                            >
                                <Globe className="w-10 h-10 text-emerald-300 drop-shadow-lg" strokeWidth={1.5} />
                            </div>

                            <div
                                ref={addToRefs}
                                className="floating-icon absolute bottom-16 left-1/2 transform -translate-x-1/2 w-20 h-20 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl shadow-xl flex items-center justify-center border border-white/20 opacity-0"
                            >
                                <Users className="w-10 h-10 text-indigo-300 drop-shadow-lg" strokeWidth={1.5} />
                            </div>
                        </div>

                        {/* Enhanced energy rings */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <div className="energy-ring absolute w-[32rem] h-[32rem] border-2 border-cyan-400/30 rounded-full shadow-lg shadow-cyan-400/10"></div>
                            <div className="energy-ring absolute w-[38rem] h-[38rem] border border-emerald-400/20 rounded-full shadow-lg shadow-emerald-400/10"></div>
                            <div className="energy-ring absolute w-[44rem] h-[44rem] border border-blue-400/15 rounded-full shadow-lg shadow-blue-400/10"></div>
                        </div>

                        {/* Enhanced floating particles */}
                        <div className="absolute inset-0 pointer-events-none">
                            {[...Array(20)].map((_, i) => (
                                <div
                                    key={i}
                                    className="absolute w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/50"
                                    style={{
                                        top: `${20 + Math.random() * 60}%`,
                                        left: `${20 + Math.random() * 60}%`,
                                        animationDelay: `${Math.random() * 2}s`,
                                        opacity: 0.6 + Math.random() * 0.4,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Enhanced bottom accent elements */}
                <div className="mt-24 flex justify-center items-center space-x-6">
                    <div className="flex space-x-3">
                        <div
                            className="w-3 h-3 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full shadow-lg shadow-cyan-400/50 animate-pulse"
                            style={{ animationDuration: "2s" }}
                        ></div>
                        <div
                            className="w-3 h-3 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full shadow-lg shadow-emerald-400/50 animate-pulse"
                            style={{ animationDuration: "2.5s", animationDelay: "0.3s" }}
                        ></div>
                        <div
                            className="w-3 h-3 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full shadow-lg shadow-indigo-400/50 animate-pulse"
                            style={{ animationDuration: "3s", animationDelay: "0.6s" }}
                        ></div>
                    </div>
                    <div className="h-px w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
                    <div className="text-sm text-cyan-300/70 font-medium tracking-wider">
                        HEALING • INNOVATION • TRANSFORMATION
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OurStory
