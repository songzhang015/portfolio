"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useId, useState } from "react";

import { LoadingContext } from "./LoadingContext";

const REVEAL_START = 3.5;
const BASE_DURATION = 0.8;

const DRIP_WIDTH = 10;
const DRIP_SPACING = 8;
const DRIP_COUNT = Math.ceil(100 / DRIP_SPACING) + 6;
const FINAL_DRIP_HEIGHT = 150;

const drips = Array.from({ length: DRIP_COUNT }, (_, index) => {
	const centerIndex = (DRIP_COUNT - 1) / 2;
	const offset = index - centerIndex;
	const distance = Math.abs(offset);

	return {
		x: 50 + offset * DRIP_SPACING - DRIP_WIDTH / 2,
		delay: REVEAL_START + distance * 0.1,
		duration: BASE_DURATION + distance * 0.015,
	};
});

const DURATION = 7.0;

const BLOCK_TIMES = [0, 0.32, 0.4, 0.54] as const;

export default function LoadupAnimation({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(true);

	const revealMaskId = useId();

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 5000);

		return () => clearTimeout(timer);
	}, []);

	return (
		<LoadingContext.Provider value={isLoading}>
			<>
				<AnimatePresence>
					{isLoading && (
						<motion.div
							key="loader-overlay"
							className="fixed inset-0 z-[999] flex justify-center items-center h-screen overflow-hidden"
						>
							<svg
								className="absolute inset-0 h-full w-full"
								viewBox="0 0 100 100"
								preserveAspectRatio="none"
								aria-hidden="true"
							>
								<defs>
									<mask
										id={revealMaskId}
										maskUnits="userSpaceOnUse"
										x="0"
										y="0"
										width="100"
										height="100"
									>
										<rect x="0" y="0" width="100" height="100" fill="white" />

										{drips.map((drip, index) => (
											<motion.rect
												key={index}
												x={drip.x}
												y="-20"
												width={DRIP_WIDTH}
												height="0"
												rx={DRIP_WIDTH / 2}
												fill="black"
												animate={{ height: FINAL_DRIP_HEIGHT }}
												transition={{
													duration: drip.duration,
													delay: drip.delay,
													ease: [0.4, 0, 1, 1],
												}}
											/>
										))}
									</mask>
								</defs>

								<motion.rect
									x="0"
									y="0"
									width="100"
									height="100"
									mask={`url(#${revealMaskId})`}
									initial={{ fill: "#070a25" }}
									animate={{ fill: "#010208" }}
									transition={{
										duration: 0.75,
										delay: 0.25,
										ease: "easeInOut",
									}}
								/>
							</svg>

							<motion.div
								className="relative z-10 flex items-center justify-center w-28 h-28"
								initial={{ y: 0 }}
								animate={{ y: [0, 0, -140, 1200] }}
								transition={{
									times: [...BLOCK_TIMES],
									duration: DURATION,
									delay: 0.75,
									ease: ["linear", [0.2, 0.8, 0.4, 1], [0.4, 0, 1, 1]] as never,
								}}
							>
								<motion.div
									className="relative flex items-center justify-center w-full h-full"
									initial={{ rotate: 0 }}
									animate={{ rotate: [0, 0, 180, 640] }}
									transition={{
										times: [...BLOCK_TIMES],
										duration: DURATION,
										delay: 0.75,
										ease: ["linear", [0.4, 0, 0.6, 1], "linear"] as never,
									}}
								>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 1, duration: 1.5 }}
										className="absolute text-3xl font-bold text-white z-10 select-none"
									>
										SZ
									</motion.div>

									<svg
										className="absolute inset-0 w-full h-full"
										viewBox="0 0 100 100"
									>
										<defs>
											<linearGradient
												id="brandGradient"
												x1="0%"
												y1="0%"
												x2="100%"
												y2="0%"
											>
												<stop offset="0%" stopColor="#5bdeff" />
												<stop offset="100%" stopColor="#2695da" />
											</linearGradient>
										</defs>
										{/* Stroke 1 */}
										<motion.rect
											x="10"
											y="10"
											width="80"
											height="80"
											rx="8"
											fill="none"
											stroke="#5bdeff"
											strokeWidth="1.5"
											strokeOpacity="0.18"
											strokeLinecap="round"
											initial={{ pathLength: 0, opacity: 0 }}
											animate={{ pathLength: 1, opacity: 1 }}
											transition={{
												delay: 0.5,
												duration: 1.0,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>

										{/* Stroke 2 */}
										<motion.rect
											x="10"
											y="10"
											width="80"
											height="80"
											rx="8"
											fill="none"
											stroke="url(#brandGradient)"
											strokeWidth="2"
											strokeLinecap="round"
											initial={{ pathLength: 0, opacity: 0 }}
											animate={{ pathLength: 1, opacity: 1 }}
											transition={{
												delay: 1.5,
												duration: 1.0,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>

										{/* Glow layer */}
										<motion.rect
											x="10"
											y="10"
											width="80"
											height="80"
											rx="8"
											fill="none"
											stroke="url(#brandGradient)"
											strokeWidth="6"
											strokeLinecap="round"
											style={{ filter: "blur(3px)" }}
											initial={{ pathLength: 0, opacity: 0 }}
											animate={{ pathLength: 1, opacity: 0.12 }}
											transition={{
												delay: 1.5,
												duration: 1.0,
												ease: "easeOut",
											}}
										/>
									</svg>
								</motion.div>
							</motion.div>
						</motion.div>
					)}
				</AnimatePresence>

				{/* Page content - locked during load to prevent scroll */}
				<div className={isLoading ? "h-screen overflow-hidden" : ""}>
					{children}
				</div>
			</>
		</LoadingContext.Provider>
	);
}
