import { useRef, useEffect, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, X } from "lucide-react";
import YouTube from "react-youtube";
import { gsap } from "gsap";

const CustomYouTubePlayer = ({ videoId, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const playerRef = useRef(null);
  const progressInterval = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const controlsRef = useRef(null);
  
  // Show controls initially, hide after inactivity
  const [showControls, setShowControls] = useState(true);
  
  // YouTube API options
  const options = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 0, // Hide YouTube controls
      modestbranding: 1,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3, // Hide video annotations
      fs: 0, // Hide fullscreen button
      cc_load_policy: 0, // Hide closed captions by default
      disablekb: 1, // Disable keyboard controls
      origin: window.location.origin
    },
  };
  
  // Handle player ready event
  const handleReady = (event) => {
    playerRef.current = event.target;
    setDuration(playerRef.current.getDuration());
    setIsLoading(false);
    
    // Set up progress tracking
    progressInterval.current = setInterval(() => {
      if (playerRef.current && isPlaying) {
        const currentTime = playerRef.current.getCurrentTime();
        const duration = playerRef.current.getDuration();
        setCurrentTime(currentTime);
        setProgress((currentTime / duration) * 100);
      }
    }, 1000);
  };
  
  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (progressInterval.current) {
        clearInterval(progressInterval.current);
      }
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, []);
  
  // Handle play/pause
  const togglePlay = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pauseVideo();
      } else {
        playerRef.current.playVideo();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  // Handle mute/unmute
  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
      } else {
        playerRef.current.mute();
      }
      setIsMuted(!isMuted);
    }
  };
  
  // Handle player state changes
  const handleStateChange = (event) => {
    // YouTube state: -1 (unstarted), 0 (ended), 1 (playing), 2 (paused), 3 (buffering)
    if (event.data === YouTube.PlayerState.PLAYING) {
      setIsPlaying(true);
    } else if (event.data === YouTube.PlayerState.PAUSED) {
      setIsPlaying(false);
    } else if (event.data === YouTube.PlayerState.ENDED) {
      setIsPlaying(false);
      onClose();
    }
  };
  
  // Format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // Handle progress bar click to seek
  const handleProgressClick = (e) => {
    if (!playerRef.current) return;
    
    const progressBar = e.currentTarget;
    const clickPosition = e.nativeEvent.offsetX;
    const progressBarWidth = progressBar.offsetWidth;
    const seekTo = (clickPosition / progressBarWidth) * duration;
    
    playerRef.current.seekTo(seekTo);
    setProgress((clickPosition / progressBarWidth) * 100);
  };
  
  // Handle mouse movement to show controls
  const handleMouseMove = () => {
    setShowControls(true);
    
    // Clear existing timeout
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // Set new timeout to hide controls after 3 seconds of inactivity
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };
  
  // Fullscreen function (using browser API)
  const toggleFullscreen = () => {
    const container = document.querySelector('.video-player-container');
    
    if (!document.fullscreenElement) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      } else if (container.webkitRequestFullscreen) {
        container.webkitRequestFullscreen();
      } else if (container.msRequestFullscreen) {
        container.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
  };
  
  // Animate controls in/out
  useEffect(() => {
    if (showControls) {
      gsap.to(controlsRef.current, {
        opacity: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(controlsRef.current, {
        opacity: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [showControls]);
  
  return (
    <div 
      className="video-player-container relative w-full h-full overflow-hidden"
      onMouseMove={handleMouseMove}
      onTouchStart={handleMouseMove}
    >
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
          <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* YouTube Player (hidden controls) */}
      <YouTube
        videoId={videoId}
        opts={options}
        className="w-full h-full"
        onReady={handleReady}
        onStateChange={handleStateChange}
        onError={() => setIsLoading(false)}
      />
      
      {/* Custom Controls */}
      <div 
        ref={controlsRef}
        className={`absolute inset-0 flex flex-col justify-between z-10 pointer-events-none ${showControls ? 'opacity-100' : 'opacity-0'}`}
      >
        {/* Top controls (close button) */}
        <div className="flex justify-end p-4 pointer-events-auto">
          <button 
            onClick={onClose}
            className="text-white hover:text-yellow-300 transition-colors p-1 rounded-full bg-black/30 hover:bg-black/50"
          >
            <X size={20} />
          </button>
        </div>
        
        {/* Bottom controls (progress, play/pause, etc) */}
        <div className="p-2 bg-gradient-to-t from-black/70 to-transparent pointer-events-auto">
          {/* Progress bar */}
          <div 
            className="w-full h-2 bg-white/30 rounded-full cursor-pointer mb-3 relative"
            onClick={handleProgressClick}
          >
            <div 
              className="absolute top-0 left-0 h-full bg-yellow-400 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Controls row */}
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center space-x-4">
              {/* Play/Pause button */}
              <button 
                onClick={togglePlay}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              {/* Volume button */}
              <button 
                onClick={toggleMute}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              
              {/* Time display */}
              <div className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </div>
            </div>
            
            {/* Right controls */}
            <div>
              {/* Fullscreen button */}
              <button 
                onClick={toggleFullscreen}
                className="text-white hover:text-yellow-300 transition-colors"
              >
                <Maximize size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomYouTubePlayer;