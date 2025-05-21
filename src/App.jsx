import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";

const App = () => {
	const [showContent, setShowContent] = useState(false);
	useGSAP(() => {
		const tl = gsap.timeline();

		tl.to(".vi-mask-group", {
			rotate: 10,
			duration: 2,
			ease: "Power4.easeInOut",
			transformOrigin: "50% 50%",
		}).to(".vi-mask-group", {
			scale: 10,
			duration: 2,
			delay: -1.8,
			ease: "Expo.easeInOut",
			transformOrigin: "50% 50%",
			opacity: 0,
			onUpdate: function () {
				if (this.progress() >= 0.9) {
					document.querySelector(".svg").remove();
					setShowContent(true);
					this.kill();
				}
			},
		});
	});

	useGSAP(() => {
		if (!showContent) return;

		const isMobile = window.innerWidth <= 768;

		gsap.to(".main", {
			scale: 1,
			rotate: 0,
			duration: 2,
			delay: "-1",
			ease: "Expo.easeInOut",
		});

		gsap.to(".sky", {
			scale: 1.1,
			rotate: 0,
			duration: 2,
			delay: "-.8",
			ease: "Expo.easeInOut",
		});

		gsap.to(".building", {
			scale: 1.1,
			rotate: 0,
			duration: 2,
			delay: "-.8",
			ease: "Expo.easeInOut",
		});

		gsap.to(".girl", {
			scale: isMobile ? 0.5 : 0.7,
			x: "-50%",
			bottom: isMobile ? "-35%" : "-50%",
			rotate: 0,
			duration: 2,
			delay: "-.8",
			ease: "Expo.easeInOut",
		});

		gsap.to(".text", {
			scale: isMobile ? 0.8 : 1,
			xPercent: isMobile ? -10 : -50,
			yPercent: isMobile ? 50 : 0,
			rotate: 0,
			duration: 2,
			delay: "-.8",
			ease: "Expo.easeInOut",
		});

		const handleMouseMove = (e) => {
			const isMobile = window.innerWidth <= 768;
			if (isMobile) return;

			const xMove = (e.clientX / window.innerWidth - 0.5) * 40;
			gsap.to(".imagesContainer .text", { x: `${xMove * 0.4}%` });
			gsap.to(".sky", { x: xMove });
			gsap.to(".building", { x: xMove });
		};

		const main = document.querySelector(".main");

		main?.addEventListener("mousemove", handleMouseMove);

		return () => {
			main?.removeEventListener("mousemove", handleMouseMove);
		};
	}, [showContent]);

	return (
		<>
			<div className="svg flex items-center justify-center fixed top-0 left-0 z-[100] w-full h-screen overflow-hidden bg-[#000]">
				<svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
					<defs>
						<mask id="viMask">
							<rect width="100%" height="100%" fill="black" />
							<g className="vi-mask-group">
								<text
									x="50%"
									y="50%"
									fontSize="250"
									textAnchor="middle"
									fill="white"
									dominantBaseline="middle"
									fontFamily="Arial Black"
								>
									VI
								</text>
							</g>
						</mask>
					</defs>
					<image
						href="./bg.png"
						width="100%"
						height="100%"
						preserveAspectRatio="xMidYMid slice"
						mask="url(#viMask)"
					/>
				</svg>
			</div>
			<div>
				{showContent && (
					<div className="main w-full rotate-[-10deg] scale-[1.7]">
						<div className="landing overflow-hidden relative w-full h-screen bg-black">
							<div className="navbar absolute top-0 left-0 w-full py-10 px-10 z-[10]">
								<div className="logo flex flex-col sm:flex-row gap-2 sm:gap-6 items-start sm:items-center">
									<div className="lines flex flex-col gap-1">
										<div className="line w-15 h-2 bg-white rounded"></div>
										<div className="line w-8 h-2 bg-white rounded"></div>
										<div className="line w-5 h-2 bg-white rounded"></div>
									</div>
									<h3 className="text-4xl text-white -mt-[8px] leading-none">
										Rockstar
									</h3>
								</div>
							</div>
							<div className="imagesContainer overflow-hidden relative w-full h-full">
								<img
									className="absolute sky scale-[1.5] sm:scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
									src="/sky.png"
									alt="sky"
								/>
								<img
									className="building absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
									src="/bg.png"
									alt="buildings"
								/>
								<div className="text absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-4 scale-[1.4] rotate-[-10deg]">
									<div className="text-[5rem] sm:text-[8rem] lg:text-[10rem] text-white leading-none">
										Grand
									</div>
									<div className="text-[5rem] sm:text-[8rem] lg:text-[10rem] text-white leading-none ml-20">
										Theft
									</div>
									<div className="text-[5rem] sm:text-[8rem] lg:text-[10rem] text-white leading-none">
										Auto
									</div>
								</div>
								<img
									className="absolute girl -bottom-[150%] left-1/2 -translate-x-1/2 scale-[2] sm:scale-[3] rotate-[-20deg]"
									src="/girlbg.png"
									alt="selfie-girl"
								/>
							</div>
							<div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
								<div className="flex gap-4 items-center justify-center absolute top-20 sm:top-12 left-1/2 -translate-x-1/2 sm:left-0 sm:-translate-x-0">
									<i className="text-4xl ri-arrow-down-line"></i>
									<h3 className="text-xl font-[Helvetica_Now_Display]">
										Scroll Down
									</h3>
								</div>
								<img
									className="absolute h-[55px] top-16 sm:top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									src="./ps5.png"
									alt="ps5"
								/>
							</div>
						</div>

						<div className="w-full min-h-screen flex items-center justify-center bg-black overflow-hidden px-4 sm:px-10">
							<div className="wrapper flex flex-col md:flex-row items-center justify-between w-full max-w-7xl gap-10 text-white py-16">
								<div className="limg relative w-full md:w-1/2 h-auto">
									<img
										className="w-full max-w-sm md:max-w-full h-auto mx-auto"
										src="/girlFlex.png"
										alt="girl flexing"
									/>
								</div>

								<div className="rContent w-full md:w-1/2 text-center md:text-left">
									<div>
										<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
											Still Running
										</h2>
										<h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6">
											Not Hunting
										</h2>

										<p className="mt-4 text-base sm:text-lg md:text-xl font-[Helvetica_Now_Display] leading-relaxed">
											Lorem ipsum dolor sit amet
											consectetur, adipisicing elit. Illo,
											sint? Explicabo magni unde nesciunt,
											sint eum cum, veniam dignissimos
											iure corrupti consequatur
											laudantium.
										</p>
										<p className="mt-6 text-base sm:text-lg md:text-xl font-[Helvetica_Now_Display] leading-relaxed">
											Lorem ipsum, dolor sit amet
											consectetur adipisicing elit. Ab,
											ipsam. Fuga, perspiciatis magnam.
										</p>

										<button className="bg-yellow-500 px-6 py-4 sm:px-10 sm:py-6 text-black mt-6 sm:mt-10 text-xl sm:text-2xl rounded">
											Download Now
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
};

export default App;
