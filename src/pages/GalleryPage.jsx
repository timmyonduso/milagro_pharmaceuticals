import Contact from "../sections/Contact"
import TitleHeader from "../components/TitleHeader"
import GalleryHero from "../components/gallery/GalleryHero"
import BeforeAfterGallery from "../components/gallery/BeforeAfterGallery"
import GalleryGrid from "../components/gallery/GalleryGrid"

const GalleryPage = () => {
    return (
        <>
            <GalleryHero />
            <div className="py-12" id="grid">
                <div className="container mx-auto px-4">
                    <TitleHeader title="A Glimpse Into Our Design Journey"
                        sub="Discover our favorite transformations and curated spaces" />
                </div>
                <GalleryGrid />
            </div>

            {/* Before & After Section */}
            <BeforeAfterGallery />

            <Contact />
        </>
    )
}

export default GalleryPage
