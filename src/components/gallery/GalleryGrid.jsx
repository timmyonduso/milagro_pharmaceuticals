"use client"

import {Fragment, useState} from "react"
import {ChevronLeft, ChevronRight, Navigation, X} from "lucide-react"
import {Dialog, DialogPanel, Transition, TransitionChild} from "@headlessui/react"
import {categories} from "../../constants";
import {galleryItems} from "../../data/galleryItems";
import {useTilt} from "../../hooks/useTilt.js";
import {useHoverCursorEffect} from "../../hooks/useHoverCursorEffect.js";

export const GalleryTilt = ({ children, className = "" }) => {

  const { itemRef, transformStyle, handleMouseMove, handleMouseLeave } = useTilt()

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  )
}

export const ProjectModal = ({ isOpen, closeModal, project }) => {
  if (!project) return null

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-[100]" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/90" />
        </TransitionChild>

        <div className="fixed inset-0 z-50">
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPanel className="w-full h-full transform overflow-hidden bg-white dark:bg-gray-900 text-left transition-all">
              <div className="relative h-full w-full">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="h-full w-full object-contain md:object-cover"
                />
                <button
                  type="button"
                  className="absolute top-4 right-4 z-[110] rounded-full bg-black/60 p-2 text-white hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  onClick={closeModal}
                >
                  <X className="h-6 w-6" />
                </button>


                {/* Optional description overlay */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold">{project.title}</h3>
                  <p className="text-sm opacity-80">{project.location}</p>
                  <p className="mt-2 text-sm">{project.description}</p>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </Dialog>
    </Transition>
  )
}


export const GalleryCard = ({ image, title, location, description, onViewProject }) => {
  const {
    cursorPosition,
    hoverOpacity,
    hoverButtonRef,
    handleMouseMove,
    handleMouseEnter,
    handleMouseLeave
  } = useHoverCursorEffect()

  return (
    <div className="relative h-full w-full rounded-lg overflow-hidden">
      <img
        src={image || "/placeholder.svg"}
        alt={title}
        className="absolute left-0 top-0 size-full object-cover object-center"
      />

      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40 dark:bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex size-full flex-col justify-between p-5 text-white dark:text-blue-50">
        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform opacity-0 group-hover:opacity-100">
          <h3 className="text-xl font-bold">{title}</h3>
          <p className="text-sm text-white/80 dark:text-blue-50/80">{location}</p>
          {description && <p className="mt-3 max-w-64 text-sm">{description}</p>}
        </div>

        <button
          ref={hoverButtonRef}
          onClick={onViewProject}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="border border-white/20 relative flex w-fit cursor-pointer items-center gap-1 overflow-hidden rounded-full bg-black/50 dark:bg-black/50 px-5 py-2 text-xs uppercase text-white transform transition-transform mt-4 opacity-100 translate-y-0 sm:opacity-0 sm:translate-y-4 sm:group-hover:opacity-100 sm:group-hover:translate-y-0"
        >
          {/* Radial gradient hover effect */}
          <div
            className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
            style={{
              opacity: hoverOpacity,
              background: `radial-gradient(100px circle at ${cursorPosition.x}px ${cursorPosition.y}px, rgba(101, 111, 226, 0.5), rgba(0, 0, 0, 0.15))`,
            }}
          />
          <Navigation className="relative z-20" />
          <p className="relative z-20">View Project</p>
        </button>
      </div>
    </div>
  )
}

