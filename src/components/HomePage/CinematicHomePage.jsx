"use client"

import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"
import CinematicHero from "./CinematicHero"
import CinematicMissionSection from "./CinematicMissionSection"

gsap.registerPlugin(ScrollTrigger)

const CinematicHomePage = () => {
  const containerRef = useRef(null)
  const heroRef = useRef(null)
  const missionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Master timeline for orchestrating all scene transitions
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth scrubbing for cinematic feel
          pin: false,
          anticipatePin: 1,
        },
      })

      // Scene 1: Hero Exit Animation
      // Pin hero while transitioning to mission
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "bottom 100%",
        end: "bottom 50%",
        pin: true,
        pinSpacing: false,
        onUpdate: (self) => {
          // Cinematic fade and scale as user scrolls past hero
          const progress = self.progress
          gsap.to(heroRef.current, {
            scale: 1 - progress * 0.1,
            filter: `blur(${progress * 8}px) brightness(${1 - progress * 0.3})`,
            duration: 0.3,
            ease: "none",
          })
        },
      })

      // Scene 2: Mission Section Entrance
      // Dramatic reveal with clip-path and parallax
      ScrollTrigger.create({
        trigger: missionRef.current,
        start: "top 100%",
        end: "top 20%",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          // Cinematic wipe reveal effect
          gsap.set(missionRef.current, {
            clipPath: `polygon(0% ${100 - progress * 100}%, 100% ${100 - progress * 100}%, 100% 100%, 0% 100%)`,
            y: `${(1 - progress) * 100}px`,
            opacity: progress,
          })
        },
      })

      // Global scroll-based parallax for background elements
      gsap.utils.toArray("[data-parallax]").forEach((element) => {
        const speed = element.dataset.parallax || 0.5
        gsap.to(element, {
          yPercent: -50 * speed,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
      })

      // Smooth scroll enhancement for premium feel
      ScrollTrigger.normalizeScroll(true)

      // Refresh ScrollTrigger after setup
      ScrollTrigger.refresh()
    }, containerRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        // Ensure smooth scrolling performance
        willChange: "transform",
        backfaceVisibility: "hidden",
      }}
    >
      {/* Scene 1: Cinematic Hero */}
      <div ref={heroRef} className="relative z-20">
        <CinematicHero />
      </div>

      {/* Scene 2: Mission Section with Dramatic Entrance */}
      <div
        ref={missionRef}
        className="relative z-10"
        style={{
          clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
          opacity: 0,
        }}
      >
        <CinematicMissionSection />
      </div>

      {/* Additional sections would go here with similar scene transitions */}
    </div>
  )
}

export default CinematicHomePage
