"use client";

import { useLoading } from "../others/LoadingContext";
import {
	motion,
	type Variants,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

type ChevronState = "visible" | "dismissed" | "hidden";

const itemVariants: Variants = {
	initial: { y: 24, opacity: 0, filter: "blur(8px)" },
	visible: {
		y: 0,
		opacity: 1,
		filter: "blur(0px)",
		transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as never },
	},
};

export default function Introduction() {
	const isLoading = useLoading();
	const [chevronState, setChevronState] = useState<ChevronState>("visible");
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

	const bgY = useTransform(smoothProgress, [0, 1], ["-10%", "20%"]);
	const contentY = useTransform(smoothProgress, [0, 1], [0, -18]);
	const bgScale = useTransform(smoothProgress, [0, 1], [1.2, 1.3]);
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

				<div className="absolute inset-0 bg-background/25" />
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
					className="max-w-2xl text-xl text-on-surface-variant md:text-2xl "
				>
					Full-Stack Development, Systems Design, AI Integration
				</motion.p>

				<motion.div variants={itemVariants} className="h-11">
					{chevronState !== "hidden" && (
						<motion.button
							type="button"
							aria-label="Dismiss scroll cue"
							className="flex cursor-pointer flex-col items-center -space-y-5 text-tertiary"
							initial={{ y: 0 }}
							onClick={() => setChevronState("dismissed")}
							onAnimationComplete={() => {
								if (chevronState === "dismissed") setChevronState("hidden");
							}}
							animate={
								chevronState === "dismissed"
									? { opacity: 0, y: -32 }
									: isLoading
									? { opacity: 1, y: 0 }
									: {
											opacity: 1,
											y: [0, 18, 0],
										}
							}
							transition={
								chevronState === "dismissed"
									? { duration: 0.55, ease: "easeOut" }
									: {
											duration: 1.8,
											repeat: Infinity,
											repeatType: "loop",
										}
							}
						>
							<ChevronDown className="h-8 w-8" strokeWidth={3} />
							<ChevronDown className="h-8 w-8" strokeWidth={3} />
						</motion.button>
					)}
				</motion.div>
			</motion.div>
		</section>
	);
}
