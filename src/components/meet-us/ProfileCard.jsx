import { useRef, useState } from "react";
import { gsap } from "gsap";
import ProfileImage from "./ProfileImage";
import ProfileContent from "./ProfileContent";
import VideoModals from "./VideoModals";
import GlowCard from "../GlowCard.jsx";

const ProfileCard = ({ person, isLeft, index }) => {
    const [showStoryVideo, setShowStoryVideo] = useState(false);
    const [showFeatureVideo, setShowFeatureVideo] = useState(false);
    const cardRef = useRef(null);

    // Animation helper function
    const animateCard = () => {
        gsap.to(cardRef.current, {
            scale: 1.02,
            duration: 0.2,
            ease: "back.out(2)",
            yoyo: true,
            repeat: 1
        });
    };

    // Story video handlers
    const openStoryVideo = () => {
        animateCard();
        setShowStoryVideo(true);
    };

    const closeStoryVideo = () => {
        setShowStoryVideo(false);
    };

    // Feature video handlers
    const openFeatureVideo = () => {
        animateCard();
        setShowFeatureVideo(true);
    };

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
                        <ProfileImage
                            person={person}
                            onStoryVideoClick={openStoryVideo}
                        />

                        <ProfileContent
                            person={person}
                            onFeatureVideoClick={openFeatureVideo}
                        />
                    </div>
                </GlowCard>
            </div>

            <VideoModals
                person={person}
                showStoryVideo={showStoryVideo}
                showFeatureVideo={showFeatureVideo}
                onCloseStoryVideo={closeStoryVideo}
                onCloseFeatureVideo={closeFeatureVideo}
            />
        </>
    );
};

export default ProfileCard;