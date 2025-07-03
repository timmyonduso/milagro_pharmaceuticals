import VideoBadge from "../../components/about-us/VideoBadge";

const ProfileImage = ({ person, onStoryVideoClick }) => {
    return (
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
                    <VideoBadge onClick={onStoryVideoClick} />
                </div>
            )}
        </div>
    );
};

export default ProfileImage;