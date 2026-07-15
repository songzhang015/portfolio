"use client";

import {
	useScroll,
	useSpring,
	useTransform,
	type MotionValue,
} from "framer-motion";
import type { RefObject } from "react";

export function useScrollIconReveal(sectionRef: RefObject<HTMLElement | null>): {
	iconOpacity: MotionValue<number>;
	iconY: MotionValue<number>;
} {
	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 120,
		damping: 26,
		mass: 0.3,
	});

	const iconOpacity = useTransform(smoothProgress, [0.6, 0.64, 1], [0, 1, 1]);
	const iconY = useTransform(smoothProgress, [0.6, 0.64, 1], [18, 0, 0]);

	return { iconOpacity, iconY };
}
