"use client";

import { useEffect, useState } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { SiGithub } from "react-icons/si";
import { fadeUp } from "../../lib/animations";
import { IMAGE_ALIGNMENTS, type Project } from "../../lib/projects";
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
					{IMAGE_SLOTS.map((span, i) => {
						const image = project.gallery?.[i];

						return (
							<motion.div
								key={i}
								variants={fadeUp}
								className={`group relative flex items-center justify-center overflow-hidden rounded-2xl ${image ? "" : "bg-gray-light"} ${span}`}
							>
								{image ? (
									<Image
										src={image.src}
										alt={`${project.title} screenshot`}
										fill
										sizes="(min-width: 1024px) 26vw, 45vw"
										className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
											image.align ? IMAGE_ALIGNMENTS[image.align] : "object-center"
										}`}
									/>
								) : (
									<span className="text-sm text-gray-dark">
										Picture Here
									</span>
								)}
							</motion.div>
						);
					})}
				</motion.div>

				<motion.div
					variants={listVariants}
					initial="initial"
					animate="visible"
					className="flex min-h-0 flex-col"
				>
					<motion.h2
						variants={fadeUp}
						className="text-xl leading-tight font-semibold tracking-tight text-white lg:text-2xl xl:text-3xl 2xl:text-4xl"
					>
						{project.altTitle}
					</motion.h2>

					<motion.div
						variants={fadeUp}
						className="mt-[clamp(1rem,3vh,2rem)] flex flex-col gap-[clamp(0.5rem,1.7vh,1.5rem)] text-sm leading-relaxed lg:text-base xl:text-lg"
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
						className="mt-auto flex w-full items-center justify-start gap-[clamp(3.5rem,6.5vh,6rem)] pt-[clamp(1rem,3vh,2.5rem)] text-xl text-white lg:text-2xl xl:text-3xl 2xl:text-4xl"
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
				className="group flex w-fit cursor-pointer items-end gap-2 text-4xl leading-[1.02] font-medium tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl"
			>
				<span className="relative">
					{project.title.toUpperCase()}
					<SiGithub
						aria-hidden="true"
						className="absolute top-[0.02em] left-full ml-2 text-xs leading-none text-gray opacity-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white group-hover:opacity-100 lg:text-sm xl:text-xl 2xl:text-2xl"
					/>
				</span>
			</a>
		</h1>
	);
}
