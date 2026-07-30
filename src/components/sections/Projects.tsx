"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";
import { PROJECTS } from "../../lib/projects";
import Link from "next/link";
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

			<motion.h2
				variants={fadeUp}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				/* Matches the hero and experience headline scale; pl-14 lines the text
				   up with "DEVELOPING FULL-STACK" in the hero */
				className="relative z-10 pl-14 text-[clamp(1.75rem,6.4vw,8.5rem)] leading-[1.02] font-medium tracking-tight text-white"
			>
				<span className="block">FEATURED</span>
				<span className="block">PROJECTS</span>
			</motion.h2>

			<motion.div
				variants={gridVariants}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.15 }}
				className="relative z-10 mx-auto mt-24 grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
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
							<div className="flex aspect-4/3 items-center justify-center bg-gray-light">
								<span className="text-sm text-gray-dark">Picture Here</span>
							</div>

							<div className="flex flex-1 flex-col p-7">
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
