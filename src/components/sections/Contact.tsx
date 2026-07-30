"use client";

import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { useLenis } from "lenis/react";
import { fadeUp } from "../../lib/animations";
import ParticleField from "../ui/ParticleField";

type SectionId = "experience" | "projects";

const SOCIAL_LINKS = [
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

/* About is commented out of the page, so it renders as an inert label — matches the header */
const NAV_ITEMS: { id: SectionId | null; label: string }[] = [
	{ id: null, label: "About" },
	{ id: "experience", label: "Experience" },
	{ id: "projects", label: "Projects" },
];

export default function Contact() {
	const lenis = useLenis();
	/* Null until mounted so the server and client agree on the first render */
	const [localTime, setLocalTime] = useState<string | null>(null);

	useEffect(() => {
		const tick = () =>
			setLocalTime(
				new Date().toLocaleTimeString("en-US", {
					timeZone: "America/Los_Angeles",
					hour: "numeric",
					minute: "2-digit",
					second: "2-digit",
				}),
			);

		tick();
		const interval = setInterval(tick, 1000);

		return () => clearInterval(interval);
	}, []);

	const scrollToSection = (sectionId: SectionId): void => {
		const section = document.getElementById(sectionId);
		if (!section || !lenis) return;

		const headerOffset = 96;
		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		lenis.scrollTo(section, {
			offset: -headerOffset,
			immediate: prefersReducedMotion,
			duration: 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 3),
		});
	};

	return (
		<motion.section
			id="contact"
			className="relative flex min-h-screen flex-col overflow-hidden px-8 pt-32 pb-16 md:px-16"
			variants={fadeUp}
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, amount: 0.4 }}
		>
			{/* Ambient particles, rising bottom to top through the section */}
			<ParticleField direction="up" className="z-0" />

			{/* Matches the hero, experience, and projects headline scale */}
			<h2 className="relative z-10 text-[clamp(1.75rem,6.4vw,8.5rem)] leading-[1.02] font-medium tracking-tight text-white">
				<span className="block">CONTACT</span>
				<span className="block">ME</span>
			</h2>

			{/* Blurb left, links right, centered in whatever space the headline leaves */}
			<div className="relative z-10 mt-20 grid flex-1 grid-cols-1 gap-16 md:grid-cols-2 md:items-center">
				<p className="max-w-sm text-lg leading-relaxed text-gray-light">
					I&apos;m always open to chatting about projects,
					opportunities, or just to connect!
				</p>

				<div className="flex flex-col items-start gap-1 text-3xl font-medium tracking-tight text-white uppercase md:text-4xl">
					{SOCIAL_LINKS.map(({ href, label, Icon, external }) => (
						<a
							key={label}
							href={href}
							{...(external
								? { target: "_blank", rel: "noreferrer" }
								: {})}
							className="group flex w-fit cursor-pointer items-center gap-3"
						>
							{/* Wrapper keeps the underline on the text, not the icon */}
							<span className="relative">
								{label}
								<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
							</span>

							<Icon
								aria-hidden="true"
								className="shrink-0 -translate-x-1 text-[0.8em] text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
							/>
						</a>
					))}
				</div>
			</div>

			<div className="relative z-10 mt-16 flex items-end justify-between text-base text-gray">
				<div className="flex flex-col">
					<span>Portland, OR</span>
					{/* Non-breaking space holds the line before the clock mounts */}
					<span>{localTime ?? " "}</span>
				</div>

				<nav className="flex flex-col items-end uppercase">
					{NAV_ITEMS.map(({ id, label }) => (
						<button
							key={label}
							type="button"
							onClick={() => id && scrollToSection(id)}
							className="cursor-pointer transition-colors duration-300 hover:text-white"
						>
							{label}
						</button>
					))}
				</nav>
			</div>
		</motion.section>
	);
}
