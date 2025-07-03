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
  const [isPaused, setIsPaused] = useState(false);

  const totalImages = 3;
  const nextImgRef = useRef(null);
  const intervalRef = useRef(null);

  // Define content for each image with gold accents
  const contentData = {
    1: {
      title: "redefi<b class=\"text-yellow-400\">n</b>e",
      subtitle: "Experience science-backed wellness",
      description: "Unleash your vitality through innovation",
      primaryButton: "Explore Products",
      secondaryButton: "Book Appointment",
      trustIndicators: [
        { colorClass: "bg-emerald-400", text: "Science-Backed" },
        { colorClass: "bg-yellow-400", text: "Non-Invasive" },
        { colorClass: "bg-emerald-400", text: "Proven Results" }
      ],
      bottomTitle: "WELL<b class=\"text-yellow-500\">N</b>ESS",
      theme: "wellness"
    },
    2: {
      title: "transfo<b class=\"text-yellow-400\">r</b>m",
      subtitle: "Unlock your mental potential",
      description: "Advanced therapy solutions for modern minds",
      primaryButton: "View Therapies",
      secondaryButton: "Schedule Session",
      trustIndicators: [
        { colorClass: "bg-purple-400", text: "Expert-Led" },
        { colorClass: "bg-yellow-400", text: "Personalized" },
        { colorClass: "bg-purple-400", text: "Confidential" }
      ],
      bottomTitle: "THER<b class=\"text-yellow-500\">A</b>PY",
      theme: "therapy"
    },
    3: {
      title: "revita<b class=\"text-yellow-400\">l</b>ize",
      subtitle: "Regenerate your body naturally",
      description: "Cutting-edge treatments for optimal health",
      primaryButton: "Discover Treatments",
      secondaryButton: "Get Consultation",
      trustIndicators: [
        { colorClass: "bg-orange-400", text: "FDA-Approved" },
        { colorClass: "bg-yellow-400", text: "Innovative" },
        { colorClass: "bg-orange-400", text: "Safe & Effective" }
      ],
      bottomTitle: "REGEN<b class=\"text-yellow-500\">E</b>RATE",
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

  // Auto-cycle images every 5 seconds
  useEffect(() => {
    if (!loading && !isPaused) {
      intervalRef.current = setInterval(() => {
        setHasClicked(true);
        setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);
      }, 5000);

      return () => {
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
      };
    }
  }, [loading, isPaused]);

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const handleMiniImgClick = () => {
    // Clear the auto-cycle interval temporarily when user clicks
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);

    // Restart auto-cycle after 10 seconds of user interaction
    setTimeout(() => {
      if (!isPaused) {
        intervalRef.current = setInterval(() => {
          setHasClicked(true);
          setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);
        }, 5000);
      }
    }, 10000);
  };

  // Function to pause/resume auto-cycling
  const toggleAutoCycle = () => {
    setIsPaused(!isPaused);
    if (!isPaused && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
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

  return (
      <div className="relative min-h-screen w-screen overflow-x-hidden">
        {loading && (
            <div className="flex-center absolute z-[100] h-dvh w-screen overflow-hidden bg-gradient-to-br from-blue-50 via-yellow-50 to-green-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
              <div className="three-body">
                <div className="three-body__dot bg-blue-600"></div>
                <div className="three-body__dot bg-yellow-500"></div>
                <div className="three-body__dot bg-emerald-600"></div>
              </div>
            </div>
        )}

        <div
            id="image-frame"
            className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-gradient-to-br from-blue-50 via-yellow-50 to-emerald-50 dark:from-slate-800 dark:via-amber-900/20 dark:to-slate-900"
        >
          <div>
            {/* Interactive preview image with gold border */}
            <div className="mask-clip-path absolute-center absolute z-50 size-64 cursor-pointer overflow-hidden rounded-lg shadow-2xl ring-4 ring-yellow-400/30">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-yellow-900/10 to-transparent rounded-lg"></div>
                  <div className="absolute bottom-4 left-4 text-yellow-100 text-sm font-medium bg-black/40 px-2 py-1 rounded-md backdrop-blur-sm">
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

            {/* Enhanced overlay gradient with gold tint */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-yellow-900/10 to-black/40"></div>
          </div>

          {/* Auto-cycle control button with gold hover */}
          <button
              onClick={toggleAutoCycle}
              className="absolute top-6 right-6 z-50 bg-black/40 hover:bg-yellow-600/80 text-white hover:text-slate-900 p-3 rounded-full transition-all duration-300 backdrop-blur-sm hover:shadow-lg hover:shadow-yellow-400/20"
              title={isPaused ? "Resume auto-cycle" : "Pause auto-cycle"}
          >
            {isPaused ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
            ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>
                </svg>
            )}
          </button>

          {/* Progress indicators with gold active state */}
          <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-50 flex gap-2">
            {[1, 2, 3].map((index) => (
                <div
                    key={index}
                    className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentIndex === index
                            ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 w-8 shadow-lg shadow-yellow-400/30'
                            : 'bg-white/40 hover:bg-yellow-300/60 w-2'
                    }`}
                    onClick={() => {
                      if (intervalRef.current) {
                        clearInterval(intervalRef.current);
                      }
                      setHasClicked(true);
                      setCurrentIndex(index);
                      // Restart auto-cycle after manual selection
                      setTimeout(() => {
                        if (!isPaused) {
                          intervalRef.current = setInterval(() => {
                            setHasClicked(true);
                            setCurrentIndex((prevIndex) => (prevIndex % 3) + 1);
                          }, 5000);
                        }
                      }, 10000);
                    }}
                />
            ))}
          </div>

          {/* Bottom right title with gold accent and shadow */}
          <h1
              className="special-font hero-heading absolute bottom-5 right-5 z-40 text-white text-6xl font-bold drop-shadow-2xl"
              style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.8), 0 0 20px rgba(255,212,0,0.3)' }}
              dangerouslySetInnerHTML={{ __html: currentContent.bottomTitle }}
          />

          {/* Main content */}
          <div className="absolute left-0 top-0 z-40 size-full pt-[100px] md:pt-[80px]">
            <div className="mt-24 px-5 sm:px-10 hero-content">
              <h1
                  className="special-font hero-heading text-white text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl"
                  style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.8), 0 0 30px rgba(255,212,0,0.2)' }}
                  dangerouslySetInnerHTML={{ __html: currentContent.title }}
              />

              <p className="mb-8 max-w-md font-light text-white/95 text-lg leading-relaxed drop-shadow-lg">
                {currentContent.subtitle} <br />
                <span className="text-yellow-200">{currentContent.description}</span>
              </p>

              {/* Enhanced CTA Buttons with gold gradients */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                    onClick={() => {
                      const productsSection = document.getElementById('products');
                      if (productsSection) {
                        productsSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="group cursor-pointer relative px-8 py-4 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 text-slate-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/30 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                >
                <span className="relative z-10 flex items-center gap-2 text-white">
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
                    className="group cursor-pointer relative px-8 py-4 bg-transparent border-2 border-yellow-400 hover:bg-yellow-400 text-yellow-400 hover:text-slate-900 font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-yellow-400/20 focus:outline-none focus:ring-4 focus:ring-yellow-300/50"
                >
                  <span className="relative z-10 text-white">{currentContent.secondaryButton}</span>
                </button>
              </div>

              {/* Trust indicators with gold accents */}
              <div className="mt-12 flex flex-wrap gap-6 text-white/90">
                {currentContent.trustIndicators.map((indicator, index) => (
                    <div key={index} className="flex items-center gap-2 bg-black/20 px-3 py-2 rounded-full backdrop-blur-sm">
                      <div className={`w-2 h-2 ${indicator.colorClass} rounded-full shadow-sm`}></div>
                      <span className="text-sm font-medium">{indicator.text}</span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced scroll indicator with gold accent */}
        <a href="#mission">
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-50 cursor-pointer group">
            <div className="w-6 h-10 border-2 border-yellow-400/80 rounded-full p-1 group-hover:border-yellow-300 transition-colors duration-300 group-hover:shadow-lg group-hover:shadow-yellow-400/20">
              <div className="w-1 h-3 bg-yellow-400/80 rounded-full mx-auto animate-pulse group-hover:bg-yellow-300"></div>
            </div>
          </div>
        </a>

      </div>
  );
};

export default Hero;