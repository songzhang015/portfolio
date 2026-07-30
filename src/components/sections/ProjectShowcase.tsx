"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { SiGithub } from "react-icons/si";
import { FiArrowUpRight } from "react-icons/fi";
import { fadeUp } from "../../lib/animations";
import type { Project } from "../../lib/projects";
import TechIcon from "../ui/TechIcon";

/* How long each sentence stays highlighted before the rotation advances */
const ROTATE_MS = 6000;

/* Left panel spans both rows, the two right panels stack beside it */
const IMAGE_SLOTS = ["row-span-2", "", ""];

const listVariants: Variants = {
	initial: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

export default function ProjectShowcase({ project }: { project: Project }) {
	const [activeSentence, setActiveSentence] = useState(0);
	const [hoveredSentence, setHoveredSentence] = useState<number | null>(null);

	useEffect(() => {
		if (hoveredSentence !== null) return;

		const timer = setTimeout(
			() => setActiveSentence((i) => (i + 1) % project.sentences.length),
			ROTATE_MS,
		);

		return () => clearTimeout(timer);
	}, [activeSentence, hoveredSentence, project.sentences.length]);

	return (
		<section className="relative z-10 flex flex-col gap-8 px-8 pt-28 pb-10 md:px-16 lg:h-screen lg:gap-[clamp(1rem,3vh,2.5rem)] lg:pt-[clamp(5.5rem,13vh,9rem)] lg:pb-[clamp(1.5rem,4vh,3rem)]">
			<div className="grid w-full min-h-0 grid-cols-1 items-stretch gap-12 lg:flex-1 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
				<motion.div
					variants={listVariants}
					initial="initial"
					animate="visible"
					className="grid aspect-3/2 grid-cols-2 grid-rows-2 gap-4 lg:aspect-auto lg:h-full lg:min-h-0"
				>
					{IMAGE_SLOTS.map((span, i) => (
						<motion.div
							key={i}
							variants={fadeUp}
							className={`flex items-center justify-center rounded-2xl bg-gray-light ${span}`}
						>
							<span className="text-sm text-gray-dark">
								Picture Here
							</span>
						</motion.div>
					))}
				</motion.div>

				<motion.div
					variants={listVariants}
					initial="initial"
					animate="visible"
					className="flex min-h-0 flex-col"
				>
					<motion.h2
						variants={fadeUp}
						className="text-[clamp(1.25rem,3.4vh,2.25rem)] leading-tight font-semibold tracking-tight text-white"
					>
						{project.altTitle}
					</motion.h2>

					<motion.div
						variants={fadeUp}
						className="mt-[clamp(1rem,3vh,2rem)] flex flex-col gap-[clamp(0.5rem,1.7vh,1.25rem)] text-[clamp(0.8125rem,1.65vh,1.125rem)] leading-relaxed"
					>
						{project.sentences.map((sentence, i) => (
							<p
								key={i}
								onMouseEnter={() => {
									setHoveredSentence(i);
									setActiveSentence(i);
								}}
								onMouseLeave={() => setHoveredSentence(null)}
								className={`max-w-xl cursor-default transition-colors duration-500 ease-in-out ${
									activeSentence === i
										? "text-white"
										: "text-gray-dark"
								}`}
							>
								{sentence}
							</p>
						))}
					</motion.div>

					<motion.div
						variants={fadeUp}
						className="mt-auto flex flex-wrap items-center gap-[clamp(1rem,2.4vh,1.75rem)] pt-[clamp(1rem,3vh,2.5rem)] text-[clamp(1.25rem,3.4vh,2.25rem)] text-white"
					>
						{project.tech.map((name) => (
							<TechIcon key={name} name={name} />
						))}
					</motion.div>
				</motion.div>
			</div>

			<motion.div
				variants={fadeUp}
				initial="initial"
				animate="visible"
				className="shrink-0"
			>
				<ProjectTitle project={project} />
			</motion.div>
		</section>
	);
}

function ProjectTitle({ project }: { project: Project }) {
	return (
		<h1>
			<a
				href={project.repoUrl}
				target="_blank"
				rel="noreferrer"
				aria-label={`${project.title} on GitHub`}
				/* Clamp lives on the anchor so the icons can size themselves in em */
				className="group flex w-fit cursor-pointer items-end gap-[0.14em] text-[clamp(2.25rem,min(9.5vw,15vh),9rem)] leading-[1.02] font-medium tracking-tight text-white"
			>
				<span className="relative">
					{project.title.toUpperCase()}
					<FiArrowUpRight
						aria-hidden="true"
						className="absolute top-[0.02em] left-full ml-[0.04em] text-[0.2em] leading-none text-gray opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-hover:opacity-100"
					/>
				</span>

				<SiGithub
					aria-hidden="true"
					className="mb-[0.1em] shrink-0 text-[0.24em] leading-none text-gray opacity-0 transition-all duration-300 group-hover:text-white group-hover:opacity-100"
				/>
			</a>
		</h1>
	);
}
