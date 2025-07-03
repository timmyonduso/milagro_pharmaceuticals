import { useRef, useEffect } from "react";
import { Lightbulb, User, CheckCircle, Clock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const CoreValues = () => {
  const valuesRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== "undefined" && valuesRef.current) {
      gsap.fromTo(
        valuesRef.current.querySelectorAll('.value-card'),
        { opacity: 0, y: 50 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: valuesRef.current,
            start: "top 75%",
          }
        }
      );
    }
  }, []);
  
  const values = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Creativity",
      description: "We approach each project with fresh eyes and boundless imagination, pushing the boundaries of design."
    },
    {
      icon: <User className="w-8 h-8" />,
      title: "Collaboration",
      description: "We foster a collaborative environment, working closely with our clients to understand their vision."
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Commitment",
      description: "We are dedicated to exceeding expectations at every step, ensuring meticulous attention to detail."
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Timeless Elegance",
      description: "We believe in creating spaces that transcend fleeting trends, crafting designs that are enduringly beautiful."
    }
  ];
  
  return (
    <section ref={valuesRef} className="py-16 bg-[#000000] text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h4 className="text-[#C5A678] font-semibold mb-2">OUR GUIDING PRINCIPLES</h4>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Core Values That Define Us</h2>
          <p className="text-[#FFFFFFB3]">
            Our core values are the foundation of our design philosophy, guiding every decision
            we make and every space we create.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value, index) => (
            <div key={index} className="value-card bg-[#1F1F1F] rounded-xl p-8 hover:bg-[#0F0F0F] transition-all">
              <div className="w-16 h-16 rounded-full bg-[#C5A678] flex items-center justify-center mb-6 mx-auto">
                {value.icon}
              </div>
              <h3 className="text-xl font-bold mb-4 text-center text-white">{value.title}</h3>
              <p className="text-[#FFFFFFB3] text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;