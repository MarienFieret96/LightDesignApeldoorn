import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import {
	ContactPage,
	ErrorPage,
	HomePage,
	InspirationPage,
	NotFoundPage,
	ProjectsPage,
} from "../pages";

function AnimatedRoutes() {
	const location = useLocation();
	return (
		<AnimatePresence mode="wait">
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<HomePage />} />
				<Route path="/inspiratie" element={<InspirationPage />} />
				<Route path="/projecten" element={<ProjectsPage />} />
				<Route path="/contact" element={<ContactPage />} />
				<Route path="/contact/:id" element={<ContactPage />} />
				<Route path="/error" element={<ErrorPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</AnimatePresence>
	);
}

export default AnimatedRoutes;
