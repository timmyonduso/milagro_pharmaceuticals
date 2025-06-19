import { useEffect, useState, useRef } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";

const DirectionalHero = ({ panels, link }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(null);
  const slidesRef = useRef([]);
  const contentRefs = useRef([]);
  
  // Initialize refs with proper length based on panels
  useEffect(() => {
    slidesRef.current = slidesRef.current.slice(0, panels.length);
    contentRefs.current = contentRefs.current.slice(0, panels.length);
  }, [panels.length]);

  useEffect(() => {
    // Set up automatic slide transition
    const interval = setInterval(() => {
      nextSlide();
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, panels.length]);

  useEffect(() => {
    if (slidesRef.current.length === 0) return;

    // Hide all slides first
    slidesRef.current.forEach((slide, i) => {
      if (i !== currentIndex) {
        gsap.set(slide, { opacity: 0 });
      }
    });

    // Define different entrance animations based on slide index
    const animateSlide = () => {
      const currentSlide = slidesRef.current[currentIndex];
      const contentElements = contentRefs.current[currentIndex].querySelectorAll('.animate-in');
      
      // Reset the current slide position
      gsap.set(currentSlide, { opacity: 1 });
      
      // Different entrance animations based on slide index
      const entranceDirections = [
        { x: "-100%", y: "0%" },  // First slide comes from left
        { x: "0%", y: "100%" },   // Second slide comes from bottom
        { x: "100%", y: "0%" }    // Third slide comes from right
      ];
      
      const direction = entranceDirections[currentIndex % entranceDirections.length];
      
      // Animate the slide
      gsap.fromTo(currentSlide, 
        { x: direction.x, y: direction.y, opacity: 0 },
        { x: "0%", y: "0%", opacity: 1, duration: 1, ease: "power2.out" }
      );
      
      // Animate content elements
      gsap.fromTo(contentElements, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.15, duration: 0.7, delay: 0.3, ease: "power2.out" }
      );
    };

    animateSlide();
  }, [currentIndex]);

  const nextSlide = () => {
    // Fade out current slide
    const currentSlide = slidesRef.current[currentIndex];
    
    gsap.to(currentSlide, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % panels.length);
      }
    });
  };

  const prevSlide = () => {
    // Fade out current slide
    const currentSlide = slidesRef.current[currentIndex];
    
    gsap.to(currentSlide, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + panels.length) % panels.length);
      }
    });
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    
    // Fade out current slide
    const currentSlide = slidesRef.current[currentIndex];
    
    gsap.to(currentSlide, {
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        setCurrentIndex(index);
      }
    });
  };

  const handleScroll = (e) => {
    e.preventDefault();
    const targetId = link.replace('#', '');
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={carouselRef} className="w-full h-screen overflow-hidden relative bg-black">
      {/* Scroll indicator */}
      <a href={link} onClick={handleScroll}>
        <div className="cursor-pointer absolute bottom-8 left-1/2 transform -translate-x-1/2 z-25 flex flex-col items-center gap-2 text-white animate-bounce">
          <span className="text-sm font-medium">Scroll Down</span>
          <ChevronDown size={24} />
        </div>
      </a>

      {/* Carousel navigation */}
      <div className="absolute bottom-8 right-8 z-25 flex gap-2">
        {panels.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/40"
            }`}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Carousel arrows */}
      <button
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-25 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        onClick={prevSlide}
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>
      <button
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-25 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition"
        onClick={nextSlide}
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Slides */}
      {panels.map((panel, index) => (
        <div
          key={panel.id || index}
          ref={(el) => (slidesRef.current[index] = el)}
          className={`absolute top-0 left-0 w-full h-screen bg-cover bg-center`}
          style={{ 
            backgroundImage: `url(${panel.image})`,
            opacity: index === 0 ? 1 : 0
          }}
        >
          {/* Dark overlay */}
          <div className="absolute top-0 left-0 w-full h-full bg-black/60 z-20"></div>

          {/* Panel content */}
          <div 
            ref={(el) => (contentRefs.current[index] = el)}
            className="absolute inset-0 flex items-center justify-center z-30 px-4"
          >
            <div className="flex flex-col gap-2 items-center max-w-3xl mx-auto">
              <h2 className="text-white lg:text-[60px] text-[40px] font-semibold text-center animate-in">
                {panel.heading}
              </h2>
              <p className="text-gray-300 text-[18px] text-center font-medium animate-in">
                {panel.subheading}
              </p>
              <p className="text-gray-300 text-[15px] text-center mt-2 animate-in">
                {panel.description}
              </p>
              <a
                href={panel.ctaLink}
                className="z-50 w-fit mx-auto animate-in"
              >
                <button 
                  onClick={handleScroll} 
                  className="cursor-pointer text-[#333] dark:text-black rounded-full bg-white font-medium px-5 py-3 mt-5 hover:bg-white/90 transition"
                >
                  {panel.ctaText}
                </button>
              </a>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
};

export default DirectionalHero;