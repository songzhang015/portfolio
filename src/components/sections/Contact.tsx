"use client";

import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";

const socialLinks = [
	{
		href: "mailto:songzhang015@gmail.com",
		label: "Email",
		Icon: MdOutlineEmail,
		external: false,
	},
	{
		href: "https://github.com/songzhang015",
		label: "GitHub",
		Icon: SiGithub,
		external: true,
	},
	{
		href: "https://linkedin.com/in/songxzhang",
		label: "LinkedIn",
		Icon: FaLinkedin,
		external: true,
	},
];

export default function Contact() {
	return (
		<motion.section
			id="contact"
			className="relative flex min-h-screen items-center justify-center overflow-hidden px-8 py-32 md:px-16 lg:px-24"
			variants={fadeUp}
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, amount: 0.4 }}
		>
			{/* Ambient particles, rising bottom to top through the section */}
			<ParticleField direction="up" className="z-0" />

			<div className="relative z-10 flex w-full max-w-7xl flex-col gap-10">
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
						{socialLinks.map(({ href, label, Icon, external }) => (
							<div className="group relative" key={label}>
								<a
									href={href}
									{...(external
										? { target: "_blank", rel: "noreferrer" }
										: {})}
									className="block transition-transform duration-300 hover:-translate-y-1"
									aria-label={label}
								>
									<Icon className="text-[34px] transition-transform duration-300 group-hover:scale-110" />
								</a>
								<span className="pointer-events-none absolute left-1/2 top-full mt-2 -translate-x-1/2 whitespace-nowrap text-xs text-gray-400 opacity-0 transition-all duration-200 group-hover:translate-y-0.5 group-hover:opacity-100">
									{label}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</motion.section>
	);
}
