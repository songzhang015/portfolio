"use client";

import Image from "next/image";
import Icon from "../others/Icon";
import BounceCards from "../ui/BounceCards";
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

const bounceCardImages = [
	"/coffee_companion.png",
	"/coffee_companion.png",
	"/coffee_companion.png",
];

const bounceCardTransforms = [
	"rotate(6deg) translate(-96px)",
	"rotate(-4deg)",
	"rotate(6deg) translate(96px)",
];

export default function ProjectOne() {
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
			<div className="flex w-full max-w-7xl flex-col gap-12">
				<div className="flex flex-col items-end gap-2">
					<h2 className="text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
						Featured Projects
					</h2>
					<hr className="w-full max-w-xs border-white/50" />
				</div>

				<div className="grid grid-cols-1 gap-20 md:grid-cols-[1fr_1fr] md:gap-24">
					<motion.div
						className="md:sticky md:top-28 md:self-start"
						variants={fadeInFromLeft}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.3 }}
					>
						<div className="space-y-5">
							<div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
								01 / AI-powered Coffee Guide
							</div>

							<h3 className="text-3xl font-bold tracking-tight text-slate-200">
								Coffee Companion
							</h3>

							<p className="text-lg text-gray-400">
								Coffee Companion is a web-based application designed to help
								users identify key elements in their coffee and tune future
								brews toward their preferred flavors and aroma notes.
							</p>

							<p className="text-lg text-gray-400">
								It combines an easy-to-use coffee logging interface with a
								personalized brewing assistant that uses logged brew data,
								sensory feedback, and key coffee metrics like aroma, acidity,
								sweetness, body, and flavor to provide tailored recommendations.
							</p>

							<p className="text-lg text-gray-400">
								The platform supports brew logging, guided tasting, entry
								management, tuning suggestions, and user account features like
								email/password login, third-party authentication, and verified
								accounts.
							</p>

							<p className="text-lg text-gray-400">
								Built with Next.js, React, Tailwind, Flask, and MongoDB, this
								was one of my first larger full-stack projects and helped shape
								how I think about product flow, data modeling, and user-friendly
								design for more complex systems.
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
							className="relative z-20 cursor-pointer overflow-hidden rounded-lg bg-[#10131a]"
							variants={fadeUp}
							initial="initial"
							whileInView="visible"
							viewport={{ once: true, amount: 0.2 }}
						>
							<Image
								src="/coffee_companion.png"
								alt="Coffee Companion main screenshot"
								width={1200}
								height={900}
								className="h-auto w-full object-cover"
							/>
						</motion.div>

						<motion.div
							className="relative z-20 cursor-pointer overflow-hidden rounded-lg bg-[#10131a]"
							variants={fadeUp}
							initial="initial"
							whileInView="visible"
							viewport={{ once: true, amount: 0.25 }}
						>
							<Image
								src="/coffee_companion_2.png"
								alt="Coffee Companion secondary screenshot"
								width={1200}
								height={900}
								className="h-auto w-full object-cover"
							/>
						</motion.div>

						<motion.div
							className="relative z-20 cursor-pointer overflow-hidden rounded-lg bg-[#10131a]"
							variants={fadeUp}
							initial="initial"
							whileInView="visible"
							viewport={{ once: true, amount: 0.3 }}
						>
							<Image
								src="/coffee_companion_3.png"
								alt="Coffee Companion third screenshot"
								width={1200}
								height={900}
								className="h-auto w-full object-cover"
							/>
						</motion.div>

						<div className="flex justify-center pt-4">
							<BounceCards
								images={bounceCardImages}
								containerWidth={500}
								containerHeight={280}
								animationDelay={0}
								animationStagger={0.08}
								easeType="elastic.out(1, 0.5)"
								transformStyles={bounceCardTransforms}
								enableHover
							/>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
