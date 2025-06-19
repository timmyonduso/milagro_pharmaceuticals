"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import BeforeAfterItem from "./BeforeAfterItem"
import TitleHeader from "../TitleHeader"
import { after1, after2, after3, after4, after5, after6, after7, before1, before2, before3, before4, before5, before6, before7 } from "../../assets"

gsap.registerPlugin(ScrollTrigger)

const BeforeAfterGallery = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)

  const projects = [
    {
      id: 1,
      title: "Modern Bathroom Renovation",
      location: "Buckhead, Atlanta",
      beforeImage: before1,
      afterImage: after1,
      description:
        "This bathroom was updated with a modern design featuring sleek tilework, a frameless glass shower, and floating vanities. Enhanced lighting and neutral tones create a relaxing, spa-like atmosphere.",
    },
    {
      id: 2,
      title: "Elegant Bathroom Makeover",
      location: "Midtown, Atlanta",
      beforeImage: before2,
      afterImage: after2,
      description:
        "We reimagined this outdated bathroom into an elegant oasis with a freestanding tub, custom marble tiling, and gold-accented fixtures. The spacious layout enhances comfort and luxury.",
    },
    {
      id: 3,
      title: "Contemporary Bathroom Upgrade",
      location: "Virginia Highland, Atlanta",
      beforeImage: before3,
      afterImage: after3,
      description:
        "This transformation brought a fresh contemporary look to a dated bathroom. Highlights include a walk-in shower with rainhead, modern vanities, and energy-efficient lighting.",
    },
    {
      id: 4,
      title: "Modern Living Room Transformation",
      location: "Buckhead, Atlanta",
      beforeImage: before4,
      afterImage: after4,
      description:
        "This living room transformation took a dated space and created a modern, light-filled retreat. We removed walls to open up the floor plan, installed new hardwood flooring, and added custom built-ins to maximize storage while maintaining a clean aesthetic.",
    },
    {
      id: 5,
      title: "Cozy Bedroom Remodel",
      location: "Midtown, Atlanta",
      beforeImage: before5,
      afterImage: after5,
      description:
        "This bedroom remodel created a cozy and inviting space with new hardwood floors, built-in wardrobes, and ambient lighting. A serene color palette enhances relaxation and comfort.",
    },
    {
      id: 6,
      title: "Bright Bathroom Redesign",
      location: "Virginia Highland, Atlanta",
      beforeImage: before6,
      afterImage: after6,
      description:
        "We revitalized this bathroom with bright ceramic tiles, a frameless walk-in shower, and a modern double vanity. The design brings both functionality and style to the space.",
    },
    {
      id: 7,
      title: "Sleek Bathroom Transformation",
      location: "Inman Park, Atlanta",
      beforeImage: before7,
      afterImage: after7,
      description:
        "This bathroom transformation showcases a minimalist design with sleek lines, matte black fixtures, and a seamless glass shower. The result is a clean and luxurious space ideal for daily rejuvenation.",
    },
  ];


  useEffect(() => {
    // Animate the section title on scroll
    gsap.fromTo(
      titleRef.current,
      {
        y: 50,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
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

  return (
    <section ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16" ref={titleRef}>
          <TitleHeader title="Before & After Transformations" sub="Design Journey" />

          <p className="mx-auto mt-8 max-w-2xl text-center text-gray-600">
            Witness the dramatic transformations we've created for our clients. Drag the slider to reveal the before and
            after images and see how we've reimagined these spaces.
          </p>
        </div>

        {projects.map((project) => (
          <BeforeAfterItem
            key={project.id}
            title={project.title}
            location={project.location}
            beforeImage={project.beforeImage}
            afterImage={project.afterImage}
            description={project.description}
          />
        ))}
      </div>
    </section>
  )
}

export default BeforeAfterGallery
