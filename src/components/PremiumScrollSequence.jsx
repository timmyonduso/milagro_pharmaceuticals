import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin with GSAP
gsap.registerPlugin(ScrollTrigger);

const PremiumScrollSequence = ({
  // Array of image paths for the sequence
  images = [],
  // Text overlay configuration
  overlayContent = {
    heading: "Experience Transformative Design",
    subheading: "Scroll to reveal our design process",
  },
  // Configuration options
  options = {
    pinDuration: 400, // Controls how long the animation plays (in % of viewport)
    scrubAmount: 0.5, // Controls smoothness of animation (lower = smoother)
    startOffset: 0, // Offset from the top to start the animation
    endOffset: 0, // Offset from the end to finish the animation
    fadeInDuration: 0.6, // Fade in animation duration in seconds
    textOpacity: 0.9, // Opacity of text overlay
  }
}) => {
  const sectionRef = useRef(null);
  const canvasRef = useRef(null);
  const textOverlayRef = useRef(null);
  const loaderRef = useRef(null);

  const [imagesLoaded, setImagesLoaded] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [isReady, setIsReady] = useState(false);
  const [currentFrame, setCurrentFrame] = useState(0);
  
  // Memoize the image array to prevent unnecessary re-renders
  const imageSequence = useMemo(() => images, [images]);
  
  // Calculate loading progress
  const loadingProgress = useMemo(() => {
    return totalImages ? Math.round((imagesLoaded / totalImages) * 100) : 0;
  }, [imagesLoaded, totalImages]);

  // Progressive image loading function
  useEffect(() => {
    if (!imageSequence.length) return;
    
    setTotalImages(imageSequence.length);
    const imageObjects = [];

    // Queue priority - load first, middle and last frames immediately, then the rest
    const priorityIndexes = [
      0, 
      Math.floor(imageSequence.length / 2), 
      imageSequence.length - 1
    ];
    
    // Creates a queue of images to load
    const queue = [...priorityIndexes];
    
    // Add remaining indexes to the queue
    for (let i = 0; i < imageSequence.length; i++) {
      if (!priorityIndexes.includes(i)) {
        queue.push(i);
      }
    }
    
    // Load images sequentially to not overwhelm the browser
    const loadNextImage = (index) => {
      if (index >= queue.length) {
        setIsReady(true);
        return;
      }
      
      const imgIndex = queue[index];
      const img = new Image();
      
      img.onload = () => {
        imageObjects[imgIndex] = img;
        setImagesLoaded(prev => prev + 1);
        
        // If this is a priority image, draw it immediately
        if (priorityIndexes.includes(imgIndex) && canvasRef.current) {
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d');
          
          if (imgIndex === 0) {
            drawImageToCanvas(ctx, img, canvas.width, canvas.height);
          }
        }
        
        // Load next image with a small delay
        setTimeout(() => loadNextImage(index + 1), 50);
      };
      
      img.onerror = () => {
        console.error(`Failed to load image at index ${imgIndex}`);
        setTimeout(() => loadNextImage(index + 1), 50);
      };
      
      img.src = imageSequence[imgIndex];
    };
    
    // Start loading priority images
    loadNextImage(0);
    
    // Cleanup
    return () => {
      imageObjects.forEach(img => {
        if (img) {
          img.onload = null;
          img.onerror = null;
        }
      });
    };
  }, [imageSequence]);
  
  // Helper function to draw an image to canvas with proper scaling
  const drawImageToCanvas = (ctx, img, canvasWidth, canvasHeight) => {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    
    // Calculate the scaling needed to cover the canvas while maintaining aspect ratio
    const imgRatio = img.width / img.height;
    const canvasRatio = canvasWidth / canvasHeight;
    
    let drawWidth, drawHeight, x, y;
    
    if (imgRatio > canvasRatio) {
      // Image is wider than canvas
      drawHeight = canvasHeight;
      drawWidth = canvasHeight * imgRatio;
      x = (canvasWidth - drawWidth) / 2;
      y = 0;
    } else {
      // Image is taller than canvas
      drawWidth = canvasWidth;
      drawHeight = canvasWidth / imgRatio;
      x = 0;
      y = (canvasHeight - drawHeight) / 2;
    }
    
    // Draw the image centered and covering the canvas
    ctx.drawImage(img, x, y, drawWidth, drawHeight);
    
    // Add a subtle vignette effect for a premium look
    const gradient = ctx.createRadialGradient(
      canvasWidth / 2,
      canvasHeight / 2,
      canvasHeight * 0.3,
      canvasWidth / 2,
      canvasHeight / 2,
      canvasWidth
    );
    gradient.addColorStop(0, 'rgba(0,0,0,0)');
    gradient.addColorStop(1, 'rgba(0,0,0,0.4)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);
  };
  
  // Set up the scroll-driven animation
  useEffect(() => {
    if (!isReady || !sectionRef.current || !canvasRef.current) return;
    
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set up high-resolution canvas
    const pixelRatio = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * pixelRatio;
    canvas.height = window.innerHeight * pixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    ctx.scale(pixelRatio, pixelRatio);
    
    // Load first image to canvas
    const firstImg = new Image();
    firstImg.onload = () => {
      drawImageToCanvas(ctx, firstImg, window.innerWidth, window.innerHeight);
      
      // Fade out the loader once the first image is drawn
      if (loaderRef.current) {
        gsap.to(loaderRef.current, {
          opacity: 0,
          duration: options.fadeInDuration,
          onComplete: () => {
            if (loaderRef.current) {
              loaderRef.current.style.display = 'none';
            }
          }
        });
      }
      
      // Fade in the canvas
      gsap.fromTo(canvas, 
        { opacity: 0 }, 
        { opacity: 1, duration: options.fadeInDuration }
      );
      
      // Fade in text overlay
      if (textOverlayRef.current) {
        gsap.fromTo(textOverlayRef.current.children, 
          { opacity: 0, y: 20 }, 
          { opacity: options.textOpacity, y: 0, stagger: 0.2, duration: options.fadeInDuration, delay: 0.3 }
        );
      }
    };
    firstImg.src = imageSequence[0];
    
    // Animation sequence object
    const sequence = {
      frame: 0
    };
    
    // Create the GSAP timeline with ScrollTrigger
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: `top+=${options.startOffset} top`,
        end: `+=${options.pinDuration}%+=${options.endOffset}`,
        pin: true,
        anticipatePin: 1,
        scrub: options.scrubAmount,
        onUpdate: (self) => {
          // Calculate current frame based on scroll progress
          const frameIndex = Math.min(
            Math.floor(self.progress * (imageSequence.length - 1)), 
            imageSequence.length - 1
          );
          
          // Only update if frame has changed
          if (frameIndex !== sequence.frame) {
            sequence.frame = frameIndex;
            setCurrentFrame(frameIndex);
            
            // Draw the new frame
            const newImg = new Image();
            newImg.onload = () => {
              drawImageToCanvas(ctx, newImg, window.innerWidth, window.innerHeight);
            };
            newImg.src = imageSequence[frameIndex];
          }
          
          // Update the text overlay opacity based on scroll progress
          if (textOverlayRef.current) {
            // Fade out text near the end of the sequence
            const textOpacity = self.progress > 0.8 
              ? options.textOpacity * (1 - ((self.progress - 0.8) * 5))
              : options.textOpacity;
            
            gsap.to(textOverlayRef.current, { 
              opacity: textOpacity,
              duration: 0.1
            });
          }
        }
      }
    });
    
    // Handle window resize
    const handleResize = () => {
      // Update canvas dimensions
      canvas.width = window.innerWidth * pixelRatio;
      canvas.height = window.innerHeight * pixelRatio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.scale(pixelRatio, pixelRatio);
      
      // Redraw current frame
      const currentImg = new Image();
      currentImg.onload = () => {
        drawImageToCanvas(ctx, currentImg, window.innerWidth, window.innerHeight);
      };
      currentImg.src = imageSequence[sequence.frame];
      
      // Update ScrollTrigger
      ScrollTrigger.refresh();
    };
    
    // Debounced resize handler
    let resizeTimeout;
    const debouncedResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(handleResize, 200);
    };
    
    window.addEventListener('resize', debouncedResize);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', debouncedResize);
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [isReady, imageSequence, options]);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative w-full h-screen overflow-hidden bg-black"
      aria-label="Design showcase animation"
    >
      {/* Loading indicator */}
      <div 
        ref={loaderRef}
        className="absolute inset-0 flex flex-col items-center justify-center bg-black z-50"
      >
        <div className="mb-6 text-white text-xl font-light">
          Creating your experience
        </div>
        
        {/* Progress bar */}
        <div className="w-56 h-1 bg-white/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white rounded-full transition-all duration-300 ease-out"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
        
        {/* Progress percentage */}
        <div className="mt-2 text-white/70 text-sm">
          {loadingProgress}%
        </div>
      </div>
      
      {/* Canvas for rendering the images */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 w-full h-full opacity-0"
      />
      
      {/* Text overlay */}
      <div 
        ref={textOverlayRef}
        className="absolute inset-0 flex flex-col items-center justify-center z-10 px-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 text-center max-w-3xl">
          {overlayContent.heading}
        </h2>
        <p className="text-lg md:text-xl text-white/80 max-w-xl text-center font-light">
          {overlayContent.subheading}
        </p>
      </div>
      
      {/* Scroll indicator - fades out after user starts scrolling */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce text-white/70">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
      
      {/* Development/debug info - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="absolute bottom-4 right-4 bg-black/50 text-white text-xs px-2 py-1 rounded">
          Frame: {currentFrame + 1}/{imageSequence.length}
        </div>
      )}
    </section>
  );
};

export default PremiumScrollSequence;