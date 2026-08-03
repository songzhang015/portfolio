"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useMotionValueEvent, Variants } from "framer-motion";
import { useLenis } from "lenis/react";
import { usePathname } from "next/navigation";
import { useLoading } from "../others/LoadingContext";
import { NavButton } from "../ui/NavButton";
import {
	usePageTransition,
	type ScrollTarget,
} from "../others/PageTransition";

const centerItems: { target: ScrollTarget; label: string }[] = [
	{ target: "top", label: "About" },
	{ target: "experience", label: "Experience" },
	{ target: "projects", label: "Projects" },
];

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

const headerVariants: Variants = {
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
};

export default function Header() {
	const isLoading = useLoading();
	const { scrollY } = useScroll();
	const lenis = useLenis();
	const pathname = usePathname();
	const navigateWithCurtain = usePageTransition();
	const isHome = pathname === "/";
	const isProgrammaticScroll = useRef(false);
	const [hidden, setHidden] = useState(false);
	const [isAtTop, setIsAtTop] = useState(true);
	const [hasEntered, setHasEntered] = useState(false);

	const goTo = (target: ScrollTarget): void => {
		if (!isHome) {
			navigateWithCurtain("/", target);
			return;
		}

		if (!lenis) return;

		/* "bottom" is for contact, the last section — scrolling to the very end
		   leaves no dead space below it */
		const destination =
			target === "top"
				? 0
				: target === "bottom"
					? "bottom"
					: document.getElementById(target);

		if (destination === null) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		isProgrammaticScroll.current = true;
		setHidden(false);

		lenis.scrollTo(destination, {
			/* Sections are min-h-screen and pad past the fixed header on their own,
			   so landing flush on the section top fills the viewport exactly */
			offset: 0,
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
			variants={headerVariants}
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
				fixed top-0 left-0 w-full z-50 grid grid-cols-3 items-center text-base py-8 px-16
				transition-shadow duration-300
				${isAtTop ? "shadow-none backdrop-blur-none" : "shadow-sm shadow-black/75 backdrop-blur-xs"}
			`}
		>
			<motion.div variants={itemVariants} className="w-fit">
				<button
					type="button"
					onClick={() =>
						isHome ? window.location.reload() : goTo("top")
					}
					aria-label={isHome ? "Reload the page" : "Back to the homepage"}
					className="font-display block w-fit cursor-pointer text-4xl leading-none text-gold"
				>
					SZ
				</button>
			</motion.div>

			<nav className="flex justify-center gap-16">
				{centerItems.map(({ target, label }) => (
					<motion.div variants={itemVariants} key={label}>
						<NavButton onClick={() => goTo(target)}>
							{label}
						</NavButton>
					</motion.div>
				))}
			</nav>

			<div className="flex justify-end">
				<motion.div variants={itemVariants}>
					<NavButton onClick={() => goTo("bottom")}>
						Contact
					</NavButton>
				</motion.div>
			</div>
		</motion.header>
	);
}
