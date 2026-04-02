"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { LoadingContext } from "./LoadingContext";

export default function LoadupAnimation({
	children,
}: {
	children: React.ReactNode;
}) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsLoading(false);
		}, 3750);

		return () => clearTimeout(timer);
	}, []);

	const DURATION = 7.0;

	const BLOCK_TIMES = [0, 0.32, 0.4, 0.54] as const;

	return (
		<LoadingContext.Provider value={isLoading}>
			<>
				<AnimatePresence>
					{isLoading && (
						<motion.div
							key="loader-overlay"
							className="fixed inset-0 z-[999] bg-[#080b29] flex justify-center items-center h-screen"
							exit={{
								opacity: 0,
								transition: { duration: 0.6, ease: "easeInOut" },
							}}
						>
							<motion.div
								className="relative flex items-center justify-center w-28 h-28"
								initial={{ y: 0 }}
								animate={{ y: [0, 0, -140, 1200] }}
								transition={{
									times: [...BLOCK_TIMES],
									duration: DURATION,
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
										ease: ["linear", [0.4, 0, 0.6, 1], "linear"] as never,
									}}
								>
									<motion.div
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{ delay: 0.5, duration: 1.5 }}
										className="absolute text-3xl font-bold text-white z-10 select-none"
									>
										SZ
									</motion.div>

									<svg
										className="absolute inset-0 w-full h-full"
										viewBox="0 0 100 100"
									>
										{/* Stroke 1: Dim track - draws 0s → 1.0s */}
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
												duration: 1.0,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>

										{/* Stroke 2: Bright fill - draws 1.0s → 2.0s */}
										<motion.rect
											x="10"
											y="10"
											width="80"
											height="80"
											rx="8"
											fill="none"
											stroke="#5bdeff"
											strokeWidth="2"
											strokeLinecap="round"
											initial={{ pathLength: 0, opacity: 0 }}
											animate={{ pathLength: 1, opacity: 1 }}
											transition={{
												delay: 1.0,
												duration: 1.0,
												ease: [0.4, 0, 0.2, 1],
											}}
										/>

										{/* Glow layer - soft blur bloom over stroke 2 */}
										<motion.rect
											x="10"
											y="10"
											width="80"
											height="80"
											rx="8"
											fill="none"
											stroke="#5bdeff"
											strokeWidth="6"
											strokeLinecap="round"
											style={{ filter: "blur(3px)" }}
											initial={{ pathLength: 0, opacity: 0 }}
											animate={{ pathLength: 1, opacity: 0.12 }}
											transition={{
												delay: 1.0,
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
