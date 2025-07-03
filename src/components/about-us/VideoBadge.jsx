import { useRef, useEffect } from "react";
import { Play } from "lucide-react";
import { gsap } from "gsap";

const VideoBadge = ({ onClick, animate = true }) => {
  const badgeRef = useRef(null);
  const pulseRef = useRef(null);
  
  useEffect(() => {
    if (animate) {
      // Create the pulse animation
      const pulseAnimation = gsap.timeline({ repeat: -1 })
        .to(pulseRef.current, {
          scale: 1.5,
          opacity: 0,
          duration: 1.5,
          ease: "power2.out"
        })
        .set(pulseRef.current, {
          scale: 1,
          opacity: 0.4
        });
        
      // Create hover effect
      gsap.set(badgeRef.current, {
        transformOrigin: "center center"
      });
      
      // Return cleanup function
      return () => {
        pulseAnimation.kill();
      };
    }
  }, [animate]);
  
  // Handle hover animations
  const handleMouseEnter = () => {
    gsap.to(badgeRef.current, {
      scale: 1.1,
      duration: 0.3,
      ease: "back.out(1.7)"
    });
  };
  
  const handleMouseLeave = () => {
    gsap.to(badgeRef.current, {
      scale: 1,
      duration: 0.3,
      ease: "power2.out"
    });
  };
  
  return (
    <div className="relative inline-block">
      {/* Pulse effect */}
      <div 
        ref={pulseRef} 
        className="absolute inset-0 rounded-full bg-zinc-200 opacity-40"
      ></div>
      
      {/* Play button */}
      <button
        ref={badgeRef}
        onClick={onClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative flex items-center justify-center w-12 h-12 bg-zinc-200 hover:bg-zinc-100 text-black rounded-full shadow-lg transition-colors z-10"
        aria-label="Play video"
      >
        <Play size={20} fill="currentColor" className="ml-1" />
      </button>
    </div>
  );
};

export default VideoBadge;