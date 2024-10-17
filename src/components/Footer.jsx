import React, { useState } from "react";
import {
	FaInstagram,
	FaLinkedinIn,
	FaPinterestP,
	FaWhatsapp,
	FaRegCopy,
} from "react-icons/fa";

const Footer = () => {
	const [copy, setCopy] = useState(false);
	const copyText = (e) => {
		navigator.clipboard.writeText(e.target.innerText);
	};
	return (
		<div className="footer">
			<div className="email">
				<h6 className={copy ? "copy" : ""}>
					<span
						onClick={(e) => {
							setCopy(true);
							setTimeout(() => {
								setCopy(false);
							}, 1500);
							copyText(e);
						}}
					>
						info@lightdesignapeldoorn.nl
					</span>
					<FaRegCopy />
				</h6>
				<p>Het Kasteel 115, 7325PB Apeldoorn</p>
			</div>
			<div className="socials">
				<a
					target="_blank"
					href="https://www.instagram.com/light.design.apeldoorn/"
				>
					<FaInstagram />
				</a>
				<a
					target="_blank"
					href="https://www.linkedin.com/company/light-design-apeldoorn/"
				>
					<FaLinkedinIn />
				</a>
				<a
					target="_blank"
					href="https://nl.pinterest.com/lightdesignapeldoorn/"
				>
					<FaPinterestP />
				</a>
				<a target="_blank" href="https://wa.me/31636459459">
					<FaWhatsapp />
				</a>
			</div>
		</div>
	);
};

export default Footer;
