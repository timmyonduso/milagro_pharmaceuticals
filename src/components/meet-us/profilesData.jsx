import { Sparkles, Feather } from "lucide-react";
import { meetBritanny, meetSharon } from "../../assets";

export const profiles = [
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