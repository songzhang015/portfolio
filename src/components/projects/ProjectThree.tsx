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
							03 / Multiplayer drawing and guessing game
						</div>

						<h3 className="text-3xl font-bold tracking-tight text-slate-200">
							Drawing Game
						</h3>

						<p className="text-lg text-gray-400">
							Coffee Companion is a web-based application designed to help users
							identify key elements in their coffee and tune future brews toward
							their preferred flavors and aroma notes.
						</p>

						<p className="text-lg text-gray-400">
							It combines an easy-to-use coffee logging interface with a
							personalized brewing assistant that uses logged brew data, sensory
							feedback, and key coffee metrics like aroma, acidity, sweetness,
							body, and flavor to provide tailored recommendations.
						</p>

						<p className="text-lg text-gray-400">
							The platform supports brew logging, guided tasting, entry
							management, tuning suggestions, and user account features like
							email/password login, third-party authentication, and verified
							accounts.
						</p>

						<p className="text-lg text-gray-400">
							Built with Next.js, React, Tailwind, Flask, and MongoDB, this was
							one of my first larger full-stack projects and helped shape how I
							think about product flow, data modeling, and user-friendly design
							for more complex systems.
						</p>
					</div>

					<motion.div
						className="pt-16"
						style={{ opacity: iconOpacity, y: iconY }}
					>
						<div className="flex justify-center gap-10">
							<Icon
								label="React"
								icon={
									<i className="devicon-react-original colored text-[32px]" />
								}
							/>
							<Icon
								label="Next.js"
								icon={
									<i className="devicon-nextjs-plain text-[32px] text-white" />
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
