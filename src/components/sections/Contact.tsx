"use client";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { motion, type Variants } from "framer-motion";

const fadeUp: Variants = {
	initial: { y: 28, opacity: 0 },
	visible: {
		y: 0,
		opacity: 1,
		transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
	},
};

export default function Contact() {
	return (
		<motion.section
			id="contact"
			className="flex min-h-screen items-center justify-center px-8 py-32 md:px-16 lg:px-24"
			variants={fadeUp}
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, amount: 0.4 }}
		>
			<div className="flex w-full max-w-7xl flex-col gap-10">
				<div className="flex flex-col gap-2">
					<h2 className="text-4xl font-bold tracking-tight text-gray-100 md:text-5xl">
						Contact Me
					</h2>
					<hr className="max-w-xs border-white/50" />
				</div>

				<div className="max-w-2xl space-y-10">
					<p className="text-lg leading-9 text-gray-400">
						I&apos;m always open to chatting about software, projects,
						opportunities, or just connecting!
					</p>

					<div className="flex items-center gap-10">
						<div className="group relative">
							<a
								href="mailto:songzhang015@gmail.com"
								className="block transition-transform duration-300 hover:-translate-y-1"
								aria-label="Email"
							>
								<MdOutlineEmail className="text-[34px] transition-transform duration-300 group-hover:scale-110" />
							</a>
							<span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
								Email
							</span>
						</div>

						<div className="group relative">
							<a
								href="https://github.com/songzhang015"
								target="_blank"
								rel="noreferrer"
								className="block transition-transform duration-300 hover:-translate-y-1"
								aria-label="GitHub"
							>
								<SiGithub className="text-[34px] transition-transform duration-300 group-hover:scale-110" />
							</a>
							<span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
								GitHub
							</span>
						</div>

						<div className="group relative">
							<a
								href="https://linkedin.com/in/songxzhang"
								target="_blank"
								rel="noreferrer"
								className="block transition-transform duration-300 hover:-translate-y-1"
								aria-label="LinkedIn"
							>
								<FaLinkedin className="text-[34px] transition-transform duration-300 group-hover:scale-110" />
							</a>
							<span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
								LinkedIn
							</span>
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}
