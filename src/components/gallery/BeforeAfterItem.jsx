"use client"

import { useRef, useState, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { ArrowRight } from "lucide-react"

gsap.registerPlugin(ScrollTrigger)

const BeforeAfterItem = ({ beforeImage, afterImage, title, location, description }) => {
  const [isRevealing, setIsRevealing] = useState(false)
  const [position, setPosition] = useState(50)
  const containerRef = useRef(null)
  const sliderRef = useRef(null)
  const beforeRef = useRef(null)
  const afterRef = useRef(null)

  // Handle mouse move to reveal before/after
  const handleMouseMove = (e) => {
    if (!isRevealing) return

    const rect = containerRef.current.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const newPosition = Math.max(0, Math.min(100, x))
    setPosition(newPosition)
  }

  // Handle touch move for mobile devices
  const handleTouchMove = (e) => {
    if (!isRevealing) return

    const rect = containerRef.current.getBoundingClientRect()
    const touch = e.touches[0]
    const x = ((touch.clientX - rect.left) / rect.width) * 100
    const newPosition = Math.max(0, Math.min(100, x))
    setPosition(newPosition)
  }

  // Animation for the container on scroll
  useEffect(() => {
    const container = containerRef.current

    gsap.fromTo(
      container,
      {
        clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
        opacity: 0,
      },
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
        },
      },
    )

    // Initial animation for the slider
    gsap.fromTo(
      sliderRef.current,
      { x: "-50%", opacity: 0 },
      {
        x: "0%",
        opacity: 1,
        duration: 0.8,
        delay: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: container,
          start: "top 80%",
          end: "top 50%",
          scrub: false,
        },
      },
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  // 3D hover effect
  const handleHover = (e) => {
    const rect = containerRef.current.getBoundingClientRect()
    const xOffset = e.clientX - (rect.left + rect.width / 2)
    const yOffset = e.clientY - (rect.top + rect.height / 2)

    gsap.to(containerRef.current, {
      rotationY: xOffset * 0.01,
      rotationX: -yOffset * 0.01,
      transformPerspective: 1000,
      duration: 0.5,
      ease: "power1.out",
    })
  }

  const handleHoverExit = () => {
    gsap.to(containerRef.current, {
      rotationY: 0,
      rotationX: 0,
      duration: 0.5,
      ease: "power1.out",
    })
  }

  return (
    <div className="my-16 flex flex-col items-center">
      <h3 className="mb-6 text-2xl font-bold text-[#4D5053] dark:text-white">{title}</h3>
      {/* <p className="mb-6 text-[#4D5053] dark:text-white">{location}</p> */}

      <div
        ref={containerRef}
        className="relative h-[500px] w-full max-w-4xl overflow-hidden rounded-lg shadow-xl"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => handleHover}
        onMouseLeave={handleHoverExit}
        onTouchMove={handleTouchMove}
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Before Image (Full width) */}
        <div
          ref={beforeRef}
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${beforeImage})` }}
        >
          <div className="absolute bottom-4 left-4 rounded-full bg-black bg-opacity-70 px-4 py-1 text-sm text-white">
            Before
          </div>
        </div>

        {/* After Image (Clipped based on slider position) */}
        <div
          ref={afterRef}
          className="absolute inset-0 h-full w-full bg-cover bg-center"
          style={{
            backgroundImage: `url(${afterImage})`,
            clipPath: `polygon(0 0, ${position}% 0, ${position}% 100%, 0 100%)`,
          }}
        >
          <div className="absolute bottom-4 left-4 rounded-full bg-black bg-opacity-70 px-4 py-1 text-sm text-white">
            After
          </div>
        </div>

        {/* Slider Control */}
        <div
          ref={sliderRef}
          className="absolute top-0 z-10 h-full cursor-ew-resize"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          onMouseDown={() => setIsRevealing(true)}
          onMouseUp={() => setIsRevealing(false)}
          onTouchStart={() => setIsRevealing(true)}
          onTouchEnd={() => setIsRevealing(false)}
        >
          <div className="flex h-full w-1 items-center justify-center bg-white">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-lg">
              <ArrowRight className="rotate-180 text-gray-700" size={16} />
              <ArrowRight className="text-gray-700" size={16} />
            </div>
          </div>
        </div>
      </div>

      <p className="mt-6 max-w-2xl text-center text-gray-700">{description}</p>
    </div>
  )
}

export default BeforeAfterItem
