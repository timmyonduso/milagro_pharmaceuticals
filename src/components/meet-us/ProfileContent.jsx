import { Play } from "lucide-react";
import ExpandableBio from "./ExpandableBio";

const ProfileContent = ({ person, onFeatureVideoClick }) => {
    return (
        <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start mb-2">
                {person.icon}
                <h3 className="text-2xl font-bold text-[#4D5053] dark:text-white ml-2">{person.name}</h3>
            </div>
            <h4 className="text-[#4D5053] dark:text-white text-lg mb-4">{person.title}</h4>

            {/* Feature video button - for bigger screens */}
            {person.hasFeatureVideo && person.featureVideoId && (
                <button
                    onClick={onFeatureVideoClick}
                    className="inline-flex items-center bg-gradient-to-r from-zinc-200 to-neutral-400 text-black px-4 py-2 rounded-md mb-4 hover:from-zinc-100 hover:to-neutral-300 transition-all shadow-md group"
                >
                    <div className="relative">
                        <Play size={16} className="mr-2 group-hover:scale-110 transition-transform" />
                        <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    </div>
                    Play Video
                </button>
            )}

            <ExpandableBio bio={person.bio} />
        </div>
    );
};

export default ProfileContent;