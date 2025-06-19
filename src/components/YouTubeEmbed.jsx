import React, { useState } from "react";
import YouTube from "react-youtube";
import { Play } from "lucide-react";

const YouTubeEmbed = ({ videoId = "Oflbho9ZG2U" }) => {
  const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const [thumbnailError, setThumbnailError] = useState(false);

  const thumbnail = thumbnailError
    ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
    : `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

  const options = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
      controls: 1,
      modestbranding: 1,
      rel: 0,
    },
  };

  const handleVideoEnd = () => {
    setIsPlayerVisible(false);
  };

  return (
      <div className="w-full h-[70vh] sm:h-[80vh] md:h-[70vh] lg:h-[72vh] flex justify-center items-center my-8">
        {!isPlayerVisible ? (
            <div
                className="relative w-full h-full cursor-pointer rounded-lg overflow-hidden shadow-lg"
                onClick={() => setIsPlayerVisible(true)}
            >
              <img
                  src={thumbnail}
                  alt="YouTube video thumbnail"
                  onError={() => setThumbnailError(true)}
                  className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <Play size={64} className="text-white" />
              </div>
            </div>
        ) : (
            <div className="w-full h-full">
              <YouTube
                  videoId={videoId}
                  className="w-full h-full"
                  opts={options}
                  onEnd={handleVideoEnd}
              />
            </div>
        )}
      </div>
  );
};

export default YouTubeEmbed;
