const GridImage = ({ image, layout }) => {
	return (
		<div
			className={`${layout} bg-center bg-cover relative`}
			style={{ backgroundImage: `url(${image})` }}
		>
			<div className="absolute left-0 top-0 w-full h-full bg-black opacity-40"></div>
		</div>
	);
};

export default GridImage;