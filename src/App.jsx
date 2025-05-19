import { useState } from "react";
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

		const animateEl = (selector, options) => {
			gsap.to(selector, {
				scale: 1,
				rotate: 0,
				duration: 2,
				ease: "Expo.easeInOut",
				...options,
			});
		};

		animateEl(".main", { delay: -1 });
		animateEl(".sky", { delay: -0.8 });
		animateEl(".building", { delay: -0.8 });
		animateEl(".sky", { delay: -0.8 });
		animateEl(".text", { delay: -0.8 });

		gsap.to(".girl", {
			scale: 0.7,
			x: "-50%",
			bottom: "-50%",
			rotate: 0,
			duration: 2,
			delay: -0.8,
			ease: "Expo.easeInOut",
		});

		// On mouse images move
		const handleMouseMove = (e) => {
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
								<div className="logo flex gap-6">
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
									className="absolute sky scale-[1.5] rotate-[-20deg] top-0 left-0 w-full h-full object-cover"
									src="/sky.png"
									alt="sky"
								/>
								<img
									className="building absolute scale-[1.8] rotate-[-3deg] top-0 left-0 w-full h-full object-cover"
									src="/bg.png"
									alt="buildings"
								/>
								<div className="text absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-4 scale-[1.4] rotate-[-10deg]">
									<div className="text-[10rem] text-white -ml-40 leading-none">
										Grand
									</div>
									<div className="text-[10rem] text-white ml-20 leading-none">
										Theft
									</div>
									<div className="text-[10rem] text-white -ml-40 leading-none">
										Auto
									</div>
								</div>
								<img
									className="absolute girl -bottom-[150%] left-1/2 -translate-x-1/2  scale-[3] rotate-[-20deg]"
									src="/girlbg.png"
									alt="selfie-girl"
								/>
							</div>
							<div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent">
								<div className="flex gap-4 items-center">
									<i className="text-4xl ri-arrow-down-line"></i>
									<h3 className="text-xl font-[Helvetica_Now_Display]">
										Scroll Down
									</h3>
								</div>
								<img
									className="absolute h-[55px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
									src="./ps5.png"
									alt="ps5"
								/>
							</div>
						</div>

						<div className="w-full h-screen flex items-center justify-center bg-black overflow-hidden">
							<div className="wrapper flex text-white w-full h-[70%] items-center justify-center">
								<div className="limg relative w-1/2 h-[50%]">
									<img
										className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
										src="/girlFlex.png"
										alt="girl flexing"
									/>
								</div>
								<div className="rContent w-[30%] py-30">
									<div className="text-2xl">
										Still Running
									</div>
									<div className="text-2xl">Not Hunting</div>
									<p className="mt-10 text-xl font-[Helvetica_Now_Display]">
										Lorem ipsum dolor sit amet consectetur,
										adipisicing elit. Illo, sint? Explicabo
										magni unde nesciunt, sint eum cum,
										veniam dignissimos iure corrupti
										consequatur laudantium.
									</p>
									<p className="mt-10 text-xl font-[Helvetica_Now_Display]">
										Lorem ipsum, dolor sit amet consectetur
										adipisicing elit. Ab, ipsam. Fuga,
										perspiciatis magnam.
									</p>
									<button className="bg-yellow-500 px-10 py-10 text-black mt-10 text-4xl">
										Download Now
									</button>
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
