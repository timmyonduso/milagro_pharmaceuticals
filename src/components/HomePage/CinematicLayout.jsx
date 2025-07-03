"use client"

import { useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import Hero from "../../sections/Hero.jsx";
import MissionSection from "./MissionSection.jsx";

gsap.registerPlugin(ScrollTrigger)

export default function CinematicLayout() {
    useEffect(() => {
        // Global scroll smoothing and performance optimization
        gsap.config({
            force3D: true,
            nullTargetWarn: false,
        })

        // Smooth scroll behavior
        const lenis = {
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: "vertical",
            gestureDirection: "vertical",
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        }

        // Performance optimization: Refresh ScrollTrigger on resize
        const handleResize = () => {
            ScrollTrigger.refresh()
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            ScrollTrigger.killAll()
        }
    }, [])

    return (
        <div className="relative">
            {/* Enhanced Hero Section */}
            <Hero />

            {/* Cinematic Mission Section */}
            <MissionSection />

            {/* Additional sections can be added here with similar cinematic treatments */}
        </div>
    )
}
