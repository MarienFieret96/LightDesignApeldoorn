import React, { useState, useLayoutEffect, useEffect } from "react";
import ReactGA from "react-ga";

import styled from "styled-components";
import { FaAngleDown } from "react-icons/fa";
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { motion } from "framer-motion";
import { Footer } from "../components";
import ImageCarousel from "../components/Projects/ImageCarousel";
import { projecten } from "../data";

const ProjectsPage = () => {
	const [index, setIndex] = useState(0);
	const [projectArray, setProjectArray] = useState(projecten);

	useLayoutEffect(() => {
		const lastIndex = projectArray.length - 1;
		if (index < 0) {
			setIndex(lastIndex);
		}
		if (index > lastIndex) {
			setIndex(0);
		}
	}, [index]);

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
				<div className="mobile">
					<div className="project-container">
						{projectArray?.map((item, projectIndex) => {
							const { id, title, description, images, producten } = item;
							let position = "nextProject";
							if (projectIndex === index) {
								position = "activeProject";
							}
							if (
								projectIndex === index - 1 ||
								(index === 0 && projectIndex === projectArray.length - 1)
							) {
								position = "lastProject";
							}
							return (
								<div key={id} className={position + " " + "project"}>
									<div className="img-container">
										<ImageCarousel images={images} />
									</div>
									<div className="text-container">
										<h2>Coming Soon</h2>
										{/* <h2>{title}</h2>
										{description.map((item, index) => {
											return <h5 key={index}>{item}</h5>;
										})}

										<h4>Toegepaste producten:</h4>
										<ul>
											{producten.map((item, id) => {
												return <li key={id}>{item}</li>;
											})}
										</ul>
										<div className="row">
											<button
												className="prev"
												onClick={() => {
													setIndex(index - 1);
												}}
											>
												<FiChevronLeft /> Vorige
											</button>
											<button
												className="next"
												onClick={() => {
													setIndex(index + 1);
												}}
											>
												Volgende <FiChevronRight />
											</button>
										</div> */}
										<Footer />
									</div>
								</div>
							);
						})}
					</div>
					<div className="footer-container">
						<Footer />
					</div>
				</div>
			</motion.div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	.mobile {
		min-height: calc(100svh);
		width: 100%;
		background-color: var(--clr-black);
		color: var(--clr-white);
		overflow-x: hidden;
		.footer-container {
			display: none;
		}

		.project-container {
			min-height: calc(100vh - 13rem);
			width: 100%;
			position: relative;
			padding-bottom: 10rem;
			.project-footer {
				width: min(100% - 4rem, 100ch);
				margin-inline: auto;
				overflow: visible;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
			}

			.project {
				position: absolute;
				top: 0;
				left: 0;

				opacity: 1;
				transition: var(--transition);
			}
			.activeProject {
				width: 100%;
			}
			.lastProject {
				opacity: 0;
				pointer-events: none;
			}
			.nextProject {
				opacity: 0;
				pointer-events: none;
			}
		}

		.img-container {
			position: sticky;
			top: 0;
			box-shadow: var(--dark-shadow);
			.img-wrapper {
				position: relative;
				height: 100%;

				img {
					top: 0;
					pointer-events: none;
					object-fit: fill;
					opacity: 0;
					transition: var(--transition);
					height: 100%;
					width: 100%;
				}
				.activeImage {
					opacity: 1;
					transform: translateX(0);
					position: relative;
				}
				.lastImage {
					transform: translateX(-10%);
					position: absolute;
					pointer-events: none;
				}
				.nextImage {
					transform: translateX(10%);
					position: absolute;
					pointer-events: none;
				}
				.prev,
				.next {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					background: #80808036;
					color: white;
					aspect-ratio: 1;
					display: grid;
					place-items: center;
					border-color: transparent;
					font-size: 1rem;
					border-radius: 5px;
					cursor: pointer;
					transition: var(--transition);
					display: flex;
					justify-content: center;
					align-items: center;
					svg {
						width: 1.25rem;
						height: 1.25rem;
					}
				}
				.prev {
					left: 2rem;
				}
				.next {
					right: 2rem;
				}
			}
			.item-indicator {
				height: 12px;
				width: auto;
				background-color: #80808036;
				border-radius: 999px;
				position: absolute;
				bottom: 0.5rem;
				left: 50%;
				transform: translateX(-50%);
				display: flex;
				align-items: center;
				gap: 0.25rem;
				padding: 0 0.25rem;
				.dot {
					height: 60%;
					aspect-ratio: 1;
					background-color: #8080805a;
					border-radius: 50%;
				}
				.active {
					background-color: #bbb;
				}
			}
		}
		.text-container {
			padding: 1rem 1.5rem;
			font-size: 12px;
			display: flex;
			flex-direction: column;
			/* justify-content: flex-end; */
			justify-content: center;
			gap: 0.5rem;
			font-weight: 300;
			height: 100%;
			h2 {
				/* text-transform: capitalize; */
				font-weight: 600;
				font-variant: all-petite-caps;
				margin-bottom: 1rem;
				text-align: center;
			}
			h4 {
				font-variant: all-petite-caps;
				color: var(--clr-gold);
			}
			h5 {
				font-weight: 300;
				margin-bottom: 1rem;
			}
			ul {
				padding: 0 1rem;
				font-size: medium;
				margin-bottom: 1rem;
			}
			.row {
				width: 100%;
				margin: 2rem 0;
				gap: 1px;
				button {
					width: 100%;
					padding: 1.5rem;
					display: flex;
					justify-content: center;
					align-items: center;
					font-weight: 600;
					border: 1px solid transparent;
					cursor: pointer;
				}
				.prev {
					background-color: #ffffff29;
					color: #fff;
				}
				.next {
					background-color: #fff;
				}
			}
		}
	}
	.mobile::-webkit-scrollbar {
		width: 0px;
	}

	@media screen and (min-width: 750px) {
		.mobile {
			position: relative;

			.project-container {
				height: 100vh;

				.project {
					display: grid;
					grid-template-columns: repeat(2, 1fr);
					top: 8rem;
				}
			}
			.img-container {
				box-shadow: none;
				.img-wrapper {
					.prev {
						left: 1rem;
					}
					.next {
						right: 1rem;
					}
					img {
						min-height: 400px;
						object-fit: cover;
						border-radius: 0;
					}
				}
			}
			.text-container {
				padding: 0 4rem;
				.row {
					margin: 2rem 0 0 0;
				}
				.footer {
					display: none;
				}
			}
			.footer-container {
				display: block;
				position: absolute;
				bottom: 0;
				left: 0;
				right: 0;
				.footer {
					width: 90vw;
					margin: auto;
				}
			}
		}
	}
	@media screen and (min-width: 1200px) {
		.mobile {
			.text-container {
				height: 90%;
			}
			.img-container {
				.img-wrapper {
					height: 90%;
				}
			}
		}
	}
`;

export default ProjectsPage;
