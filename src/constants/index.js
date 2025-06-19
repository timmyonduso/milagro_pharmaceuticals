import {
  client3,
  client1,
  client2,
  client5,
  client4,
  client6,
  logo,
  insta,
  fb,
  youtube,
  pintrest,
  warmth,
  luxury,
  calm,
  depth,
  experience4,
  experience3,
  experience2,
  experience1, aboutBg, aboutBg2, aboutBg3, hero1, hero2, hero3, galleryBg, galleryBg2, galleryBg3
} from "../assets";

const navLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Products",
    link: "/products",
  },
  {
    name: "Clinics",
    link: "/clinics",
  },
  {
    name: "Foundation",
    link: "/foundation",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

const words = [
  { text: "Warmth", imgPath: warmth },
  { text: "Luxury", imgPath: luxury },
  { text: "Calm", imgPath: calm },
  { text: "Depth", imgPath: depth },
  { text: "Warmth", imgPath: warmth },
  { text: "Luxury", imgPath: luxury },
  { text: "Calm", imgPath: calm },
  { text: "Depth", imgPath: depth },
];

export const features = [
  {
    id: "0",
    icon: "/images/feature-1.png",
    caption: "Easy integration",
    title: "Work smarter not harder",
    text: "With Xora, tedious tasks are history. Automation and smart processes bring your productivity to new heights. It's like having an extra cup of coffee, but without the jitters.",
    button: {
      icon: "/images/magictouch.svg",
      title: "Watch the demo",
    },
  },
  {
    id: "1",
    icon: "/images/feature-2.png",
    caption: "Secure & trustworthy",
    title: "Sleep easy, we got your back",
    text: "Your data security is our priority. With state-of-the-art encryption and robust privacy controls, Xora helps keeps your information secure and locked up tighter than Fort Knox.",
    button: {
      icon: "/images/docs.svg",
      title: "Read the docs",
    },
  },
];

export const details = [
  {
    id: "0",
    icon: "/images/detail-1.png",
    title: "AI automated video editing",
  },
  {
    id: "1",
    icon: "/images/detail-2.png",
    title: "Collaborate with your team",
  },
  {
    id: "2",
    icon: "/images/detail-3.png",
    title: "Ultra fast cloud-engine",
  },
  {
    id: "3",
    icon: "/images/detail-4.png",
    title: "24 / 7 Customer support",
  },
];

const counterItems = [
  { value: 30, suffix: "+", label: "Years of Design Excellence" },
  { value: 250, suffix: "+", label: "Residential & Commercial Projects" },
  { value: 100, suffix: "+", label: "Events & Holiday Installations" },
  { value: 95, suffix: "%", label: "Client Satisfaction Rate" },
];

const logoIconsList = [
  {
    imgPath: "/images/logos/company-logo-1.png",
  },
  {
    imgPath: "/images/logos/company-logo-2.png",
  },
  {
    imgPath: "/images/logos/company-logo-3.png",
  },
  {
    imgPath: "/images/logos/company-logo-4.png",
  },
  {
    imgPath: "/images/logos/company-logo-5.png",
  },
  {
    imgPath: "/images/logos/company-logo-6.png",
  },
  {
    imgPath: "/images/logos/company-logo-7.png",
  },
  {
    imgPath: "/images/logos/company-logo-8.png",
  },
  {
    imgPath: "/images/logos/company-logo-9.png",
  },
  {
    imgPath: "/images/logos/company-logo-10.png",
  },
  {
    imgPath: "/images/logos/company-logo-11.png",
  },
];

const abilities = [
  {
    imgPath: "/images/seo.png",
    title: "Quality Focus",
    desc: "Delivering high-quality results while maintaining attention to every detail.",
  },
  {
    imgPath: "/images/chat.png",
    title: "Reliable Communication",
    desc: "Keeping you updated at every step to ensure transparency and clarity.",
  },
  {
    imgPath: "/images/time.png",
    title: "On-Time Delivery",
    desc: "Making sure projects are completed on schedule, with quality & attention to detail.",
  },
];

const techStackImgs = [
  {
    name: "React Developer",
    imgPath: "/images/logos/react.png",
  },
  {
    name: "Python Developer",
    imgPath: "/images/logos/python.svg",
  },
  {
    name: "Backend Developer",
    imgPath: "/images/logos/node.png",
  },
  {
    name: "Interactive Developer",
    imgPath: "/images/logos/three.png",
  },
  {
    name: "Project Manager",
    imgPath: "/images/logos/git.svg",
  },
];

const techStackIcons = [
  {
    name: "React Developer",
    modelPath: "/models/react_logo-transformed.glb",
    scale: 1,
    rotation: [0, 0, 0],
  },
  {
    name: "Python Developer",
    modelPath: "/models/python-transformed.glb",
    scale: 0.8,
    rotation: [0, 0, 0],
  },
  {
    name: "Backend Developer",
    modelPath: "/models/node-transformed.glb",
    scale: 5,
    rotation: [0, -Math.PI / 2, 0],
  },
  {
    name: "Interactive Developer",
    modelPath: "/models/three.js-transformed.glb",
    scale: 0.05,
    rotation: [0, 0, 0],
  },
  {
    name: "Project Manager",
    modelPath: "/models/git-svg-transformed.glb",
    scale: 0.05,
    rotation: [0, -Math.PI / 4, 0],
  },
];

const expCards = [
  {
    review: "Sharon transformed passion into timeless design, blending heritage with elegance.",
    imgPath: experience1,
    logoPath: logo,
    title: "Sharon's Journey",
    date: "Founded over 30 years ago",
    responsibilities: [
      "Left a successful corporate career to follow her dream of curating exquisite environments",
      "Developed a signature style blending antique charm, Afrocentric roots, modern glam, and timeless elegance",
      "Creates holistic experiences that soothe the spirit and ignite inspiration",
    ],
  },
  {
    review: "Brittany brings bold vision, modern flair, and a fresh entrepreneurial edge.",
    imgPath: experience2,
    logoPath: logo,
    title: "Brittany's Vision",
    date: "Joined SMD in 2019",
    responsibilities: [
      "Brought corporate real estate and project management expertise to SMD",
      "Amplified the firm's design voice with a modern flair",
      "Founded a fashion boutique and made waves in construction management",
    ],
  },
  {
    review: "Designing with, not just for—where client vision leads the way.",
    imgPath: experience3,
    logoPath: logo,
    title: "The SMD Approach",
    date: "Present Day",
    responsibilities: [
      "Holistic approach from construction to finishing touches",
      "Blending modern lines with vintage soul, East Coast sophistication with Southern warmth",
      "Creating spaces with harmony, heart, and heritage in mind",
    ],
  },
  {
    review: "A legacy built on trust, timeless design, and meaningful spaces.",
    imgPath: experience4,
    logoPath: logo,
    title: "Our Legacy",
    date: "Today",
    responsibilities: [
      "Sharon Mann Design is recognized as one of the leading interior design studios in the region.",
      "Our portfolio spans historic renovations, contemporary new builds, and everything in between, united by our commitment to creating spaces that resonate with authenticity and purpose.",
      "We've been honored with numerous industry awards, but our true measure of success is the relationships we've built with clients who return to us as their lives evolve.",
    ],
  },
];



const expLogos = [
  {
    name: "logo1",
    imgPath: "/images/logo1.png",
  },
  {
    name: "logo2",
    imgPath: "/images/logo2.png",
  },
  {
    name: "logo3",
    imgPath: "/images/logo3.png",
  },
];

const testimonials = [
  {
    name: "Vanessa Jackson",
    mentions: "Atlanta, GA",
    review:
      "Sharon Mann Design completely transformed our home. Every room feels like a magazine spread — elegant, warm, and uniquely *us*. Sharon and Brittany truly listened and brought our vision to life.",
    imgPath: client1,
  },
  {
    name: "Monique Caldwell",
    mentions: "Buckhead, GA",
    review:
      "From concept to completion, working with SMD was a dream. Their holiday decor turned our corporate office into a winter wonderland — classy, magical, and unforgettable. Our team is still raving about it!",
    imgPath: client3,
  },
  {
    name: "James Franklin",
    mentions: "Decatur, GA",
    review:
      "Brittany’s attention to detail and creativity blew us away. She redesigned our outdated kitchen and gave it a modern, functional, and absolutely stunning look that we still admire every single day. From the cabinetry to the lighting, every element was thoughtfully chosen. The entire process was smooth, enjoyable, and honestly exceeded our expectations.",
    imgPath: client2,
  },
  {
    name: "Tasha Reynolds",
    mentions: "Brookhaven, GA",
    review:
      "SMD brought so much heart into our basement renovation. Sharon’s touch added both sophistication and warmth, and her ability to blend textures, colors, and lighting is unmatched.",
    imgPath: client5,
  },
  {
    name: "Marcus Bennett",
    mentions: "Sandy Springs, GA",
    review:
      "We hired SMD for our restaurant’s interior, and it completely changed the customer experience. The space now feels high-end, cozy, and memorable — just what we were after. Thank you for elevating our brand!",
    imgPath: client4,
  },
  {
    name: "Danielle Brooks",
    mentions: "Alpharetta, GA",
    review:
      "What sets Sharon and Brittany apart is their soul. They don’t just decorate — they design experiences. Our home now tells our story through colors, textures, and beautiful, thoughtful details.",
    imgPath: client6,
  },
];


const socialImgs = [
  {
    name: "insta",
    imgPath: insta,
    link: "https://www.instagram.com/sharonmanndesign",
  },
  {
    name: "fb",
    imgPath: fb,
    link: "https://www.facebook.com/SharonMannDesign",
  },
  {
    name: "YouTube",
    imgPath: youtube,
    link: "https://www.youtube.com/channel/UCEvCP-7dJcfwiK-ckv74HyA",
  },
  {
    name: "Pintrest",
    imgPath: pintrest,
    link: "https://www.pinterest.com/sharonmanndesign//in/yourprofile",
  },
];


// Categories for filtering (can be expanded later)
const categories = [
  { id: "all", name: "All" },
  { id: "living", name: "Living Rooms" },
  { id: "kitchen", name: "Kitchens" },
  { id: "bathroom", name: "Bathrooms" },
  { id: "basement", name: "Basements" },
  { id: "events", name: "Events" },
  { id: "holiday", name: "Holiday Decor" },
  { id: "dining", name: "Dining room" },
  { id: "bedroom", name: "Bedrooms" },
];


// 1. First, create a list of featured images you want to highlight
// utils/featuredImages.js
export const featuredImages = [
  {
    path: './images/about-us/1.webp', // Must match exact path in your imports
    category: 'living',
    title: 'Modern Living Room',
    location: 'Los Angeles, CA',
    description: 'Contemporary design with natural lighting and comfortable seating arrangement.'
  },
  {
    path: './images/bedroom/3.webp', // Must match exact path in your imports
    category: 'kitchen',
    title: 'Gourmet Kitchen',
    location: 'New York, NY',
    description: 'Elegant kitchen with marble countertops and high-end appliances.'
  },
  {
    path: './images/events/event2.webp', // Must match exact path in your imports
    category: 'bathroom',
    title: 'Luxury Bathroom',
    location: 'Miami, FL',
    description: 'Spa-like bathroom with custom fixtures and natural stone elements.'
  }
  // Add more featured images as needed
];


// Gallery items data
const galleryItems = [
  {
    id: 1,
    image: "/images/livingroom/living_room2.webp",
    title: "Modern Living Room Transformation",
    location: "Buckhead, Atlanta",
    category: "living",
    featured: true,
    description: "A contemporary living space with luxurious finishes and custom furniture"
  },
  {
    id: 2,
    image: "/images/kitchen/Kitchens.jpg",
    title: "Gourmet Kitchen Redesign",
    location: "Midtown, Atlanta",
    category: "kitchen",
    featured: false,
    description: "Open concept kitchen featuring custom cabinetry and premium appliances"
  },
  {
    id: 3,
    image: "/images/Bath/Bath.webp",
    title: "Spa-Inspired Master Bath",
    location: "Druid Hills, Atlanta",
    category: "bathroom",
    featured: false,
    description: "Luxurious bathroom featuring marble surfaces and custom lighting"
  },
  {
    id: 4,
    image: "/images/Entertainment/home_theater2.jpg",
    title: "Entertainment Basement",
    location: "Sandy Springs, Atlanta",
    category: "basement",
    featured: false,
    description: "Multi-functional basement with home theater and bar area"
  },
  {
    id: 5,
    image: "/images/Wedding/wedding.jpg",
    title: "Elegant Wedding Reception",
    location: "Piedmont Park, Atlanta",
    category: "events",
    featured: false,
    description: "Sophisticated event design with custom floral arrangements"
  },
  {
    id: 6,
    image: "/images/holiday/holiday.JPG",
    title: "Festive Holiday Installation",
    location: "Alpharetta, Atlanta",
    category: "holiday",
    featured: true,
    description: "Breathtaking holiday decor featuring custom wreaths and lighting"
  },
  {
    id: 7,
    image: "/images/holiday/holiday.JPG",
    title: "Contemporary Open Concept Living",
    location: "Virginia Highland, Atlanta",
    category: "living",
    featured: false,
    description: "Bright, airy living space with minimalist design and statement furniture pieces"
  },
  {
    id: 8,
    image: "/images/holiday/holiday.JPG",
    title: "Farmhouse-Inspired Kitchen",
    location: "Roswell, Atlanta",
    category: "kitchen",
    featured: true,
    description: "Rustic kitchen design with modern amenities and custom wood detailing"
  },
  {
    id: 9,
    image: "/images/holiday/holiday.JPG",
    title: "Ultra-Luxury Master Suite",
    location: "Dunwoody, Atlanta",
    category: "bathroom",
    featured: false,
    description: "Opulent bathroom featuring freestanding tub, heated floors and smart technology"
  },
  {
    id: 10,
    image: "/images/holiday/holiday.JPG",
    title: "Multi-Purpose Game Room",
    location: "Decatur, Atlanta",
    category: "basement",
    featured: false,
    description: "Entertainment space with custom game tables, bar area and lounge seating"
  },
  {
    id: 11,
    image: "/images/holiday/holiday.JPG",
    title: "Corporate Anniversary Gala",
    location: "Four Seasons, Atlanta",
    category: "events",
    featured: false,
    description: "Sophisticated corporate event with custom lighting and experiential elements"
  },
  {
    id: 12,
    image: "/images/holiday/holiday.JPG",
    title: "Traditional Christmas Installation",
    location: "Brookhaven, Atlanta",
    category: "holiday",
    featured: true,
    description: "Classic holiday design with rich colors, garlands and oversized ornaments"
  }
];


const designJourney = [
  {
    title: "The Vision",
    year: "2005",
    imagePath: "/images/basement/basement.png",
    imageAlt: "Sharon Mann, Founder and Principal Designer",
    paragraphs: [
      "Sharon Mann began her journey in the world of interior design with a simple yet profound belief: spaces should not only captivate the eye but nurture the soul. After years of working with prestigious design firms in New York and London, Sharon returned to her hometown with a vision to create a boutique design studio that would transform living spaces into personalized sanctuaries.",
      "\"I wanted to create a firm that approached each project as a unique canvas—one that reflects the client's personality, history, and aspirations,\" Sharon recalls. \"Too often, I saw beautiful spaces that lacked character and meaning. I knew there was a better way.\""
    ],
    quote: "Design is not just what it looks like and feels like. Design is how it works—and how it makes you feel when you're in the space.",
    quoteAuthor: "Sharon Mann"
  },
  {
    title: "The Partnership",
    year: "2012",
    imagePath: "/images/basement/basement.png",
    imageAlt: "Brittany Wells, Partner and Creative Director",
    secondaryImage: "/images/team-collaboration.jpg",
    secondaryImageAlt: "Sharon and Brittany collaborating on a design",
    paragraphs: [
      "The studio's trajectory changed forever when Brittany Wells, a celebrated architectural designer with a background in sustainable practices, joined the team. Brittany brought a complementary skill set that perfectly balanced Sharon's intuitive approach to design.",
      "\"What drew me to Sharon Mann Design was the authenticity in every project,\" explains Brittany. \"While many firms were chasing trends, Sharon was creating timeless spaces that told stories. I knew immediately this was where I belonged.\"",
      "Together, they expanded the firm's capabilities, tackling increasingly ambitious projects while maintaining the personalized attention that had become their signature."
    ]
  },
  {
    title: "Our Philosophy",
    imagePath: "/images/basement/basement.png",
    imageAlt: "Signature living room design by Sharon Mann Design",
    secondaryImage: "/images/materials-palette.jpg",
    secondaryImageAlt: "Curated material palette for a luxury project",
    paragraphs: [
      "At Sharon Mann Design, we believe that great interior design is about finding the perfect balance between form and function, between timeless elegance and contemporary innovation. Our approach begins with deep listening—understanding not just what our clients say they want, but how they live, work, and dream.",
      "Our signature process combines meticulous attention to architectural details with an artist's eye for color, texture, and composition. We source materials and furnishings from around the world, often commissioning custom pieces from master artisans whose craftsmanship elevates each project.",
      "Sustainability isn't just a buzzword for us—it's integrated into every decision we make. We believe luxury and environmental responsibility can and should coexist."
    ],
    quote: "A well-designed space should feel like it couldn't possibly be any other way—it should feel inevitable.",
    quoteAuthor: "Brittany Wells"
  },
  {
    title: "Our Legacy",
    imagePath: "/images/basement/basement.png",
    imageAlt: "Award-winning dining space designed by Sharon Mann Design",
    paragraphs: [
      "Today, Sharon Mann Design is recognized as one of the leading interior design studios in the region. Our portfolio spans historic renovations, contemporary new builds, and everything in between. What unites these diverse projects is our unwavering commitment to creating spaces that resonate with authenticity and purpose.",
      "We've been honored with numerous industry awards, but our true measure of success is the relationships we've built with clients—many of whom return to us again and again as their lives and needs evolve.",
      "As we look to the future, we remain committed to our founding vision: creating beautiful spaces that tell your story, not ours. Because in the end, the most important element in any room isn't a piece of furniture or an architectural detail—it's you."
    ]
  }
];

const aboutPanels = [
  {
    id: "panel1",
    image: aboutBg,
    heading: "Transform Your Space",
    subheading: "✨ Personalized Design Solutions",
    description: "We create beautiful and functional spaces that reflect your personality and lifestyle.",
    ctaText: "Discover Our Process",
    ctaLink: "#aboutSmd"
  },
  {
    id: "panel2",
    image: aboutBg2,
    heading: "Thoughtful Design",
    subheading: "✨ Attention to Every Detail",
    description: "Every detail matters. We carefully craft spaces that balance aesthetics and functionality.",
    ctaText: "Understand SMD",
    ctaLink: "#aboutSmd"
  },
  {
    id: "panel3",
    image: aboutBg3,
    heading: "Exceptional Experience",
    subheading: "✨ From Concept to Completion",
    description: "From initial consultation to final reveal, we ensure a seamless and enjoyable design journey.",
    ctaText: "Our Process",
    ctaLink: "#aboutSmd"
  }
];

const heroPanels = [
  {
    id: "panel1",
    image: hero1,
    heading: "Elevate Your Living Space",
    subheading: "✨ Expert Interior Design",
    description: "We transform ordinary spaces into extraordinary sanctuaries that reflect your unique style and personality.",
    ctaText: "Explore Services",
    ctaLink: "#grid"
  },
  {
    id: "panel2",
    image: hero2,
    heading: "Reimagine Your Home",
    subheading: "✨ Innovative Design Solutions",
    description: "From concept to completion, we bring your vision to life with thoughtful design and meticulous execution.",
    ctaText: "View Our Work",
    ctaLink: "#grid"
  },
  {
    id: "panel3",
    image: hero3, // Replace with another image if available
    heading: "Crafted with Care",
    subheading: "✨ Attention to Every Detail",
    description: "Our personalized approach ensures that every element of your space is designed with intention and purpose.",
    ctaText: "Get Started",
    ctaLink: "#grid"
  }
];

const galleryPanels = [
  {
    id: "gallery1",
    image: galleryBg,
    heading: "Our Design Portfolio",
    subheading: "✨ Real Homes. Real Transformations. Real Stories.",
    description: "Every space we touch is a canvas for culture, elegance, and personalized storytelling. Explore our signature transformations and timeless moments below.",
    ctaText: "Explore Our Designs",
    ctaLink: "#grid"
  },
  {
    id: "gallery2",
    image: galleryBg2, // Replace with another gallery image
    heading: "Crafting Beautiful Spaces",
    subheading: "✨ Where Creativity Meets Functionality",
    description: "Our portfolio showcases the perfect blend of innovative design and practical solutions for modern living.",
    ctaText: "View All Projects",
    ctaLink: "#grid"
  },
  {
    id: "gallery3",
    image: galleryBg3, // Replace with another gallery image
    heading: "Award-Winning Designs",
    subheading: "✨ Excellence in Every Detail",
    description: "Browse through our collection of carefully curated designs that have set new standards in interior transformation.",
    ctaText: "See Our Work",
    ctaLink: "#grid"
  }
];

export {
  words,
  abilities,
  logoIconsList,
  counterItems,
  expCards,
  expLogos,
  testimonials,
  socialImgs,
  techStackIcons,
  techStackImgs,
  navLinks,
  categories,
  galleryItems,
  designJourney,
  aboutPanels,
  heroPanels,
  galleryPanels
};

