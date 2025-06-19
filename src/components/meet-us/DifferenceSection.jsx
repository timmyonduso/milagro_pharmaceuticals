import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { difference } from "../../assets";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const DifferenceSection = () => {
  const differenceRef = useRef(null);

  // Setup GSAP animations
  useGSAP(() => {
    // Image animation
    gsap.fromTo(
      differenceRef.current.querySelector('.difference-image'),
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: differenceRef.current.querySelector('.difference-image'),
          start: "top bottom-=100",
          end: "bottom center",
          toggleActions: "play none none reverse",
          markers: false
        }
      }
    );

    // Heading animation
    gsap.fromTo(
      differenceRef.current.querySelector('.difference-title'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: differenceRef.current.querySelector('.difference-title'),
          start: "top bottom-=150",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Content sections animation
    const contentBlocks = differenceRef.current.querySelectorAll('.content-block');
    
    contentBlocks.forEach((block, index) => {
      gsap.fromTo(
        block,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.7,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: block,
            start: "top bottom-=80",
            toggleActions: "play none none reverse"
          }
        }
      );
    });

  }, []);

  return (
    <section ref={differenceRef} className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="difference-title text-3xl md:text-4xl font-bold text-center text-[#292F36] dark:text-white mb-3">
          What Makes Us Different
        </h2>
        <div className="w-24 h-1 bg-[#CDA274] mx-auto mb-10"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="difference-image">
            <img 
              src={difference}
              alt="SMD Design Process" 
              className="rounded-lg shadow-lg w-full h-auto"
            />
          </div>
          <div>
            <div className="content-block">
              <h3 className="text-2xl font-semibold text-[#292F36] dark:text-white mb-4">
                A Mother-Daughter Design Dynamic
              </h3>
              <p className="text-[#4D5053] dark:text-gray-300 mb-6">
                Our unique mother-daughter partnership brings together decades of experience with fresh perspective. Sharon's seasoned expertise combines with Brittany's innovative approach, creating a powerful design synergy that delivers truly exceptional results.
              </p>
            </div>
            
            <div className="content-block">
              <h3 className="text-2xl font-semibold text-[#292F36] dark:text-white mb-4">
                Comprehensive Design Services
              </h3>
              <p className="text-[#4D5053] dark:text-gray-300 mb-6">
                Unlike firms that focus solely on aesthetics, we understand the technical aspects of design. From lighting and textiles to construction and structural considerations, our holistic approach ensures every element works in harmony.
              </p>
            </div>
            
            <div className="content-block">
              <h3 className="text-2xl font-semibold text-[#292F36] dark:text-white mb-4">
                Personalized Client Experience
              </h3>
              <p className="text-[#4D5053] dark:text-gray-300">
                We don't believe in cookie-cutter solutions. Every project begins with understanding your unique vision, lifestyle, and needs. Our collaborative process ensures the final design authentically reflects who you are while exceeding your expectations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferenceSection;