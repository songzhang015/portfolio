"use client";

import { useState } from "react";
import {
	motion,
	useScroll,
	useMotionValueEvent,
	Variants,
} from "framer-motion";
import { useLoading } from "../others/LoadingContext";

const itemVariants: Variants = {
	initial: { y: -12, opacity: 0 },
	enter: {
		y: 0,
		opacity: 1,
		transition: { type: "spring", bounce: 0.6, duration: 0.8 },
	},
	visible: { y: 0, opacity: 1 },
	hidden: { y: -12, opacity: 0 },
};

export default function Header() {
	const isLoading = useLoading();
	// const isLoading = false;
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const [hasEntered, setHasEntered] = useState(false);

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		if (latest <= 50) {
			setIsAtTop(true);
		} else {
			setIsAtTop(false);
		}

		if (latest > previous && latest > 50) {
			setHidden(true);
		} else {
			setHidden(false);
		}
	});

	return (
		<motion.header
			variants={{
				initial: { y: -24, opacity: 0 },
				enter: {
					y: 0,
					opacity: 1,
					transition: {
						type: "spring",
						bounce: 0.5,
						duration: 1.0,
						delay: 0.25,
						staggerChildren: 0.15,
						delayChildren: 0.25,
					},
				},
				visible: {
					y: 0,
					opacity: 1,
					transition: { duration: 0.3, ease: "easeOut" },
				},
				hidden: { y: "-100%", opacity: 0 },
			}}
			initial="initial"
			animate={
				isLoading
					? "initial"
					: hidden
						? "hidden"
						: hasEntered
							? "visible"
							: "enter"
			}
			onAnimationComplete={() => {
				if (!isLoading && !hasEntered) setHasEntered(true);
			}}
			transition={{ duration: 0.3, ease: "easeOut" }}
			className={`
				fixed top-0 left-0 w-full z-50 flex justify-end text-md gap-16 py-8 px-16
				transition-shadow duration-300
				${isAtTop ? "shadow-none backdrop-blur-none" : "shadow-sm shadow-black/75 backdrop-blur-xs"}
			`}
		>
			<motion.div variants={itemVariants}>
				<button className="group relative cursor-pointer transition-colors duration-300 text-gray-200/90 hover:text-white">
					<span>About</span>
					<span
						className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left
					scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
					/>
				</button>
			</motion.div>
			<motion.div variants={itemVariants}>
				<button className="group relative cursor-pointer transition-colors duration-300 text-gray-200/90 hover:text-white">
					<span>Projects</span>
					<span
						className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left
					scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
					/>
				</button>
			</motion.div>
			<motion.div variants={itemVariants}>
				<button className="group relative cursor-pointer transition-colors duration-300 text-gray-200/90 hover:text-white">
					<span>Contact</span>
					<span
						className="pointer-events-none absolute left-0 -bottom-1 h-px w-full origin-left
					scale-x-0 bg-sky-400 transition-transform duration-300 ease-out group-hover:scale-x-100"
					/>
				</button>
			</motion.div>
		</motion.header>
	);
}
