import type { Variants } from "framer-motion";

export const fadeUp: Variants = {
	initial: { y: 28, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

export const fadeInFromLeft: Variants = {
	initial: { x: -32, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

export const fadeInFromRight: Variants = {
	initial: { x: 32, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

export const bounceCardImages = [
	"/coffee_companion.png",
	"/coffee_companion.png",
	"/coffee_companion.png",
];

export const bounceCardTransforms = [
	"rotate(6deg) translate(-96px)",
	"rotate(-4deg)",
	"rotate(6deg) translate(96px)",
];
