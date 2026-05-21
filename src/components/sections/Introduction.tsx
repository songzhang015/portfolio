"use client";

import { useLoading } from "../others/LoadingContext";
import {
	motion,
	type Variants,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef } from "react";

const itemVariants: Variants = {
	initial: { y: 24, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as never },
	},
};

export default function Introduction() {
	const isLoading = useLoading();
	const sectionRef = useRef<HTMLElement | null>(null);

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ["start end", "end start"],
	});

	const smoothProgress = useSpring(scrollYProgress, {
		stiffness: 90,
		damping: 20,
		mass: 0.3,
	});

	const bgY = useTransform(smoothProgress, [0, 1], ["-2%", "8%"]);
	const contentY = useTransform(smoothProgress, [0, 1], [0, -18]);
	const bgScale = useTransform(smoothProgress, [0, 1], [1.02, 1.08]);
	const bgOpacity = useTransform(smoothProgress, [0, 1], [1, 0.82]);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background"
		>
			<div className="pointer-events-none absolute inset-0">
				<motion.div
					className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[1px]"
					style={{
						backgroundImage: "url('/background-3.png')",
						y: bgY,
						scale: bgScale,
						opacity: bgOpacity,
					}}
				/>

				<div className="absolute inset-0 bg-background/40" />
				<div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-surface via-black/55 to-transparent" />
			</div>

			<motion.div
				className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-6 px-6 text-center"
				style={{ y: contentY }}
				variants={{
					initial: {},
					visible: {
						transition: {
							delay: 1,
							staggerChildren: 0.2,
							delayChildren: 1,
						},
					},
				}}
				initial="initial"
				animate={isLoading ? "initial" : "visible"}
			>
				<motion.div
					variants={itemVariants}
					className="font-label text-xs font-bold tracking-[0.3em] text-tertiary uppercase"
				>
					Software Engineer
				</motion.div>

				<motion.h1
					variants={itemVariants}
					className="font-headline text-6xl font-bold tracking-tight md:text-8xl"
				>
					Song Zhang
				</motion.h1>

				<motion.p
					variants={itemVariants}
					className="max-w-2xl text-xl text-on-surface-variant md:text-2xl"
				>
					Student at the University of Oregon studying Computer Science.
				</motion.p>
			</motion.div>
		</section>
	);
}
