// GSAP Configuration and Performance Utilities
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

// Register plugins
gsap.registerPlugin(ScrollTrigger)

// Global GSAP configuration for optimal performance
export const initGSAP = () => {
  // Set global defaults for smoother animations
  gsap.defaults({
    duration: 0.8,
    ease: "power2.out",
  })

  // Configure ScrollTrigger for better performance
  ScrollTrigger.config({
    autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    ignoreMobileResize: true,
  })

  // Optimize for mobile performance
  if (window.innerWidth < 768) {
    ScrollTrigger.config({
      ignoreMobileResize: true,
      autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
    })
  }
}

// Utility function for creating cinematic entrance animations
export const createCinematicEntrance = (element, options = {}) => {
  const defaults = {
    y: 100,
    opacity: 0,
    scale: 0.9,
    duration: 1.2,
    ease: "power3.out",
    stagger: 0.1,
  }

  const config = { ...defaults, ...options }

  return gsap.fromTo(
    element,
    {
      y: config.y,
      opacity: config.opacity,
      scale: config.scale,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: config.duration,
      ease: config.ease,
      stagger: config.stagger,
    },
  )
}

// Utility for parallax effects
export const createParallax = (element, speed = 0.5) => {
  return gsap.to(element, {
    yPercent: -50 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  })
}

// Utility for cinematic image reveals
export const createImageReveal = (element, options = {}) => {
  const defaults = {
    clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
    duration: 1.5,
    ease: "power2.inOut",
  }

  const config = { ...defaults, ...options }

  return gsap.fromTo(
    element,
    {
      clipPath: config.clipPath,
      scale: 1.1,
    },
    {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      scale: 1,
      duration: config.duration,
      ease: config.ease,
    },
  )
}

// Performance monitoring
export const monitorPerformance = () => {
  if (typeof window !== "undefined" && window.performance) {
    ScrollTrigger.addEventListener("refresh", () => {
      console.log("ScrollTrigger refreshed at:", performance.now())
    })
  }
}

// Cleanup utility
export const cleanupGSAP = () => {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  gsap.globalTimeline.clear()
}
