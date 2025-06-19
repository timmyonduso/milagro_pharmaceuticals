import { useRef, useEffect } from "react";
import { Lightbulb, Heart, User, Award, CheckCircle } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { vision1, vision2, vision3 } from "../../assets";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const VisionMission = () => {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  
  useEffect(() => {
    // Animation for vision section
    if (typeof window !== "undefined" && visionRef.current) {
      gsap.fromTo(
        visionRef.current.querySelectorAll('.animate-fade'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: visionRef.current,
            start: "top 80%",
          }
        }
      );
    }
    
    // Animation for mission section
    if (typeof window !== "undefined" && missionRef.current) {
      gsap.fromTo(
        missionRef.current.querySelectorAll('.animate-mission'),
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: missionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, []);
  
  return (
    <>
      {/* Vision Section */}
      <section ref={visionRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h4 className="text-[#C5A678] font-semibold mb-2 animate-fade">OUR VISION</h4>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4D5053] animate-fade">A Vision of Inspiration</h2>
            <p className="text-[#4D5053] animate-fade">
              To become a globally recognized design force, leaving an enduring legacy of inspiring spaces 
              crafted with passion, diversity, and unwavering quality.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            <div className="bg-[#F4F0EC] p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade">
              <div className="w-12 h-12 bg-[#C5A678]/20 rounded-full flex items-center justify-center mb-4">
                <Lightbulb className="text-[#C5A678] w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#4D5053]">Global Influence</h3>
              <p className="text-[#839CB5]">A world where design transcends borders, fostering connections and igniting creativity across cultures.</p>
            </div>
            
            <div className="bg-[#F4F0EC] p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade">
              <div className="w-12 h-12 bg-[#C5A678]/20 rounded-full flex items-center justify-center mb-4">
                <Heart className="text-[#C5A678] w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#4D5053]">Personalized Spaces</h3>
              <p className="text-[#839CB5]">Spaces that not only inspire awe but also resonate with individuals, reflecting their unique stories.</p>
            </div>
            
            <div className="bg-[#F4F0EC] p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade">
              <div className="w-12 h-12 bg-[#C5A678]/20 rounded-full flex items-center justify-center mb-4">
                <User className="text-[#C5A678] w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#4D5053]">Collaborative Excellence</h3>
              <p className="text-[#839CB5]">A collaborative environment where diverse perspectives merge to push the boundaries of design excellence.</p>
            </div>
            
            <div className="bg-[#F4F0EC] p-6 rounded-xl shadow-md hover:shadow-lg transition-all animate-fade">
              <div className="w-12 h-12 bg-[#C5A678]/20 rounded-full flex items-center justify-center mb-4">
                <Award className="text-[#C5A678] w-6 h-6" />
              </div>
              <h3 className="font-bold text-lg mb-3 text-[#4D5053]">Uncompromising Quality</h3>
              <p className="text-[#839CB5]">Uncompromising quality in every detail, setting the benchmark for exceptional craftsmanship.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Mission Section */}
      <section ref={missionRef} className="py-16 bg-[#F4F0EC]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="w-full md:w-1/2">
              <h4 className="text-[#C5A678] font-semibold mb-2 animate-mission">OUR MISSION</h4>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#4D5053] animate-mission">Transforming Ordinary Spaces into Extraordinary Experiences</h2>
              
              <p className="text-[#4D5053] mb-6 animate-mission">
                At Sharon Mann Design, we are dedicated to transforming ordinary spaces into extraordinary experiences. 
                We believe that your environment has the power to shape your life, and we are passionate about creating 
                luxurious, functional, and unforgettable spaces that reflect your unique individuality and enhance your daily living.
              </p>
              
              <ul className="space-y-4">
                <li className="flex items-start animate-mission">
                  <CheckCircle className="text-[#C5A678] w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-[#4D5053]">We approach each project with fresh eyes and boundless imagination, 
                  pushing the boundaries of design to create spaces that inspire and captivate.</p>
                </li>
                
                <li className="flex items-start animate-mission">
                  <CheckCircle className="text-[#C5A678] w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-[#4D5053]">We foster a collaborative environment, working closely with our clients 
                  to understand their vision, desires, and lifestyle.</p>
                </li>
                
                <li className="flex items-start animate-mission">
                  <CheckCircle className="text-[#C5A678] w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-[#4D5053]">We are dedicated to exceeding expectations at every step, ensuring meticulous 
                  attention to detail and exceptional craftsmanship.</p>
                </li>
                
                <li className="flex items-start animate-mission">
                  <CheckCircle className="text-[#C5A678] w-5 h-5 mt-1 mr-2 flex-shrink-0" />
                  <p className="text-[#4D5053]">We believe in creating spaces that transcend fleeting trends, 
                  crafting designs that are both visually stunning and enduringly beautiful.</p>
                </li>
              </ul>
            </div>
            
            <div className="w-full md:w-1/2 grid grid-cols-2 gap-4 animate-mission">
              <div className="rounded-xl overflow-hidden h-full">
                <img src={vision2} alt="Interior Design" className="w-full h-full object-cover" />
              </div>
              <div className="grid grid-rows-2 gap-4">
                <div className="rounded-xl overflow-hidden">
                  <img src={vision1} alt="Interior Detail" className="w-full h-full object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden">
                  <img src={vision3} alt="Luxury Space" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default VisionMission;