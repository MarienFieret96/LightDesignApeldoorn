import React, { useEffect, useRef } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { Footer } from "../components";
import { Hero, Inspiratie, Contact } from "../components/Home";

//image imports
import StockFoto1 from "../assets/images/homepage-projecten.webp";
import StockFoto2 from "../assets/images/homepage-inspiratie.webp";

import { useInView, motion, useScroll, useTransform } from "framer-motion";

const HomePage = () => {
	const contactRef = useRef(null);
	const heroRef = useRef(null);
	const quoteRef = useRef(null);
	const footerRef = useRef(null);
	const contactIsInView = useInView(contactRef, { amount: 0.8 });
	const FooterIsInView = useInView(footerRef, { amount: 0.1 });
	const quoteIsInView = useInView(quoteRef, { amount: 0.7 });

	const scrollToTop = () => {
		window.scrollTo(0, 0);
	};

	const { scrollYProgress } = useScroll({
		target: heroRef,
		offset: ["start start", "end end"],
	});
	const x = useTransform(scrollYProgress, [0, 0.7], [0, 1]);

	useEffect(() => {
		const updateMousePosition = (e) => {
			if (!contactRef.current) return;
			const { clientX, clientY } = e;
			contactRef.current.style.setProperty("--x", `${clientX}px`);
			contactRef.current.style.setProperty("--y", `${clientY}px`);
		};
		window.addEventListener("mousemove", updateMousePosition);
		return () => {
			window.removeEventListener("mousemove", updateMousePosition);
		};
	}, []);

	useEffect(() => {
		ReactGA.pageview(window.location.pathname);
	}, []);

	return (
		<Wrapper>
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0, transition: { duration: 0.1 } }}
			>
				<div className="hero-section1" ref={heroRef}>
					<motion.div
						style={{ opacity: x }}
						className="overlay-hero"
					></motion.div>
					<div className="main">
						<Hero />
					</div>
					<div
						ref={quoteRef}
						style={{ opacity: quoteIsInView ? "1" : "0" }}
						className="quote"
					>
						<h2>Geniet van elke ruimte met sfeervolle verlichting</h2>
					</div>
				</div>
				<div className="background-gradient">
					<div
						style={{
							background:
								contactIsInView || FooterIsInView
									? "rgba(0, 0, 0, 0) "
									: "#000000",
							transition: "all .3s linear",
						}}
					>
						<Inspiratie
							scrollToTop={scrollToTop}
							StockFoto1={StockFoto1}
							StockFoto2={StockFoto2}
						/>
						<div ref={contactRef}>
							<Contact scrollToTop={scrollToTop} />
						</div>
						<div ref={footerRef} className="home-footer">
							<Footer />
						</div>
					</div>
				</div>
			</motion.div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	.home-footer {
		width: min(100% - 4rem, 100ch);
		margin-inline: auto;
	}
	.hero-section1 {
		height: 199vh;
	}
	.quote {
		height: 100vh;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 999;
		transition: ease-in 0.5s all;
		position: relative;
		pointer-events: none;
		h2 {
			text-align: center;
			width: var(--width);
		}
	}

	.intro-text {
		height: 100vh;
		display: flex;
		align-items: center;
		justify-content: center;
		text-align: center;
		transition: all 0.3s linear;

		.wrapper {
			/* position: sticky;
			top: 50%;
			padding-bottom: 2rem; */
			transition: all 0.5s linear;
		}
	}
	.overlay-hero {
		background-color: #000;
		position: absolute;
		top: 0;
		left: 0;
		height: 200vh;
		width: 100%;
		z-index: 1;
		opacity: 0.5;
		pointer-events: none;
	}

	.main {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		position: sticky;
		top: 0;
		transition: all 0.5s linear;

		h1 {
			font-weight: 400;
		}

		.button {
			display: flex;
			justify-content: center;
			align-items: center;
			aspect-ratio: 1;
			height: 48px;
			background-color: transparent;
			border-radius: 50%;
			border: none;
			font-size: 2rem;
			color: white;
			align-self: center;
			/* margin-bottom: 6rem; */
			animation: bounce 1s ease infinite;
		}
		.first {
			animation: fadeIn 6s linear infinite;
		}
		.second {
			animation: fadeOut 6s linear infinite;
		}

		.background {
			height: 100svh;
			width: 100%;
			object-fit: cover;
			position: absolute;
			top: 0;
			left: 0;
			z-index: -1;
		}
		.hero {
			text-align: center;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			/* 1rem */
			gap: 1rem;
			margin: auto 0;
			transform: translateY(2.5rem);
			img {
				margin: 5rem 0;
			}
			.row {
				align-items: center;
				justify-content: center;
				margin-bottom: 1rem;
			}
		}
	}

	.products {
		display: flex;
		align-items: center;
		margin: 4rem 0;
		.wrapper {
			display: flex;
			flex-direction: column;
			gap: 4rem;
			.text {
				gap: 2rem;
			}
			img {
				border-radius: 26px;
			}
			h4 {
				display: none;
			}
		}
		.second {
			display: none;
		}
	}
	.end {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		transform: translateY(5rem);
		width: 100%;
		/* background-image: radial-gradient(
			circle farthest-side at var(--x) var(--y),
			#333 0%,
			transparent 100%
		); */
		.wrapper {
			display: flex;
			flex-direction: column;
			gap: 4rem;
			text-align: center;
			/* width: 100%; */
			h2 {
				color: #fff;
			}
		}
		.row {
			gap: 1rem;
			flex-direction: column;
			a {
				width: 100%;
				font-size: 0.875rem;
				.btn {
					border: 2px solid var(--clr-white);
					font-weight: 500;
					padding: 0.5rem 1.5rem;
					background-color: var(--clr-white);
					color: var(--clr-black);
					width: min(100%, 300px);
				}
				.btn:hover {
					background-color: transparent;
					color: var(--clr-white);
				}

				.project {
					display: none;
				}
			}
		}
	}
	@media screen and (min-width: 750px) {
		.main .hero {
			img {
				width: 30%;
			}
			button {
				display: none;
			}
		}
		.quote h2 {
			padding: 8rem;
		}

		.products {
			min-height: 60vh;
			.wrapper {
				flex-direction: row-reverse;
				gap: 0;

				.text {
					margin-left: 5rem;
				}
				.container {
					align-items: start;
					h4 {
						display: block;
						margin-bottom: 5rem;
					}
					a {
						margin-top: 10rem;
					}
				}
			}
		}

		.end .wrapper {
			gap: 4rem;
			.row {
				justify-content: center;
				align-items: center;
				gap: 2rem;
			}
		}
	}
	@media screen and (min-width: 1200px) {
		.main .hero {
			flex-direction: column;
			gap: 0;
			h1 {
				font-size: 5rem;
			}
			img {
				width: 30%;
			}

			.row {
				margin: 0;
			}

			.dot {
				display: none;
			}
		}
		.intro-text {
			/* height: 75vh; */
		}
		.end .wrapper {
			gap: 4rem;
			.row {
				justify-content: center;
				gap: 4rem;
			}
		}
	}
	@keyframes fadeIn {
		0% {
			opacity: 0;
			transform: scale(1);
		}
		50% {
			opacity: 0;
		}
		60% {
			opacity: 0.99;
		}
		90% {
			opacity: 1;
		}
		100% {
			opacity: 0.9;
			transform: scale(1.1);
		}
	}
	@keyframes fadeOut {
		0% {
			opacity: 0.5;
			transform: scale(1);
		}
		10% {
			opacity: 1;
		}
		50% {
			opacity: 1;
		}
		60% {
			opacity: 0.01;
		}

		100% {
			opacity: 0;
			transform: scale(1.1);
		}
	}
	@keyframes bounce {
		50% {
			transform: translateY(-30%);
		}
	}
`;

export default HomePage;
