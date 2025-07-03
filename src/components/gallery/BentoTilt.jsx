"use client"

import { ArrowUpRight } from "lucide-react"
import {useTilt} from "../../hooks/useTilt.js";
import {useHoverCursorEffect} from "../../hooks/useHoverCursorEffect.js";

export const BentoTilt = ({ children, className = "" }) => {

  const { itemRef, transformStyle, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <div
      ref={itemRef}
      className={`transition-transform duration-300 ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

export const BentoCard = ({ image, title, location, description, category }) => {
  const {
    cursorPosition,
    hoverOpacity,
    hoverButtonRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  } = useHoverCursorEffect()


  return (
    <div className="relative h-full w-full overflow-hidden rounded-xl">
      {/* Background Image */}
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="absolute left-0 top-0 h-full w-full object-cover object-center transition-transform duration-700 hover:scale-110"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col justify-between p-5 text-white">
        <div>
          {category && (
            <span className="mb-2 inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-medium backdrop-blur-sm">
              {category}
            </span>
          )}
          <h2 className="text-2xl font-bold">{title}</h2>
          {location && <p className="mt-1 text-sm text-white/70">{location}</p>}
        </div>

        <div>
          {description && <p className="mb-4 max-w-64 text-sm text-white/80">{description}</p>}

          <div
            ref={hoverButtonRef}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative flex w-fit cursor-pointer items-center gap-2 overflow-hidden rounded-full border border-white/20 bg-black/50 px-4 py-2 text-sm backdrop-blur-sm transition-colors hover:border-white/40"
          >
            {/* Radial gradient hover effect */}
            <div
              className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
              style={{
                opacity: hoverOpacity,
                background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(255,255,255,0.2), transparent)`,
              }}
            />
            <span className="relative z-20">View Project</span>
            <ArrowUpRight className="relative z-20 h-4 w-4" />
          </div>
        </div>
      </div>
    </div>
  )
}
