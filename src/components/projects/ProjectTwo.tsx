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
import { useRef, useState } from "react";

const fadeUp: Variants = {
	initial: { y: 28, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

const fadeInFromRight: Variants = {
	initial: { x: 32, opacity: 0 },
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

export default function ProjectTwo() {
	const sectionRef = useRef<HTMLElement | null>(null);
	const [isVideoOpen, setIsVideoOpen] = useState(false);

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
				<div className="space-y-8 md:space-y-14">
					<motion.div
						className="relative z-20 cursor-pointer overflow-hidden rounded-lg bg-[#10131a]"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.2 }}
					>
						<video
							className="h-auto w-full cursor-pointer object-cover transition-transform duration-300 hover:scale-[1.02]"
							onClick={() => setIsVideoOpen(true)}
							autoPlay
							muted
							loop
							playsInline
							preload="auto"
							controls={false}
						>
							<source src="/synrax.mp4" type="video/mp4" />
						</video>
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
							alt="Synrax secondary screenshot"
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
							alt="Synrax third screenshot"
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

				<motion.div
					className="md:sticky md:top-28 md:self-start"
					variants={fadeInFromRight}
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="space-y-5">
						<div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
							02 / Software code reviewer
						</div>

						<h3 className="text-3xl font-bold tracking-tight text-slate-200">
							Synrax
						</h3>

						<p className="text-lg text-gray-400">
							Synrax is an AI-powered platform focused on automated code
							reviews, smoke testing, and developer workflow visibility for
							modern software teams. As AI-generated code becomes more common
							across the industry, one of the biggest challenges shifts from
							writing software to maintaining quality as projects scale. Synrax
							was built around that problem.
						</p>

						<p className="text-lg text-gray-400">
							I co-founded Synrax alongside two other engineers, where I
							primarily work across product direction, architecture, and project
							management. A large part of my role involves coordinating
							development across both the frontend and backend systems while
							figuring out how AI tooling can realistically fit into existing
							engineering workflows without slowing teams down.
						</p>

						<p className="text-lg text-gray-400">
							The platform integrates directly into GitHub workflows and
							automatically reviews pull requests, generates tests, runs smoke
							tests, and surfaces issues before code is merged. The goal was to
							reduce the amount of repetitive review and QA work that tends to
							slow teams down as projects grow larger and more AI-assisted.
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
									<i className="devicon-react-original colored text-3xl" />
								}
							/>
							<Icon
								label="Next.js"
								icon={
									<i className="devicon-nextjs-plain text-3xl text-white" />
								}
							/>
							<Icon
								label="Go"
								icon={<i className="devicon-go-original-wordmark colored text-5xl" />}
							/>
							<Icon
								label="PostgreSQL"
								icon={
									<i className="devicon-postgresql-plain colored text-4xl" />
								}
							/>
							<Icon
								label="Supabase"
								icon={<i className="devicon-supabase-plain colored text-4xl" />}
							/>
						</div>
					</motion.div>
				</motion.div>
			</div>

			{isVideoOpen && (
				<div
					className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md"
					onClick={() => setIsVideoOpen(false)}
				>
					<video
						className="relative z-20 max-h-[86vh] w-full max-w-7xl rounded-lg bg-black shadow-2xl"
						autoPlay
						muted
						loop
						playsInline
						preload="auto"
						controls
						onClick={(event) => event.stopPropagation()}
					>
						<source src="/synrax.mp4" type="video/mp4" />
					</video>
				</div>
			)}
		</section>
	);
}
