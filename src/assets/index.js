// src/assets/images/index.js

export const livingImages = import.meta.glob('./images/livingroom/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const kitchenImages = import.meta.glob('./images/kitchen/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const bathroomImages = import.meta.glob('./images/bath/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const basementImages = import.meta.glob('./images/basement/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const eventsImages = import.meta.glob('./images/events/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const holidayImages = import.meta.glob('./images/holiday/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const diningImages = import.meta.glob('./images/dining/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const bedroomImages = import.meta.glob('./images/bedroom/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

// Featured images (in separate 'featured' subdirectories)
export const featuredLivingImages = import.meta.glob('./images/livingroom/featured/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const featuredKitchenImages = import.meta.glob('./images/kitchen/featured/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const featuredBathroomImages = import.meta.glob('./images/bath/featured/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });
export const featuredDiningImages = import.meta.glob('./images/dining/featured/*.{jpg,jpeg,png,webp}', { eager: true, import: 'default' });

const eventsMeta = [
  { title: "Summer Solstice Soirée", description: "An elegant outdoor celebration of the longest day", size: "large" },
  { title: "Winter Wonderland Gala", description: "A magical evening of festive elegance", size: "medium" },
  { title: "Smith & Johnson Wedding", description: "A timeless celebration of love", size: "tall" },
  { title: "Autumn Harvest Celebration", description: "Celebrating the bounty of the season", size: "medium" },
  { title: "Tech Company Annual Retreat", description: "A sophisticated corporate gathering", size: "small" },
  { title: "Brooks Anniversary", description: "Celebrating 25 years of marriage", size: "wide" },
  { title: "Christmas Showcase", description: "A festive holiday display", size: "large" },
  { title: "Spring Garden Party", description: "An elegant outdoor soirée", size: "medium" },
  { title: "Nelson & Park Wedding", description: "A romantic celebration of union", size: "small" },
  { title: "Executive Award Ceremony", description: "Recognizing excellence in leadership", size: "wide" },
  { title: "New Year's Eve Gala", description: "Ringing in the new year with style", size: "medium" },
  { title: "Taylor Foundation Fundraiser", description: "An evening of philanthropy", size: "large" },
  { title: "Lakeside Wedding", description: "A serene celebration by the water", size: "tall" },
  { title: "Summer Fashion Showcase", description: "Presenting the season's latest trends", size: "medium" },
  { title: "Johnson Product Launch", description: "An exclusive unveiling event", size: "small" },
  { title: "Easter Celebration", description: "A joyful spring gathering", size: "wide" },
  { title: "Harvest Moon Dinner", description: "A culinary experience under the stars", size: "medium" },
  { title: "Winter Wedding", description: "A magical celebration in the snow", size: "large" },
  { title: "Corporate Anniversary", description: "Celebrating 10 years of excellence", size: "medium" },
  { title: "Beach Wedding", description: "A romantic ceremony by the sea", size: "tall" },
  { title: "Holiday Showcase", description: "Festive designs for the season", size: "medium" },
  { title: "Spring Gala", description: "An elegant celebration of renewal", size: "small" },
  { title: "Arts Foundation Benefit", description: "Supporting creativity in the community", size: "wide" },
];
// Convert object to sorted array of image paths
const sortedImages = Object.entries(eventsImages)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([, img]) => img);

export const eventsData = eventsMeta.map((meta, index) => ({
  id: index + 1,
  ...meta,
  image: sortedImages[index],
}));

import livingroom1 from './images/livingroom/living_room.webp'
import basement1 from './images/basement/basement.png'
import basement2 from './images/home/hero5.jpg'
import aboutBg from './images/about-us/2.webp'
import aboutBg2 from './images/about-us/1.webp'
import aboutBg3 from './images/about-us/3.webp'
import designerIntro from './images/about-us/7.webp'
import eventsBg from './images/Wedding/wedding.jpg'
import before1 from './images/beforeAfter/before1.webp'
import before2 from './images/beforeAfter/before2.webp'
import before3 from './images/beforeAfter/before3.webp'
import before4 from './images/beforeAfter/before4.webp'
import before5 from './images/beforeAfter/before5.webp'
import before6 from './images/beforeAfter/before6.webp'
import before7 from './images/beforeAfter/before7.webp'
import after1 from './images/beforeAfter/after1.webp'
import after2 from './images/beforeAfter/after2.webp'
import after3 from './images/beforeAfter/after3.webp'
import after4 from './images/beforeAfter/after4.webp'
import after5 from './images/beforeAfter/after5.webp'
import after6 from './images/beforeAfter/after6.webp'
import after7 from './images/beforeAfter/after7.webp'
import client1 from './images/client1.png';
import client2 from './images/client2.png';
import client3 from './images/client3.png';
import client4 from './images/client4.png';
import client5 from './images/client5.png';
import client6 from './images/client6.png';
import logo from './images/logo.png'
import insta from './images/insta.png'
import fb from './images/fb.png'
import youtube from './images/youtube.png'
import pintrest from './images/pintrest.png'
import warmth from './images/warmth.svg'
import luxury from './images/luxury.svg'
import depth from './images/depth.svg'
import calm from './images/calm.svg'
import starDark from './images/star-dark.png'
import star from './images/star.png'
import meetsmd from './images/meetSMD/smd.webp'
import meetSharon from './images/meetSMD/sharon.jpg'
import meetBritanny from './images/meetSMD/britanny.jpg'
import difference from './images/meetSMD/difference.webp'
import arrowDown from './images/arrow-down.svg'
import vision1 from './images/about-us/5.webp'
import vision2 from './images/about-us/4.webp'
import vision3 from './images/about-us/6.webp'
import experience1 from './images/experience/1.webp'
import experience2 from './images/experience/2.webp'
import experience3 from './images/experience/3.webp'
import experience4 from './images/experience/4.webp'
import galleryBg from './images/holiday/15.webp'
import galleryBg2 from './images/holiday/18.webp'
import galleryBg3 from './images/events/event13.webp'
import hero1 from './images/home/hero.webp'
import hero2 from './images/home/hero2.webp'
import hero3 from './images/home/hero4.webp'
import contactImg from './images/contact/contactUs.webp'

export{
    livingroom1,
    basement1,
    basement2,
    aboutBg,
    aboutBg2,
    aboutBg3,
    before1,
    before2,
    before3,
    before4,
    before5,
    before6,
    before7,
    after1,
    after2,
    after3,
    after4,
    after5,
    after6,
    after7,
    eventsBg,
    client1, client2, client3, client4, client5, client6,
    logo,
    insta,
    fb,
    pintrest,
    youtube,
    warmth,
    luxury,
    depth,
    calm,
    starDark,
    star,
    meetsmd,
    meetSharon,
    meetBritanny,
    arrowDown,
    vision1,
    vision2,
    vision3,
    experience1,
    experience2,
    experience3,
    experience4,
    galleryBg,
    galleryBg2,
    galleryBg3,
    hero1,
    hero2,
    hero3,
    designerIntro,
    contactImg,
    difference
}