"use client"

import { useState } from "react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"

import TitleHeader from "../components/TitleHeader"

// Example services data - replace with your actual services
const designServices = [
  {
    name: "Interior Styling",
    imgPath: "/images/basement/basement.png", // Update with your actual image paths
    description: "Curated selection of furniture, accessories, and decor to create a cohesive aesthetic.",
  },
  {
    name: "Spatial Planning",
    imgPath: "/images/basement/basement.png",
    description: "Optimizing your space for functionality, flow, and aesthetic harmony.",
  },
  {
    name: "Renovation Design",
    imgPath: "/images/basement/basement.png",
    description: "Comprehensive redesign plans for transforming existing spaces.",
  },
  {
    name: "Furniture Selection",
    imgPath: "/images/basement/basement.png",
    description: "Expert curation of furniture pieces that balance style, comfort, and durability.",
  },
  {
    name: "Color Consultation",
    imgPath: "/images/basement/basement.png",
    description: "Strategic color schemes that evoke the right mood and complement your space.",
  },
]

const ServicesShowcase = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Maintain the original GSAP animation for initial load
  useGSAP(() => {
    gsap.fromTo(
      ".tech-card",
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.inOut",
        stagger: 0.2,
        scrollTrigger: {
          trigger: "#services",
          start: "top center",
        },
      },
    )
  })

  return (
    <div id="services" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader title="Our Premium Design Services" sub="🏠 Transforming Spaces with Elegance" />

        {/* Changed from grid to flex for horizontal layout */}
        <div className="flex flex-col md:flex-row gap-6 mt-16 h-[500px] md:h-[400px] w-full">
          {designServices.map((service, index) => {
            // Calculate width based on hover state
            const isHovered = hoveredIndex === index
            const width = isHovered ? "md:w-[40%]" : hoveredIndex !== null ? "md:w-[15%]" : "md:w-[20%]"

            return (
              <div
                key={index}
                className={`tech-card card-border overflow-hidden group rounded-2xl ${width} w-full transition-all duration-500 ease-in-out relative`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Keep the animated background */}
                <div className="tech-card-animated-bg" />

                <div className="tech-card-content">
                  <div className="tech-icon-wrapper group-hover:scale-110 transition-transform duration-500">
                    <img src={service.imgPath || "/placeholder.svg"} alt={service.name} />
                  </div>

                  <div className="padding-x w-full">
                    <p className="text-lg 2xl:text-2xl pb-5 xl:pb-0 font-semibold text-white-50 text-center">
                      {service.name}
                    </p>

                    {/* Description that appears on hover */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ${isHovered ? "max-h-32 opacity-100 mt-4" : "max-h-0 opacity-0"}`}
                    >
                      <p className="text-white-50 text-center text-sm md:text-base">{service.description}</p>
                    </div>
                  </div>

                  {/* Call to action button that appears on hover */}
                  <div
                    className={`mt-4 text-center transition-all duration-500 ${isHovered ? "opacity-100" : "opacity-0"}`}
                  >
                    {isHovered && (
                      <button className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-full text-white text-sm font-medium transition-colors">
                        Learn more
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default ServicesShowcase
