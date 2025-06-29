"use client"

import React, { useRef, useEffect } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/all"

gsap.registerPlugin(ScrollTrigger)

export default function CinematicMissionSection() {
  const sectionRef = useRef(null)
  const backgroundImageRef = useRef(null)
  const containerRef = useRef(null)
  const leftPanelRef = useRef(null)
  const rightPanelRef = useRef(null)
  const titleLine1Ref = useRef(null)
  const titleLine2Ref = useRef(null)
  const profileImagesRef = useRef(null)
  const dividerRef = useRef(null)
  const dividerTextRef = useRef(null)
  const descriptionNumberRef = useRef(null)
  const descriptionTextRef = useRef(null)
  const moreButtonRef = useRef(null)
  const statsRefs = useRef([])
  const propertyImageRef = useRef(null)
  const rightContentRef = useRef(null)
  const locationTicketRef = useRef(null)
  const locationDescRef = useRef(null)
  const actionButtonRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cinematic entrance timeline - orchestrated like a movie scene
      const masterTL = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          end: "bottom 10%",
          toggleActions: "play none none reverse",
          onEnter: () => {
            // Trigger cinematic entrance
            masterTL.play()
          },
        },
      })

      // Scene setup - initial states for cinematic reveal
      gsap.set([leftPanelRef.current, rightPanelRef.current], {
        opacity: 0,
        scale: 0.9,
      })

      gsap.set(backgroundImageRef.current, {
        scale: 1.2,
        filter: "blur(8px) brightness(0.6)",
      })

      // Act 1: Background and container reveal (0-1.5s)
      masterTL.to(
        backgroundImageRef.current,
        {
          scale: 1,
          filter: "blur(0px) brightness(1)",
          duration: 1.5,
          ease: "power2.out",
        },
        0,
      )

      masterTL.to(
        containerRef.current,
        {
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        0.2,
      )

      // Act 2: Left panel cinematic slide-in (1.0-2.5s)
      masterTL.fromTo(
        leftPanelRef.current,
        {
          x: -100,
          opacity: 0,
          rotationY: -15,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.2,
          ease: "power3.out",
        },
        1.0,
      )

      // Act 3: Title dramatic reveal with mask effect (1.5-2.8s)
      masterTL.fromTo(
        titleLine1Ref.current,
        {
          y: "120%",
          rotationX: 45,
          opacity: 0,
        },
        {
          y: "0%",
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        1.5,
      )

      masterTL.fromTo(
        titleLine2Ref.current,
        {
          y: "120%",
          rotationX: 45,
          opacity: 0,
        },
        {
          y: "0%",
          rotationX: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        1.8,
      )

      // Act 4: Profile images with cinematic bounce (2.0s)
      masterTL.fromTo(
        profileImagesRef.current,
        {
          opacity: 0,
          scale: 0.3,
          rotation: -180,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          ease: "back.out(2)",
        },
        2.0,
      )

      // Act 5: Divider line dramatic sweep (2.2-3.0s)
      masterTL.fromTo(
        dividerRef.current,
        {
          scaleX: 0,
          opacity: 0,
          transformOrigin: "left center",
        },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
        },
        2.2,
      )

      masterTL.fromTo(
        dividerTextRef.current,
        {
          opacity: 0,
          x: -20,
        },
        {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
        },
        2.5,
      )

      // Act 6: Content cascade (2.5-3.5s)
      const contentElements = [descriptionNumberRef.current, descriptionTextRef.current, moreButtonRef.current]

      contentElements.forEach((element, index) => {
        if (element) {
          masterTL.fromTo(
            element,
            {
              opacity: 0,
              y: 30,
              scale: 0.95,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.6,
              ease: "power2.out",
            },
            2.5 + index * 0.15,
          )
        }
      })

      // Act 7: Stats reveal with stagger (3.0-3.8s)
      statsRefs.current.forEach((statRef, index) => {
        if (statRef) {
          masterTL.fromTo(
            statRef,
            {
              opacity: 0,
              y: 40,
              scale: 0.8,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              ease: "back.out(1.7)",
            },
            3.0 + index * 0.2,
          )
        }
      })

      // Act 8: Property image cinematic zoom (3.5s)
      masterTL.fromTo(
        propertyImageRef.current,
        {
          opacity: 0,
          scale: 1.2,
          filter: "blur(5px)",
        },
        {
          opacity: 1,
          scale: 1,
          filter: "blur(0px)",
          duration: 1,
          ease: "power2.out",
        },
        3.5,
      )

      // Act 9: Right panel slide-in from right (1.8-3.2s)
      masterTL.fromTo(
        rightPanelRef.current,
        {
          x: 100,
          opacity: 0,
          rotationY: 15,
          scale: 0.9,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1.4,
          ease: "power3.out",
        },
        1.8,
      )

      // Act 10: Right content elements cascade (3.8-4.5s)
      const rightElements = [locationTicketRef.current, locationDescRef.current, actionButtonRef.current]

      rightElements.forEach((element, index) => {
        if (element) {
          masterTL.fromTo(
            element,
            {
              opacity: 0,
              x: index === 0 ? -30 : 0,
              y: index > 0 ? 30 : 0,
              scale: 0.9,
            },
            {
              opacity: 1,
              x: 0,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power2.out",
            },
            3.8 + index * 0.2,
          )
        }
      })

      // Parallax effects for depth
      gsap.to(backgroundImageRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Left panel subtle parallax
      gsap.to(leftPanelRef.current, {
        yPercent: -5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Right panel counter-parallax for depth
      gsap.to(rightPanelRef.current, {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })

      // Enhanced hover animations with cinematic flair
      const interactiveElements = [
        { element: moreButtonRef.current, goldEffect: true },
        { element: actionButtonRef.current, goldEffect: true },
      ]

      interactiveElements.forEach(({ element, goldEffect }) => {
        if (element) {
          element.addEventListener("mouseenter", () => {
            gsap.to(element, {
              scale: 1.08,
              rotationY: 5,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: goldEffect
                ? "0 15px 35px rgba(255, 212, 0, 0.4), 0 5px 15px rgba(255, 212, 0, 0.2)"
                : "0 15px 35px rgba(0, 0, 0, 0.3)",
            })
          })

          element.addEventListener("mouseleave", () => {
            gsap.to(element, {
              scale: 1,
              rotationY: 0,
              duration: 0.4,
              ease: "power2.out",
              boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
            })
          })
        }
      })

      // Scroll-triggered exit animation for cinematic transition
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "bottom 30%",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress
          gsap.to(containerRef.current, {
            scale: 1 - progress * 0.05,
            opacity: 1 - progress * 0.3,
            filter: `blur(${progress * 3}px)`,
            duration: 0.3,
            ease: "none",
          })
        },
      })
    }, sectionRef)

    return () => {
      ctx.revert()
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  const stats = [
    { value: "500+", label: "Patients Treated", highlight: true },
    { value: "95%", label: "Success Rate", highlight: false },
    { value: "15+", label: "Natural Therapies", highlight: true },
  ]

  return (
    <div
      id="mission"
      className="h-fit w-screen overflow-hidden relative pt-[50px] md:pt-[50px] pb-[50px] md:pb-[50px] px-10"
      ref={sectionRef}
      style={{ willChange: "transform" }}
    >
      {/* Background with parallax */}
      <div
        ref={backgroundImageRef}
        className="absolute inset-0 z-0"
        data-parallax="0.3"
        style={{ willChange: "transform" }}
      >
        <img src="/images/hero.jpg" alt="Background" className="h-full w-full object-center object-cover" />
        {/* Enhanced cinematic overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-900/15 via-transparent to-blue-900/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
      </div>

      <div
        ref={containerRef}
        className="h-full w-full bg-transparent z-10 relative rounded-2xl border-[20px] border-white shadow-2xl shadow-yellow-400/10 flex opacity-0"
        style={{ willChange: "transform, opacity" }}
      >
        {/* Left Panel - Main Content */}
        <div
          ref={leftPanelRef}
          className="w-1/2 h-full flex flex-col bg-gradient-to-br from-white to-yellow-50/30 px-5 py-5 pr-10 overflow-hidden"
          style={{ willChange: "transform" }}
        >
          <div className="flex w-full">
            <div className="tracking-tight text-6xl font-[500] w-fit flex flex-col mr-2 text-slate-800">
              <h2 className="h-18 flex items-center overflow-hidden">
                <span
                  ref={titleLine1Ref}
                  className="block bg-gradient-to-r from-slate-800 to-yellow-600 bg-clip-text text-transparent"
                  style={{ willChange: "transform" }}
                >
                  Rediscover
                </span>
              </h2>
              <h2 className="h-18 flex items-center overflow-hidden">
                <span
                  ref={titleLine2Ref}
                  className="block bg-gradient-to-r from-yellow-600 to-slate-800 bg-clip-text text-transparent"
                  style={{ willChange: "transform" }}
                >
                  Natural Vitality
                </span>
              </h2>
            </div>

            {/* Profile Images with enhanced gold borders */}
            <div
              ref={profileImagesRef}
              className="flex w-[80px] h-[80px] flex-wrap gap-1 opacity-0"
              style={{ willChange: "transform" }}
            >
              <div className="h-14 w-14 rounded-full ring-2 ring-yellow-400/50 ring-offset-2 hover:ring-yellow-500/70 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/7821915/pexels-photo-7821915.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile 1"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="h-7 w-7 rounded-full ring-1 ring-yellow-300/40 ring-offset-1 hover:ring-yellow-400/60 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/1129615/pexels-photo-1129615.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile 2"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
              <div className="h-9 w-9 rounded-full ring-1 ring-yellow-400/50 ring-offset-1 hover:ring-yellow-500/70 transition-all duration-300">
                <img
                  src="https://images.pexels.com/photos/2253879/pexels-photo-2253879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Profile 3"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
          </div>

          {/* Divider with cinematic sweep */}
          <div className="flex mt-5 mb-5 items-center w-full gap-5">
            <p
              ref={dividerTextRef}
              className="text-nowrap text-sm font-bold opacity-0 text-yellow-700"
              style={{ willChange: "transform" }}
            >
              Welcome to Healing Reimagined
            </p>
            <div
              ref={dividerRef}
              className="h-[2px] bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-0 shadow-sm"
              style={{ willChange: "transform" }}
            />
          </div>

          {/* Description section */}
          <div className="flex w-full gap-6">
            <span
              ref={descriptionNumberRef}
              className="text-xs font-black text-yellow-600 opacity-0 bg-yellow-100 px-2 py-1 rounded-full"
              style={{ willChange: "transform" }}
            >
              05
            </span>
            <p
              ref={descriptionTextRef}
              className="leading-[1.3] text-sm text-slate-700 opacity-0"
              style={{ willChange: "transform" }}
            >
              At Milagro Pharmaceuticals, we offer advanced, non-invasive therapies designed to activate your body's
              natural regenerative power. Experience wellness through innovation and holistic care.
            </p>
            <button
              ref={moreButtonRef}
              className="w-96 h-10 cursor-pointer rounded-full flex items-center justify-center text-slate-900 font-medium text-sm bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 opacity-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
              style={{ willChange: "transform" }}
            >
              More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
              >
                <path d="M13 5H19V11" />
                <path d="M19 5L5 19" />
              </svg>
            </button>
          </div>

          {/* Stats with enhanced styling */}
          <div className="flex w-full my-5 items-center justify-between text-slate-800">
            {stats.map((stat, index) => (
              <React.Fragment key={stat.label}>
                <div
                  ref={(el) => (statsRefs.current[index] = el)}
                  className={`flex gap-0 flex-col opacity-0 transition-all duration-300 hover:scale-105 ${
                    stat.highlight
                      ? "bg-gradient-to-br from-yellow-50 to-yellow-100/50 p-3 rounded-lg border border-yellow-200/50 shadow-sm hover:shadow-md hover:shadow-yellow-400/20"
                      : "hover:bg-slate-50 p-2 rounded-lg"
                  }`}
                  style={{ willChange: "transform" }}
                >
                  <p className={`text-2xl font-bold ${stat.highlight ? "text-yellow-600" : "text-slate-800"}`}>
                    {stat.value}
                  </p>
                  <span className="text-sm text-slate-600">{stat.label}</span>
                </div>
                {index < 2 && <div className="h-7 w-[2px] bg-gradient-to-b from-yellow-400 to-yellow-600" />}
              </React.Fragment>
            ))}
          </div>

          {/* Property Image with enhanced styling */}
          <div
            ref={propertyImageRef}
            className="w-[90%] min-h-64 max-h-[50%] mx-auto mt-auto rounded-3xl overflow-hidden opacity-0 ring-4 ring-yellow-400/30 ring-offset-4 shadow-xl shadow-yellow-400/20 hover:ring-yellow-500/50 hover:shadow-2xl hover:shadow-yellow-400/30 transition-all duration-500"
            style={{ willChange: "transform" }}
          >
            <img
              src="/images/hero1.jpg"
              alt="Property"
              className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Right Panel - Visual Content */}
        <div
          ref={rightPanelRef}
          className="w-1/2 h-full relative flex flex-col opacity-0"
          style={{ willChange: "transform" }}
        >
          {/* Enhanced gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-yellow-900/10 to-transparent z-0" />

          {/* Location Ticket with enhanced styling */}
          <div
            ref={locationTicketRef}
            className="text-sm text-slate-800 relative z-10 flex bg-gradient-to-r from-white to-yellow-50 w-56 font-medium leading-[1.2] border-[10px] border-white rounded-2xl mt-5 ms-5 opacity-0 shadow-lg shadow-yellow-400/10 hover:shadow-xl hover:shadow-yellow-400/20 transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            <div>
              <p className="text-slate-700">Washington Blvd Culver City, Ca</p>
              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-600 text-slate-900 mt-3 shadow-md hover:shadow-lg hover:shadow-yellow-400/30 transition-all duration-300 hover:scale-110">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 5H19V11" />
                  <path d="M19 5L5 19" />
                </svg>
              </div>
            </div>
            <img
              src="/images/hero.jpg"
              alt="Location thumbnail"
              className="w-24 h-20 object-cover rounded-2xl ring-2 ring-yellow-400/50 hover:ring-yellow-500/70 transition-all duration-300"
            />
          </div>

          {/* Location Description with enhanced backdrop */}
          <p
            ref={locationDescRef}
            className="text-white/90 text-sm px-5 mt-auto leading-relaxed z-10 w-1/2 opacity-0 bg-black/30 backdrop-blur-md rounded-lg p-4 border border-white/10 hover:bg-black/40 transition-all duration-300"
            style={{ willChange: "transform" }}
          >
            Visit our facility and embark on a transformative journey to wellness—guided by science, compassion, and{" "}
            <span className="text-yellow-300 font-medium">natural healing</span>.
          </p>

          {/* Action Button with enhanced effects */}
          <button
            ref={actionButtonRef}
            className="z-10 relative cursor-pointer bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 my-5 ms-5 px-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm w-fit opacity-0 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300/50 shadow-lg shadow-yellow-400/20 hover:shadow-xl hover:shadow-yellow-400/30"
            style={{ willChange: "transform" }}
          >
            Book Your Consultation
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="ml-2"
            >
              <path d="M13 5H19V11" />
              <path d="M19 5L5 19" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
