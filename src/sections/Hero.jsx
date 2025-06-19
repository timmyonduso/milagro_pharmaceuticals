import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadedImages, setLoadedImages] = useState(0);

  const totalImages = 3;
  const nextImgRef = useRef(null);

  // Define content for each image
  const contentData = {
    1: {
      title: "redefi<b class=\"text-blue-400\">n</b>e",
      subtitle: "Experience science-backed wellness",
      description: "Unleash your vitality through innovation",
      primaryButton: "Explore Products",
      secondaryButton: "Book Appointment",
      trustIndicators: [
        { color: "green-400", text: "Science-Backed" },
        { color: "blue-400", text: "Non-Invasive" },
        { color: "green-400", text: "Proven Results" }
      ],
      bottomTitle: "WELL<b class=\"text-green-600\">N</b>ESS",
      theme: "wellness"
    },
    2: {
      title: "transfo<b class=\"text-blue-400\">r</b>m",
      subtitle: "Unlock your mental potential",
      description: "Advanced therapy solutions for modern minds",
      primaryButton: "View Therapies",
      secondaryButton: "Schedule Session",
      trustIndicators: [
        { color: "purple-400", text: "Expert-Led" },
        { color: "pink-400", text: "Personalized" },
        { color: "purple-400", text: "Confidential" }
      ],
      bottomTitle: "THER<b class=\"text-green-600\">A</b>PY",
      theme: "therapy"
    },
    3: {
      title: "revita<b class=\"text-blue-400\">l</b>ize",
      subtitle: "Regenerate your body naturally",
      description: "Cutting-edge treatments for optimal health",
      primaryButton: "Discover Treatments",
      secondaryButton: "Get Consultation",
      trustIndicators: [
        { color: "orange-400", text: "FDA-Approved" },
        { color: "red-400", text: "Innovative" },
        { color: "orange-400", text: "Safe & Effective" }
      ],
      bottomTitle: "REGEN<b class=\"text-green-600\">E</b>RATE",
      theme: "regeneration"
    }
  };

  const handleImageLoad = () => {
    setLoadedImages((prev) => prev + 1);
  };

  useEffect(() => {
    if (loadedImages === totalImages) {
      setLoading(false);
    }
  }, [loadedImages]);

  const handleMiniImgClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);
  };

  useGSAP(
      () => {
        if (hasClicked) {
          gsap.set("#next-image", { visibility: "visible" });
          gsap.to("#next-image", {
            transformOrigin: "center center",
            scale: 1,
            width: "100%",
            height: "100%",
            duration: 1,
            ease: "power1.inOut",
          });
          gsap.from("#current-image", {
            transformOrigin: "center center",
            scale: 0,
            duration: 1.5,
            ease: "power1.inOut",
          });

          // Animate content change
          gsap.fromTo(".hero-content",
              { opacity: 0, y: 30 },
              { opacity: 1, y: 0, duration: 0.8, delay: 0.3, ease: "power2.out" }
          );
        }
      },
      {
        dependencies: [currentIndex],
        revertOnUpdate: true,
      }
  );

  useGSAP(() => {
    gsap.set("#image-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#image-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#image-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  // Get current content based on index
  const getCurrentContent = () => {
    const validIndex = currentIndex > 3 ? 1 : currentIndex;
    return contentData[validIndex] || contentData[1];
  };

  const currentContent = getCurrentContent();

  // You'll need to replace these with your actual image paths
  const getImageSrc = (index) => {
    const images = [
      "/images/newHero.avif",
      "/images/newHero4.jpg",
      "/images/newHero5.jpg",
    ];
    return images[index - 1] || images[0];
  };

  const handlePrimaryAction = () => {
    // Different actions based on current content
    switch (currentContent.theme) {
      case 'wellness':
        { const productsSection = document.getElementById('products');
        if (productsSection) {
          productsSection.scrollIntoView({ behavior: 'smooth' });
        }
        break; }
      case 'therapy':
        { const therapiesSection = document.getElementById('therapies');
        if (therapiesSection) {
          therapiesSection.scrollIntoView({ behavior: 'smooth' });
        }
        break; }
      case 'regeneration':
        { const treatmentsSection = document.getElementById('treatments');
        if (treatmentsSection) {
          treatmentsSection.scrollIntoView({ behavior: 'smooth' });
        }
        break; }
      default:
        console.log('Primary action clicked');
    }
  };

  const handleSecondaryAction = () => {
    // Different actions based on current content
    switch (currentContent.theme) {
      case 'wellness':
        window.open('#book-appointment', '_self');
        break;
      case 'therapy':
        window.open('#schedule-session', '_self');
        break;
      case 'regeneration':
        window.open('#get-consultation', '_self');
        break;
      default:
        console.log('Secondary action clicked');
    }
  };

  return (
      <div className="relative h-dvh w-screen overflow-x-hidden">
        {loading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-blue-50 dark:bg-slate-900">
              <div className="three-body">
                <div className="three-body__dot bg-blue-600"></div>
                <div className="three-body__dot bg-green-600"></div>
                <div className="three-body__dot bg-blue-500"></div>
              </div>
            </div>
        )}

        <div
            id="image-frame"
            className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-900"
        >
          <div>
            {/* Interactive preview image */}
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl">
              <div className="relative group">
                <div
                    onClick={handleMiniImgClick}
                    className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in group-hover:scale-100 group-hover:opacity-100"
                >
                  <img
                      src={getImageSrc((currentIndex % 3) + 1)}
                      alt="Preview"
                      id="current-image"
                      className="size-64 origin-center scale-150 object-cover object-center rounded-lg"
                      onLoad={handleImageLoad}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
                    Click to explore
                  </div>
                </div>
              </div>
            </div>

            {/* Next image for transition */}
            <img
                ref={nextImgRef}
                src={getImageSrc(currentIndex)}
                alt="Transition"
                id="next-image"
                className="absolute-center invisible absolute z-20 size-64 object-cover object-center rounded-lg"
                onLoad={handleImageLoad}
            />

            {/* Main background image */}
            <img
                src={getImageSrc(currentIndex)}
                alt="Background"
                className="absolute left-0 top-0 size-full object-cover object-center"
                onLoad={handleImageLoad}
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30"></div>
          </div>

          {/* Bottom right title */}
          <h1
              className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white text-6xl font-bold"
              dangerouslySetInnerHTML={{ __html: currentContent.bottomTitle }}
          />

          {/* Main content */}
          <div className="absolute left-0 top-0 z-40 size-full pt-[100px] md:pt-[80px]">
            <div className="mt-24 px-5 sm:px-10 hero-content">
              <h1
                  className="special-font hero-heading text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
                  dangerouslySetInnerHTML={{ __html: currentContent.title }}
              />

              <p className="mb-8 max-w-md font-light text-white/90 text-lg leading-relaxed">
                {currentContent.subtitle} <br />
                {currentContent.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => {
                      const productsSection = document.getElementById('products');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group cursor-pointer relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300/50"
                >
                <span className="relative z-10 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                  {currentContent.primaryButton}
                </span>
                </button>

                <button
                    onClick={() => {
                      const contactSection = document.getElementById('contact');
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group cursor-pointer relative px-8 py-4 bg-transparent border-2 border-green-400 hover:bg-green-400 text-green-400 hover:text-slate-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300/50"
                >
                  <span className="relative z-10">{currentContent.secondaryButton}</span>
                </button>
              </div>

              {/* Trust indicators */}
              <div className="mt-12 flex flex-wrap gap-6 text-white/80">
                {currentContent.trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 bg-${indicator.color} rounded-full`}></div>
                      <span className="text-sm">{indicator.text}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <a href="#mission">
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50 cursor-pointer">
            <div className="w-6 h-10 border-2 border-white/60 rounded-full p-1">
              <div className="w-1 h-3 bg-white/60 rounded-full mx-auto animate-pulse"></div>
            </div>
          </div>
        </a>

      </div>
  );
};

export default Hero;