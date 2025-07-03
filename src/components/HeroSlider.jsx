import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import gsap from "gsap";

const HeroSlider = ({ 
  slides, 
  autoPlayInterval = 5000,
  renderSlideContent,
  showControls = true,
  showIndicators = true,
  showPlayPause = true,
  className = ""
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const slideRefs = useRef([]);
  const contentRefs = useRef([]);
  const sliderRef = useRef(null);

  // Initialize refs with proper length based on slides
  useEffect(() => {
    slideRefs.current = slideRefs.current.slice(0, slides.length);
    // Adjust contentRefs based on how many elements each slide contains
    // This depends on how many elements we're animating per slide
    const elementsPerSlide = 3; // Default assumption: heading, subheading, CTA
    contentRefs.current = Array(slides.length * elementsPerSlide).fill(null);
  }, [slides.length]);

  // Function to animate slide transitions
  const animateSlideTransition = (nextIndex) => {
    // Get content elements for current slide (estimate 3 elements per slide)
    const currentSlideElements = getSlideContentElements(currentSlide);
    const nextSlideElements = getSlideContentElements(nextIndex);

    // Fade out current slide content
    gsap.to(currentSlideElements, {
      opacity: 0,
      y: -20,
      duration: 0.5,
      stagger: 0.1,
      ease: "power2.out"
    });

    // Fade out current slide
    gsap.to(slideRefs.current[currentSlide], {
      opacity: 0,
      duration: 0.8,
      ease: "power2.inOut",
      onComplete: () => {
        // Update state to new slide
        setCurrentSlide(nextIndex);
        
        // Make new slide visible but with 0 opacity for animation
        gsap.set(slideRefs.current[nextIndex], { opacity: 0 });
        
        // Fade in new slide
        gsap.to(slideRefs.current[nextIndex], {
          opacity: 1,
          duration: 0.8,
          ease: "power2.inOut"
        });

        // Set initial position for content elements
        gsap.set(nextSlideElements, { 
          opacity: 0,
          y: 20
        });

        // Animate in new slide content with stagger
        gsap.to(nextSlideElements, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.15,
          ease: "power2.out"
        });
      }
    });
  };

  // Helper function to get content elements for a specific slide
  const getSlideContentElements = (slideIndex) => {
    const elementsPerSlide = 3; // Default: heading, subheading, CTA
    const startIndex = slideIndex * elementsPerSlide;
    const elements = [];
    
    for (let i = 0; i < elementsPerSlide; i++) {
      if (contentRefs.current[startIndex + i]) {
        elements.push(contentRefs.current[startIndex + i]);
      }
    }
    
    return elements;
  };

  // Handle next/prev navigation
  const goToNextSlide = () => {
    const nextIndex = (currentSlide + 1) % slides.length;
    animateSlideTransition(nextIndex);
  };

  const goToPrevSlide = () => {
    const nextIndex = (currentSlide - 1 + slides.length) % slides.length;
    animateSlideTransition(nextIndex);
  };

  // Auto-play functionality
  useEffect(() => {
    let interval;
    
    if (isPlaying && !isHovering) {
      interval = setInterval(() => {
        goToNextSlide();
      }, autoPlayInterval);
    }

    return () => clearInterval(interval);
  }, [currentSlide, isPlaying, isHovering, autoPlayInterval]);

  // Initialize animations
  useEffect(() => {
    if (slides.length === 0 || !slideRefs.current[0]) return;

    // Initial animation for first slide content
    const firstSlideElements = getSlideContentElements(0);
    if (firstSlideElements.length > 0) {
      gsap.fromTo(
        firstSlideElements,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }
      );
    }
    
    // Setup initial state for all slides
    slideRefs.current.forEach((slide, index) => {
      if (slide) {
        if (index === 0) {
          gsap.set(slide, { opacity: 1 });
        } else {
          gsap.set(slide, { opacity: 0 });
        }
      }
    });
  }, [slides.length]);

  // Handle hover state for autoplay pause
  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  // Helper function to register content refs
  const registerContentRef = (el, slideIndex, elementIndex) => {
    const elementsPerSlide = 3; // Default: heading, subheading, CTA
    const refIndex = slideIndex * elementsPerSlide + elementIndex;
    contentRefs.current[refIndex] = el;
  };

  return (
    <div 
      ref={sliderRef}
      className={`w-full h-screen relative overflow-hidden ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id || index}
          ref={el => slideRefs.current[index] = el}
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${slide.image})`,
            opacity: index === currentSlide ? 1 : 0,
            zIndex: index === currentSlide ? 10 : 0
          }}
        >
          {/* Dark overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-20"></div>
          
          {/* Slide content using render prop pattern */}
          {renderSlideContent && renderSlideContent(slide, index, registerContentRef)}
        </div>
      ))}
      
      {/* Navigation controls */}
      {showControls && (
        <>
          <div className="absolute left-0 top-0 h-full flex items-center z-40 pl-4 md:pl-8">
            <button 
              onClick={goToPrevSlide}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all"
              aria-label="Previous slide"
            >
              <ChevronLeft className="text-white" size={24} />
            </button>
          </div>
          
          <div className="absolute right-0 top-0 h-full flex items-center z-40 pr-4 md:pr-8">
            <button 
              onClick={goToNextSlide}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all"
              aria-label="Next slide"
            >
              <ChevronRight className="text-white" size={24} />
            </button>
          </div>
        </>
      )}
      
      {/* Slide indicators */}
      {showIndicators && slides.length > 1 && (
        <div className="absolute bottom-12 left-0 right-0 flex justify-center z-40 gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => animateSlideTransition(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white scale-125" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
      
      {/* Play/pause button */}
      {showPlayPause && slides.length > 1 && (
        <div className="absolute bottom-12 right-8 z-40">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white/10 hover:bg-white/20 backdrop-blur-sm p-2 rounded-full transition-all"
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <Pause className="text-white" size={16} />
            ) : (
              <Play className="text-white" size={16} />
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default HeroSlider;