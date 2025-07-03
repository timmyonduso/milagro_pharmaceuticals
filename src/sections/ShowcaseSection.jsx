import { useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { categories } from "../constants";
import { galleryItems } from "../data/galleryItems";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ITEMS_PER_PAGE = 9;

const GallerySection = () => {
  const sectionRef = useRef(null);
  const gridItemRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter and paginate items
  const filteredItems = useMemo(() => {
    const items = activeCategory === "all"
      ? galleryItems
      : galleryItems.filter(item => item.category === activeCategory);
    return items;
  }, [activeCategory]);

  const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
  const paginatedItems = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredItems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredItems, currentPage]);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(sectionRef.current, { opacity: 0 }, { opacity: 1, duration: 1.2 });

      gridItemRefs.current.forEach((item, index) => {
        if (item) {
          gsap.fromTo(
            item,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              delay: 0.1 * index,
              scrollTrigger: {
                trigger: item,
                start: "top bottom-=50",
              },
            }
          );
        }
      });
    });

    return () => ctx.revert();
  }, [paginatedItems]);

  const handleCategoryChange = (categoryId) => {
    setActiveCategory(categoryId);
    setCurrentPage(1);
    gridItemRefs.current = [];
  };

  const openGalleryModal = (item) => {
    console.log("Open modal for:", item.title);
  };

  return (
    <section
      id="counter"
      ref={sectionRef}
      className="w-full py-16 bg-gradient-to-b from-[#f4f0ec] to-[#f9f6f2] dark:from-black dark:to-black"
    >
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 bg-white/50 backdrop-blur-sm p-6 rounded-2xl shadow-sm ring-1 ring-[#C5A678]/10 dark:bg-transparent dark:shadow-none dark:ring-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white mb-3">
            A Glimpse Into Our Design Journey
          </h2>
          <p className="text-lg text-[#4D5053] dark:text-white/70 max-w-3xl mx-auto">
            Explore some of our favorite transformations and curated spaces that embody timeless elegance and unbridled creativity.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map(category => (
            <button
              key={category.id}
              className={`px-4 py-1.5 text-sm rounded-full border transition-colors ${
                activeCategory === category.id
                  ? "bg-[#C5A678] text-white border-[#C5A678] shadow-md dark:bg-white dark:text-black dark:border-white"
                  : "border-[#4D5053]/30 text-[#4D5053] hover:bg-[#C5A678]/10 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/10"
              }`}
              onClick={() => handleCategoryChange(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* No items message */}
        {filteredItems.length === 0 && (
          <div className="text-center py-12 bg-white/50 rounded-lg shadow-sm">
            <p className="text-[#4D5053] text-xl dark:text-white">No items found in this category.</p>
          </div>
        )}

        {/* Gallery Grid */}
        {paginatedItems.length > 0 && (
          <div className="bento-grid grid grid-cols-1 md:grid-cols-3 gap-5">
            {paginatedItems.map((item, index) => (
              <div
                key={item.id}
                ref={el => (gridItemRefs.current[index] = el)}
                className={`relative overflow-hidden rounded-lg group cursor-pointer shadow-md ring-1 ring-[#C5A678]/5 ${
                  index === 0 || index === 3 ? "md:col-span-2 aspect-video" : "aspect-square"
                }`}
                onClick={() => openGalleryModal(item)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="w-full h-full backdrop-blur-sm bg-black/20 rounded-lg p-3">
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-white/90">{item.location}</p>
                    <p className="text-xs text-white/80 mt-1">{item.description}</p>
                  </div>
                </div>
                <div className="absolute top-3 right-3">
                  <span className="w-2 h-2 bg-[#C5A678] rounded-full block"></span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-10 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-medium ${
                  currentPage === i + 1
                    ? "bg-[#C5A678] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-white"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GallerySection;
