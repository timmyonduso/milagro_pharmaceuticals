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
            <main id="products" className="w-screen h-screen bg-black overflow-hidden">
                <div className="h-full w-full overflow-hidden flex items-center justify-center p-4 relative"
                     style={{
                         backgroundImage: `url(${panels[expandedIndex].image})`,
                         backgroundRepeat: "no-repeat",
                         backgroundSize: "cover"
                     }}
                >
                    <div className="inset-0 absolute bg-[rgba(0,0,0,0.7)] backdrop-blur-md z-0"></div>
                    <div className="flex w-full max-w-7xl h-[80vh] gap-2 items-center justify-center z-10">
                        {panels.map((panel, index) => (
                            <div
                                key={index}
                                onClick={() => handleClick(index)}
                                className={`
                                    h-full rounded-2xl bg-white cursor-pointer relative
                                    transition-all duration-500 ease-in-out overflow-hidden
                                    ${expandedIndex === index ? 'w-[60%]' : 'w-[10%] hover:bg-gray-200'}
                                    min-w-[40px] block
                                `}
                            >
                                <img src={panel.image} alt={panel.title} className='w-full h-full object-cover object-top'/>

                                {/* Text overlay for expanded panel */}
                                {expandedIndex === index && (
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/60 to-transparent p-6">
                                        <div className="text-white">
                                            <h3 className="text-2xl font-bold mb-2 text-blue-100">
                                                {panel.title}
                                            </h3>
                                            <p className="text-lg text-blue-200 leading-relaxed">
                                                {panel.benefit}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Modal */}
            {modalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-start justify-center p-4 pt-24 overflow-y-auto">
                    <div className="bg-white rounded-2xl max-w-4xl w-full shadow-2xl transform transition-all duration-300 scale-100 my-8">
                        {/* Modal Header */}
                        <div className="relative">
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110"
                            >
                                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Video Embed */}
                            <div className="aspect-video bg-gray-100 rounded-t-2xl overflow-hidden">
                                <iframe
                                    src={selectedProduct.video}
                                    title={`${selectedProduct.title} Video`}
                                    className="w-full h-full"
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-8">
                            <div className="flex items-start gap-6">
                                <div className="flex-shrink-0">
                                    <img
                                        src={selectedProduct.image}
                                        alt={selectedProduct.title}
                                        className="w-32 h-32 object-cover rounded-xl shadow-lg"
                                    />
                                </div>

                                <div className="flex-1">
                                    <h2 className="text-3xl font-bold text-gray-900 mb-3">
                                        {selectedProduct.title}
                                    </h2>

                                    <p className="text-xl text-blue-600 font-medium mb-4">
                                        {selectedProduct.benefit}
                                    </p>

                                    <p className="text-gray-700 leading-relaxed text-lg">
                                        {selectedProduct.description}
                                    </p>

                                    <div className="mt-6 flex gap-3">
                                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                                            Learn More
                                        </button>
                                        <button className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-medium transition-colors duration-200">
                                            Request Sample
                                        </button>
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