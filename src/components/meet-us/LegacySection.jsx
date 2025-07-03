const LegacySection = () => {
    return (
        <div className="mt-16 text-center">
            <h3 className="text-xl font-semibold text-black dark:text-white mb-4">
                A Legacy of Design Excellence
            </h3>
            <p className="text-[#4D5053] dark:text-white/70 max-w-3xl mx-auto">
                Together, Sharon and Brittany Mann blend decades of experience with fresh perspective,
                creating a powerful design duo that honors tradition while embracing innovation. Their
                shared passion for exceptional design and attention to detail ensures that every project
                exceeds expectations.
            </p>

            {/* Meet team in video call to action */}
            <div className="mt-8">
                <p className="text-[#4D5053] dark:text-white/70 mb-4">
                    Explore their videos to learn more about their personal journeys and see their stunning design work.
                </p>
                <div className="flex items-center justify-center space-x-4 mt-6">
                    <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-transparent rounded-full"></div>
                    <div className="text-yellow-400">✦</div>
                    <div className="w-16 h-1 bg-gradient-to-l from-yellow-400 to-transparent rounded-full"></div>
                </div>
            </div>
        </div>
    );
};

export default LegacySection;