"use client"

import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { ScrollTrigger } from "gsap/all"
import { useEffect, useRef, useState } from "react"

gsap.registerPlugin(ScrollTrigger)

const CinematicHero = () => {
  const [currentIndex, setCurrentIndex] = useState(1)
  const [hasClicked, setHasClicked] = useState(false)
  const [loading, setLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const totalImages = 3
  const nextImgRef = useRef(null)
  const intervalRef = useRef(null)
  const heroRef = useRef(null)
  const backgroundRef = useRef(null)
  const contentRef = useRef(null)
  const titleRef = useRef(null)
  const subtitleRef = useRef(null)
  const buttonsRef = useRef(null)
  const trustIndicatorsRef = useRef(null)
  const scrollIndicatorRef = useRef(null)

  // Content data remains the same
  const contentData = {
    1: {
      title: 'redefi<b class="text-yellow-400">n</b>e',
      subtitle: "Experience science-backed wellness",
      description: "Unleash your vitality through innovation",
      primaryButton: "Explore Products",
      secondaryButton: "Book Appointment",
      trustIndicators: [
        { colorClass: "bg-emerald-400", text: "Science-Backed" },
        { colorClass: "bg-yellow-400", text: "Non-Invasive" },
        { colorClass: "bg-emerald-400", text: "Proven Results" },
      ],
      bottomTitle: 'WELL<b class="text-yellow-500">N</b>ESS',
      theme: "wellness",
    },
    2: {
      title: 'transfo<b class="text-yellow-400">r</b>m',
      subtitle: "Unlock your mental potential",
      description: "Advanced therapy solutions for modern minds",
      primaryButton: "View Therapies",
      secondaryButton: "Schedule Session",
      trustIndicators: [
        { colorClass: "bg-purple-400", text: "Expert-Led" },
        { colorClass: "bg-yellow-400", text: "Personalized" },
        { colorClass: "bg-purple-400", text: "Confidential" },
      ],
      bottomTitle: 'THER<b class="text-yellow-500">A</b>PY',
      theme: "therapy",
    },
    3: {
      title: 'revita<b class="text-yellow-400">l</b>ize',
      subtitle: "Regenerate your body naturally",
      description: "Cutting-edge treatments for optimal health",
      primaryButton: "Discover Treatments",
      secondaryButton: "Get Consultation",
      trustIndicators: [
        { colorClass: "bg-orange-400", text: "FDA-Approved" },
        { colorClass: "bg-yellow-400", text: "Innovative" },
        { colorClass: "bg-orange-400", text: "Safe & Effective" },
      ],
      bottomTitle: 'REGEN<b class="text-yellow-500">E</b>RATE',
      theme: "regeneration",
    },
  }

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1)
  }

  useEffect(() => {
    if (loadedImages === totalImages) {
      setLoading(false)
    }
  }, [loadedImages])

  // Auto-cycle logic remains the same
  useEffect(() => {
    if (!loading && !isPaused) {
      intervalRef.current = setInterval(() => {
        setHasClicked(true)
        setCurrentIndex((prevIndex) => (prevIndex % 3) + 1)
      }, 5000)

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
    }
  }, [loading, isPaused])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const handleMiniImgClick = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    setHasClicked(true)
    setCurrentIndex((prevIndex) => (prevIndex % 3) + 1)

    setTimeout(() => {
      if (!isPaused) {
        intervalRef.current = setInterval(() => {
          setHasClicked(true)
          setCurrentIndex((prevIndex) => (prevIndex % 3) + 1)
        }, 5000)
      }
    }, 10000)
  }

  const toggleAutoCycle = () => {
    setIsPaused(!isPaused)
    if (!isPaused && intervalRef.current) {
      clearInterval(intervalRef.current)
    }
  }

  // Enhanced GSAP animations for cinematic feel
  useGSAP(() => {
    if (!loading) {
      // Initial hero entrance - cinematic reveal
      const entranceTL = gsap.timeline()

      // Background image cinematic zoom
      entranceTL.fromTo(
        backgroundRef.current,
        {
          scale: 1.2,
          filter: "blur(10px) brightness(0.3)",
        },
        {
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 2.5,
          ease: "power2.out",
        },
      )

      // Content staggered entrance
      entranceTL.fromTo(
        titleRef.current,
        {
          y: 100,
          opacity: 0,
          rotationX: 45,
        },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power3.out",
        },
        0.5,
      )

      entranceTL.fromTo(
        subtitleRef.current,
        {
          y: 50,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
        },
        0.8,
      )

      entranceTL.fromTo(
        buttonsRef.current,
        {
          y: 30,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        1.2,
      )

      entranceTL.fromTo(
        trustIndicatorsRef.current,
        {
          y: 20,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power2.out",
          stagger: 0.1,
        },
        1.5,
      )

      // Scroll indicator floating animation
      gsap.to(scrollIndicatorRef.current, {
        y: 10,
        duration: 2,
        ease: "power2.inOut",
        yoyo: true,
        repeat: -1,
      })

      // Parallax effect for background on scroll
      gsap.to(backgroundRef.current, {
        yPercent: -30,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Content fade out on scroll for cinematic transition
      gsap.to(contentRef.current, {
        opacity: 0,
        y: -50,
        scale: 0.95,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      })
    }
  }, [loading])

  // Enhanced image transition animations
  useGSAP(
    () => {
      if (hasClicked) {
        // Cinematic image transition with mask reveal
        const transitionTL = gsap.timeline()

        gsap.set("#next-image", { visibility: "visible" })

        // Create a cinematic wipe transition
        transitionTL.fromTo(
          "#next-image",
          {
            clipPath: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            scale: 1.1,
          },
          {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            scale: 1,
            duration: 1.2,
            ease: "power2.inOut",
          },
        )

        // Content change with smooth fade
        transitionTL.fromTo(
          ".hero-content",
          { opacity: 0, y: 30, filter: "blur(5px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: 0.3,
            ease: "power2.out",
          },
          0,
        )
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    },
  )

  // Enhanced clip-path animation for image frame
  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    })

    // Cinematic reveal on scroll
    gsap.fromTo(
      "#image-frame",
      {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        borderRadius: "0% 0% 0% 0%",
        scale: 1.05,
        filter: "brightness(0.7)",
      },
      {
        clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
        borderRadius: "0% 0% 40% 10%",
        scale: 1,
        filter: "brightness(1)",
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: "#image-frame",
          start: "center center",
          end: "bottom center",
          scrub: 1,
        },
      },
    )
  })

  const getCurrentContent = () => {
    const validIndex = currentIndex > 3 ? 1 : currentIndex
    return contentData[validIndex] || contentData[1]
  }

  const currentContent = getCurrentContent()

  const getImageSrc = (index) => {
    const images = ["/images/newHero.avif", "/images/newHero4.jpg", "/images/newHero5.jpg"]
    return images[index - 1] || images[0]
  }

  return (
    <div ref={heroRef} className="relative h-dvh w-screen overflow-hidden" style={{ willChange: "transform" }}>
      {/* Loading screen with cinematic fade */}
      {loading && (
        <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
          <div className="three-body">
            <div className="three-body__dot bg-blue-600"></div>
            <div className="three-body__dot bg-yellow-500"></div>
            <div className="three-body__dot bg-emerald-600"></div>
          </div>
        </div>
      )}

      <div
        id="image-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-yellow-50 to-emerald-50 dark:from-slate-800 dark:via-amber-900/20 dark:to-slate-900"
      >
        {/* Background image with parallax */}
        <div ref={backgroundRef} className="absolute inset-0" data-parallax="0.5">
          <img
            src={getImageSrc(currentIndex) || "/placeholder.svg"}
            alt="Background"
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoad={handleImageLoad}
            style={{ willChange: "transform" }}
          />

          {/* Enhanced cinematic overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-yellow-900/20 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
        </div>

        {/* Interactive preview image */}
        <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl ring-4 ring-yellow-400/30">
          <div className="relative group">
            <div
              onClick={handleMiniImgClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100"
            >
              <img
                src={getImageSrc((currentIndex % 3) + 1) || "/placeholder.svg"}
                alt="Preview"
                id="current-image"
                className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                onLoad={handleImageLoad}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-yellow-900/10 to-transparent rounded-lg"></div>
              <div className="absolute bottom-4 left-4 text-yellow-100 text-sm font-medium bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
                Click to explore
              </div>
            </div>
          </div>
        </div>

        {/* Next image for cinematic transitions */}
        <img
          ref={nextImgRef}
          src={getImageSrc(currentIndex) || "/placeholder.svg"}
          alt="Transition"
          id="next-image"
          className="absolute-center invisible absolute z-20 size-64 object-cover object-center rounded-lg"
          onLoad={handleImageLoad}
          style={{ willChange: "transform" }}
        />

        {/* Auto-cycle control */}
        <button
          onClick={toggleAutoCycle}
          className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-yellow-600/80 text-white hover:text-slate-900 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-400/20"
          title={isPaused ? "Resume auto-cycle" : "Pause auto-cycle"}
        >
          {isPaused ? (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          )}
        </button>

        {/* Progress indicators */}
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
          {[1, 2, 3].map((index) => (
            <div
              key={index}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === index
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-600 w-8 shadow-lg shadow-yellow-400/30"
                  : "bg-white/40 hover:bg-yellow-300/60 w-2"
              }`}
              onClick={() => {
                if (intervalRef.current) {
                  clearInterval(intervalRef.current)
                }
                setHasClicked(true)
                setCurrentIndex(index)
                setTimeout(() => {
                  if (!isPaused) {
                    intervalRef.current = setInterval(() => {
                      setHasClicked(true)
                      setCurrentIndex((prevIndex) => (prevIndex % 3) + 1)
                    }, 5000)
                  }
                }, 10000)
              }}
            />
          ))}
        </div>

        {/* Bottom title with cinematic glow */}
        <h1
          className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white text-6xl font-bold drop-shadow-2xl"
          style={{
            textShadow: "2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,212,0,0.3), 0 0 40px rgba(255,212,0,0.1)",
          }}
          dangerouslySetInnerHTML={{ __html: currentContent.bottomTitle }}
        />

        {/* Main content with enhanced animations */}
        <div
          ref={contentRef}
          className="absolute left-0 top-0 z-40 size-full pt-[100px] md:pt-[80px]"
          style={{ willChange: "transform, opacity" }}
        >
          <div className="mt-24 px-5 sm:px-10 hero-content">
            <h1
              ref={titleRef}
              className="special-font hero-heading text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl"
              style={{
                textShadow: "3px 3px 6px rgba(0,0,0,0.8), 0 0 30px rgba(255,212,0,0.2), 0 0 60px rgba(255,212,0,0.1)",
              }}
              dangerouslySetInnerHTML={{ __html: currentContent.title }}
            />

            <div ref={subtitleRef}>
              <p className="mb-8 max-w-md font-light text-white/95 text-lg leading-relaxed drop-shadow-lg">
                {currentContent.subtitle} <br />
                <span className="text-yellow-200">{currentContent.description}</span>
              </p>
            </div>

            {/* Enhanced CTA Buttons */}
            <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => {
                  const productsSection = document.getElementById("products")
                  if (productsSection) {
                    productsSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/30 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {currentContent.primaryButton}
                </span>
              </button>

              <button
                onClick={() => {
                  const contactSection = document.getElementById("contact")
                  if (contactSection) {
                    contactSection.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                className="group cursor-pointer relative px-8 py-4 bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-slate-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
              >
                <span className="relative z-10">{currentContent.secondaryButton}</span>
              </button>
            </div>

            {/* Trust indicators */}
            <div ref={trustIndicatorsRef} className="mt-12 flex flex-wrap gap-6 text-white/90">
              {currentContent.trustIndicators.map((indicator, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm"
                >
                  <div className={`w-2 h-2 ${indicator.colorClass} rounded-full shadow-sm`}></div>
                  <span className="text-sm font-medium">{indicator.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced scroll indicator */}
      <a href="#mission">
        <div
          ref={scrollIndicatorRef}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-50 cursor-pointer group"
        >
          <div className="w-6 h-10 border-2 border-yellow-400/80 rounded-full p-1 group-hover:border-yellow-300 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-yellow-400/20">
            <div className="w-1 h-3 bg-yellow-400/80 rounded-full mx-auto animate-pulse group-hover:bg-yellow-300"></div>
          </div>
        </div>
      </a>
    </div>
  )
}

export default CinematicHero
