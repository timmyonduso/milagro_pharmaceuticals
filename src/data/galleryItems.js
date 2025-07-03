// src/data/galleryItems.js
import {
  livingImages,
  kitchenImages,
  bathroomImages,
  basementImages,
  eventsImages,
  holidayImages,
  diningImages,
  bedroomImages,
  featuredLivingImages,
  featuredKitchenImages,
  featuredBathroomImages,
  featuredDiningImages
} from '../assets/index';
import { generateGalleryItems, generateFeaturedGalleryItems } from '../utils/galleryBuilder';

export const galleryItems = [
  ...generateGalleryItems(livingImages, 'living'),
  ...generateFeaturedGalleryItems(featuredLivingImages, 'living'),

  ...generateGalleryItems(kitchenImages, 'kitchen'),
  ...generateFeaturedGalleryItems(featuredKitchenImages, 'kitchen'),

  ...generateGalleryItems(bathroomImages, 'bathroom'),
  ...generateFeaturedGalleryItems(featuredBathroomImages, 'bathroom'),

  ...generateGalleryItems(basementImages, 'basement'),
  ...generateGalleryItems(eventsImages, 'events'),
  ...generateGalleryItems(holidayImages, 'holiday'),

  ...generateGalleryItems(diningImages, 'dining'),
  ...generateFeaturedGalleryItems(featuredDiningImages, 'dining'),

  ...generateGalleryItems(bedroomImages, 'bedroom')
];

export const featuredItems = galleryItems.filter(item => item.featured);