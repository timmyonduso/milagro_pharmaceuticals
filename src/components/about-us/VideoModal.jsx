import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { X } from "lucide-react";
import CustomYouTubePlayer from "./CustomYouTubePlayer";

const VideoModal = ({ videoId, isOpen, onClose }) => {
  const modalRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  
  // Handle animations when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      // Animate overlay and content when opening
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
      
      gsap.fromTo(contentRef.current, 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 0.5, 
          ease: "back.out(1.2)",
          delay: 0.1
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
      y: 30,
      opacity: 0,
      duration: 0.4,
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 opacity-0" 
      onClick={handleOverlayClick}
    >
      <div 
        ref={contentRef}
        className="relative w-11/12 max-w-4xl aspect-video bg-white dark:bg-gray-900 rounded-lg shadow-xl"
      >
        <button 
          className="absolute -top-12 right-0 p-2 text-white hover:text-yellow-300 transition-colors z-10"
          onClick={handleClose}
        >
          <X size={24} />
        </button>
        
        <div className="w-full h-full overflow-hidden rounded-lg relative">
          <CustomYouTubePlayer 
            videoId={videoId} 
            onClose={handleClose} 
          />
        </div>
      </div>
    </div>
  );
};

export default VideoModal;