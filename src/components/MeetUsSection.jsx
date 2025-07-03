import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Sparkles, Feather, Play } from "lucide-react";
import GlowCard from "./GlowCard"; // Import the GlowCard component
import TitleHeader from "./TitleHeader"; // Import the TitleHeader component
import VideoModal from "../components/about-us/VideoModal"; // Import the VideoModal component
import FeatureVideoModal from "../components/about-us/FeatureVideoModal"; // Import the new FeatureVideoModal component
import VideoBadge from "../components/about-us/VideoBadge"; // Import the VideoBadge component
import { meetBritanny, meetSharon } from "../assets";

// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

const ProfileCard = ({ person, isLeft, index }) => {
  const [expanded, setExpanded] = useState(false);
  const [showStoryVideo, setShowStoryVideo] = useState(false);
  const [showFeatureVideo, setShowFeatureVideo] = useState(false);
  const bioRef = useRef(null);
  const cardRef = useRef(null);

  // Toggle bio expansion
  const toggleBio = () => {
    setExpanded(!expanded);

    if (!expanded) {
      gsap.to(bioRef.current, {
        height: "auto",
        duration: 0.5,
        ease: "power2.out"
      });
    } else {
      gsap.to(bioRef.current, {
        height: "0",
        duration: 0.5,
        ease: "power2.in"
      });
    }
  };

  // Open story video modal (triggered by VideoBadge)
  const openStoryVideo = () => {
    // Add a small bounce animation when opening the video
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1
    });
    
    // Show the video modal
    setShowStoryVideo(true);
  };

  // Close story video modal
  const closeStoryVideo = () => {
    setShowStoryVideo(false);
  };

  // Open feature video modal (triggered by Play button)
  const openFeatureVideo = () => {
    // Add a small bounce animation when opening the video
    gsap.to(cardRef.current, {
      scale: 1.02,
      duration: 0.2,
      ease: "back.out(2)",
      yoyo: true,
      repeat: 1
    });
    
    // Show the feature video modal
    setShowFeatureVideo(true);
  };

  // Close feature video modal
  const closeFeatureVideo = () => {
    setShowFeatureVideo(false);
  };

  // Create a card object to match the GlowCard component's expected props
  const cardData = {
    review: person.quote,
  };

  return (
    <>
      <div ref={cardRef}>
        <GlowCard 
          card={cardData}
          index={index}
          className={`profile-card min-h-[300px] ${isLeft ? "md:mr-4" : "md:ml-4"}`}
        >
          <div className="flex flex-col items-center md:items-start md:flex-row">
            {/* Profile Image with Video Badge */}
            <div className="relative mb-6 md:mb-0 md:mr-8">
              <div className="w-48 h-48 rounded-full overflow-hidden border-4 border-white/20">
                <img
                  src={person.image}
                  alt={person.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Video Badge - Only show if person has a story video */}
              {person.hasStoryVideo && person.storyVideoId && (
                <div className="absolute -bottom-2 -right-2">
                  <VideoBadge onClick={openStoryVideo} />
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start mb-2">
                {person.icon}
                <h3 className="text-2xl font-bold text-[#4D5053] dark:text-white ml-2">{person.name}</h3>
              </div>
              <h4 className="text-[#4D5053] dark:text-white text-lg mb-4">{person.title}</h4>
              
              {/* Feature video button - for bigger screens */}
              {person.hasFeatureVideo && person.featureVideoId && (
                <button 
                  onClick={openFeatureVideo}
                  className="inline-flex items-center bg-gradient-to-r from-yellow-400 to-amber-500 text-black px-4 py-2 rounded-md mb-4 hover:from-yellow-300 hover:to-amber-400 transition-all shadow-md group"
                >
                  <div className="relative">
                    <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  </div>
                  Play Video
                </button>
              )}
              
              {/* Read More Toggle */}
              <button
                onClick={toggleBio}
                className="text-[#4D5053] dark:text-white text-sm flex items-center transition-colors mb-4 font-bold"
              >
                {expanded ? "Read Less" : "Read More"}
                <span className={`ml-1 transition-transform ${expanded ? "rotate-180" : ""}`}>▾</span>
              </button>

              {/* Expandable Bio */}
              <div
                ref={bioRef}
                className="overflow-hidden h-0 text-white/80"
              >
                {person.bio.map((paragraph, idx) => (
                  <p key={idx} className="mb-3 text-[#4D5053] dark:text-white">{paragraph}</p>
                ))}
              </div>
            </div>
          </div>
        </GlowCard>
      </div>
      
      {/* Story Video Modal (accessed via VideoBadge) */}
      {person.hasStoryVideo && person.storyVideoId && (
        <VideoModal 
          videoId={person.storyVideoId} 
          isOpen={showStoryVideo} 
          onClose={closeStoryVideo} 
        />
      )}

      {/* Feature Video Modal (accessed via Play button) */}
      {person.hasFeatureVideo && person.featureVideoId && (
        <FeatureVideoModal 
          videoId={person.featureVideoId}
          videoTitle={person.featureVideoTitle}
          isOpen={showFeatureVideo} 
          onClose={closeFeatureVideo} 
        />
      )}
    </>
  );
};

const MeetUsSection = () => {
  const sectionRef = useRef(null);
  const sharonRef = useRef(null);
  const brittanyRef = useRef(null);

  // Updated profiles data with two videos each
  const profiles = [
    {
      name: "Sharon Mann",
      title: "Founder & Visionary Designer",
      quote: "Design is the art of enhancing life through space.",
      image: meetSharon,
      // Personal story video (accessed via VideoBadge)
      hasStoryVideo: true,
      storyVideoId: "vpZ_FgLT-Bg",
      // Feature design work video (accessed via Play Video button)
      hasFeatureVideo: true,
      featureVideoId: "5DSECg_azBU", // Example video ID - replace with actual video ID
      featureVideoTitle: "Design Philosophy & Work",
      icon: <Sparkles size={20} className="text-yellow-300" />,
      bio: [
        "For over 30 years, my love for flair and sophistication has fueled my journey in design. From special events and weddings to luxurious homes and commercial spaces, I've transformed environments across the country, driven by a deep-seated passion for bringing your vision to life.",
        "Leaving the corporate world behind, I embraced the limitless possibilities of design in 2007, establishing Sharon Mann Design. My constant pursuit of knowledge led me to delve into the intricacies of lighting, textiles, colors, and even construction, allowing me to offer a comprehensive design experience.",
        "Atlanta's rich culture serves as my muse, influencing my approach to residential and commercial projects, from historic districts to modern condos and serene suburbs. I've designed churches, restaurants, salons, and corporate offices, understanding that well-crafted spaces have the power to shape mood and ambiance."
      ]
    },
    {
      name: "Brittany Mann",
      title: "Co-Owner & Creative Design Specialist",
      quote: "Innovation meets tradition in every design journey.",
      image: meetBritanny,
      // Personal story video (accessed via VideoBadge)
      hasStoryVideo: true,
      storyVideoId: "Fw-ig5impIc",
      // Feature design work video (accessed via Play Video button)
      hasFeatureVideo: true,
      featureVideoId: "Fw-ig5impIc", // Example video ID - replace with actual video ID
      featureVideoTitle: "Creative Process & Projects",
      icon: <Feather size={20} className="text-yellow-300" />,
      bio: [
        "As Co-Owner and head of operations, I joined Sharon Mann Design in 2019, bringing my unique perspective to our family legacy. My path to design wasn't conventional—with a background in project management and corporate real estate, I made the bold decision to follow my passion for interior design.",
        "My creative journey extends beyond interiors to the fashion world with my online boutique, bfiercestyles.com. This dual passion for design enables me to bring a fresh perspective to every project we undertake.",
        "As one of the few women in construction, I defy stereotypes and blaze trails in a male-dominated industry. With a keen eye and heart full of passion, I craft magical events, fairy tale weddings, and bold holiday decor that captivate and enchant."
      ]
    }
  ];

  // Setup GSAP animations
  useGSAP(() => {
    // Section fade in
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5 }
    );

    // Sharon's card animation
    gsap.fromTo(
      sharonRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sharonRef.current,
          start: "top bottom-=100"
        }
      }
    );

    // Brittany's card animation
    gsap.fromTo(
      brittanyRef.current,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        delay: 0.3,
        scrollTrigger: {
          trigger: brittanyRef.current,
          start: "top bottom-=100"
        }
      }
    );
  }, []);

  return (
    <section
      id="meet-us"
      ref={sectionRef}
      className="w-full py-24 bg-gradient-to-b from-[#f9f6f2] to-[#f4f0ec] dark:bg-gradient-to-b dark:from-black dark:to-black text-[#4D5053] dark:text-white"
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <TitleHeader
          title="Meet the Visionaries"
          sub="💡 The Creative Force Behind Sharon Mann Design"
        />

        {/* Team Profile Section */}
        <div className="flex flex-col md:flex-row gap-8 md:gap-6">
          {/* Sharon's Profile */}
          <div ref={sharonRef} className="flex-1">
            <ProfileCard person={profiles[0]} isLeft={true} index={0} />
          </div>

          {/* Brittany's Profile */}
          <div ref={brittanyRef} className="flex-1">
            <ProfileCard person={profiles[1]} isLeft={false} index={1} />
          </div>
        </div>

        {/* Mother-Daughter Partnership Highlight */}
        <div className="mt-16 text-center">
          <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
            A Legacy of Design Excellence
          </h3>
          <p className="text-[#4D5053] dark:text-white/70 max-w-3xl mx-auto">
            Together, Sharon and Brittany Mann blend decades of experience with fresh perspective,
            creating a powerful design duo that honors tradition while embracing innovation. Their
            shared passion for exceptional design and attention to detail ensures that every project
            exceeds expectations.
          </p>
          
          {/* Meet team in video call to action */}
          <div className="mt-8">
            <p className="text-[#4D5053] dark:text-white/70 mb-4">
              Explore their videos to learn more about their personal journeys and see their stunning design work.
            </p>
            <div className="flex items-center justify-center space-x-4 mt-6">
              <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
              <div className="text-yellow-400">✦</div>
              <div className="w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetUsSection;