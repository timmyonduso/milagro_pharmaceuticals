import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Phone, ArrowRight } from "lucide-react";
import { livingroom1 } from "../assets";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const AboutUsSection = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  const phoneRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    // Section fade in
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Text animation
    gsap.fromTo(
      textRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: textRef.current,
          start: "top bottom-=100"
        }
      }
    );

    // Image animation
    gsap.fromTo(
      imageRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top bottom-=100"
        }
      }
    );

    // Phone and button animations
    const elements = [phoneRef.current, buttonRef.current];
    elements.forEach((el, index) => {
      gsap.fromTo(
        el,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.8 + (index * 0.2),
          scrollTrigger: {
            trigger: el,
            start: "top bottom-=50"
          }
        }
      );
    });
  });

  return (
    <section
      id="stylish-living"
      ref={sectionRef}
      className="w-full py-16 padding-x-lg bg-gradient-to-b from-[#f9f6f2] to-[#f4f0ec] dark:bg-gradient-to-b dark:from-black dark:to-black text-[#4D5053] dark:text-white"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
          {/* Text Content */}
          <div ref={textRef} className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 w-4/5 text-black dark:text-white">
              Where Timeless Elegance Meets Unbridled Creativity
            </h2>

            <p className="mb-8 w-11/12 text-[#4D5053] dark:text-white/70">
              At Sharon Mann Design, we don't just design interiors; we craft experiences. Our team melds
              sophisticated luxury with timeless elegance, creating environments that inspire, enchant, and delight.
              From opulent residences to prestigious commercial venues, we bring a touch of magic to every project.
            </p>

            {/* Call Us Section */}
            <div className="flex flex-col space-y-6 mb-8">
              <div ref={phoneRef} className="flex items-center">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-yellow-100 text-yellow-600 dark:bg-white/10 dark:text-yellow-300 mr-4">
                  <Phone size={20} />
                </div>
                <a href="tel:+1234567890" className="flex flex-col">
                  <span className="font-semibold text-black dark:text-white">
                    +1 (234) 567-890
                  </span>
                  <span className="text-sm text-[#4D5053] dark:text-white/60">
                    Call Us Anytime
                  </span>
                </a>
              </div>

              <div ref={buttonRef}>
                <a href="/contact">
                  <button className="flex items-center justify-center px-8 py-4 rounded-lg transition-colors
                                 bg-black text-white hover:bg-zinc-800
                                 dark:bg-white dark:text-black dark:hover:bg-white/90">
                    Get Free Estimate
                    <ArrowRight size={18} className="ml-2 text-[#C5A678]" />
                  </button>
                </a>
              </div>
            </div>
          </div>

          {/* Image */}
          <div ref={imageRef} className="w-full md:w-2/5 hp-img">
            <img
              src={livingroom1}
              alt="Modern Kitchen Interior Design"
              className="w-full h-auto object-contain"
              style={{
                borderTopRightRadius: "50%",
                borderBottomLeftRadius: "15%",
              }}
            />
          </div>
        </div>
      </div>
    </section>

  );
};

export default AboutUsSection;