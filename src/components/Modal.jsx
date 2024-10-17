import Backdrop from "./Backdrop";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import React from "react";

const formatPrice = (number) => {
	return new Intl.NumberFormat("nl-NL", {
		style: "currency",
		currency: "EUR",
	}).format(number / 100);
};

const dropIn = {
	hidden: {
		transform: "translateY(-100%)",
		opacity: 0,
	},
	visible: {
		transform: "translateY(0)",
		opacity: 1,
	},
	exit: {
		transform: "translateY(100%)",
		opacity: 0,
	},
};

const Modal = ({ handleClose, content }) => {
	const { naam, prijs, afbeelding, beschrijving, specificaties } = content;
	return (
		<Backdrop onClick={handleClose}>
			<motion.div
				onClick={(e) => e.stopPropagation()}
				className="modal"
				variants={dropIn}
				initial="hidden"
				animate="visible"
				exit="exit"
			>
				<div className="close-button" onClick={handleClose}>
					<FaTimes />
				</div>
				<div className="content-wrapper">
					<div className="img-container">
						<img src={afbeelding} alt={naam} />
					</div>
					<div className="text-container">
						<h2>{naam}</h2>
						<h3>Beschrijving:</h3>
						<p>Coming soon</p>
						<p>Coming soon</p>
						<p>Coming soon</p>
						<p>Coming soon</p>
						<p>Coming soon</p>
						{/* {beschrijving.map((item, index) => {
							return <p key={index}>{item}</p>;
						})}

						<h3>Specificaties:</h3>
						<ul>
							{specificaties?.map((item, id) => {
								return <li key={id}>{item}</li>;
							})}
						</ul> */}
						<h3>Prijs:</h3>
						{/* <p>{formatPrice(prijs)}</p> */}
						<p>Op aanvraag</p>
					</div>
				</div>
			</motion.div>
		</Backdrop>
	);
};

export default Modal;
