"use client";

import { motion, type Variants } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import { scrollToElement } from "../../lib/scroll";

const itemVariants: Variants = {
	initial: { x: -32, opacity: 0 },
	visible: {
		x: 0,
		opacity: 1,
		transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] as never },
	},
};

const buttonBorderVariants: Variants = {
	rest: {
		pathLength: 0,
		opacity: 0,
	},
	hover: {
		pathLength: 1,
		opacity: 1,
		transition: { duration: 0.75, ease: "easeInOut" },
	},
};

const buttonGlowVariants: Variants = {
	rest: {
		pathLength: 0,
		opacity: 0,
	},
	hover: {
		pathLength: 1,
		opacity: 0.12,
		transition: { duration: 0.75, ease: "easeInOut" },
	},
};

export default function About() {
	return (
		<section
			id="about"
			className="flex justify-center px-8 py-32 md:px-16 lg:px-24"
		>
			<div className="grid w-full max-w-7xl grid-cols-1 gap-20 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
				<motion.div
					className="md:sticky md:top-28 md:self-start"
					variants={fadeUp}
					initial="initial"
					whileInView="visible"
					viewport={{ once: true, amount: 0.3 }}
				>
					<div className="flex flex-col gap-2">
						<h2 className="text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
							About Me
						</h2>
						<hr className="max-w-xs border-white/50" />
					</div>

					<div className="mt-10 max-w-xl space-y-8 text-lg text-gray-400">
						<p>
							Hello there! I&apos;m Song, a student at the University of Oregon
							studying Computer Science. I specialize in full-stack development
							with experience in frontend design, backend systems, databases,
							and deployment.
						</p>

						<p>
							Please feel free to reach out or connect if you&apos;d like to
							collaborate or chat!
						</p>

						<motion.div variants={itemVariants} className="mt-1 self-start">
							<motion.button
								type="button"
								onClick={() => scrollToElement("contact")}
								initial="rest"
								animate="rest"
								whileHover="hover"
								whileTap={{ scale: 0.985 }}
								className="group relative isolate cursor-pointer overflow-hidden rounded-md bg-oxford-blue px-6 py-3 text-lg text-sky-blue transition-transform duration-300 hover:-translate-y-1"
							>
								<span className="relative z-20">Say Hello</span>

								<svg
									className="pointer-events-none absolute inset-0 z-10 h-full w-full"
									viewBox="0 0 100 100"
									preserveAspectRatio="none"
									aria-hidden="true"
								>
									<rect
										x="1.5"
										y="1.5"
										width="97"
										height="97"
										rx="6"
										fill="none"
										stroke="#5bdeff"
										strokeOpacity="0.22"
										strokeWidth="2"
										vectorEffect="non-scaling-stroke"
									/>

									<motion.rect
										x="1.5"
										y="1.5"
										width="97"
										height="97"
										rx="6"
										fill="none"
										stroke="#5bdeff"
										strokeWidth="2"
										vectorEffect="non-scaling-stroke"
										variants={buttonBorderVariants}
									/>

									<motion.rect
										x="1.5"
										y="1.5"
										width="97"
										height="97"
										rx="6"
										fill="none"
										stroke="#5bdeff"
										strokeWidth="2"
										vectorEffect="non-scaling-stroke"
										style={{ filter: "blur(3px)" }}
										variants={buttonGlowVariants}
									/>
								</svg>

								<span className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-4 w-4 rounded-full border border-sky-blue/50 opacity-0 group-hover:animate-ripple" />
								<span
									className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-4 w-4 rounded-full border border-sky-blue/30 opacity-0 group-hover:animate-ripple"
									style={{ animationDelay: "0.3s" }}
								/>
								<span
									className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-4 w-4 rounded-full border border-sky-blue/10 opacity-0 group-hover:animate-ripple"
									style={{ animationDelay: "0.6s" }}
								/>
							</motion.button>
						</motion.div>
					</div>
				</motion.div>

				<div className="space-y-16">
					<motion.div
						className="space-y-5"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.35 }}
					>
						<div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
							01 / Passions
						</div>
						<h3 className="text-3xl font-bold tracking-tight text-slate-200">
							Building Software Together
						</h3>
						<p className="max-w-2xl text-lg text-gray-400">
							I&apos;m passionate about designing, building, and collaborating
							with others to create software that I&apos;m proud of. Currently
							I&apos;m exploring cloud infrastructure and AI in tech. My
							favorite part about software development is discovering other
							peoples&apos; progress and seeing their reactions to my work.
						</p>
						<p className="max-w-2xl text-lg text-gray-400">
							Outside of tech, I love cooking on weekends and traveling with
							friends. Over the next few years I hope to hike some of
							Oregon&apos;s tallest peaks.
						</p>
					</motion.div>

					<motion.div
						className="space-y-5"
						variants={fadeUp}
						initial="initial"
						whileInView="visible"
						viewport={{ once: true, amount: 0.35 }}
						transition={{ delay: 0.08 }}
					>
						<div className="text-xs font-bold uppercase tracking-[0.22em] text-sky-blue">
							02 / Education
						</div>
						<h3 className="text-3xl font-bold tracking-tight text-slate-200">
							University of Oregon
						</h3>
						<p className="max-w-2xl text-lg text-gray-400">
							Studying CS at UO for 3 years, I&apos;ve taken courses in data
							structures, algorithms, and software engineering. Over the past
							few years, I&apos;ve built over a dozen projects ranging from
							personal applications to guided coursework through CS50x and The
							Odin Project, as well as collaborative projects for classes and
							companies.
						</p>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
