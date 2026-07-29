"use client";

import { useLoading } from "../others/LoadingContext";
import {
	motion,
	type Variants,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

const BLURBS = [
	"Hello there! I'm Song, a senior at the University of Oregon studying Computer Science.",
	"I have experience with frontend design, backend systems, and AI integrations.",
	"Please feel free to reach out or connect if you'd like to collaborate or chat!",
];

/* How long each blurb stays highlighted before the rotation advances */
const ROTATE_MS = 6000;

const itemVariants: Variants = {
	initial: { y: 24, opacity: 0, filter: "blur(8px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as never },
	},
};

export default function Introduction() {
	const isLoading = useLoading();
	const sectionRef = useRef<HTMLElement | null>(null);

	const [activeBlurb, setActiveBlurb] = useState(0);
	const [hoveredBlurb, setHoveredBlurb] = useState<number | null>(null);

	/* Rotation pauses while hovering; re-running on activeBlurb restarts the
	   8s window whenever hover jumps the highlight somewhere else. */
	useEffect(() => {
		if (hoveredBlurb !== null) return;

		const timer = setTimeout(
			() => setActiveBlurb((i) => (i + 1) % BLURBS.length),
			ROTATE_MS,
		);
		return () => clearTimeout(timer);
	}, [activeBlurb, hoveredBlurb]);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 20,
		mass: 0.3,
	});

	const contentY = useTransform(smoothProgress, [0, 1], [0, -18]);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen flex-col overflow-hidden"
		>
			<motion.div
				className="relative z-10 flex w-full flex-1 flex-col justify-between px-8 pt-48 pb-10 md:px-16"
				style={{ y: contentY }}
				variants={{
					initial: {},
					visible: {
						transition: {
							delay: 1,
							staggerChildren: 0.2,
							delayChildren: 1,
						},
					},
				}}
				initial="initial"
				animate={isLoading ? "initial" : "visible"}
			>
				<div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 md:flex-row md:items-start md:justify-center md:gap-16">
					<motion.h1
						variants={itemVariants}
						className="text-6xl font-medium leading-[1.2] tracking-tight md:text-7xl"
					>
						<span className="block text-white">Song</span>
						<span className="block text-gray-dark">Zhang</span>
					</motion.h1>

					<motion.div
						variants={itemVariants}
						className="space-y-8 pt-4 text-lg md:whitespace-nowrap md:text-xl"
					>
						{BLURBS.map((blurb, i) => (
							<p
								key={i}
								onMouseEnter={() => {
									setHoveredBlurb(i);
									setActiveBlurb(i);
								}}
								onMouseLeave={() => setHoveredBlurb(null)}
								className={`cursor-default transition-colors duration-700 ease-in-out ${
									activeBlurb === i ? "text-white" : "text-gray-dark"
								}`}
							>
								{blurb}
							</p>
						))}
					</motion.div>
				</div>

				<motion.h2
					variants={itemVariants}
					/* Viewport-relative so "DEVELOPING FULL-STACK" stays on one line */
					className="text-[clamp(1.75rem,6.4vw,8.5rem)] font-medium leading-[1.02] tracking-tight text-white"
				>
					<span className="block pl-14">DEVELOPING FULL-STACK</span>
					<span className="block pr-14 text-right">APPLICATIONS</span>
				</motion.h2>
			</motion.div>
		</section>
	);
}
