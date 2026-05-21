"use client";

import { useRef, useState } from "react";
import {
	animate,
	motion,
	useScroll,
	useMotionValueEvent,
	Variants,
} from "framer-motion";
import { useLoading } from "../others/LoadingContext";
import { NavButton } from "../ui/NavButton";

type SectionId = "about" | "projects" | "contact";

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
	const scrollAnimation = useRef<ReturnType<typeof animate> | null>(null);
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const [hasEntered, setHasEntered] = useState(false);

	const scrollToSection = (sectionId: SectionId): void => {
		const section = document.getElementById(sectionId);
		if (!section) return;

		const headerOffset = 96;
		const targetY = Math.max(
			section.getBoundingClientRect().top + window.scrollY - headerOffset,
			0,
		);
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		scrollAnimation.current?.stop();

		if (prefersReducedMotion) {
			window.scrollTo(0, targetY);
			return;
		}

		scrollAnimation.current = animate(window.scrollY, targetY, {
			duration: 1,
			ease: [0.22, 1, 0.36, 1],
			onUpdate: (latest) => window.scrollTo(0, latest),
		});
	};

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
