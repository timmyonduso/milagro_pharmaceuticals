import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ScrollImageSequence = ({
  imageFolder = "/images/sequence/interior-",
  frameCount = 3,
  fileExtension = ".jpg",
  overlayContent = (
    <>
      <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center drop-shadow-md">
        Stunning Interior Transformations
      </h2>
      <p className="text-lg md:text-xl max-w-md text-center text-white/90 drop-shadow-sm">
        Scroll to explore our design process from concept to reality.
      </p>
    </>
  )
}) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);

  const imagePaths = Array.from({ length: frameCount }, (_, i) =>
    `${imageFolder}${String(i + 1).padStart(3, "0")}${fileExtension}`
  );

  useEffect(() => {
    let loadedCount = 0;
    const total = imagePaths.length;
    const images = [];

    imagePaths.forEach((src, i) => {
      const img = new Image();
      img.onload = () => {
        loadedCount++;
        if (loadedCount === total) setImagesLoaded(true);
      };
      img.src = src;
      images[i] = img;
    });

    return () => images.forEach(img => (img.onload = null));
  }, []);

  useEffect(() => {
    if (!imagesLoaded || !sectionRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const renderImage = (src) => {
      const img = new Image();
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width - img.width * scale) / 2;
        const y = (canvas.height - img.height * scale) / 2;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      };
      img.src = src;
    };

    updateCanvasSize();
    renderImage(imagePaths[0]);

    const sequence = { frame: 0 };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${frameCount * 100}%`,
        scrub: 0.5,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          const newFrame = Math.floor(self.progress * (frameCount - 1));
          if (newFrame !== sequence.frame) {
            sequence.frame = newFrame;
            setCurrentFrame(newFrame);
            renderImage(imagePaths[newFrame]);
          }
        }
      }
    });

    window.addEventListener("resize", () => {
      updateCanvasSize();
      renderImage(imagePaths[sequence.frame]);
    });

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [imagesLoaded]);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden bg-black"
    >
      {!imagesLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <span className="text-white text-xl animate-pulse">
            Loading your design experience...
          </span>
        </div>
      )}

      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-out ${
          imagesLoaded ? "opacity-100" : "opacity-0"
        }`}
      />

      {imagesLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10 pointer-events-none text-white">
          {overlayContent}
        </div>
      )}

      {/* Optional scroll cue */}
      {imagesLoaded && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 animate-bounce text-white opacity-80">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      )}
    </section>
  );
};

export default ScrollImageSequence;
