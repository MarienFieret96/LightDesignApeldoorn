import React, { useEffect, useState } from "react";
import ReactGA from "react-ga";
import styled from "styled-components";
import { AnimatePresence, motion } from "framer-motion";
import { Footer, Modal } from "../components";
import { categories, products } from "../data";
import LampImageOne from "../assets/images/categorie/all-products.webp";

const InspirationPage = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [categorieen, setCategories] = useState(categories);
	const [producten, setProducten] = useState(products);
	const [category, setCategorie] = useState("all");
	const [product, setProduct] = useState({});
	const close = () => setModalOpen(false);
	const open = () => setModalOpen(true);

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
				<section className="section">
					<div className="wrapper">
						<div className="categories">
							<div
								className="categorie-wrapper"
								onClick={() => setCategorie("all")}
							>
								<div className="categorie">
									<img src={LampImageOne} alt="alle producten" />
								</div>
								<h6>Alle Producten</h6>
							</div>
							{categorieen.map((item, id) => {
								const { naam, afbeelding } = item;
								return (
									<div
										key={id}
										className="categorie-wrapper"
										onClick={() => setCategorie(naam)}
									>
										<div className="categorie">
											<img src={afbeelding} alt={naam} loading="lazy" />
										</div>
										<h6>{naam}</h6>
									</div>
								);
							})}
						</div>
						<div className="producten">
							<AnimatePresence
								initial={false}
								mode="wait"
								onExitComplete={() => null}
							>
								{modalOpen && (
									<Modal
										modalOpen={modalOpen}
										handleClose={close}
										content={product}
									/>
								)}
							</AnimatePresence>
							{producten?.map((item, id) => {
								const { naam, afbeelding, categorie } = item;
								if (category === "all") {
									return (
										<div
											key={id}
											className="product"
											onClick={() => {
												setProduct(item);
												modalOpen ? close() : open();
											}}
										>
											<img src={afbeelding} alt={naam} loading="lazy" />
										</div>
									);
								}
								if (category === categorie) {
									return (
										<div
											key={id}
											className="product"
											onClick={() => {
												setProduct(item);
												modalOpen ? close() : open();
											}}
										>
											<img src={afbeelding} alt={naam} />
										</div>
									);
								}
							})}
						</div>
					</div>
				</section>
				<div className="inspiratie-footer">
					<Footer />
				</div>
			</motion.div>
		</Wrapper>
	);
};

const Wrapper = styled.div`
	position: relative;
	background-color: var(--clr-black);
	.inspiratie-footer {
		width: min(100% - 4rem, 100ch);
		margin-inline: auto;
	}
	.section {
		padding-bottom: 5rem;
	}
	.wrapper {
		display: flex;
		flex-direction: column;
		gap: 2rem;
		margin-bottom: 2rem;
		padding-top: 4rem;
		width: min(100% - 4rem, 100ch);
		h2 {
			text-align: center;
			margin: 6rem 0;
		}
		.categories {
			display: flex;
			gap: 1rem;
			overflow-x: scroll;
			/* -ms-overflow-style: none; 
			scrollbar-width: none; */
			margin-top: 4rem;
			padding-bottom: 2rem;
			border-bottom: 1px solid #3333339d;
			position: relative;
			z-index: 4;
			user-select: none;

			.categorie-wrapper {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				cursor: pointer;
				h6 {
					text-align: center;
					text-transform: capitalize;
					font-size: 12px;
					font-weight: 400;
					letter-spacing: 1px;
				}
				.categorie {
					aspect-ratio: 1;
					min-width: 78px;
					width: 128px;
					display: flex;
					justify-content: center;
					align-items: center;
					border-radius: 50%;
					border: 2px solid #3333339d;
				}
				img {
					border-radius: 50%;
					height: 100%;
					padding: 3px;
				}
			}
		}
		.categories::-webkit-scrollbar {
			height: 4px;
		}
		.categories:hover::-webkit-scrollbar {
			height: 8px;
		}
		.producten {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			gap: 0.25rem;
			position: relative;
			z-index: 4;
			.product {
				aspect-ratio: 1;
				/* border: 1px solid grey; */
				display: flex;
				justify-content: center;
				align-items: center;
				cursor: pointer;
				img {
					height: 100%;
				}
			}
		}
	}
	@media screen and (min-width: 750px) {
		.wrapper {
			padding-top: 8rem;
			h2 {
				text-align: start;
			}
			.categories .categorie {
				min-width: 128px;
			}
			.producten {
				grid-template-columns: repeat(3, 1fr);
			}
		}
	}
`;

export default InspirationPage;
