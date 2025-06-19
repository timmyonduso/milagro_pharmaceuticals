import GridImage from "./GridImage"

// Using images from galleryItems array
const images = [
  "/images/livingroom/living_room2.webp",
  "/images/kitchen/Kitchens.jpg",
  "/images/Bath/Bath.webp",
  "/images/Entertainment/home_theater2.jpg",
  "/images/Wedding/wedding.jpg",
  "/images/holiday/holiday.JPG",
  "/images/livingroom/living_room2.webp", // Reusing some images since we need 10
  "/images/kitchen/Kitchens.jpg",
  "/images/Bath/Bath.webp",
  "/images/Entertainment/home_theater2.jpg",
]

const Explore = () => {
  return (
    <div className="w-full lg:px-[150px] px-5 lg:py-10 py-8 flex flex-col items-center justify-center gap-5">
      <div className="flex flex-col items-center">
        <span className="text-[15px] text-[#425e85] text-lg">Explore</span>
        <span className="font-semibold text-[30px] text-center">Our Latest Interior Designs</span>
        <p className="mt-3 text-gray-500 text-center max-w-[500px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur repellendus error.
        </p>
      </div>
      <div className="grid grid-cols-5 grid-rows-8 gap-4 w-full h-[800px] m-8">
        <GridImage image={images[0]} layout="col-span-2 row-span-3" />
        <GridImage image={images[1]} layout="col-span-2 row-span-3 col-start-3" />
        <GridImage image={images[2]} layout="row-span-3 col-start-5" />
        <GridImage image={images[3]} layout="row-span-2 row-start-4" />
        <GridImage image={images[4]} layout="col-span-2 row-span-2 row-start-4" />
        <GridImage image={images[5]} layout="col-span-2 row-span-2 col-start-4 row-start-4" />
        <GridImage image={images[6]} layout="col-span-2 row-span-3 row-start-6" />
        <GridImage image={images[7]} layout="row-span-3 col-start-3 row-start-6" />
        <GridImage image={images[8]} layout="row-span-3 col-start-5 row-start-6" />
        <GridImage image={images[9]} layout="row-span-3 col-start-4 row-start-6" />
      </div>
    </div>
  )
}

export default Explore
