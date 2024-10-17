import React from "react";
import { FaAngleDown } from "react-icons/fa";
import Logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";

const Hero = () => {
	return (
		<>
			<img
				className="background first"
				// srcSet="src/assets/images/lamp2.webp 400w, src/assets/images/hero1.webp 800w, src/assets/images/hero2.webp 1600w"
				// sizes="100vw"
				src="../assets/hero1-44817015.webp"
				alt=""
				loading="lazy"
			/>
			<img
				className="background second"
				src="../assets/hero2-5bef3003.webp"
				alt=""
				loading="lazy"
			/>

			<div className="wrapper hero">
				{/* <h1>Light.</h1>
				<h1>Design.</h1>
				<div className="row">
					<h1>Apeldoorn</h1>
					<h1 className="dot">.</h1>
				</div> */}

				<img src={Logo} alt="" />
				<Link to="/contact/start-project">
					<button className="btn btn-primary">Start Project</button>
				</Link>
				<Link to="/inspiratie">
					<button className="btn btn-tertiary">Inspiratie</button>
				</Link>
			</div>
			<button className="button">
				<FaAngleDown />
			</button>
		</>
	);
};

export default Hero;
