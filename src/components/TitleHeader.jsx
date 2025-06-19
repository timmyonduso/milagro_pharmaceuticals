const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5 text-center">
      {/* Subheading Badge */}
      <div className="hero-badge bg-[#f4f0ec] text-[#4D5053] dark:bg-zinc-900 dark:text-white px-4 py-1 rounded-full text-sm font-medium shadow-sm">
        <p>{sub}</p>
      </div>

      {/* Main Title */}
      <div>
        <h1 className="font-semibold md:text-5xl text-3xl text-black dark:text-white leading-tight">
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
