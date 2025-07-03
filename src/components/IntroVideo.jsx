import { useState } from "react";
import CustomYouTubePlayer from "./about-us/CustomYouTubePlayer";
import TitleHeader from "./TitleHeader";

const IntroVideo = () => {
  const [showVideo, setShowVideo] = useState(false);
  // Replace with your actual YouTube video ID
  const videoId = "5DSECg_azBU";
  
  return (
    <section className="w-full bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
        <TitleHeader 
            sub="Welcome to Sharon Mann Design" 
            title="Our design philosophy and services"
          />
          <h2 className="text-3xl font-bold mb-4">Welcome to Sharon Mann Design</h2>
          {/* <p className="text-gray-600 max-w-2xl mx-auto">
            Watch our intro video to learn more about our design philosophy and services
          </p> */}
        </div>
        
        <div className="max-w-4xl mx-auto">
          {showVideo ? (
            <div className="relative w-full rounded-lg overflow-hidden shadow-xl" style={{ height: "500px" }}>
              <CustomYouTubePlayer
                videoId={videoId} 
                onClose={() => setShowVideo(false)} 
              />
            </div>
          ) : (
            <div 
              className="relative w-full rounded-lg overflow-hidden shadow-xl cursor-pointer group"
              style={{ 
                height: "500px",
                backgroundImage: `url(https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center"
              }}
              onClick={() => setShowVideo(true)}
            >
              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300">
                <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-10 w-10 text-white ml-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" 
                    />
                  </svg>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <h3 className="text-xl font-semibold">Our Design Journey</h3>
                <p>Click to watch our story</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default IntroVideo;