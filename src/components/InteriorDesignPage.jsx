import PremiumScrollSequence from '../components/PremiumScrollSequence';

// Example implementation in your page
const InteriorDesignPage = () => {
  // Define your image sequence - make sure these paths are correct
  const livingRoomTransformation = [
    "/images/sequence/interior-001.jpg",
    "/images/sequence/interior-002.jpg",
    "/images/sequence/interior-003.jpg",
    // Add more images as needed
  ];

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section */}
      <section className="h-screen flex items-center justify-center bg-neutral-100">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Design Studio Name</h1>
          <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl mx-auto">
            Transforming spaces into extraordinary experiences
          </p>
          <div className="mt-12">
            <a 
              href="#experience" 
              className="px-8 py-3 bg-neutral-900 text-white rounded-full hover:bg-neutral-800 transition-colors"
            >
              Explore Our Vision
            </a>
          </div>
        </div>
      </section>

      {/* Scroll Sequence Experience */}
      <div id="experience">
        <PremiumScrollSequence 
          images={livingRoomTransformation}
          overlayContent={{
            heading: "Where Vision Becomes Reality",
            subheading: "Scroll to follow the transformation",
          }}
          options={{
            pinDuration: 300, // Controls how long the sequence plays
            scrubAmount: 0.8, // Higher values make scrolling more responsive
            fadeInDuration: 0.8,
            textOpacity: 0.95,
          }}
        />
      </div>

      {/* Content After Sequence */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-semibold mb-8">Our Design Philosophy</h2>
            <p className="text-lg text-neutral-700">
              We believe that exceptional interior design harmonizes aesthetics, functionality, 
              and your unique personality. Our process demonstrates our commitment to transforming 
              ordinary spaces into extraordinary environments.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default InteriorDesignPage;