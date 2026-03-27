"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";

export default function Header() {
	const { scrollY } = useScroll();
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);

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
				visible: { y: 0, opacity: 1 },
				hidden: { y: "-100%", opacity: 0 },
			}}
			animate={hidden ? "hidden" : "visible"}
			transition={{ duration: 0.3, ease: "easeInOut" }}
			className={`
				fixed top-0 left-0 w-full z-50 flex justify-end text-md backdrop-blur-xs gap-16 py-8 px-16
				transition-shadow duration-300
				${isAtTop ? "shadow-none" : "shadow-sm shadow-black/75"}
			`}
		>
			<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
				About
			</button>
			<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
				Projects
			</button>
			<button className="cursor-pointer transition-colors duration-300 hover:text-gray-400">
				Contact
			</button>
		</motion.header>
	);
}
