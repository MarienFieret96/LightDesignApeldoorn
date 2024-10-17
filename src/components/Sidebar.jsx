import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGeneralContext } from "../context/general_context";
import styled from "styled-components";
import {
	FaTimes,
	FaRegCopy,
	FaInstagram,
	FaLinkedinIn,
	FaPinterestP,
	FaWhatsapp,
} from "react-icons/fa";
import Logo from "../assets/images/logo.png";
import LogoSVG from "../assets/icons/LogoSVG.svg";

const links = [
	{
		id: 1,
		text: "Inspiratie",
		url: "/inspiratie",
	},
	{
		id: 2,
		text: "Projecten",
		url: "/projecten",
	},
	{
		id: 3,
		text: "Contact",
		url: "/contact",
	},
];

const Sidebar = () => {
	const { isSidebarOpen, closeSidebar } = useGeneralContext();
	const [copy, setCopy] = useState(false);
	const sidebarRef = useRef(null);
	const scrollToTop = () => {
		closeSidebar();
		window.scrollTo(0, 0);
	};
	const copyText = (e) => {
		navigator.clipboard.writeText(e.target.innerText);
	};
	useEffect(() => {
		const updateMousePosition = (e) => {
			if (!sidebarRef.current) return;
			const { clientX, clientY } = e;
			sidebarRef.current.style.setProperty("--x", `${clientX}px`);
			sidebarRef.current.style.setProperty("--y", `${clientY}px`);
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);
	return (
		<Wrapper>
			<div
				ref={sidebarRef}
				className={isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}
			>
				<div className="sidebar-wrapper">
					<div className="sidebar-header">
						<Link onClick={scrollToTop} to="/">
							<img className="logo" src={LogoSVG} alt="" />
						</Link>
						<div className="sidebar-container">
							{/* /contact */}
							<Link
								onClick={scrollToTop}
								to="/contact/start-project"
								className="start-btn"
							>
								Start project
							</Link>
							<div className="icon" type="button" onClick={closeSidebar}>
								<FaTimes />
							</div>
						</div>
					</div>
				</div>
				<div className="wrapper">
					<div className="social-wrapper">
						<div className="contact-wrapper">
							<h6>Contact ons</h6>
							<p className={copy ? "copy" : ""}>
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
							</p>
						</div>
						<div className="social-container">
							<h6>Socials</h6>
							<ul className="social-links">
								<li>
									<a
										target="_blank"
										href="https://www.instagram.com/light.design.apeldoorn/"
									>
										<span className="text">Instagram</span>
										<span className="icon">
											<FaInstagram />
										</span>
									</a>
								</li>

								<li>
									<a
										target="_blank"
										href="https://www.linkedin.com/company/light-design-apeldoorn/"
									>
										<span className="text">LinkedIn</span>
										<span className="icon">
											<FaLinkedinIn />
										</span>
									</a>
								</li>
								<li>
									<a
										target="_blank"
										href="https://nl.pinterest.com/lightdesignapeldoorn/"
									>
										<span className="text">Pinterest</span>
										<span className="icon">
											<FaPinterestP />
										</span>
									</a>
								</li>
								<li>
									<a target="_blank" href="https://wa.me/31636459459">
										<span className="text">WhatsApp</span>
										<span className="icon">
											<FaWhatsapp />
										</span>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<ul className="sidebar-links">
						{links.map(({ id, text, url }) => {
							return (
								<li key={id}>
									<Link to={url} onClick={scrollToTop}>
										{text}
									</Link>
								</li>
							);
						})}
						<li>
							<Link
								onClick={scrollToTop}
								className="btn-link"
								to="/contact/start-project"
							>
								<button className="btn btn-primary project">
									start project
								</button>
							</Link>
						</li>
					</ul>
				</div>
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	text-align: center;
	overflow: hidden;
	position: relative;

	.sidebar-wrapper {
		width: 100%;
		height: 0;
		overflow: visible;
		position: absolute;
		top: 0;
		left: 0;
		z-index: 5;
		.sidebar-header {
			height: 5rem;
			width: var(--width);
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-inline: auto;
			color: var(--clr-white);
			font-size: 2rem;
			z-index: 6;

			.logo {
				height: 24.5px;
			}
			.icon {
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
			}
			.sidebar-container {
				.start-btn {
					display: none;
				}
			}
		}
	}

	.sidebar-links {
		color: var(--clr-white);
		list-style-type: none;
		padding: 0;
		flex: 1;
		display: flex;
		justify-content: center;
		flex-direction: column;
		text-align: start;
		width: 100%;
		margin-top: 4rem;
		.btn {
			width: min(100%, 300px);
			padding: 0.5rem 1.5rem;
			border: none;
			font-weight: 500;
			margin-top: 2rem;
			border: 2px solid var(--clr-white);
		}
	}

	.sidebar-links a {
		display: block;
		text-align: center;
		font-size: 2.75rem;
		text-transform: capitalize;
		padding: 1rem 1.5rem;
		color: var(--clr-white);
		transition: var(--transition);
		letter-spacing: var(--spacing);
	}

	.wrapper {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column-reverse;
		min-height: 100vh;
	}
	.social-wrapper {
		text-align: start;
		display: flex;
		flex-direction: column;
		justify-content: space-between;

		padding: 38px 0;
		.contact-wrapper svg {
			transition: var(--transition);
			opacity: 0;
		}
		.contact-wrapper .copy svg {
			opacity: 0.8;
		}
		ul {
			margin-block-start: 0;
			margin-block-end: 0;
			padding-inline-start: 0;
		}
		h6 {
			opacity: 80%;
			font-size: 16px;
			line-height: 26px;
			font-weight: 600;
			padding: 0.3vw 8rem;

			transition: var(--transition);
			display: flex;
			align-items: center;
		}
		li {
			list-style: none;
		}
		p {
			span {
				margin-right: 0.5rem;
			}
		}
		p,
		li {
			font-size: 16px;
			line-height: 26px;
			font-weight: 600;
			opacity: 50%;
			transition: var(--transition);
			display: flex;
			align-items: center;
			span {
				cursor: pointer;
				color: var(--clr-white);
			}
		}
		p:hover,
		li:hover {
			opacity: 100%;
		}
		.contact-wrapper {
			display: none;
		}

		.social-container {
			h6 {
				display: none;
			}
			.social-links {
				display: flex;
				width: 90vw;
				justify-content: space-evenly;
				.text {
					display: none;
				}
				.icon {
					font-size: 32px;
				}
			}
		}
	}
	.sidebar {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: var(--clr-black);
		background-image: radial-gradient(
			circle farthest-side at var(--x) var(--y),
			#333 0%,
			transparent 100%
		);
		color: white;
		transition: var(--transition);
		transform: translate(100%);
		z-index: -1;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		opacity: 0;
	}
	.show-sidebar {
		transform: translate(0);
		opacity: 1;
		z-index: 1000;
	}
	@media screen and (min-width: 750px) {
		.wrapper {
			flex-direction: row;
			min-height: auto;
		}
		.sidebar-links {
			padding-right: 4rem;
			margin-top: 0;
			a {
				font-size: 3.5rem;
				text-align: start;
			}
			a:hover {
				transform: translateX(6px);
			}
			.btn-link {
				display: none;
			}
		}
		.sidebar-wrapper .sidebar-header .sidebar-container {
			display: flex;
			gap: 2rem;
			.start-btn {
				display: block;
				background-color: var(--clr-gold);
				color: #fff;
				padding: 0.5rem 1.5rem;
				border-radius: 26px;
				font-size: 1rem;
				font-weight: 500;
			}
		}
		.social-wrapper {
			flex: 1;
			height: 100%;
			p,
			li {
				padding: 0.3vw 4rem 0.3vw 8rem;
			}
			.contact-wrapper {
				display: block;
			}
			.social-container {
				h6 {
					display: block;
				}
				.social-links {
					display: flex;
					flex-direction: column;
					width: 100%;
					justify-content: space-evenly;
					.text {
						display: block;
					}
					.icon {
						display: none;
					}
				}
			}
		}
	}
	@media screen and (min-width: 1236px) {
		.sidebar-links a {
			font-size: 3.5rem;
			text-align: left;
		}
		.sidebar-wrapper .sidebar-header {
			width: 90vw;
			margin-inline: auto;
			.close-btn {
				margin-right: 0;
			}
		}
	}
`;

export default Sidebar;
