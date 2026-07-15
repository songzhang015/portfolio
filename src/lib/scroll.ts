import { animate } from "framer-motion";

const HEADER_OFFSET = 96;

export function scrollToElement(
	sectionId: string,
	onSettle?: () => void,
): ReturnType<typeof animate> | undefined {
	const section = document.getElementById(sectionId);
	if (!section) return undefined;

	const targetY = Math.max(
		section.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
		0,
	);
	const prefersReducedMotion = window.matchMedia(
		"(prefers-reduced-motion: reduce)",
	).matches;

	if (prefersReducedMotion) {
		window.scrollTo(0, targetY);
		if (onSettle) window.setTimeout(onSettle, 100);
		return undefined;
	}

	return animate(window.scrollY, targetY, {
		duration: 1,
		ease: [0.22, 1, 0.36, 1],
		onUpdate: (latest) => window.scrollTo(0, latest),
		onComplete: onSettle,
	});
}
