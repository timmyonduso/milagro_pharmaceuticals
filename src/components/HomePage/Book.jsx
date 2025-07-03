import { useState } from 'react'

function Book() {
    const [expandedIndex, setExpandedIndex] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const panels = [
        {
            title: "NRG Xips",
            benefit: "Bioenergetic balance through frequency-based skin patches.",
            description: "NRG Xips deliver an energetic experience designed to restore the body's natural vibrational harmony. These wearable patches help recalibrate cellular charge, combat stress, and promote equilibrium—no pills, drops, or fumes required. Just place them on bare skin for a non-invasive boost in physical, mental, and emotional performance.",
            video: "https://res.cloudinary.com/ddsp4vxxc/video/upload/v1750368119/nrgXips_d0ojxp.mp4",
            image: "/images/nrg-xips.png"
        },
        {
            title: "CBDXTRA",
            benefit: "Full-extract CBD oil with complete cannabinoid synergy.",
            description: "CBDXTRA is a solventless, full-plant extract preserving over 80 cannabinoids and 100+ terpenes through a vibration and pressure-based process. This premium formula produces the 'entourage effect' for optimal therapeutic benefit, supporting stress relief, pain management, and holistic wellness in formats like tinctures, vapes, and sublingual strips.",
            video: "https://res.cloudinary.com/ddsp4vxxc/video/upload/v1750368109/cbdExtra_dnlisw.mp4",
            image: "/images/cbdExtra.png"
        },
        {
            title: "RGNR‑8",
            benefit: "Regenerative RNA-based therapy for peak cellular performance.",
            description: "RGNR‑8 reactivates the body's innate regenerative processes using microRNA sourced from placental stem cells. These biological messages help re-engage dormant healing functions, allowing the body to reverse damage, combat disease, and maintain youthful energy—especially critical in high-stress environments or aging populations.",
            video: "https://res.cloudinary.com/ddsp4vxxc/video/upload/v1750368119/rgnr8_vfbjp1.mp4",
            image: "/images/rgnr8.png"
        },
        {
            title: "Smart X-Radiation Shield",
            benefit: "Advanced RF radiation protection for 4G/5G devices.",
            description: "The Smart X-Radiation Shield neutralizes harmful RF emissions from 4G/5G networks using a carbon-based composite programmed through AFG technology. Attach it to phones, tablets, or laptops to shield your body from accumulated radiation exposure and protect your cellular integrity over time.",
            video: "https://player.vimeo.com/video/638745091?color&autopause=0&loop=0&muted=0&title=1&portrait=1&byline=1#t=",
            image: "/images/x-radiation.png"
        }
    ];

    const handleClick = (index) => {
        setExpandedIndex(index);
        // Open modal after panel expansion animation completes (500ms)
        setTimeout(() => {
            setSelectedProduct(panels[index]);
            setModalOpen(true);
        }, 500);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <>
            <main id="products" className="w-screen h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 overflow-hidden">
                {/* Premium background with brand colors */}
                <div className="h-full w-full overflow-hidden flex items-center justify-center p-4 relative"
                     style={{
                         backgroundImage: `url(${panels[expandedIndex].image})`,
                         backgroundRepeat: "no-repeat",
                         backgroundSize: "cover"
                     }}
                >
                    {/* Enhanced overlay with brand color gradient */}
                    <div className="inset-0 absolute bg-gradient-to-br from-blue-900 via-slate-900 to-blue-800 opacity-85 backdrop-blur-md z-0"></div>

                    {/* Gold accent border for luxury touch */}
                    <div className="absolute inset-4 border border-yellow-400 opacity-20 rounded-3xl pointer-events-none z-5"></div>

                    <div className="flex w-full max-w-7xl h-4/5 gap-3 items-center justify-center z-10">
                        {panels.map((panel, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`
                                    h-full rounded-2xl cursor-pointer relative group
                                    transition-all duration-500 ease-in-out overflow-hidden
                                    ${expandedIndex === index
                                    ? 'w-3/5 bg-white shadow-2xl shadow-yellow-400/20 ring-2 ring-yellow-400'
                                    : 'w-1/6 bg-slate-100 hover:bg-white hover:shadow-lg hover:shadow-blue-500/20 hover:ring-1 hover:ring-blue-400'
                                }
                                    min-w-12 block transform hover:scale-105
                                `}
                            >
                                {/* Product image with enhanced overlay */}
                                <img
                                    src={panel.image}
                                    alt={panel.title}
                                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Enhanced text overlay for expanded panel */}
                                {expandedIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent p-8">
                                        {/* Premium badge */}
                                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-yellow-400 text-slate-900 text-sm font-semibold mb-4">
                                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            Premium Quality
                                        </div>

                                        <div className="text-white">
                                            <h3 className="text-3xl font-bold mb-3 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
                                                {panel.title}
                                            </h3>
                                            <p className="text-xl text-blue-200 leading-relaxed font-medium">
                                                {panel.benefit}
                                            </p>

                                            {/* Call-to-action hint */}
                                            <div className="mt-4 flex items-center text-green-400 font-medium">
                                                <svg className="w-5 h-5 mr-2 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                </svg>
                                                Click to learn more
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Collapsed panel title */}
                                {expandedIndex !== index && (
                                    <div className="absolute inset-0 flex items-end justify-center p-4">
                                        <div className="bg-gradient-to-t from-slate-900 via-slate-800/90 to-transparent w-full text-center p-4 rounded-b-2xl">
                                            <h4 className="text-white font-bold text-lg writing-mode-vertical transform rotate-0 group-hover:text-yellow-400 transition-colors duration-300">
                                                {panel.title}
                                            </h4>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Enhanced Modal */}
            {modalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-blue-900/80 to-slate-900/90 backdrop-blur-lg z-50 flex items-start justify-center p-4 pt-16 overflow-y-auto">
                    <div className="bg-white rounded-3xl max-w-5xl w-full shadow-2xl shadow-yellow-400/20 ring-2 ring-yellow-400/30 transform transition-all duration-300 scale-100 my-8 overflow-hidden">
                        {/* Modal Header with enhanced styling */}
                        <div className="relative">
                            {/* Premium close button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-6 right-6 z-20 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 rounded-full p-3 shadow-lg transition-all duration-200 hover:scale-110 hover:shadow-xl hover:shadow-yellow-400/50"
                            >
                                <svg className="w-6 h-6 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video Embed with brand accent border */}
                            <div className="aspect-video bg-gradient-to-br from-slate-100 to-blue-50 rounded-t-3xl overflow-hidden relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-green-500/10 z-10 pointer-events-none"></div>
                                <iframe
                                    src={selectedProduct.video}
                                    title={`${selectedProduct.title} Video`}
                                    className="w-full h-full relative z-0"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Enhanced Modal Content */}
                        <div className="p-10 bg-gradient-to-br from-white to-blue-50/30">
                            <div className="flex items-start gap-8">
                                {/* Product image with luxury styling */}
                                <div className="flex-shrink-0">
                                    <div className="relative">
                                        <img
                                            src={selectedProduct.image}
                                            alt={selectedProduct.title}
                                            className="w-36 h-36 object-cover rounded-2xl shadow-xl ring-2 ring-yellow-400/50"
                                        />
                                        {/* Quality badge overlay */}
                                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-500 text-slate-900 rounded-full p-2 shadow-lg">
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1">
                                    {/* Premium product category */}
                                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-semibold mb-4">
                                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        Milagro Pharmaceuticals
                                    </div>

                                    <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-700 via-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
                                        {selectedProduct.title}
                                    </h2>

                                    <p className="text-xl text-green-700 font-semibold mb-6 p-4 bg-gradient-to-r from-green-50 to-yellow-50 rounded-xl border-l-4 border-green-500">
                                        {selectedProduct.benefit}
                                    </p>

                                    <p className="text-slate-700 leading-relaxed text-lg mb-8">
                                        {selectedProduct.description}
                                    </p>

                                    {/* Enhanced CTA buttons with brand colors */}
                                    <div className="flex flex-wrap gap-4">
                                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 ring-2 ring-transparent hover:ring-yellow-400/50">
                                            Learn More
                                        </button>
                                        <button className="bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-yellow-400/25 ring-2 ring-transparent hover:ring-blue-400/50">
                                            Request Sample
                                        </button>
                                        <button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 ring-2 ring-transparent hover:ring-yellow-400/50">
                                            Contact Expert
                                        </button>
                                    </div>

                                    {/* Trust indicators */}
                                    <div className="mt-8 flex items-center gap-6 text-sm text-slate-600">
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full"></div>
                                            <span>FDA Compliant</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-green-600 rounded-full"></div>
                                            <span>Premium Quality</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                                            <span>Research Backed</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Book