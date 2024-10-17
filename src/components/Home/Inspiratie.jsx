import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
	useScroll,
	useTransform,
	motion,
	useMotionTemplate,
} from "framer-motion";

const Inspiratie = ({ StockFoto1, StockFoto2, scrollToTop }) => {
	const [device, setDevice] = useState(false);

	const checkIfMobile = () => {
		if (document.body.clientWidth < 650) return true;
		return false;
	};

	window.onresize = () => {
		const mobile = checkIfMobile();
		setDevice(mobile);
	};

	useEffect(() => {
		const mobile = checkIfMobile();
		setDevice(mobile);
	}, []);

	const targetRef = useRef(null);

	const { scrollYProgress } = useScroll({
		target: targetRef,
		offset: ["start start", "end end"],
	});

	const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

	const clipPath = useMotionTemplate`inset(0 0 ${x} 0)`;

	if (device)
		return (
			<>
				<section className="products">
					<div className="wrapper">
						<div className="container">
							<img className="image first" src={StockFoto2} alt="" />
						</div>
						<div className="container text">
							<h4>01</h4>
							<h2>Inspiratie</h2>
							<Link onClick={scrollToTop} to="/inspiratie">
								<button className="btn btn-secondary">Bekijk meer</button>
							</Link>
						</div>
					</div>
				</section>

				<section className="products">
					<div className="wrapper">
						<div className="container">
							<img className="image first" src={StockFoto1} alt="" />
						</div>
						<div className="container text">
							<h4>02</h4>
							<h2>Projecten</h2>
							<Link onClick={scrollToTop} to="/projecten">
								<button className="btn btn-secondary">Bekijk meer</button>
							</Link>
						</div>
					</div>
				</section>
			</>
		);
	return (
		<>
			<Wrapper>
				<div ref={targetRef} className="section">
					<div className="wrapper">
						<div className="text-container">
							<div className="container">
								<h4>01</h4>
								<h2>Inspiratie</h2>
								<Link onClick={scrollToTop} to="/inspiratie">
									<button className="btn btn-secondary">Bekijk meer</button>
								</Link>
							</div>
							<div className="container">
								<h4>02</h4>
								<h2>Projecten</h2>
								<Link onClick={scrollToTop} to="/projecten">
									<button className="btn btn-secondary">Bekijk meer</button>
								</Link>
							</div>
						</div>
						<div className="image-container">
							<div className="container one">
								<img src={StockFoto1} alt="" />
							</div>
							<motion.div
								className="container two"
								style={{
									clipPath: clipPath,
								}}
							>
								<img src={StockFoto2} alt="" />
							</motion.div>
						</div>
					</div>
				</div>
			</Wrapper>
		</>
	);
};

const Wrapper = styled.div`
	.section {
		.wrapper {
			display: grid;
			grid-template-columns: repeat(2, 1fr);
			.text-container {
				margin: 0 4rem;
				.container {
					height: 100vh;
					align-items: start;
					.btn {
						margin-top: 0.5rem;
					}
				}
			}
			.image-container {
				height: 100vh;
				position: sticky;
				top: 0;
				display: flex;
				justify-content: center;
				align-items: center;

				.container {
					aspect-ratio: 1;
					position: absolute;

					border-radius: 26px;
					img {
						border-radius: 26px;
						aspect-ratio: 1;
						object-fit: cover;
					}
				}
				.one {
				}
				.two {
				}
			}
		}
	}
`;

export default Inspiratie;
