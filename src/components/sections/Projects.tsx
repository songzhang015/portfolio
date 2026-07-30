"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";

type Project = {
	title: string;
	summary: string;
	completed: string;
};

const PROJECTS: Project[] = [
	{
		title: "Project One",
		summary:
			"Placeholder summary for the first project, describing what it does and who it was built for.",
		completed: "Completed June 2026",
	},
	{
		title: "Project Two",
		summary:
			"Placeholder summary for the second project, describing what it does and who it was built for.",
		completed: "Completed April 2026",
	},
	{
		title: "Project Three",
		summary:
			"Placeholder summary for the third project, describing what it does and who it was built for.",
		completed: "Completed February 2026",
	},
	{
		title: "Project Four",
		summary:
			"Placeholder summary for the fourth project, describing what it does and who it was built for.",
		completed: "Completed December 2025",
	},
	{
		title: "Project Five",
		summary:
			"Placeholder summary for the fifth project, describing what it does and who it was built for.",
		completed: "Completed October 2025",
	},
];

const gridVariants: Variants = {
	initial: {},
	visible: { transition: { staggerChildren: 0.12 } },
};

export default function Projects() {
	return (
		<section
			id="projects"
			className="relative flex min-h-screen flex-col overflow-hidden px-8 pt-32 pb-32 md:px-16"
		>
			{/* Ambient particles, tracking right to left so they run counter to
			    the experience section above */}
			<ParticleField direction="left" className="z-0" />

			<motion.h2
				variants={fadeUp}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				/* Matches the hero and experience headline scale */
				className="relative z-10 text-[clamp(1.75rem,6.4vw,8.5rem)] leading-[1.02] font-medium tracking-tight text-white"
			>
				<span className="block">FEATURED</span>
				<span className="block">PROJECTS</span>
			</motion.h2>

			{/* Three across, so the five cards fall as 3 + 2 */}
			<motion.div
				variants={gridVariants}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.15 }}
				className="relative z-10 mx-auto mt-24 grid w-full max-w-7xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
			>
				{PROJECTS.map((project) => (
					<motion.article
						key={project.title}
						variants={fadeUp}
						className="group flex flex-col overflow-hidden rounded-3xl bg-gray-background transition-colors duration-300 hover:bg-gray-dark/25"
					>
						{/* Screenshot slot, kept on a fixed ratio so every card lines up */}
						<div className="flex aspect-4/3 items-center justify-center bg-gray-light">
							<span className="text-sm text-gray-dark">Picture Here</span>
						</div>

						<div className="flex flex-1 flex-col p-7">
							<div className="flex items-start justify-between gap-4">
								<h3 className="text-xl font-semibold tracking-tight text-white">
									{project.title}
								</h3>

								<span
									aria-hidden="true"
									className="text-lg text-gray transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
								>
									↗
								</span>
							</div>

							<p className="mt-4 text-base leading-relaxed text-gray">
								{project.summary}
							</p>

							{/* Pushed to the bottom so the dates align across a row */}
							<p className="mt-auto pt-8 text-sm text-gray-dark">
								{project.completed}
							</p>
						</div>
					</motion.article>
				))}
			</motion.div>
		</section>
	);
}
