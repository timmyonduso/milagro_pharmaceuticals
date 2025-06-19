import { useState, useRef } from 'react'

// Custom hook for hover effect functionality
export const useHoverCursorEffect = () => {
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 })
    const [hoverOpacity, setHoverOpacity] = useState(0)
    const hoverButtonRef = useRef(null)

    const handleMouseMove = (event) => {
        if (!hoverButtonRef.current) return
        const rect = hoverButtonRef.current.getBoundingClientRect()

        setCursorPosition({
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        })
    }

    const handleMouseEnter = () => setHoverOpacity(1)
    const handleMouseLeave = () => setHoverOpacity(0)

    return {
        cursorPosition,
        hoverOpacity,
        hoverButtonRef,
        handleMouseMove,
        handleMouseEnter,
        handleMouseLeave
    }
}
