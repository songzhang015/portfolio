"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { useLoading } from "../others/LoadingContext";
import { NavButton } from "../ui/NavButton";

type SectionId = "about" | "projects" | "contact";

const itemVariants: Variants = {
	initial: { y: -12, opacity: 0, filter: "blur(6px)" },
	enter: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { type: "spring", bounce: 0.6, duration: 0.8 },
	},
	visible: { y: 0, opacity: 1, filter: "blur(0px)" },
	hidden: { y: -12, opacity: 0, filter: "blur(6px)" },
};

export default function Header() {
	const isLoading = useLoading();
	// const isLoading = false;
	const { scrollY } = useScroll();
	const lenis = useLenis();
	const isProgrammaticScroll = useRef(false);
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const [hasEntered, setHasEntered] = useState(false);

	const scrollToSection = (sectionId: SectionId): void => {
		const section = document.getElementById(sectionId);
		if (!section || !lenis) return;

		const headerOffset = 96;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		isProgrammaticScroll.current = true;
		setHidden(false);

		lenis.scrollTo(section, {
			offset: -headerOffset,
			immediate: prefersReducedMotion,
			duration: 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 3),
			onComplete: () => {
				isProgrammaticScroll.current = false;
			},
		});
	};

	useMotionValueEvent(scrollY, "change", (latest) => {
		const previous = scrollY.getPrevious() ?? 0;

		if (latest <= 50) {
			setIsAtTop(true);
		} else {
			setIsAtTop(false);
		}

		if (isProgrammaticScroll.current) {
			setHidden(false);
			return;
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
				initial: { y: -24, opacity: 0, filter: "blur(6px)" },
				enter: {
					y: 0,
					opacity: 1,
					filter: "blur(0px)",
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
					filter: "blur(0px)",
					transition: { duration: 0.3, ease: "easeOut" },
				},
				hidden: { y: "-100%", opacity: 0, filter: "blur(6px)" },
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
				<NavButton onClick={() => scrollToSection("about")}>About</NavButton>
			</motion.div>
			<motion.div variants={itemVariants}>
				<NavButton onClick={() => scrollToSection("projects")}>
					Projects
				</NavButton>
			</motion.div>
			<motion.div variants={itemVariants}>
				<NavButton onClick={() => scrollToSection("contact")}>
					Contact
				</NavButton>
			</motion.div>
		</motion.header>
	);
}
