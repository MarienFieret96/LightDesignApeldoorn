import React from "react";
import { FaAngleDown } from "react-icons/fa";
import { Link } from "react-router-dom";

const Contact = ({ scrollToTop }) => {
	return (
		<section className="section end">
			<div className="wrapper">
				<h3>
					<span className="span">Let's connect!</span>
				</h3>
				<h3>
					Benieuwd wat Light Design Apeldoorn <br /> voor u kan betekenen?
				</h3>
				<div className="row">
					<Link onClick={scrollToTop} to="/contact">
						<button className="btn btn-primary">contact</button>
					</Link>
					<Link onClick={scrollToTop} to="/contact">
						<button className="btn btn-primary project">start project</button>
					</Link>
				</div>
			</div>
		</section>
	);
};

export default Contact;
