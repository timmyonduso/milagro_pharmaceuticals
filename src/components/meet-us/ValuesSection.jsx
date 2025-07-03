import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Star, Users, MessageSquare, Calendar } from "lucide-react";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ValuesSection = () => {
  const valuesRef = useRef(null);
  
  // Company values data
  const values = [
    {
      icon: <Star className="text-yellow-300" size={24} />,
      title: "Excellence in Design",
      description: "We believe every space deserves thoughtful, expert design that transforms environments and enhances lives."
    },
    {
      icon: <Users className="text-yellow-300" size={24} />,
      title: "Client Partnership",
      description: "Your vision drives our process. We collaborate closely to ensure your personality and needs shape every design decision."
    },
    {
      icon: <MessageSquare className="text-yellow-300" size={24} />,
      title: "Clear Communication",
      description: "We maintain transparent, consistent communication throughout your project, keeping you informed and involved."
    },
    {
      icon: <Calendar className="text-yellow-300" size={24} />,
      title: "Timeless Innovation",
      description: "We blend classic principles with fresh perspectives to create spaces that feel current yet enduring."
    }
  ];

  // Setup GSAP animations
  useGSAP(() => {
    // Values section animation
    const valueCards = valuesRef.current.querySelectorAll('.value-card');
    
    valueCards.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top bottom-=100",
            end: "bottom top+=200",
            toggleActions: "restart pause restart pause", // play, reverse, restart on scroll down and up
            markers: false
          }
        }
      );
    });

    // Title animation
    gsap.fromTo(
      valuesRef.current.querySelector('.values-title'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current.querySelector('.values-title'),
          start: "top bottom-=150",
          toggleActions: "play none none reverse"
        }
      }
    );

    // Description animation
    gsap.fromTo(
      valuesRef.current.querySelector('.values-description'),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: valuesRef.current.querySelector('.values-description'),
          start: "top bottom-=150",
          toggleActions: "play none none reverse"
        }
      }
    );

  }, []);

  return (
    <section ref={valuesRef} className="py-20 bg-white dark:bg-black">
      <div className="container mx-auto px-4">
        <h2 className="values-title text-3xl md:text-4xl font-bold text-center text-[#292F36] dark:text-white mb-3">
          Our Values
        </h2>
        <div className="w-24 h-1 bg-[#CDA274] mx-auto mb-10"></div>
        <p className="values-description text-center text-[#4D5053] dark:text-gray-300 max-w-2xl mx-auto mb-16">
          At Sharon Mann Design, our core values drive everything we do. From our design philosophy to client interactions, these principles guide our approach.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div 
              key={index}
              className="value-card bg-[#f9f6f2] dark:bg-gray-800 p-6 rounded-lg shadow-md transition-transform hover:translate-y-[-10px]"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-white dark:bg-gray-700 rounded-full mb-4">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold text-[#292F36] dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-[#4D5053] dark:text-gray-300">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;