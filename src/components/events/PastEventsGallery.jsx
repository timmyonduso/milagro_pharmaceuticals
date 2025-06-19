import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { X } from "lucide-react";
import TitleHeader from "../TitleHeader";
import { eventsData } from "../../assets";

// Register GSAP plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

const PastEventsGallery = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageEvents, setPageEvents] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const eventsPerPage = 9;
    const totalPages = Math.ceil(eventsData.length / eventsPerPage);

    const galleryRef = useRef(null);
    const headingRef = useRef(null);
    const paginationRef = useRef(null);
    const modalRef = useRef(null);

    // Update displayed events when page changes
    useEffect(() => {
        const startIndex = (currentPage - 1) * eventsPerPage;
        const endIndex = startIndex + eventsPerPage;
        setPageEvents(eventsData.slice(startIndex, endIndex));

        // Scroll to top of gallery when page changes (if not the first load)
        if (galleryRef.current && currentPage > 1) {
            const yOffset = -100; // Offset to account for any fixed headers
            const galleryTop = galleryRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: galleryTop, behavior: 'smooth' });
        }
    }, [currentPage]);

    // Handle page navigation
    const changePage = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // Handle opening the modal
    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Handle closing the modal
    const closeModal = () => {
        setIsModalOpen(false);
        // Re-enable scrolling when modal is closed
        document.body.style.overflow = 'auto';
    };

    // Handle click outside the modal content to close
    const handleModalBackdropClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            closeModal();
        }
    };

    // Handle keyboard events for modal (Escape key to close)
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isModalOpen) {
                closeModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isModalOpen]);

    // Initialize animations
    useEffect(() => {
        // Only run animations if the refs exist
        if (!headingRef.current || !galleryRef.current || !paginationRef.current) return;

        // Heading animations
        gsap.fromTo(
            headingRef.current,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                scrollTrigger: {
                    trigger: headingRef.current,
                    start: "top bottom-=100",
                    toggleActions: "play none none none"
                }
            }
        );

        // Create staggered animations for gallery items
        const animateGalleryItems = () => {
            const galleryItems = galleryRef.current.querySelectorAll('.gallery-item');

            gsap.fromTo(
                galleryItems,
                { y: 100, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.1,
                    duration: 0.8,
                    scrollTrigger: {
                        trigger: galleryRef.current,
                        start: "top bottom-=50",
                        toggleActions: "play none none none"
                    }
                }
            );
        };

        // Pagination animation
        gsap.fromTo(
            paginationRef.current,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: 0.4,
                scrollTrigger: {
                    trigger: galleryRef.current,
                    start: "bottom bottom",
                    toggleActions: "play none none none"
                }
            }
        );

        // Initialize animation for current items
        animateGalleryItems();

        // Re-run animations when page changes
        return () => {
            // Clean up ScrollTrigger instances
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [pageEvents]);

    // Width class mapping (maintaining only width variations)
    const widthClasses = {
        small: "",
        medium: "",
        tall: "",
        large: "md:col-span-2",
        wide: "md:col-span-2",
    };

    // Generate pagination buttons
    const renderPaginationButtons = () => {
        const buttons = [];

        // Previous button
        buttons.push(
            <button
                key="prev"
                onClick={() => currentPage > 1 && changePage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === 1
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                    }`}
                aria-label="Previous page"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        );

        // First page button (always show)
        buttons.push(
            <button
                key={1}
                onClick={() => changePage(1)}
                className={`w-10 h-10 rounded-full ${currentPage === 1
                        ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                    }`}
            >
                1
            </button>
        );

        // Ellipsis for pages before current range
        if (currentPage > 3) {
            buttons.push(
                <span key="ellipsis-start" className="w-10 h-10 flex items-center justify-center text-gray-500">
                    ...
                </span>
            );
        }

        // Page buttons around current page
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            if (i <= totalPages && i > 1) {
                buttons.push(
                    <button
                        key={i}
                        onClick={() => changePage(i)}
                        className={`w-10 h-10 rounded-full ${currentPage === i
                                ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                                : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                            }`}
                    >
                        {i}
                    </button>
                );
            }
        }

        // Ellipsis for pages after current range
        if (currentPage < totalPages - 2) {
            buttons.push(
                <span key="ellipsis-end" className="w-10 h-10 flex items-center justify-center text-gray-500">
                    ...
                </span>
            );
        }

        // Last page button (always show if more than one page)
        if (totalPages > 1) {
            buttons.push(
                <button
                    key={totalPages}
                    onClick={() => changePage(totalPages)}
                    className={`w-10 h-10 rounded-full ${currentPage === totalPages
                            ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                            : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                        }`}
                >
                    {totalPages}
                </button>
            );
        }

        // Next button
        buttons.push(
            <button
                key="next"
                onClick={() => currentPage < totalPages && changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-10 h-10 flex items-center justify-center rounded-full ${currentPage === totalPages
                        ? "text-gray-400 cursor-not-allowed"
                        : "text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800"
                    }`}
                aria-label="Next page"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </button>
        );

        return buttons;
    };

    return (
        <section id="counter" className="bg-[#f4f0ec] dark:bg-black px-4 py-24 sm:px-6 md:px-12 lg:px-24">
            <div className="max-w-7xl mx-auto">
                {/* Section heading */}
                <div ref={headingRef} className="text-center mb-16">
                    <TitleHeader
                        title="Curated Events & Experiences"
                        sub="Past Highlights"
                    />
                    <p className="text-lg text-gray-700 dark:text-gray-300 max-w-3xl mx-auto mt-6">
                        Browse our portfolio of past events, seasonal installations, and inspired gatherings that
                        showcase our dedication to creating meaningful, memorable, and masterfully styled experiences.
                    </p>
                </div>

                {/* Display current page info */}
                <div className="text-center mb-10">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Displaying {(currentPage - 1) * eventsPerPage + 1}-{Math.min(currentPage * eventsPerPage, eventsData.length)} of {eventsData.length} events
                    </p>
                </div>

                {/* Masonry gallery with uniform height */}
                <div
                    ref={galleryRef}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {pageEvents.map(event => (
                        <div
                            key={event.id}
                            className={`gallery-item relative ${widthClasses[event.size]} h-80 overflow-hidden rounded-2xl shadow-md transform transition-all duration-500 hover:scale-[1.02] hover:shadow-xl group cursor-pointer`}
                            onClick={() => openModal(event)}
                            role="button"
                            aria-label={`View ${event.title} in fullscreen`}
                        >
                            {/* Event image */}
                            <div className="absolute inset-0">
                                <div
                                    className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                    style={{ backgroundImage: `url(${event.image})` }}
                                ></div>
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-70 group-hover:opacity-80 transition-opacity duration-300"></div>
                            </div>

                            {/* Event details */}
                            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                                <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                                    {/* <h3 className="text-2xl font-serif mb-2">{event.title}</h3>
                  <p className="text-sm text-white/80 mb-2">{event.description}</p> */}
                                    <span className="text-sm font-light underline underline-offset-4 opacity-80 hover:opacity-100 transition-opacity">
                                        View Fullscreen
                                    </span>
                                </div>
                            </div>

                            {/* Decorative border */}
                            <div className="absolute inset-0 border border-white/10 rounded-2xl pointer-events-none"></div>
                        </div>
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div ref={paginationRef} className="mt-16 flex flex-wrap justify-center gap-2">
                        {renderPaginationButtons()}
                    </div>
                )}
            </div>

            {/* Fullscreen Modal */}
            {isModalOpen && selectedEvent && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
                    onClick={handleModalBackdropClick}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-title"
                >
                    <div
                        ref={modalRef}
                        className="relative max-w-7xl max-h-full w-full flex flex-col"
                    >
                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 text-white bg-black/70 hover:bg-black/90 p-3 rounded-full transition-colors shadow-lg"
                            aria-label="Close modal"
                        >
                            <X size={28} strokeWidth={2.5} />
                        </button>

                        {/* Modal content */}
                        <div className="overflow-hidden rounded-lg max-h-[80vh]">
                            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                                <img
                                    src={selectedEvent.image}
                                    alt={selectedEvent.title}
                                    className="absolute inset-0 object-contain w-full h-full"
                                />
                            </div>
                        </div>

                        {/* Event information */}
                        {/* <div className="bg-black/70 text-white p-6 rounded-b-lg">
              <h2 id="modal-title" className="text-3xl font-serif mb-2">{selectedEvent.title}</h2>
              <p className="text-lg text-white/80">{selectedEvent.description}</p>
            </div> */}
                    </div>
                </div>
            )}
        </section>
    );
};

export default PastEventsGallery;