// Pagination component
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const maxVisiblePages = 5;

  const getPageNumbers = () => {
    let pages = [];

    // Always show first page
    pages.push(1);

    // Calculate visible page range
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 3);

    // Adjust start if we're near the end
    if (endPage === totalPages - 1) {
      startPage = Math.max(2, endPage - maxVisiblePages + 3);
    }

    // Add ellipsis after first page if needed
    if (startPage > 2) {
      pages.push('...');
    }

    // Add middle pages
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    // Add ellipsis before last page if needed
    if (endPage < totalPages - 1) {
      pages.push('...');
    }

    // Always show the last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-center mt-12 space-x-1">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center w-10 h-10 rounded-md ${currentPage === 1
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Page numbers */}
      <div className="flex items-center space-x-1 overflow-x-auto max-w-xs px-2">
        {getPageNumbers().map((page, index) => (
          page === '...' ? (
            <span key={`ellipsis-${index}`} className="w-10 h-10 flex items-center justify-center text-gray-500">
              ...
            </span>
          ) : (
            <button
              key={`page-${page}`}
              onClick={() => onPageChange(page)}
              className={`w-10 h-10 rounded-md flex items-center justify-center ${currentPage === page
                ? "bg-[#C5A678] text-white dark:bg-white dark:text-black"
                : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                }`}
            >
              {page}
            </button>
          )
        ))}
      </div>

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center w-10 h-10 rounded-md ${currentPage === totalPages
          ? "text-gray-400 cursor-not-allowed"
          : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
          }`}
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

const GalleryGrid = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // For regular category items
  const featuredItemsPerPage = 8; // For featured items

  // Get all items for current category
  const allItems = activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Separate featured and regular items
  const featuredItems = allItems.filter(item => item.featured);
  const regularItems = allItems.filter(item => !item.featured);

  // Calculate pagination and display items based on category
  let displayItems;
  let totalPages;

  if (activeCategory === "all") {
    // For 'all' category, paginate featured items with 8 per page
    const itemsToPaginate = featuredItems;
    totalPages = Math.ceil(itemsToPaginate.length / featuredItemsPerPage);
    displayItems = itemsToPaginate.slice(
        (currentPage - 1) * featuredItemsPerPage,
        currentPage * featuredItemsPerPage
    );
  } else {
    // For specific categories, show only regular items (no featured items)
    const itemsToPaginate = regularItems;
    totalPages = Math.ceil(itemsToPaginate.length / itemsPerPage);
    displayItems = itemsToPaginate.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
  }

  // Reset to first page when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const openModal = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
      <section id="gallery-grid" className="bg-gray-50 dark:bg-gray-900 py-12 transition-colors duration-300">
        <div className="container mx-auto px-4">
          {/* Filter Categories */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`px-5 py-2 rounded-full transition-all duration-300 ${activeCategory === category.id
                        ? "bg-[#C5A678] text-white border-[#C5A678] shadow-md dark:bg-white dark:text-black dark:border-white"
                        : "border-[#4D5053]/30 text-[#4D5053] hover:bg-[#C5A678]/10 dark:border-white/20 dark:text-white/80 dark:hover:bg-white/10"
                    }`}
                >
                  {category.name}
                </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className={`grid gap-6 ${
              activeCategory === "all"
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" // 4 columns for featured items (all category)
                  : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"  // 3 columns for category items
          }`}>
            {displayItems.map((item) => (
                <GalleryTilt
                    key={item.id}
                    className={`group overflow-hidden rounded-lg shadow-lg dark:shadow-gray-800/30 transition-all duration-500 ${
                        activeCategory === "all" && item.featured
                            ? "lg:col-span-2 h-96" // Featured items span 2 columns in 'all' view
                            : "h-80" // All other items have consistent height
                    }`}
                >
                  <GalleryCard
                      image={item.image}
                      title={item.title}
                      location={item.location}
                      description={item.description}
                      onViewProject={() => openModal(item)}
                  />
                </GalleryTilt>
            ))}
          </div>

          {/* Pagination - show for both featured items (all category) and category items */}
          {totalPages > 1 && (
              <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={(page) => {
                    window.scrollTo({
                      top: document.getElementById('gallery-grid').offsetTop - 100,
                      behavior: 'smooth'
                    });
                    setCurrentPage(page);
                  }}
              />
          )}
        </div>

        {/* Project Detail Modal */}
        <ProjectModal
            isOpen={isModalOpen}
            closeModal={closeModal}
            project={selectedProject}
        />
      </section>
  )
}
export default GalleryGrid