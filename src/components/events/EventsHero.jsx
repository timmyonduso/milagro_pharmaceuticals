import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Button from "../Button";
import { eventsBg } from "../../assets";

const EventsHero = () => {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const ctaRef = useRef(null);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Create timeline for animation sequence
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    
    // Animate overlay opacity
    tl.fromTo(
      overlayRef.current,
      { opacity: 0.9 },
      { opacity: 0.5, duration: 1.5 }
    );
    
    // Animate text elements
    tl.fromTo(
      textRef.current.children,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.3 },
      "-=1"
    );
    
    // Animate CTA button
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      "-=0.5"
    );
  }, []);

  return (
    <div 
      ref={heroRef}
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${eventsBg})`,
          backgroundPosition: "center 25%"
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div 
        ref={overlayRef}
        className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"
      ></div>
      
      {/* Content Container */}
      <div className="relative h-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-12 lg:px-24">
        <div className="max-w-4xl mx-auto text-center" ref={textRef}>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light text-white mb-6 leading-tight">
            Crafting Moments That Matter
          </h1>
          
          <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto">
            From grand holiday displays to intimate gatherings, our events are an extension of our design philosophy — meaningful, memorable, and masterfully styled.
          </p>
        </div>
        
        <div ref={ctaRef} className="flex justify-center mt-5">
          <Button
              text="Explore Our Events"
              className="md:w-80 md:h-16 w-60 h-12 z-50 text-[#333] rounded-full bg-white font-medium"
              id="contact"
            />
        </div>
      </div>
      
      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white/5 to-transparent"></div>
          
    </div>
  );
};

export default EventsHero;