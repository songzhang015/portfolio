"use client";

import { ReactLenis, useLenis } from "lenis/react";
import { ReactNode, useEffect, useState } from "react";

// html has a fixed (not auto) height, so its box never changes size as
// content grows and Lenis's own ResizeObserver never fires, leaving it
// stuck thinking there's nothing to scroll. Watch body (auto height)
// and force a recalculation whenever it actually resizes.
function ResizeSync() {
	const lenis = useLenis();
	useEffect(() => {
		if (!lenis) return;
		const observer = new ResizeObserver(() => lenis.resize());
		observer.observe(document.body);
		return () => observer.disconnect();
	}, [lenis]);
	return null;
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(
		() =>
			typeof window !== "undefined" &&
			window.matchMedia("(prefers-reduced-motion: reduce)").matches,
	);

	useEffect(() => {
		const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

		const handleChange = (event: MediaQueryListEvent): void => {
			setPrefersReducedMotion(event.matches);
		};

		mediaQuery.addEventListener("change", handleChange);
		return () => mediaQuery.removeEventListener("change", handleChange);
	}, []);

	return (
		<ReactLenis
			root
			options={{
				// Shorter glide with a less drawn-out tail than the quartic ease,
				// so the page settles sooner after the wheel stops
				duration: 0.9,
				easing: (t: number) => 1 - Math.pow(1 - t, 3),
				smoothWheel: !prefersReducedMotion,
				wheelMultiplier: 1.15,
				syncTouch: false,
				touchMultiplier: 1.5,
			}}
		>
			<ResizeSync />
			{children}
		</ReactLenis>
	);
}
