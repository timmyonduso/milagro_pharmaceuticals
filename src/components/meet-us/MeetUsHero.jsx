"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/dist/ScrollTrigger"
import { meetsmd } from "../../assets"

export default function MeetUsHero() {
    const sectionRef = useRef(null)
    const textRef = useRef(null)
    const imageRef = useRef(null)

    useEffect(() => {
        // Register ScrollTrigger plugin
        gsap.registerPlugin(ScrollTrigger)

        // Create a timeline for animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 70%",
                toggleActions: "play none none none",
            },
        })

        // Text animation - fade and slide from left
        tl.fromTo(
            textRef.current,
            {
                opacity: 0,
                x: -50,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
            },
        )

        // Image animation - fade in from right
        tl.fromTo(
            imageRef.current,
            {
                opacity: 0,
                x: 50,
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.7", // Start slightly before the text animation finishes
        )

        // Cleanup
        return () => {
            if (tl.scrollTrigger) {
                tl.scrollTrigger.kill()
            }
        }
    }, [])

    return (
        <section
            ref={sectionRef}
            className="w-full min-h-[90vh] pt-16 md:pt-24 pb-8 md:pb-12 overflow-hidden bg-warm-50 dark:bg-warm-950"
        >
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center min-h-[70vh]">
                    {/* Text Column */}
                    <div ref={textRef} className="flex flex-col justify-center space-y-6 order-2 md:order-1">
                        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-black dark:text-white">
                            Meet the Manns
                        </h1>

                        <div className="w-20 h-1 bg-amber-600 dark:bg-amber-400"></div>

                        <p className="text-lg md:text-xl text-black dark:text-white max-w-xl">
                            Sharon and Brittany Mann, a dynamic mother-daughter duo, bring unique strengths to every interior design project.
                        </p>

                        <p className="text-base md:text-lg text-black dark:text-white max-w-xl">
                            With Sharon's experience and Brittany's fresh perspective, they create timeless spaces that blend tradition with modern style. Their teamwork ensures every project is thoughtful and balanced.
                        </p>

                        <p className="text-base md:text-lg text-black dark:text-white max-w-xl">
                            Together, they turn houses into homes that reflect your story through curated design and careful detail.
                        </p>

                    </div>

                    {/* Image Column */}
                    <div
                        ref={imageRef}
                        className="relative h-[70vh] md:h-[90vh] order-1 md:order-2 rounded-lg"
                    >

                    <div className="absolute inset-0 rounded-lg overflow-hidden">
                            <img
                                src={meetsmd}
                                alt="Sharon and Brittany Mann"
                                className="w-full h-full object-contain"
                            />

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
