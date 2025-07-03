// Using images from galleryItems array
const collectionItems = [
    {
      title: "Modern Living",
      image: "/images/livingroom/living_room2.webp",
      desc: "A contemporary living space with luxurious finishes and custom furniture. Perfect for modern homes seeking elegance and comfort.",
    },
    {
      title: "Gourmet Kitchen",
      image: "/images/kitchen/Kitchens.jpg",
      desc: "Open concept kitchen featuring custom cabinetry and premium appliances. Designed for both functionality and style.",
    },
    {
      title: "Spa-Inspired Bath",
      image: "/images/Bath/Bath.webp",
      desc: "Luxurious bathroom featuring marble surfaces and custom lighting. Transform your bathroom into a personal spa retreat.",
    },
    {
      title: "Entertainment",
      image: "/images/Entertainment/home_theater2.jpg",
      desc: "Multi-functional entertainment spaces with home theater and bar areas. Perfect for hosting and family gatherings.",
    },
  ]
  
  const Collections = () => {
    return (
      <div className="w-full lg:px-[150px] px-5 pb-8 flex lg:flex-row flex-col items-center justify-between gap-8">
        {collectionItems.map((item, index) => (
          <div
            key={index}
            className="w-full h-[600px] bg-center bg-cover relative p-6 cursor-pointer"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="w-full h-full absolute bg-black opacity-45 z-20 top-0 left-0"></div>
            <div className="flex flex-col">
              <div className="text-white font-semibold text-[20px] z-50">{item.title}</div>
              <div className="text-white font-semibold text-[20px] z-50">Collection</div>
            </div>
            <div className="absolute bottom-6 z-50 flex flex-col gap-6">
              <p className="text-gray-100 leading-6 text-[14px] lg:text-left text-center">{item.desc}</p>
              <a href="#" className="text-white font-light text-[17px]">
                Read More
              </a>
            </div>
          </div>
        ))}
      </div>
    )
  }
  
  export default Collections
  