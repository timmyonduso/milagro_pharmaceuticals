import VideoModal from "../../components/about-us/VideoModal";
import FeatureVideoModal from "../about-us/FeatureVideoModal.jsx";

const VideoModals = ({
                         person,
                         showStoryVideo,
                         showFeatureVideo,
                         onCloseStoryVideo,
                         onCloseFeatureVideo
                     }) => {
    return (
        <>
            {/* Story Video Modal (accessed via VideoBadge) */}
            {person.hasStoryVideo && person.storyVideoId && (
                <VideoModal
                    videoId={person.storyVideoId}
                    isOpen={showStoryVideo}
                    onClose={onCloseStoryVideo}
                />
            )}

            {/* Feature Video Modal (accessed via Play button) */}
            {person.hasFeatureVideo && person.featureVideoId && (
                <FeatureVideoModal
                    videoId={person.featureVideoId}
                    videoTitle={person.featureVideoTitle}
                    isOpen={showFeatureVideo}
                    onClose={onCloseFeatureVideo}
                />
            )}
        </>
    );
};

export default VideoModals;