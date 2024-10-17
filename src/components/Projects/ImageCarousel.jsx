import React, { useLayoutEffect, useState } from "react";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const ImageCarousel = ({ images }) => {
	const [imageArray, setImageArray] = useState(images);
	const [index, setIndex] = useState(0);

	useLayoutEffect(() => {
		const lastIndex = imageArray.length - 1;
		if (index < 0) {
			setIndex(lastIndex);
		}
		if (index > lastIndex) {
			setIndex(0);
		}
	}, [index, imageArray]);

	return (
		<div className="img-wrapper">
			{imageArray.map((item, imageIndex) => {
				const { number, title, image } = item;
				let position = "nextImage";
				if (imageIndex === index) {
					position = "activeImage";
				}
				if (
					imageIndex === index - 1 ||
					(index === 0 && imageIndex === imageArray.length - 1)
				) {
					position = "lastImage";
				}
				return (
					<img key={number} className={position} src={image} alt={title} />
				);
			})}

			<div className="item-indicator">
				{imageArray.map((item, id) => {
					let position = false;
					if (id === index) {
						position = true;
					}

					return (
						<div key={id} className={position ? "active dot" : "dot"}></div>
					);
				})}
			</div>
			<button className="prev" onClick={() => setIndex(index - 1)}>
				<FiChevronLeft />
			</button>
			<button
				className="next"
				onClick={() => {
					setIndex(index + 1);
				}}
			>
				<FiChevronRight />
			</button>
		</div>
	);
};

export default ImageCarousel;
