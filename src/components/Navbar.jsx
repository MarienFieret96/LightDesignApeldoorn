import React, { useState } from "react";
import { useGeneralContext } from "../context/general_context";
import { FaBars } from "react-icons/fa";
import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/images/logo.png";
import LogoSVG from "../assets/icons/LogoSVG.svg";
import { motion } from "framer-motion";

const NavbarLink = ({ handleClick, link, selectedTab }) => {
	return (
		<NavLink onClick={() => handleClick(link)} to={`/${link}`}>
			<span>{link}</span>
			{selectedTab === link ? (
				<motion.div className="underline" layoutId="underline" />
			) : null}
		</NavLink>
	);
};

const Navbar = () => {
	const { openSidebar } = useGeneralContext();
	const navLinks = ["", "inspiratie", "projecten", "contact"];
	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};
	const [scrolling, setScrolling] = useState(true);
	const [selectedTab, setSelectedTab] = useState(navLinks[0]);

	const changeNavbar = () => {
		if (window.scrollY >= 90) {
			setScrolling(false);
		} else {
			setScrolling(true);
		}
	};

	const handleClick = (tab) => {
		scrollToTop();
		setSelectedTab(tab);
	};

	window.addEventListener("scroll", changeNavbar);

	// const [device, setDevice] = useState(false);

	// const checkIfMobile = () => {
	// 	if (document.body.clientWidth < 650) return true;
	// 	return false;
	// };

	// window.onresize = () => {
	// 	const mobile = checkIfMobile();
	// 	setDevice(mobile);
	// };

	// useEffect(() => {
	// 	const mobile = checkIfMobile();
	// 	setDevice(mobile);
	// }, []);

	return (
		<div className="navbar-container">
			<nav
				className={scrolling ? "row navbar" : "row navbar scroll"}
				// style={{ position: scrolling ? "absolute" : "sticky" }}
			>
				<Link onClick={() => handleClick("home")} to="/">
					<img className="logo" src={LogoSVG} alt="logo" />
				</Link>
				<div className="links row">
					{/* /inspiratie */}

					{navLinks.map((link, index) => {
						if (link)
							return (
								<NavbarLink
									key={index}
									handleClick={handleClick}
									link={link}
									selectedTab={selectedTab}
								/>
							);
					})}

					{/* /contact */}
					<Link
						onClick={() => handleClick("start")}
						to="/contact/start-project"
						className="start-btn"
					>
						Start project
					</Link>
				</div>
				<div className="icon" onClick={openSidebar}>
					<FaBars />
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
