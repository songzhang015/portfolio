"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";

type Role = {
	title: string;
	meta: string;
	summary: string;
};

const ROLES: Role[] = [
	{
		title: "QuackHacks • Software Engineer",
		meta: "June 2026 - Present • Eugene, OR",
		summary:
			"University of Oregon's premier hackathon, hosting hundreds of students from over 30 different schools to collaborate together across a 24-hour event.",
	},
	{
		title: "Synrax • Co-Founder & Software Engineer",
		meta: "January 2026 - May 2026 • Eugene, OR",
		summary:
			"AI code-review platform integrated with GitHub to review pull requests and generate smoke and unit tests, built for developers and engineering managers.",
	},
];

const listVariants: Variants = {
	initial: {},
	visible: { transition: { staggerChildren: 0.15 } },
};

export default function Experience() {
	return (
		<section
			id="experience"
			className="relative flex min-h-screen flex-col justify-between overflow-hidden px-8 pt-32 pb-24 md:px-16"
		>
			<motion.h2
				variants={fadeUp}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.3 }}
				/* Matches the hero headline scale so both read as the same type system */
				className="text-[clamp(1.75rem,6.4vw,8.5rem)] font-medium leading-[1.02] tracking-tight text-white"
			>
				<span className="block pr-14 text-right">TECHNICAL</span>
				<span className="block pr-14 text-right">EXPERIENCE</span>
			</motion.h2>

			<motion.div
				variants={listVariants}
				initial="initial"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				className="mt-24 flex max-w-xl flex-col gap-14 pl-4 md:pl-8"
			>
				{ROLES.map((role) => (
					<motion.div key={role.title} variants={fadeUp}>
						<h3 className="text-2xl font-semibold tracking-tight text-white md:text-3xl">
							{role.title}
						</h3>

						<p className="mt-1 text-sm text-gray">{role.meta}</p>

						<p className="mt-4 text-base leading-relaxed text-gray-light">
							{role.summary}
						</p>
					</motion.div>
				))}
			</motion.div>
		</section>
	);
}
