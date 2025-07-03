// src/utils/galleryBuilder.js

// Regular items generator (unchanged)
export const generateGalleryItems = (images, category) => {
  return Object.entries(images).map(([path, image], index) => ({
    id: `${category}-${index}`,
    image,
    title: "", 
    location: "",
    category,
    featured: false,
    description: "",
  }));
};

// Featured items generator
export const generateFeaturedGalleryItems = (images, category) => {
  return Object.entries(images).map(([path, image], index) => ({
    id: `featured-${category}-${index}`,
    image,
    title: "",
    location: "",
    category,
    featured: true,
    description: "",
    featuredOrder: index, // Optional: for ordering featured items
  }));
};