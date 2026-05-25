"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";

export default function CursorGlow() {
	const cursorX = useMotionValue(0);
	const cursorY = useMotionValue(0);

	const smoothX = useSpring(cursorX, {
		stiffness: 260,
		damping: 30,
		mass: 0.28,
	});
	const smoothY = useSpring(cursorY, {
		stiffness: 260,
		damping: 30,
		mass: 0.28,
	});

	const glowX = useTransform(smoothX, (value) => value - 24);
	const glowY = useTransform(smoothY, (value) => value - 24);

	useEffect(() => {
		const handlePointerMove = (event: PointerEvent): void => {
			cursorX.set(event.clientX);
			cursorY.set(event.clientY);
		};

		window.addEventListener("pointermove", handlePointerMove);

		return () => {
			window.removeEventListener("pointermove", handlePointerMove);
		};
	}, [cursorX, cursorY]);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none fixed left-0 top-0 z-[5] h-12 w-12 rounded-full bg-sky-blue/35 blur-xl"
			style={{ x: glowX, y: glowY }}
		/>
	);
}
