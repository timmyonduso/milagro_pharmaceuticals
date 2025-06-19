import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import CustomYouTubePlayer from "./CustomYouTubePlayer";

const FeatureVideoModal = ({ videoId, videoTitle, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  
  // Handle animations when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Animate overlay when opening
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out"
      });
      
      // Animate content with a slight delay for a cleaner entry
      gsap.fromTo(contentRef.current, 
        { scale: 0.95, opacity: 0 },
        { 
          scale: 1, 
          opacity: 1, 
          duration: 0.6, 
          ease: "back.out(1.4)",
          delay: 0.2
        }
      );
      
      // Animate title separately for a staggered effect
      gsap.fromTo(titleRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          ease: "power2.out",
          delay: 0.7
        }
      );
      
      // Prevent body scrolling
      document.body.style.overflow = 'hidden';
    } else {
      // Reset body scrolling when closed
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  // Close with animation
  const handleClose = () => {
    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in"
    });
    
    gsap.to(contentRef.current, {
      scale: 0.95,
      opacity: 0,
      duration: 0.4,
      ease: "power2.in"
    });
    
    gsap.to(titleRef.current, {
      y: -10,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      onComplete: onClose
    });
  };
  
  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };
    
    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);
  
  // Handle click outside modal to close
  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) {
      handleClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 opacity-0 backdrop-blur-sm" 
      onClick={handleOverlayClick}
    >
      <div 
        ref={contentRef}
        className="relative w-11/12 max-w-5xl h-full max-h-[80vh] bg-transparent rounded-lg shadow-2xl"
      >
        <button 
          className="absolute -top-12 right-0 p-2 text-white hover:text-yellow-300 transition-colors z-10 group"
          onClick={handleClose}
          aria-label="Close video"
        >
          <X size={28} className="group-hover:rotate-90 transition-transform duration-300" />
        </button>
        
        <div className="w-full h-full overflow-hidden rounded-lg relative">
          <CustomYouTubePlayer 
            videoId={videoId} 
            onClose={handleClose}
            autoplay={true}
          />
        </div>
        
        <div 
          ref={titleRef}
          className="absolute -bottom-12 left-0 right-0 text-center"
        >
          {/* <h3 className="text-xl md:text-2xl font-medium text-white">
            {videoTitle || "Featured Design Work"}
          </h3> */}
          
          <div className="flex items-center justify-center mt-3">
            <div className="w-8 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
            <div className="text-yellow-400 mx-2">⋆</div>
            <div className="w-8 h-1 bg-gradient-to-l from-yellow-400 to-transparent rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureVideoModal;