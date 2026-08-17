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
/* "top" scrolls back to the hero rather than to a section element */
type NavTarget = SectionId | "top";

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

const NAV_ITEMS: { target: NavTarget; label: string }[] = [
	{ target: "top", label: "About" },
	{ target: "experience", label: "Experience" },
	{ target: "projects", label: "Projects" },
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

	const scrollToTarget = (target: NavTarget): void => {
		if (!lenis) return;

		const section =
			target === "top" ? null : document.getElementById(target);
		if (target !== "top" && !section) return;

		const prefersReducedMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;

		lenis.scrollTo(section ?? 0, {
			offset: 0,
			immediate: prefersReducedMotion,
			duration: 1.2,
			easing: (t) => 1 - Math.pow(1 - t, 3),
		});
	};

	return (
		<motion.section
			id="contact"
			/* From md up the left inset is the section padding plus the hero's pl-14,
			   so "CONTACT ME" lines up with "DEVELOPING FULL-STACK" */
			className="relative flex min-h-svh flex-col overflow-hidden px-8 pt-32 pb-16 lg:pr-16 lg:pl-30"
			variants={fadeUp}
			initial="initial"
			whileInView="visible"
			viewport={{ once: true, amount: 0.4 }}
		>
			<ParticleField direction="up" className="z-0" />

			<h2 className="relative z-10 text-[clamp(2rem,11vw,4rem)] leading-[1.02] font-medium tracking-tight text-white lg:text-[clamp(1.5rem,5vw,16rem)]">
				<span className="block">CONTACT</span>
				<span className="block">ME</span>
			</h2>

			<div className="relative z-10 mt-12 grid flex-1 grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
				<p className="max-w-md text-lg leading-relaxed text-gray-light lg:text-2xl">
					I&apos;m always open to chatting about projects,
					opportunities, or just to connect!
				</p>

				<div className="flex flex-col items-start gap-4 text-5xl font-medium tracking-tight text-white uppercase lg:text-6xl">
					{SOCIAL_LINKS.map(({ href, label, Icon, external }) => (
						<a
							key={label}
							href={href}
							{...(external
								? { target: "_blank", rel: "noreferrer" }
								: {})}
							className="group flex w-fit cursor-pointer items-center gap-4"
						>
							<span className="relative">
								{label}
								<span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-white transition-transform duration-300 group-hover:scale-x-100" />
							</span>

							<Icon
								aria-hidden="true"
								className="shrink-0 -translate-x-1 text-4xl text-white lg:text-5xl opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
							/>
						</a>
					))}
				</div>
			</div>

			<div className="relative z-10 mt-16 flex items-end justify-between text-xl text-gray">
				<div className="flex flex-col">
					<span>Portland, OR</span>
					<span className="text-gray-dark">{localTime ?? " "}</span>
				</div>

				<nav className="flex flex-col items-end text-gray-dark uppercase">
					{NAV_ITEMS.map(({ target, label }) => (
						<button
							key={label}
							type="button"
							onClick={() => scrollToTarget(target)}
							className="cursor-pointer transition-colors duration-300 hover:text-gray"
						>
							{label}
						</button>
					))}
				</nav>
			</div>
		</motion.section>
	);
}
