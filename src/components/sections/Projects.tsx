"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";
import Squiggle from "../ui/Squiggle";
import { IMAGE_ALIGNMENTS, PROJECTS } from "../../lib/projects";
import Link from "next/link";
import Image from "next/image";
import { FiArrowUpRight } from "react-icons/fi";
import { usePageTransition } from "../others/PageTransition";

const gridVariants: Variants = {
	initial: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
	const navigateWithCurtain = usePageTransition();

	return (
		<section
			id="projects"
			className="relative flex min-h-screen flex-col overflow-hidden px-8 pt-32 pb-32 md:px-16"
		>
			<ParticleField direction="left" className="z-0" />

			<div className="relative z-10 flex flex-col md:flex-row md:items-center">
				<motion.h2
					variants={fadeUp}
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					data-squiggle-stop=""
					/* Matches the hero and experience headline scale; pl-14 lines the
					   text up with "DEVELOPING FULL-STACK" in the hero */
					className="pl-14 text-[clamp(1.5rem,5vw,16rem)] leading-[1.02] font-medium tracking-tight text-white md:flex-1"
				>
					<span className="block">FEATURED</span>
					<span className="block">PROJECTS</span>
				</motion.h2>

				<motion.div
					variants={fadeUp}
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
					className="w-full md:w-1/2 md:shrink-0"
				>
					<Squiggle variant="projects" />
				</motion.div>
			</div>

			<motion.div
				variants={gridVariants}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.15 }}
				className="relative z-10 mx-auto mt-24 grid w-full max-w-[84rem] grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
			>
				{PROJECTS.map((project) => (
					<motion.article key={project.title} variants={fadeUp}>
						<Link
							href={`/projects/${project.slug}`}
							onClick={(event) => {
								if (
									event.button !== 0 ||
									event.metaKey ||
									event.ctrlKey ||
									event.shiftKey ||
									event.altKey
								) {
									return;
								}

								event.preventDefault();
								navigateWithCurtain(`/projects/${project.slug}`);
							}}
							className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-gray-background/60 transition-colors duration-300 hover:bg-gray-background"
						>
							<div
								className={`relative flex aspect-3/2 items-center justify-center overflow-hidden ${project.card ? "" : "bg-gray-light"}`}
							>
								{project.card ? (
									<div
										className="absolute inset-0"
										style={{ transform: `scale(${project.card.zoom ?? 1})` }}
									>
										<Image
											src={project.card.src}
											alt={`${project.title} preview`}
											fill
											sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
											className={`object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02] ${
												project.card.align
													? IMAGE_ALIGNMENTS[project.card.align]
													: "object-center"
											}`}
										/>
									</div>
								) : (
									<span className="text-sm text-gray-dark">Picture Here</span>
								)}
							</div>

							<div className="flex flex-1 flex-col p-8">
								<div className="flex items-start justify-between gap-4">
									<h3 className="text-xl font-semibold tracking-tight text-white">
										{project.title}
									</h3>

									<FiArrowUpRight
										aria-hidden="true"
										className="shrink-0 text-xl text-gray transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
									/>
								</div>

								<p className="mt-4 mb-8 text-base leading-relaxed text-gray">
									{project.summary}
								</p>

								<hr className="mt-auto border-t border-gray-dark/50" />
								<p className="pt-4 text-sm text-gray-dark">
									{project.completed}
								</p>
							</div>
						</Link>
					</motion.article>
				))}
			</motion.div>
		</section>
	);
}
