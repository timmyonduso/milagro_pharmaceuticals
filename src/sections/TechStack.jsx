import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useState, useRef } from "react";

import TitleHeader from "../components/TitleHeader";
import { techStackImgs } from "../constants";

const TechStack = () => {
  const [hoveredItem, setHoveredItem] = useState(null);
  const containerRef = useRef(null);

  // Animate the tech cards in the skills section on scroll
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
          trigger: "#skills",
          start: "top center",
        },
      }
    );
  });

  // Set up the animation context for responsive hover effects
  useGSAP(() => {
    // Initialize the cards with default settings
    gsap.set(".tech-card", {
      flex: 1,
      transition: "all 0.5s ease-in-out",
    });
  }, []);

  // Handle mouseenter
  const handleMouseEnter = (index) => {
    setHoveredItem(index);
    
    // Create a timeline for smooth animations
    const tl = gsap.timeline();
    
    // Expand the hovered card
    tl.to(`.tech-card-${index}`, {
      flex: 3, // Take up more space
      duration: 0.5,
      ease: "power2.out",
      zIndex: 10,
    });
    
    // Shrink all other cards
    techStackImgs.forEach((_, i) => {
      if (i !== index) {
        tl.to(`.tech-card-${i}`, {
          flex: 0.5, // Shrink to make room
          duration: 0.5,
          ease: "power2.out",
          zIndex: 1,
        }, "<"); // Start at the same time as the previous animation
      }
    });
    
    // Show the interior design image
    tl.to(`.interior-image-${index}`, {
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    }, "<0.1");
    
    // Fade out the original content
    tl.to(`.tech-content-${index}`, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.inOut",
    }, "<");
  };

  // Handle mouseleave
  const handleMouseLeave = (index) => {
    setHoveredItem(null);
    
    const tl = gsap.timeline();
    
    // Return all cards to equal size
    techStackImgs.forEach((_, i) => {
      tl.to(`.tech-card-${i}`, {
        flex: 1,
        duration: 0.5,
        ease: "power2.inOut",
        zIndex: 1,
      }, "<"); // All cards animate together
    });
    
    // Hide interior image
    tl.to(`.interior-image-${index}`, {
      opacity: 0,
      scale: 1.1,
      duration: 0.4,
      ease: "power2.inOut",
    }, "<0.1");
    
    // Show the original content again
    tl.to(`.tech-content-${index}`, {
      opacity: 1,
      duration: 0.4,
      ease: "power2.inOut",
    }, "<0.2");
  };

  return (
    <div id="skills" className="flex-center section-padding">
      <div className="w-full h-full md:px-10 px-5">
        <TitleHeader
          title="Interior Design Portfolio"
          sub="🏠 Transforming Spaces Into Beautiful Homes"
        />
        <div 
          ref={containerRef}
          className="tech-grid flex flex-wrap gap-4"
        >
          {techStackImgs.map((item, index) => (
            <div
              key={index}
              className={`card-border tech-card tech-card-${index} overflow-hidden group rounded-lg relative`}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              style={{
                minHeight: "180px",
                transition: "all 0.5s ease-in-out",
              }}
            >
              <div className="tech-card-animated-bg" />
              
              {/* Interior design image (hidden by default) */}
              <div 
                className={`interior-image-${index} absolute inset-0 w-full h-full opacity-0 scale-110`}
                style={{
                  backgroundImage: `url(${item.interiorImagePath || "/images/basement/basement.png"})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: "opacity 0.5s ease-in-out, transform 0.5s ease-in-out",
                }}
              />
              
              {/* Original content (tech icon and name) */}
              <div className={`tech-card-content tech-content-${index} relative z-2 flex flex-col items-center justify-center h-full`}>
                <div className="tech-icon-wrapper">
                  <img src={item.imgPath} alt="" className="w-16 h-16 object-contain" />
                </div>
                <div className="padding-x w-full text-center mt-2">
                  <p className="font-medium">{item.name}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechStack;