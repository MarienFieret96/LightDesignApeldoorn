import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.1 } }}
			className="error"
		>
			<div className="wrapper">
				<h2>Oeps.. die pagina bestaat niet</h2>
				<Link
					to="/"
					className="btn btn-primary"
					style={{ margin: "4rem 0 0 0" }}
				>
					Terug naar home
				</Link>
			</div>
		</motion.section>
	);
};

export default NotFoundPage;
