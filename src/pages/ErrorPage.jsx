import React from "react";
import { motion } from "framer-motion";

const ErrorPage = () => {
	return (
		<motion.section
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0, transition: { duration: 0.1 } }}
			className="error"
		>
			<div className="wrapper">
				<h1>Oeps.. er is iets fout gegaan</h1>
			</div>
		</motion.section>
	);
};

export default ErrorPage;
