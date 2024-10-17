import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactGA, { send } from "react-ga";
import styled from "styled-components";
import { Footer } from "../components";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

const ListItem = ({ content, addToList }) => {
	const [active, setActive] = useState(false);
	const handleClick = () => {
		setActive(!active);
		addToList(content);
	};
	return (
		<div
			onClick={handleClick}
			className={active ? "selection-button active" : "selection-button"}
		>
			{content}
		</div>
	);
};

const ContactPage = () => {
	const { id } = useParams();
	const beschrijvingRef = useRef(null);
	const opmerkingRef = useRef(null);
	const contactRef = useRef(null);

	const [contact, setContact] = useState(!id);

	const [naam, setNaam] = useState("");
	const [email, setEmail] = useState("");
	const [telefoon, setTelefoon] = useState("");
	const [beschrijving, setBeschrijving] = useState("");
	const [opmerking, setOpmerking] = useState("");

	const [toepassingList, setToepassingList] = useState([]);
	const [projectList, setProjectList] = useState([]);

	const [toepassing, setToepassing] = useState([
		"Woning",
		"Kantoor",
		"Showroom",
		"Horeca",
		"Overig",
	]);
	const [project, setProject] = useState([
		"Nieuwbouw",
		"Renovatie",
		"Toevoeging op huidige situatie",
	]);

	const sendEmail = (e) => {
		e.preventDefault();

		emailjs.sendForm("redacted").then(
			(result) => {
				console.log(result.text);
				resetForm();
			},
			(error) => {
				console.log(error.text);
			},
		);
	};

	const resetForm = () => {
		setNaam("");
		setEmail("");
		setTelefoon("");
		setBeschrijving("");
		setOpmerking("");
		setToepassingList([]);
		setProjectList([]);
	};

	const removeDuplicate = (arr, itemToRemove) => {
		return arr.filter((item) => item !== itemToRemove);
	};

	const addToToepassingList = (item) => {
		if (toepassingList.includes(item)) {
			const tempArray = removeDuplicate(toepassingList, item);
			setToepassingList(tempArray);
		} else {
			setToepassingList([...toepassingList, item]);
		}
	};
	const addToProjectList = (item) => {
		if (projectList.includes(item)) {
			const tempArray = removeDuplicate(projectList, item);
			setProjectList(tempArray);
		} else {
			setProjectList([...projectList, item]);
		}
	};

	useEffect(() => {
		beschrijvingRef.current.style.height = "39px";
		beschrijvingRef.current.style.height =
			beschrijvingRef.current.scrollHeight + "px";
	}, [beschrijving]);
	useEffect(() => {
		opmerkingRef.current.style.height = "39px";
		opmerkingRef.current.style.height =
			opmerkingRef.current.scrollHeight + "px";
	}, [opmerking]);

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
						<h2>We zijn u graag van dienst</h2>
						<div className="btn-row">
							{/* <button
								onClick={() => setContact(true)}
								className={
									contact ? "btn btn-primary active-btn" : "btn btn-primary"
								}
							>
								start project
							</button>
							<button
								onClick={() => setContact(false)}
								className={
									contact ? "btn btn-primary" : "btn btn-primary active-btn"
								}
							>
								contact
							</button> */}

							<button
								onClick={() => setContact(false)}
								className={contact ? "btn btn-primary" : "btn btn-primary"}
							>
								<span>start project</span>
								{!contact ? (
									<motion.div className="active-btn" layoutId="active-btn" />
								) : null}
							</button>
							<button
								onClick={() => setContact(true)}
								className={contact ? "btn btn-primary" : "btn btn-primary"}
							>
								<span>contact</span>
								{contact ? (
									<motion.div className="active-btn" layoutId="active-btn" />
								) : null}
							</button>
						</div>
						{!contact && (
							<div className="selection-container">
								<h4>Toepassing</h4>
								<div className="selection-buttons">
									{toepassing.map((item, index) => {
										return (
											<ListItem
												key={index}
												content={item}
												index={index}
												addToList={addToToepassingList}
											/>
										);
									})}
								</div>
							</div>
						)}
						{!contact && (
							<div className="selection-container">
								<h4>Project</h4>
								<div className="selection-buttons">
									{project.map((item, index) => {
										return (
											<ListItem
												key={index}
												content={item}
												index={index}
												addToList={addToProjectList}
											/>
										);
									})}
								</div>
							</div>
						)}

						<form spellCheck="false" ref={contactRef} onSubmit={sendEmail}>
							<div className="input">
								<input
									type="text"
									placeholder="Naam"
									value={naam}
									onChange={(e) => setNaam(e.target.value)}
									name="naam"
									required
								/>
								<input
									type="text"
									placeholder="Email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									name="email"
									required
								/>
								<input
									type="text"
									placeholder="Telefoon"
									value={telefoon}
									onChange={(e) => setTelefoon(e.target.value)}
									name="telefoon"
									required
								/>
							</div>
							<textarea
								ref={beschrijvingRef}
								placeholder="Over jouw project"
								value={beschrijving}
								onChange={(e) => setBeschrijving(e.target.value)}
								name="beschrijving"
							></textarea>
							<textarea
								ref={opmerkingRef}
								placeholder="Opmerkingen"
								value={opmerking}
								onChange={(e) => setOpmerking(e.target.value)}
								name="opmerking"
							></textarea>
							<input
								style={{ display: "none" }}
								type="text"
								value={toepassingList || "niks aangevinkt"}
								readOnly
								name="toepassing"
							/>
							<input
								style={{ display: "none" }}
								type="text"
								value={projectList || "niks aangevinkt"}
								readOnly
								name="project"
							/>

							<div className="row">
								<button className="btn btn-primary" type="submit">
									Verzenden
								</button>
							</div>
						</form>
					</div>
				</section>
				<div className="contact-footer">
					<Footer />
				</div>
			</motion.div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
	position: relative;
	background-image: linear-gradient(180deg, #537796, #1f3d61);
	z-index: 0;
	color: #f5f5f7;
	.contact-footer {
		width: var(--width);
		margin-inline: auto;
	}
	.section {
		padding-top: 10rem;
		padding-bottom: 5rem;
		display: flex;
		justify-content: start;
		flex-direction: column;
		align-items: center;

		h2 {
			text-align: center;
		}
		.wrapper {
			display: flex;
			flex-direction: column;

			gap: 2rem;
			width: var(--width);

			.btn-row {
				display: flex;

				background-color: #70a0b9;
				border-radius: 999px;
				margin: 2rem 0;

				.btn {
					border-radius: 999px;
					border: none;
					width: 50%;
					background-color: #70a0b9;
					box-shadow: none;
					color: white;
					font-weight: 400;
					padding: 1rem 1.5rem;
					text-transform: capitalize;
					letter-spacing: 1px;
					font-size: var(--fs-300);
					position: relative;
					span {
						z-index: 2;

						position: relative;
					}
				}
				/* .btn:hover, */
				.active-btn {
					background-color: rgb(83, 130, 162);
					position: absolute;
					top: 0;
					bottom: 0;
					left: 0;
					right: 0;
					border-radius: 999px;
					z-index: 1;
				}
			}
			.row {
				flex-direction: column;
				gap: 1rem;
				margin: 2rem 0;
				.btn {
					font-size: var(--fs-300);
					border: 2px solid var(--clr-white);
				}
				.btn:hover {
					background-color: transparent;
					color: var(--clr-white);
				}
			}
			.selection-container {
				display: flex;
				flex-direction: column;
				gap: 1.5rem;
				.selection-buttons {
					display: flex;
					flex-wrap: wrap;
					gap: 0.5rem;
					.selection-button {
						padding: 0.5rem 1.5rem;
						border: #70a0b9 1px solid;
						border-radius: 999px;
						cursor: pointer;
						transition: var(--transition);
					}
					.active,
					.selection-button:hover {
						background-color: white;
						color: black;
					}
				}
			}
			form {
				display: flex;
				flex-direction: column;

				gap: 1rem;
				margin-top: 1rem;
				input,
				textarea {
					padding: 0.5rem;
					font-family: inherit;
					color: white;
					background-color: transparent;
					-webkit-appearance: none;
					-moz-appearance: none;
					appearance: none;
					outline: none;
					border: none;
					border-bottom: 1px solid #7b76bd;
				}
				input::placeholder,
				textarea::placeholder {
					color: #ffffff87;
				}
				textarea {
					resize: none;
					height: 39px;
				}
				textarea::-webkit-scrollbar {
					width: 0px;
				}

				.input {
					display: flex;
					flex-direction: column;
					gap: 1rem;
				}
			}
		}
	}
	@media screen and (min-width: 750px) {
		.section .wrapper {
			gap: 2rem;

			.btn-row {
				width: 500px;
				margin-inline: auto;
				.btn {
				}
			}
			.row {
				flex-direction: row-reverse;
				width: 80%;
				align-self: center;
				justify-content: center;

				button {
					width: 500px;
				}
			}
			.selection-container {
				gap: 2rem;
			}
			form {
				gap: 2rem;

				.input {
					flex-direction: row;
					input {
						width: 100%;
					}
				}
			}
		}
	}
`;

export default ContactPage;
