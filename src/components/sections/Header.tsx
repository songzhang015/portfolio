"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useLoading } from "../others/LoadingContext";

const itemVariants = {
	initial: { y: -12, opacity: 0 },
	enter: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] as never },
	},
	visible: { y: 0, opacity: 1 },
	hidden: { y: -12, opacity: 0 },
};

export default function Header() {
	const isLoading = useLoading();
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
						duration: 1.0,
						ease: [0.34, 1.56, 0.64, 1],
						delay: 0.5,
						staggerChildren: 0.15,
						delayChildren: 0.5,
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
				fixed top-0 left-0 w-full z-50 flex justify-end text-md backdrop-blur-xs gap-16 py-8 px-16
				transition-shadow duration-300
				${isAtTop ? "shadow-none" : "shadow-sm shadow-black/75"}
			`}
		>
			<motion.div variants={itemVariants}>
				<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
					About
				</button>
			</motion.div>
			<motion.div variants={itemVariants}>
				<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
					Projects
				</button>
			</motion.div>
			<motion.div variants={itemVariants}>
				<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
					Contact
				</button>
			</motion.div>
		</motion.header>
	);
}
