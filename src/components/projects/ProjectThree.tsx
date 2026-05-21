"use client";

import Image from "next/image";
import Icon from "../others/Icon";
import {
	motion,
	type Variants,
	useScroll,
	useSpring,
	useTransform,
} from "framer-motion";
import { useRef } from "react";

const fadeUp: Variants = {
	initial: { y: 28, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

const fadeInFromLeft: Variants = {
	initial: { x: -32, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

export default function ProjectThree() {
	const sectionRef = useRef<HTMLElement | null>(null);

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

	return (
		<section
			ref={sectionRef}
			className="flex justify-center px-8 py-32 md:px-16 lg:px-24"
		>
			<div className="grid w-full max-w-7xl grid-cols-1 gap-20 md:grid-cols-[1fr_1fr] md:gap-24">
				<motion.div
					className="md:sticky md:top-28 md:self-start"
					variants={fadeInFromLeft}
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="space-y-5">
						<div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
							03 / Multiplayer drawing-guessing game
						</div>

						<h3 className="text-3xl font-bold tracking-tight text-slate-200">
							Drawing Game
						</h3>

						<p className="text-lg text-gray-400">
							Drawing Game is an online multiplayer drawing and guessing game
							inspired by skribbl.io, built as an MVP project for CS 322 at the
							University of Oregon. Players draw prompts in real time while
							others try to guess the correct word, with synchronized timers,
							scoring, chat, and room state across all connected players.
						</p>

						<p className="text-lg text-gray-400">
							The project was built using HTML, CSS, JavaScript, Flask, MongoDB,
							Docker, and Socket.IO. A large part of the work focused on
							real-time multiplayer systems, including event synchronization,
							room state management, and balancing server vs. client authority
							in a fast-paced game environment.
						</p>

						<p className="text-lg text-gray-400">
							Building the project helped me better understand real-time
							architecture, multiplayer event systems, and the challenges
							involved in designing responsive game workflows and UI
							interactions.
						</p>
					</div>

					<motion.div
						className="pt-16"
						style={{ opacity: iconOpacity, y: iconY }}
					>
						<div className="flex justify-center gap-10">
							<Icon
								label="HTML"
								icon={
									<i className="devicon-html5-plain colored text-[32px]" />
								}
							/>
							<Icon
								label="CSS"
								icon={
									<i className="devicon-css3-plain colored text-[32px]" />
								}
							/>
							<Icon
								label="JavaScript"
								icon={
									<i className="devicon-javascript-plain colored text-[32px]" />
								}
							/>
							<Icon
								label="Python"
								icon={
									<Image
										src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"
										alt="Python"
										width={32}
										height={32}
									/>
								}
							/>
							<Icon
								label="Flask"
								icon={
									<i className="devicon-flask-original text-[32px] text-white" />
								}
							/>
							<Icon
								label="MongoDB"
								icon={
									<i className="devicon-mongodb-plain colored text-[32px]" />
								}
							/>
						</div>
					</motion.div>
				</motion.div>

				<div className="space-y-8 md:space-y-14">
					<motion.div
						className="relative overflow-hidden rounded-lg bg-[#10131a]"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						<Image
							src="/coffee_companion.png"
							alt="Drawing Game main screenshot"
							width={1200}
							height={900}
							className="h-auto w-full object-cover"
						/>
					</motion.div>

					<motion.div
						className="relative overflow-hidden rounded-lg bg-[#10131a]"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.25 }}
					>
						<Image
							src="/coffee_companion_2.png"
							alt="Drawing Game secondary screenshot"
							width={1200}
							height={900}
							className="h-auto w-full object-cover"
						/>
					</motion.div>

					<motion.div
						className="relative overflow-hidden rounded-lg bg-[#10131a]"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						<Image
							src="/coffee_companion_3.png"
							alt="Drawing Game third screenshot"
							width={1200}
							height={900}
							className="h-auto w-full object-cover"
						/>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
